# procedural_ui.md

`engine/modules/procedural/ui/ProceduralUI.h` defines helpers for building widgets from simple shapes.
Each `ProceduralUISprite` stores per-state tints, width/height bounds and one or more draw callbacks.
Sprites may also hold optional `onClick`, `onHoverEnter` and `onHoverExit` functions triggered by `ProceduralUIInputSystem` when interaction states change.

Functions like `createButtonSprite`, `createTextBoxSprite`, `createInventorySlotSprite` and the various bar helpers construct shapes entirely with `drawRectScreenVGU` and `drawLineVGU` calls.

These sprites power the legacy HUD overlays until the new UI modules replace them.

## ProceduralUIGenerator

`engine/modules/procedural/ui/ProceduralUIGenerator.h` listens for `StencilDescriptor` messages
from `StencilGuideSystem`. The generator queries `ThemeManager` to resolve the
active frame style, font hints and tint colors using `ThemeMaterialResolver`.
For each descriptor it constructs a `ProceduralUISprite` matching the stencil
type. Descriptors may specify `width` and `height` fields and can include
callback functions that are copied to the resulting sprite. If the dimensions
are zero the generator uses `size * 8` for both axes. Currently `UI_Button`,
`UI_TextField` and `UI_Frame` descriptors are supported. Generated sprites are
queued and may be retrieved via `pollSprite()` or delivered through a callback
so overlays can build widgets on demand.

The generator registers itself with `StencilGuideSystem` using
`registerDescriptorCallback`, which returns a handle that can later be passed to
`unregisterDescriptorCallback`. This allows runtime UI components to be spawned
from theme-aware stencil data and properly cleaned up when the generator is
destroyed.

### Theme influence

`ProceduralUIGenerator::handleDescriptor` now reads `FrameStyle` and
`FontStyle` from `ThemeManager`. `FrameStyle` alters the border shapes of
generated sprites (e.g. spiked edges for `BoneSpiked` or bright lines for
`NeonTube`) while `FontStyle` adjusts label scaling. Switching the active theme
causes newly generated sprites to adopt the new style parameters automatically.

## UIShapeRegistry

`UIShapeRegistry` stores reusable generators that build `SDFPath` objects for
widgets rendered with `drawSpriteSDF`. The registry provides helpers for
rounded rectangles, bordered frames, pill toggles and sliders, chevron arrows
and progress bar fills. `ProceduralUIGenerator` initializes this registry via
`registerDefaultUIShapes` so layouts can request shapes by id instead of
duplicating path logic.


### Using UIShapeRegistry
The registry is typically populated with `registerDefaultUIShapes` when a scene loads. Shapes can then be generated on demand and fed to `ProceduralSDFGenerator`.

```cpp
cv::UIShapeRegistry registry;
cv::registerDefaultUIShapes(registry);

cv::SDFPath knob;
registry.generateShape("pill_knob", knob, 6.f, 6.f);
GLuint tex = sdfGen.generate(render, knob, 32);
render.drawSpriteSDF(tex, x, y, 12.f, 12.f, stroke, fill0, fill1);
```

This mechanism keeps widget geometry consistent across the HUD and other overlays without duplicating path logic.
