# procedural_ui_input_system.md

`engine/ui/ProceduralUIInputSystem.*` tracks interactive `ProceduralUISprite` instances and updates their hover and click state.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.

---

## Overview

- Each sprite registers with the system by providing a pointer to its bounds (`x`, `y`, `width`, `height`) in **Virtual Grid Units (VGU)**.
- `update()` retrieves the mouse position from `InputManager`, converts the values to VGU using `RenderSystem::pixelsToVGU_X/Y` and determines whether it lies within the sprite bounds.
- The sprite's `hovered` and `pressed` members are updated accordingly.
- If a click or hover state changes and the sprite defines callbacks (`onClick`, `onHoverEnter`, `onHoverExit`), they are executed immediately.

```cpp
cv::ProceduralUISprite sprite = createButtonSprite();
float x = 100.f, y = 50.f;
auto* handle = uiInput.registerSprite(&sprite, &x, &y);
```

Call `unregisterSprite` when the sprite is destroyed or should no longer receive input.

## Sprite Bounds

`ProceduralUISprite` stores `width` and `height` so the input system can compute bounds for hit detection. These sizes are set by the creator (for example `createButtonSprite`). If the values are zero the sprite is considered non-interactive.

## Hover and Click Management

During each frame `update()`:

1. Fetches mouse coordinates and button states from `InputManager`.
2. Tests each registered sprite for intersection with the cursor.
3. Sets `sprite->hovered` and `sprite->pressed`.
4. Invokes callbacks when hover begins, ends or a click occurs.

Sprites may visually react by changing tint or scale in their own update methods.

## Callback Usage

Callbacks allow overlays to react to user input without polling. Typical usage attaches lambda functions to the sprite:

```cpp
sprite.onClick = []{ openMenu(); };
sprite.onHoverEnter = []{ playHighlightSound(); };
```

`ProceduralUIInputSystem` keeps a small handle for each sprite so the overlay can store positions externally while the system processes interactions.
