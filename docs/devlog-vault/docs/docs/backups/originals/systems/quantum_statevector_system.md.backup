# quantum_statevector_system.md

This document summarizes the **QuantumStateVectorManager** and related GPU accelerated simulator.
**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status.

---

## cuQuantum Dependency

`QuantumStateVectorSimulator` optionally uses NVIDIA's **cuQuantum** library when
compiled with `CV_CUQUANTUM_ENABLED`. The runtime dynamically loads
`libcudart.so` and `libcustatevec.so`; if either library fails to load the
simulator falls back to a CPU implementation built from multiple
`QuantumSimulator` instances.

## Trigger Types

`QuantumStateVectorManager` exposes three collapse trigger APIs:

- `registerFrameTrigger(size_t qubits = 0)` – collapse every frame using the given qubit count.
- `registerChunkTrigger(int id, size_t qubits = 0)` – collapse when the specified chunk is reached.
- `registerEventTrigger(const std::string& name, size_t qubits = 0)` – collapse on custom events.

`updatePerFrame()` processes pending triggers and forwards the collapse request
to the simulator.

`collapse()` automatically reinitializes the register before generating a seed.
When a qubit count isn't supplied the simulator uses at least **20** qubits.
After each reset the simulator applies a randomized mix of Hadamard and PauliX
operations to every qubit so the distribution changes on every collapse. Each
collapse logs the backend used, entropy spread and resulting seed; warnings
appear if GPU mode is requested but unavailable.

## Probability Cache Usage

Each collapse records a `ProbabilityCacheEntry` containing:

- `simulatorName` – identifying which simulator handled the collapse.
- `qubits` – number of qubits in the register.
- `mode` – CPU, GPU or Mixed collapse mode.
- `entropy` – Shannon entropy of the probability distribution.

Entries accumulate in a vector alongside `collapseCounter` and
`cumulativeEntropy` statistics. Tooling can inspect these values to analyze
average entropy and collapse frequency across long sessions.

## Seed Retrieval API

After every collapse the manager stores the resulting seed. Systems can retrieve
it via `getEntropySeed()` to deterministically seed their own RNG or procedural
content generation steps.

## Seed Buckets

`SeedBucket` groups collapse seeds into named buckets for later analysis. Each
trigger registration accepts an optional bucket name. When supplied, the
resulting seed is pushed into that bucket via `QuantumStateVectorManager`.

```cpp
engine::QuantumStateVectorManager mgr;
mgr.registerEventTrigger("encounter", 20, "combat");
mgr.updatePerFrame();
auto combatSeeds = mgr.getSeedBucket().getSeeds("combat");
```

Buckets can be cleared individually with `SeedBucket::clearBucket()` or all at
once using `clearAll()`. The manager exposes `getSeedBucket()` and
`clearSeedBuckets()` for convenience.

## Collapse Lineage Logger

When built with `-DCV_ENABLE_COLLAPSE_LINEAGE=ON`, each collapse records the
entropy hash, a timestamp and the pre/post qubit states. Entries are stored in
`CollapseLineageLogger` and can be inspected at runtime for debugging. Release
builds omit these logs by default unless the option is enabled.

## Debugging and Randomization

`QuantumStateVectorSimulator` randomizes the gate sequence for each qubit every
time `collapse()` runs. When `CV_ENABLE_DEBUG_LOGS` is active the simulator logs
the selected gates, probability cache values and final seed. See
[`dev_logging_debugging.md`](../dev_logging_debugging.md#quantum-collapse-debug-logs)
for details.

## Hash Algorithm

The collapse seed is derived from a 64‑bit hash over the probability cache,
the offset value passed into `collapse()` and the internal collapse counter.
The implementation builds a byte buffer containing these fields and applies
`std::hash<std::string_view>` to obtain a deterministic 64‑bit value.
Mixed mode splits the probability cache between CPU and GPU before hashing each
half separately and XORing the results.

## Testing

`tests/QuantumStateVectorTests.cpp` verifies basic initialization, seed
generation and CPU fallback behavior. Enable tests during configuration and run
`ctest` from the build directory:

```bash
cmake -S . -B build -G Ninja -DBUILD_TESTING=ON
cmake --build build
cd build && ctest -R QuantumStateVectorTests
```
