# stage_manager.md

The **StageManager** orchestrates active stage progression. It owns a
`StageProgression` timer and a `SpawnController` for managing enemy and
powerup spawning difficulty. Decorations and parallax layers are also
handled here to keep the environment in sync with the current stage.

## Responsibilities

- Advance the stage timer and select a stage definition.
- Adjust spawn intervals for enemies and powerups through `SpawnController`.
- Expose callbacks for wave, boss and altar events via `StageEventDispatcher`.
- Update decoration sprites and parallax backgrounds.
- Render parallax layers and decorations before any characters or entities so
  the RenderSystem's default 2D state is bound. `Game::Render` invokes
  `StageManager::Render` first for this reason.

### Event callbacks

`StageManager` uses `StageEventDispatcher` to notify other systems.
Callbacks can be registered for three cases:

- **StageStartCallback** – invoked when a stage begins with the stage number,
  definition name, lore, faction control and alignment value.
- **EventCallback** – receives `StageEventDispatcher::Event` values such as
  `WaveComplete`, `BossPhaseComplete`, `AltarInteraction`, `NarrativeEvent` and
  `ShopInteraction`.
- **QuestCallback** – triggered when a quest ID should begin.

### Example

```cpp
using namespace game;
StageManager mgr(&spawner, &powerups);

mgr.SetStageStartCallback([](int stage, const std::string& name,
                             const std::string& lore,
                             const std::string& faction,
                             float alignment) {
    // update HUD with new stage info
});

mgr.SetEventCallback([](StageEventDispatcher::Event e) {
    if (e == StageEventDispatcher::Event::WaveComplete) {
        // spawn reward chest
    }
});
```

See `StageEventDispatcher.h` for callback definitions and `SpawnController` for
spawn timing details. The current modularization status is tracked in
[game_system_tree.md](../modular/game_system_tree.md).
