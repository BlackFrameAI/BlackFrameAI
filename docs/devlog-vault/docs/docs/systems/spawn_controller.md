# spawn_controller.md

The **SpawnController** system coordinates automatic spawning of enemies and powerups during a stage. It owns an `EnemySpawner` (found under `game/modules/enemy/spawner/`) and `PowerupManager` instance and simply forwards timing updates.

- `SetEnemySpawnInterval` adjusts the interval on the underlying `EnemySpawner` so difficulty scales with stage progression.
- `SetPowerupInterval` sets how often powerups appear.
- `Update` advances both timers and spawns powerups when their interval elapses.

`StageManager` creates one SpawnController and updates it each frame.

See [docs/gameplay_systems.md](../gameplay_systems.md) for how the stage system integrates this controller.
