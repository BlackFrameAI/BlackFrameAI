# enemy_visuals.md

Procedural enemy sprites assembled in `game/modules/graphics/EnemyVisuals.h`.

## EnemyVisuals Helpers
- `createBaseEnemyVisual(EnemyType type)` – builds a multi-frame sprite for the
  given enemy type. Eyes are small circles and a glow aura pulsates using the
  frame time. Additional idle frames offset the enemy's position and rotation
  with `p.time` so enemies subtly hover when stationary.
- Legacy helpers `createLightEnemySprite()`, `createMediumEnemySprite()` and
  `createHeavyEnemySprite()` remain for tests and simple effects.

Threat level influences the render scale and tint in `EnemyManager`.
Each `Enemy` now contains a `ProceduralSpriteInstance` so animations advance
independently during `EnemyManager::Update`.

## Default Assignment

`EnemyManager` registers sprites from `createBaseEnemyVisual()` during game
startup. Enemies spawned without a custom sprite automatically animate using the
visual for their `EnemyType`.
