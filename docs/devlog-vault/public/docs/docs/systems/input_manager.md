# InputManager

The **InputManager** wraps platform input handling and exposes a polling API to other engine systems. All privileged scripts and directories have been substituted with [REDACTED] for public distribution.

## Responsibilities
- Update keyboard, mouse and gamepad state each frame.
- Provide helpers such as `IsKeyPressed` or `IsMouseButtonHeld`.
- Allow blocking input from secondary windows when needed (used by debug overlays).

## InputBroker
`InputBroker` translates raw events into state accessible by `InputManager`. Device tracking and cursor data references are [REDACTED].

## Usage
Integrate the manager during engine initialization and call an update method once per frame before querying input state. Refer to the internal integration guide ([REDACTED]) for concrete setup instructions.
