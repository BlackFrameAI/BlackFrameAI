# quantum_system.md

This document summarizes the **Quantum Simulator** (`engine/modules/quantum/simulator/QuantumSimulator.*`) added for experimentation.
**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.


---

## Overview

`QuantumSimulator` is a lightweight simulator supporting an arbitrary number of
qubits (defaulting to one). It implements multiple single-qubit gate operations
(Hadamard, Pauli‑X/Y/Z and arbitrary phase rotation) plus a simple controlled‑X
gate. Twelve additional compound gates combine these basics into flavorful
sequences:

- **GrimCross** – Pauli‑Z followed by a 90° phase shift
- **VeilShift** – Hadamard followed by a 90° phase shift
- **MechBoost** – Pauli‑X then a 45° phase shift
- **Starfall** – Hadamard → Pauli‑X → 60° phase
- **CrescentTwist** – 45° phase then Pauli‑Y
- **ShadowBind** – Pauli‑Y then Pauli‑Z
- **LunarEcho** – Hadamard → Pauli‑Z → Hadamard
- **SolarFlare** – −45° phase then Pauli‑X
- **VoidPulse** – Pauli‑Z followed by Hadamard
- **SpectralRay** – 60° phase rotation
- **NebulaSpin** – Pauli‑X then Pauli‑Y
- **AetherFlux** – Pauli‑Y → Hadamard → 90° phase

These functions live under `engine/modules/quantum/gates/` as free functions and are
registered with `GateRegistry`. Each gate now stores an optional description and
an optional affinity string. When a gate is registered the registry generates a
stable identifier by hashing the name. `QuantumSimulator` simply looks up the
gate by name and invokes it so additional gates can be added without modifying
the simulator itself.

## GateRegistry Architecture

`GateRegistry` is a global table that owns every available gate. Gates register
themselves on startup via `GateRegistry::Get().registerGate(g)`. The registry
stores tags so gates can be grouped into categories such as **Grimdark** or
**Mech**. AI logic or user modules may extend these groups by registering their
own gates with new tags. Each registration assigns a stable hash ID while
preserving optional metadata like descriptions and affinities.

To choose a gate from a category at random:

```cpp
if (const auto* gate =
        engine::GateRegistry::Get().selectRandomGate("Grimdark")) {
    gate->apply(qsim, 0);
}
```

It can collapse individual qubits via measurement. The simulator is entirely CPU
based and uses standard C++ complex math; it does **not** rely on external
quantum libraries.

## Usage

```cpp
#include "engine/modules/quantum/simulator/QuantumSimulator.h"
#include "engine/modules/quantum/gates/GateRegistry.h"

// create a three-qubit simulator
engine::QuantumSimulator qsim(3);
if (const auto* h = engine::GateRegistry::Get().getGate("Hadamard"))
    h->apply(qsim, 0);
int bit = qsim.measure();        // measures qubit 0
```

The returned bit provides a pseudo-random value derived from the qubit's
probabilities. Combat simulation currently multiplies attack and defense scaling
with a small bias depending on the measured bit.

---

This component is experimental and meant only as a proof of concept for quantum
calculations inside the engine.

## QuantumStateVectorSimulator

`QuantumStateVectorSimulator` extends the concept to a 36‑qubit register. When CUDA and cuQuantum are present the state vector is managed on the GPU; otherwise it falls back to an array of `QuantumSimulator` instances.

Call `initialize()`, `applyGates()` and `collapse(tOffset, mode)` to manipulate the register. `collapse()` now accepts a `CollapseMode` specifying **CPU**, **GPU** or **Mixed** operation and returns a deterministic seed weighted by the cached probabilities.

## cuQuantumCollapseSim

`cuQuantumCollapseSim` generalizes the GPU approach and allows any register size.
`initialize(deviceId, qubits)` selects the CUDA device and allocates `1 << qubits`
complex values on the GPU. When cuQuantum is unavailable the class falls back to
an array of `QuantumSimulator` instances so the entropy-weighted collapse logic
remains identical on CPU.

### Multi-GPU Instances

Pass a different `deviceId` when calling `initialize()` to run several
simulators on separate GPUs:

```cpp
engine::cuQuantumCollapseSim simA;
simA.initialize(0, 10); // GPU 0
engine::cuQuantumCollapseSim simB;
simB.initialize(1, 10); // GPU 1
```

The default device can be configured at build time via the CMake variable
`CV_CUDA_DEVICE_ID` or overridden at runtime with the `--cuda-device` argument.
Setting the `CV_GPU_DEVICE_INDEX` environment variable overrides both and pins
the simulator to a specific device. When unset the engine balances workloads
across all detected GPUs by selecting the one with the fewest active simulators.
If no GPU offers enough free memory for the requested qubits the simulator logs
a warning and falls back to CPU memory.

### Probability Cache

Both simulators maintain a probability cache for every collapse. Details on the
recorded fields and how they accumulate are documented in
[`quantum_statevector_system.md`](quantum_statevector_system.md#probability-cache-usage).

## QuantumManager

`QuantumManager` exposes a helper API for other systems to obtain a fresh simulator configured with a specific qubit count:

```cpp
#include "engine/modules/quantum/QuantumManager.h"
#include "engine/modules/quantum/gates/GateRegistry.h"

auto qsim = engine::QuantumManager::getSimulator(2); // two-qubit register
if (const auto* h = engine::GateRegistry::Get().getGate("Hadamard"))
    h->apply(*qsim, 0);
```

Each call returns an independent instance so different subsystems can experiment with varying qubit depths without interfering with one another.

## Adjustable Qubit Interface

`QuantumSimulator` and the state vector simulators accept a qubit count during construction or via `initialize()` so tests can scale from 1‑qubit toy examples up to full 36‑qubit registers. `QuantumManager::getSimulator()` forwards the requested count, returning an instance sized appropriately. This flexible interface allows scenes and gameplay experiments to request larger registers without recompiling the engine.

`QuantumStateVectorSimulator::collapse()` reinitializes the register on every call. If a qubit count is not provided the simulator defaults to at least **20** qubits to avoid low-entropy 1‑qubit collapses. Triggers may supply their own qubit counts so systems like `player_input` or procedural terrain generation can request larger registers when needed.

## Mixed-Mode Collapse

`CollapseMode::Mixed` blends CPU and GPU operations when both are available. The
probability cache is split between devices and hashed separately before the
results are combined. See the
[`QuantumStateVector` documentation](quantum_statevector_system.md#hash-algorithm)
for the full hashing process.

## Probability Cache Statistics

Statistics such as `collapseCounter` and `cumulativeEntropy` are tracked by the
state vector simulator. Refer to
[`quantum_statevector_system.md`](quantum_statevector_system.md#probability-cache-usage)
for an explanation of these metrics.

## QuantumStateVectorManager

`QuantumStateVectorManager` owns a `QuantumStateVectorSimulator` instance and manages
collapse triggers. Systems may register per-frame, per-chunk or event-based
triggers. `updatePerFrame()` processes these requests and collapses the state
vector accordingly. The last collapse result is exposed via `getEntropySeed()` so
procedural generation systems can seed their own RNG through the `Game` object.

`logStatistics()` can be called at runtime to print the total number of collapses
performed and the cumulative entropy observed so far. This aids in debugging
probability distributions across long sessions.

## ChaoticCollapseOracle

The asynchronous oracle can run in a background thread or GPU kernel. After
invoking `start()`, poll `isReady()` to verify that the simulator has been
initialized and seeds are available for promotion. The oracle's pool should only
be queried once it reports ready.
