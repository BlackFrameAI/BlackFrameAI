# cuda_quantum_simulator.md

This document introduces the **CudaStateVectorSimulator** which executes quantum gate operations directly on the GPU using CUDA.

The simulator mirrors the API provided by `QuantumStateVectorSimulator` but all state vectors and gate kernels live in CUDA code. Qubit counts are allocated at runtime based on available GPU memory, typically supporting 24–32 qubits or more.

## Build Flags

- `CV_ENABLE_CUDA_SIM` – compiles the raw CUDA simulator.
- `CV_ENABLE_CUQUANTUM` – enables NVIDIA cuQuantum acceleration (default ON).
- `CV_CUDA_DEVICE_ID` – selects the GPU device used for both simulators.
- `CV_GPU_DEVICE_INDEX` – runtime override selecting a specific CUDA device.

Enable CUDA via CMake (`-DCV_ENABLE_CUDA_SIM=ON`) or let `scripts/setup.sh` detect
the toolkit automatically. Disable cuQuantum with `-DCV_ENABLE_CUQUANTUM=OFF` to
force the raw CUDA backend. Set `CV_FORCE_CPU_QUANTUM=ON` to skip GPU code entirely.

## Header Snippet

```cpp
#include "engine/modules/quantum/cuda/CudaStateVectorSimulator.h"

game::CudaStateVectorSimulator sim(20); // optional device id via constructor
sim.initialize();
sim.applyGates();
unsigned int seed = sim.collapse(0.0, CollapseMode::GPU);
```

## Example Usage

```cpp
#ifdef CV_ENABLE_CUDA_SIM
engine::QuantumStateVectorManager qsvm;
qsvm.initialize();
qsvm.registerFrameTrigger(26);
qsvm.updatePerFrame();
#endif
```

The manager creates a `CudaStateVectorSimulator` when the build flag is enabled and falls back to the cuQuantum or CPU implementation otherwise.

## API Overview

- `initialize(qubits)` – allocates device memory and sets the register to the zero state. Passing a new qubit count reinitializes the buffer.
- `applyGates()` – applies a randomized mix of Hadamard, PauliX and PauliZ gates to every qubit, updating the probability cache.
- `collapse(tOffset, mode, qubits)` – runs `applyGates()` then hashes the probability cache to generate a seed. Specifying `qubits` here automatically resizes the register.

For details on the cache fields and hashing algorithm see
[`quantum_statevector_system.md`](quantum_statevector_system.md#probability-cache-usage).

Runtime qubit counts can therefore be adjusted by calling `initialize(n)` or by passing `n` to `collapse()` when a trigger fires.


## Testing

`tests/CudaQuantumSimulatorTests.cpp` validates the GPU simulator against the CPU implementation. Enable CUDA and tests during configuration:

```bash
cmake -S . -B build -G Ninja -DBUILD_TESTING=ON -DCV_ENABLE_CUDA_SIM=ON
cmake --build build
cd build && ctest -R CudaQuantumSimulatorTests
```
