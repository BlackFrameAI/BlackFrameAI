# Stage Progression (Public Summary)

Stage Progression exposes a high-level state machine that advances the current stage after internal timers and completion
requirements are satisfied. Only the surface-level state (stage index, label, presentation hooks) is provided here; the
underlying pacing models, escalation triggers, and fail-safe logic remain confidential.

## External Interface
- Query the current stage identifier and presentation metadata.
- Subscribe to sanitized notifications when a stage transition begins or ends.
- Reset the progression loop for testing or narrative rewinds.

Internally, Stage Progression collaborates with the Stage Manager and Spawn Controller, but the exchange format deliberately
hides tuning constants and encounter scripts.
