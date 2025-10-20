# stage_progression.md

The **Stage Progression** system handles the basic timer-driven advance through the current stage.
It tracks the active stage number, the duration of each stage and exposes a simple `Update` method
that increments an internal timer. When the timer reaches the configured duration the stage number
is increased and the timer resets.

StageProgression does not spawn enemies or trigger events itself. `StageManager` owns an instance
and queries `Update` each frame. Other managers listen for stage changes through
`StageEventDispatcher` callbacks.

See [docs/gameplay_systems.md](../gameplay_systems.md) for how StageManager integrates these helpers.
