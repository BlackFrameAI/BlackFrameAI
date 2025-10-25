# Spawn Controller (Public Summary)

The SpawnController coordinates stage-driven pacing for enemy and powerup appearances.
It mirrors the internal component layout but omits proprietary spawn tables and tuning heuristics.

## Responsibilities
- Maintain references to the internal enemy and reward spawners. `[REDACTED]`
- Accept interval updates from stage flow controllers so difficulty scales with progression.
- Expose hooks for external systems to request pacing adjustments without revealing formulas. `[REDACTED]`

## Integration
Stage orchestration code creates one SpawnController per active stage and forwards timing updates.
Consult internal documentation for entropy coupling, spawn probability curves, and boss overrides. `[REDACTED]`
