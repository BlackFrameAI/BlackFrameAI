# enemy_manager.md

The **EnemyManager** keeps track of all active enemy instances during gameplay. It owns the core list of `Enemy` objects and orchestrates AI updates.

## Responsibilities
- Maintain a collection of enemies spawned by `EnemySpawner`.
- Delegate behavior updates to `EnemyAIController` every frame.
- Remove defeated enemies and dispatch `kEnemyDefeatedEvent` for achievements.
- Provide lookup helpers for collision and targeting systems.

See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest module status.
