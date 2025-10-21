# ui_core.md

This document defines the **core in-run UI systems** for *Purge of the Crescent Veil*.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.


The older `GameUIManager` overlay loader is legacy and **deprecated** following the archival of the original UI/render system. See [game_ui_manager.md](game_ui_manager.md) for a summary of its layout handling and rendering flow.

UI subsystems such as `UIManager`, `UIOverlayManager`, `UISystem`, `GameHUD` and all overlay classes have been moved to `archive/ui_legacy/`.

New layering splits responsibilities into three parts:

- **UIOverlayManager** – toggles and updates overlay objects through `RenderSystem`.
- **UIInputLayer** – owns `ButtonElement` instances and relays user input from `InputManager`.
- **ProceduralUIInputSystem** – tracks `ProceduralUISprite` bounds and triggers onHover/onClick callbacks.
- **GameHUD** – wraps the legacy `GameUIManager` to keep HUD drawing functional during the transition.

These layers coexist with the remaining legacy code until all HUD features are migrated.
---

## Core HUD Elements

- Alignment display (Faith/Corruption bar)
- HP/resource display
- Active abilities display
- Stage progress indicator
- Status effects
- Kill counters
- XP/progression bar
- Boss health bars (as needed)
- Combat event notifications
- Unlocked achievements list

---

## Planned Features

- Alignment bar dynamically reflects player alignment shifts.
- Combat feedback should include screen-space and audio cues.
- Event notifications should be context-aware and non-intrusive.
- All overlays now render through `ProceduralUISprite` definitions so HUD elements animate via `ProceduralSpriteInstance`.

## UI Layout Files

Layout files live under `game/assets/ui_layouts/` and use JSON syntax. Each entry
specifies an overlay name along with `x` and `y` offsets. An optional `anchor`
field defines which corner the offsets are measured from (`top_left`,
`top_right`, `bottom_left`, `bottom_right`, `center`,
`top_center`, `bottom_center`, `center_left`, `center_right`). Example:

```json
{
}
```


Additional overlays such as `AchievementsOverlay` can be placed using the same
format:

```json
{
  "AchievementsOverlay": {"x": 5, "y": 115}
}
```

`GameHUD::loadLayout(name)` loads `game/assets/ui_layouts/<name>.json` at
runtime and applies the configured positions to the active overlays.

### Creating and Selecting Layout Files

1. Copy `game/assets/ui_layouts/default.json` to a new file as a starting template.
2. Edit the `x` and `y` values for each overlay to define your preferred screen
   positions.
3. Save the file with a unique name under `game/assets/ui_layouts/`.
4. In the game, call `GameHUD::loadLayout("<name>")` or set the layout in
   configuration to apply it.
5. The method assigns the coordinates at runtime, overriding any previous
   positions.

The default layout is currently empty to simplify profiling:

```json
{
}
```

A more complete example layout is provided in
`game/assets/ui_layouts/alt_default.json`. Load it at runtime with
`GameHUD::loadLayout("alt_default")` to preview an alternative HUD
arrangement. The coordinates defined in this example are already expressed
in Virtual Grid Units (VGU) so they map directly onto the 1000×1000
logical grid.

If the requested layout file cannot be loaded or contains invalid JSON,
`GameHUD` logs a warning and falls back to these built-in
coordinates. When a layout **is** valid but omits any required overlay,
`GameHUD::loadLayout` issues a warning naming the missing overlay
and applies the corresponding built-in position so the HUD remains
usable.

All overlay coordinates are specified in **Virtual Grid Units** using a
1000×1000 grid. `GameHUD` forwards these positions directly to
`RenderSystem`, so no resolution scaling or adjustment occurs. Layout
files describe offsets purely in VGU space and anchors are resolved
against the same grid.


### ButtonElement

`UIInputLayer` manages a collection of `ButtonElement` instances. Each button
renders its label through a text `ProceduralSpriteInstance` created with
`createTextSprite`. `UIInputLayer` updates and draws this instance every frame so
hover or press states can tint or scale the text. Mouse hover and clicks are
checked via `InputManager` and the callback is invoked when pressed.
ProceduralUIInputSystem mirrors this logic for generic `ProceduralUISprite` objects so overlays can react to hover and click states.

### Overlay Modules

The engine previously provided a set of overlay classes used by `RenderSystem`
and `UIOverlayManager`. **These legacy overlays have been removed from the
engine.** The startup disclaimer scene was removed entirely so the game jumps
directly to the main menu.
The following list tracks the archived overlays for historical reference:

- **LogOverlay** – shows recent log lines for debugging.
- **ScoreOverlay** – displays the player's score and remaining lives.
- **PlayerPositionOverlay** – prints the player's coordinates each frame.
- **PlayerStatusOverlay** – renders health, shields and active powerups.
- **StageProgressOverlay** – indicates current stage progress.
- **StageDetailOverlay** – details active stage modifiers and objectives.
- **NoticeOverlay** – temporary on-screen notifications.
- **AlignmentOverlay** – faith/corruption alignment bar.
- **ReputationOverlay** – faction reputation levels.
- **SaveSlotOverlay** – lists save slots when saving/loading.
- **AchievementsOverlay** – unlocked achievements list.
- **SystemInfoOverlay** – frame timing and system information.
- **RenderDebugOverlay** – visualizes render batches for debugging.
- **AudioEventOverlay** – recent audio events for mixing analysis.
- **GridOverlay** and **AnchorDebugOverlay** – optional debug helpers.

## Render/UI Reconstruction

The new architecture centralizes overlay drawing in **OverlayRenderer**. `UIOverlayManager` registers per-overlay draw callbacks that emit `Renderer2D` commands. After the world scene is flushed, `OverlayRenderer` submits these batches through the active `RenderBackend`, keeping UI code modular and backend agnostic.
