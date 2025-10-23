# enemy_spawner.md

The **Enemy Spawner** creates combatants on a schedule during a stage. It cooperates with the stage manager and spawn
controllers to feed new units into the Enemy Manager without exposing internal spawn rules.

- `SetSpawnInterval` configures how often new enemies are requested.
- `SetEnemyTypes` limits random selection to the provided, publicly documented archetypes.
- `Update` advances timers and invokes `SpawnEnemy` when the schedule permits.

Spawned enemies receive sanitized defaults and are registered with the Enemy Manager for AI coordination and rendering. Keep
sensitive spawn logic inside data files that are excluded from public builds.

See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for current module status.
