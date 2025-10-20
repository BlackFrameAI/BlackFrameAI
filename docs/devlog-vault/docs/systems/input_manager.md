# InputManager

The **InputManager** wraps GLFW input handling and exposes a simple polling API to other engine systems. It delegates all platform specific work to `InputBroker`, which registers callbacks for every active window.

## Responsibilities
- Update keyboard, mouse and gamepad state each frame.
- Provide helpers such as `IsKeyPressed` or `IsMouseButtonHeld`.
- Allow blocking input from secondary windows when needed (used by debug overlays).

## InputBroker
`InputBroker` lives under `engine/modules/input/` and translates raw GLFW events into state accessible by `InputManager`. It also tracks gamepad connections and mouse position/scroll data.

## Usage
Create the broker and manager during engine initialization:
```cpp
engine::InputBroker broker;
broker.Initialize(mainWindow);
engine::InputManager input(&broker);
```
Call `input.Update()` once per frame before querying input state.
