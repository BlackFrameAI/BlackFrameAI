# Spawn Controller (Public Summary)

The Spawn Controller coordinates high-level spawn pacing for enemies, allies, and interactive objects within a stage. It serves
as a façade over the internal spawning subsystems so designers can request broad difficulty or density adjustments without
exposing proprietary heuristics.

## Responsibilities
- Accept stage pacing signals and translate them into abstract spawn directives.
- Forward directives to the underlying spawn systems through sanitized interfaces.
- Report lightweight telemetry (spawn categories, frequency bands) for UI overlays.

All timing curves, scaling rules, and encounter scripts remain private to the production build.
