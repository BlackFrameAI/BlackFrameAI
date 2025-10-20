# game_ui_manager.md

**Deprecated:** The **GameUIManager** is the legacy overlay loader and renderer. It exists only so older HUD elements continue working while new modular UI systems are introduced. The component was archived with the removal of the old UI/render system.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.

## Layout Loading

`GameHUD::loadLayout(name)` reads `game/assets/ui_layouts/<name>.json` at runtime. For each overlay entry the JSON file provides `x` and `y` offsets and an optional `anchor` string. Anchors map to `OverlayAnchor` enums in the `RenderSystem` so elements may be positioned relative to the screen corners or center. Missing or malformed entries trigger warnings and fallback to built‑in default positions.

All offsets in the layout file are specified in **Virtual Grid Units** on a
1000×1000 grid. `GameUIManager` passes these positions directly to
`RenderSystem` without any scaling by the view size. Anchor calculations and
layout JSON coordinates are interpreted purely in VGU space. Utility
helpers such as `applyAnchorX` and `applyAnchorY` now expect the
view dimensions in VGU (typically obtained from `RenderSystem::getViewSizeVGU`)
so overlays behave consistently at any resolution. The newer
`AlignmentHelpers` set – including `anchorTopLeftVGU`, `anchorTopRightVGU`,
`anchorBottomLeftVGU` and `anchorBottomRightVGU` – offers similar behavior
without requiring manual anchor enums.

## Rendering Flow

`RenderUI()` is called once per frame. It checks if the game is over and logs that transition. Each active overlay draws through the `RenderSystem`'s batched primitives, ensuring UI elements share the same rendering pipeline as the rest of the game.
