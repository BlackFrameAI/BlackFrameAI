# opfor_training.md

This document describes the **Opposed Force Training** system used in the training module.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.

## Overview
- Tracks elapsed training time and generates a scaling factor.
- Uses the active combat difficulty curve to ramp attack and defense.
- Integrates with `EnemyManager` so spawned enemies inherit scaled stats.
- Lua scripts may override scaling by defining `opfor_scale(time)`.

`OpposedForceTrainer` can also apply scaling to an entire `Army` when running the `CombatSimulator` for automated battles.
