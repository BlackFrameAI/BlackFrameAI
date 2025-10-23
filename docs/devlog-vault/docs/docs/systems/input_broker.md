# input_broker.md

`InputBroker` lives under `engine/modules/input/` and handles raw GLFW callbacks.

## Responsibilities
- Capture keyboard, mouse and gamepad events.
- Store per-window input state for polling by `InputManager`.
- Detect device connect and disconnect events.
- Forward events to Dear ImGui when the overlay is active.

`InputManager` relies on `InputBroker` each frame to update its caches.
See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for status.
