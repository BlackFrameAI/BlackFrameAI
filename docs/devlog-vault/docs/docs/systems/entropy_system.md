# entropy_system.md

The entropy system centralizes random bit generation for both CPU and GPU logic.

**Note:** All systems are modular and self-contained. See [docs/modular/engine_system_tree.md](../modular/engine_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.

---

## Purpose of Real-World Entropy

Procedural gameplay and cryptographically strong seeds rely on randomness that cannot be reproduced by deterministic algorithms alone. The engine polls multiple unpredictable signals to provide high quality bits for physics simulations, network behavior and quantum experiments.

## Entropy Sources and Mixing Strategy

The `EntropyManager` registers several `IEntropySource` implementations:

- Hardware entropy via `/dev/urandom` or `RtlGenRandom` on Windows
- High resolution timer jitter from the `TimeSystem`
- Input timing deltas captured by `InputBroker`
- Packet arrival timing from `NetworkSimulationManager`
- Optional CUDA hardware RNG when `CV_ENABLE_CUDA_SIM` is active
- CPU jitter measurements from tight busy loops
- Memory access latency from pointer-chasing tests

Each source returns raw bytes with `poll()`. `EntropyPool` now keeps a deque of
bytes with a configurable maximum size (default 256). When new data pushes the
pool beyond this limit, the oldest entries are evicted. If requests consume
bytes faster than sources can refill the pool, a warning is emitted and the
pool reseeds itself using a mix of timestamp values, hardware entropy and CPU
jitter.

### Scheduling Policy

`EntropyManager` polls one source per cycle using a round‑robin index.
Each source can specify a weight when registered to receive more or
fewer polling opportunities. This prevents slow simulators from being
starved while still allowing high‑quality hardware entropy to dominate
the mix when available.

## API Usage

### CPU Example
```cpp
#include "entropy/EntropyManager.h"

std::array<uint8_t, 32> key;
EntropyManager::get().requestBits(key.data(), key.size());
```

Standard library PRNGs like `std::mt19937` should also seed from
`EntropyManager::requestBits()` instead of `std::random_device`. The
old `RandomUtils` helpers have been removed.

### CUDA Example
```cpp
// device kernel consuming entropy from a mirrored ring buffer
__global__ void applyNoise(uint8_t* rngBuf, int ringSize, float* out, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        int r = idx % ringSize;
        uint8_t noise = 0;
        if (r < ringSize)
            noise = rngBuf[r];
        else
            noise = static_cast<uint8_t>((idx * 33u) & 0xFF);
        out[idx] += (float)(noise) / 255.0f;
    }
}
```

The manager maintains a mirrored ring buffer in device memory so CUDA kernels can access fresh bits without extra copies. `EntropyManager::ringSize()` returns the buffer size, currently **4096 bytes**.

### Memory Layout

The ring buffer is a linear array of `uint8_t` values. Bytes are copied from the host pool each frame using `cudaMemcpy`. When the pool cannot supply enough entropy to fill the buffer, the remaining bytes are seeded with a deterministic fallback sequence. Kernels should always bounds check the index and fall back to a pseudo-random value when `r >= ringSize` or the pointer is null.

## Test Mode

When the engine is compiled with testing enabled, the `CV_TEST_BUILD` macro
activates extra helpers for deterministic runs. `EntropyManager` provides
`initializeForTest` and `resetTestState` so unit tests can supply mock entropy
sources and clear the pool without launching the polling thread.

```cpp
std::vector<IEntropySource*> harness{&mockSource};
EntropyManager::Get().initializeForTest(harness);
// run deterministic logic
EntropyManager::Get().resetTestState();
```

## Production Mode

Defining `CV_PRODUCTION_MODE` at build time blocks deterministic entropy
sources. Any source whose `isDeterministic()` method returns `true` is ignored
and a warning is logged. This prevents accidental fixed seeds from entering the
entropy pool in release builds.
