# entropy_system.md

The entropy system centralizes non-deterministic bit generation for both CPU and GPU logic while isolating deterministic test hooks behind compile-time switches.

## Purpose of Real-World Entropy

Procedural gameplay and secure seeding rely on randomness that cannot be reproduced by deterministic algorithms alone. The engine polls multiple unpredictable signals to supply high-quality bits for physics simulations, networking, and quantum experiments.

## Entropy Sources and Mixing Strategy

`EntropyManager` registers pluggable `IEntropySource` implementations drawn from hardware, system timing, player interaction, and simulation feedback. Raw byte streams are normalized and combined into an `EntropyPool` that maintains a bounded cache of recent data. When consumption outpaces collection, the pool reseeds from approved fallback channels and emits diagnostics so operators can audit entropy health.

### Scheduling Policy

Sources are polled in a weighted rotation so slow producers still contribute without starving hardware-backed entropy. Weight configuration lives in external tuning data; proprietary weighting formulas are **[REDACTED]**.

## API Usage

Clients request bytes through `EntropyManager::requestBits()` or equivalent platform helpers. Higher-level systems should seed their own PRNGs from this API rather than touching platform devices directly. Implementation specifics for CUDA synchronization and mirrored buffers are **[REDACTED]** but follow standard double-buffer patterns.

## Test and Production Modes

- **Test builds** expose helpers to register mock sources and clear the pool so deterministic harnesses can exercise entropy-dependent systems safely.
- **Production builds** automatically ignore any source flagged as deterministic and log warnings when restricted inputs are detected.

The subsystem runs continuously once initialized and integrates with the monitoring layer to surface collection gaps, saturation events, and fallback usage at a high level without revealing proprietary thresholds.
