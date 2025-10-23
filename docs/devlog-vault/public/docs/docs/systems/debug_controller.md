# debug_controller.md

The **Debug Controller** manages developer-oriented diagnostics while the game is running. It listens for tool shortcuts routed
through the input service and exposes high-level toggles for visual overlays, logging, and profiling utilities. Runtime actions
include enabling and disabling debug layers, switching between telemetry dashboards, and pausing non-critical helpers so that
devs can inspect a scene safely.

## Integration Notes

- Keep shortcut bindings in configuration files so they can be remapped per build.
- Only register diagnostics that are safe for public or test environments; guard any internal tools behind compile-time flags.
- Surface clear on-screen indicators whenever a debug overlay or logging channel is active.
- Provide a quick way to reset all diagnostics to their default state before resuming normal play.

See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for current module status.
