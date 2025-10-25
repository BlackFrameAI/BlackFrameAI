# hybrid_gated_collapse_simulator.md

The **HybridGatedCollapseSimulator** orchestrates gate-driven quantum collapses.
It operates with `QuantumSimulator`, `QuantumStateVectorSimulator` or
`CudaStateVectorSimulator` backends.

- Seeds are generated only when a gate is opened and closed.
- Entropy is pulled exclusively from `EntropyManager` and mixed into the
  probability state before hashing.
- `openGate()` begins a safe window. `closeGate()` collapses the register and
  optionally stores the resulting seed in a named bucket.
- Tests may inject a deterministic override with `setOverrideSeed()` so the
  results remain stable under automation.
- Watchdog resets must be requested through `requestWatchdogReset()`; direct
  calls to `resetWatchdog()` are restricted to internal use.

Location: `engine/modules/quantum/collapse/HybridGatedCollapseSimulator.*`
