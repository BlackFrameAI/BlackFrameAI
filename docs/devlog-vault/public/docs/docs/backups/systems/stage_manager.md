# Stage Manager (Public Summary)

StageManager supervises active stage flow, coordinating timers, spawners, and environmental cues.
Detailed encounter scripting and spawn choreography remain internal to protect proprietary balancing logic.

## Key Duties
- Advance the stage timeline and resolve the current definition based on progression inputs.
- Relay pacing directives to SpawnController and other subsystems while hiding interval math. `[REDACTED]`
- Broadcast high-level stage events for UI, quest, and narrative listeners.
- Maintain ambiance layers (decor, parallax, audio cues) without exposing internal asset bindings. `[REDACTED]`

## Callback Overview
Callbacks notify subscribers when a stage starts, key events occur, or quests begin.
Payload schemas are unchanged, but event emission thresholds and sequencing logic are withheld. `[REDACTED]`

For complete flowcharts, refer to the private development vault. `[REDACTED]`
