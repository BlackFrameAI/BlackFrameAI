# enemy_spawner.md

The **EnemySpawner** system is responsible for creating enemies at set intervals during a stage. It operates under the StageManager through SpawnController and feeds spawned enemies into EnemyManager.

- `SetSpawnInterval` defines how often new enemies appear.
- `SetEnemyTypes` restricts random selection to provided enemy types.
- `Update` advances the internal timer and invokes `SpawnEnemy` when ready.

Spawned enemies default to simple parameters and are registered with EnemyManager for AI control and rendering.

See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for current modularization status.
