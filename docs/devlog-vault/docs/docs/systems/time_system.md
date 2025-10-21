# time_system.md

The **TimeSystem** keeps track of frame timing for the engine.
**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.


---

## Purpose

- Record the delta time between frames.
- Accumulate total elapsed time since initialization.

## Engine Integration

`Engine` constructs a `TimeSystem` during initialization and updates it once per
frame using the delta reported by `FrameTimer` (`engine/modules/time/system/FrameTimer.h`). Other subsystems receive this
same delta through their `update` calls and may also query the `TimeSystem` for
`getDeltaTime()` or `getTotalTime()` when they need the latest values.

## Frame Limiter

`FrameLimiter` clamps the maximum FPS by sleeping when a frame finishes faster
than the target duration. The engine creates one during initialization and sets
the limit to 60 FPS. Set the limit to `0` to disable the cap entirely.
