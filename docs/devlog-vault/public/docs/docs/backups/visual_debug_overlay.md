# visual_debug_overlay.md

The `DebugOverlayComponent` draws colored bounding boxes around entities for
troubleshooting. Add the component to your scene graph and attach it to the
active window's `RenderSystem`.

```cpp
class MyScene : public engine::IScene {
    cv::DebugOverlayComponent overlay;
    void OnEnter() override {
        overlay.attach(renderSystem); // renderSystem is the scene's pipeline
        overlay.setEnabled(true);
    }
};
```

Call `overlay.drawBox(label, x, y, w, h, layer)` to mark areas. Coordinates are
specified in **Virtual Grid Units (VGU)** and layers provide consistent colors
for UI, enemies, the player and FX elements. Because the component lives inside
the scene graph, it automatically uses the current window's `RenderSystem` and
is removed when the scene unloads.

The component tracks how many boxes draw each frame. Every 60 frames it prints a
summary to the console showing counts per label and the number of skipped draws
(calls ignored because bounds were zero or the overlay was disabled).

## Render Debug Overlay

`RenderDebugOverlay` displays the draw order and sprite counts per layer and
highlights sprites rendered outside the active camera bounds. The overlay now
prints each sprite's name and `source` next to the red box so the
responsible system is clear. Toggle it at
runtime with the **L** key when a development build is running.
When the overlay is hidden, sprite counts can still be recorded to
`runtime.log` every 60 frames by enabling verbose logging and toggling
sprite count logging with the **I** key.

`GridOverlay` draws a simple spacing grid in screen coordinates to help align
HUD elements. Toggle it with the **G** key when debugging layouts. Scenes may
enable the grid by default through per-scene settings instead of a command line
flag. The same toggle controls grid rendering in `DebugWindow0` and `Scene0`.

Scenes can also render a 10×10 VGU grid for world alignment with
`m_render->drawVGUIDebugGrid()`. A small 1x1 VGU reference square is labeled in
the corner for scale. The grid is now included in release builds by default
(`CV_ENABLE_VGU_GRID` is enabled) so no runtime flag is required.

## Debug Window Projection

`RenderSystem::renderDebugWindow` opens a secondary context for overlay text. It
updates the projection matrices so the X axis increases left to right and binds
the default UI state before any draws. Failing to bind these matrices will
mirror glyphs horizontally.

Each debug window initializes with the `RenderSystem` bound to its own display.
This keeps overlay rendering isolated per window so multi-display setups do not
share overlay state.

## Frame Sequence and Context Restoration

Additional windows follow the same frame lifecycle as the main display:

1. `RenderSystem::beginFrame()` binds the window's context and starts an ImGui pass.
2. The window's draw callback emits overlay content.
3. `RenderSystem::endFrame()` flushes geometry, ends the ImGui pass, and clears the last bound context.
4. `RenderSystem::renderDebugWindow` restores the previously active GLFW context so other windows continue unaffected.

Each `beginFrame` must be paired with an `endFrame`; otherwise `m_inImGuiPass` remains set and `s_lastBoundContext` retains the window pointer, producing warnings on subsequent frames.
