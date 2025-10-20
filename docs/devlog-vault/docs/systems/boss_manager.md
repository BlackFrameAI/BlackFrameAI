# boss_manager.md

The **BossManager** spawns and tracks boss encounters during a stage. When a boss is added with `SpawnBoss` it receives the current `AlignmentManager` reference so health and damage scale appropriately.

- Intro lines are printed once when the boss first updates.
- Bosses report defeat through `isDefeated()` and are removed automatically.
- `BossManager` notifies `StageManager` via `NotifyBossPhaseComplete` whenever a boss is defeated so the next phase can begin.

See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the current modularization status.
