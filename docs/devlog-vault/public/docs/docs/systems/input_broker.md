# input_broker.md

`InputBroker` captures platform input events and translates them into the format required by the engine's input layer.

## Responsibilities
- Capture keyboard, mouse and gamepad events.
- Maintain per-window input state for downstream polling.
- Detect device connect and disconnect events.
- Forward events to Dear ImGui when the overlay is active.

`InputManager` relies on `InputBroker` each frame to update its caches. Implementation details that reference internal scripts or paths have been replaced with [REDACTED].
