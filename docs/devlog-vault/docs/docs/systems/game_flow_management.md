# game_flow_management.md

The **game flow management stack** coordinates high level state transitions. These modules live under `game/core/flow/`.

## Components
- **GameManager** – primary facade controlling scene transitions and delegating to other flow modules.
- **SceneCoordinator** – wraps `SceneManager` to handle transitions and per-frame updates.
- **PhaseController** – thin wrapper exposing `GamePhaseManager` APIs.
- **GamePhaseManager** – tracks the current `GameState` such as `MainMenu`, `Playing` or `GameOver`.
- **SaveLoadCoordinator** – centralizes save system access, collects manager state
  for serialization and stores pending profile info.

Together they drive the engine from startup to shutdown. `GameManager::SetState` triggers scene transitions and updates the active phase. Loading and saving pass through `SaveLoadCoordinator`.

See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for status tracking of these systems.
