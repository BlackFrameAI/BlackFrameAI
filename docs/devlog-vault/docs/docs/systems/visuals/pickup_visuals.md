# pickup_visuals.md

Procedural sprites describing powerups and interactive objects.

## PickupVisuals Helpers
- `createHealthOrbSprite()` – spinning green orb with a white cross.
- `createAmmoCellSprite()` – bouncing blue ammo pack.
- `createDamageBuffSprite()` – pulsing red star.
- `createDefenseBuffSprite()` – pulsing blue star.
- `createChestSprite()` – locked chest that bounces slightly.
- `createTerminalSprite()` – terminal with a flickering green screen.
- `createRadialPulseFX()` – expanding pulse used when collecting items.

Each helper builds a `cv::ProceduralSprite` from circles, rectangles and lines. Multiple frames provide simple spin, pulse or bounce animations. These sprites replace the earlier placeholder shapes used for powerups and stage props.
PowerupManager stores a `ProceduralSpriteInstance` for each active powerup so these animations advance automatically. `ProceduralSpriteInstance` now exposes `setTintColor()` which updates `SpriteParams.tintColor` at runtime. Use this to recolor pickups without rebuilding the sprite frames.
