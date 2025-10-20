# battlefield_training.md

This document describes the **Adaptive Battlefield Training** system. The trainer generates combat scenarios for off-stage skirmishes using doctrine templates.
**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.


## Overview
- Doctrine templates are defined in JSON under `game/assets/doctrines/`.
- Each template specifies terrain, weather and difficulty values.
- The `AdaptiveTrainer` loads these templates on startup.
- Players pick a doctrine at the beginning of a run.
- During gameplay the trainer adjusts difficulty scaling and creates a `CombatScenario` each time training is triggered.

## Doctrine JSON Fields
- `name` – display name of the doctrine.
- `terrain` – `Plain`, `Forest`, `Mountain` or `Urban`.
- `weather` – `Clear`, `Rain`, `Snow` or `Fog`.
- `difficultyScale` – base multiplier for unit stats.
- `randomness` – variance applied to attack and defense.
- `difficultyCurve` – optional list of round multipliers.

Designers can create additional doctrine files following `balanced.json` as an example.
