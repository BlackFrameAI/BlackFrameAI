# Stage Progression (Public Summary)

StageProgression tracks the player’s advance through the current stage and emits checkpoints when
internal timers elapse. Proprietary pacing curves and adaptive modifiers have been removed. `[REDACTED]`

## Public Behavior
- Maintain the current stage index and elapsed time.
- Reset timers when the configured duration completes.
- Notify StageManager so other systems can react to stage transitions.

Consult private docs for entropy scaling rules, adaptive difficulty hooks, and boss gate scheduling. `[REDACTED]`
