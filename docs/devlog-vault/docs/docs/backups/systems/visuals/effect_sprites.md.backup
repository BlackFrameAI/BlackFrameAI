# effect_sprites.md

Short reference for procedural effect helpers found in `game/modules/graphics/EffectSprites.h`.

- `createSlashTrailSprite()` – trailing line segments used for melee swings.
- `createExplosionPuffSprite()` – simple circular puff.
- `createShieldBubbleSprite()` – expanding protective bubble.
- `createLaserBeamSprite()` – short-lived beam line.
- `createChargeSprite()` – shrinking glow used for charge up.
- `createDamageFlash()` – red square flash when taking damage.
- `createWeaponFlash()` – quick muzzle or weapon flash.
- `createExplosionFX()` – burst of lines for enemy destruction.
- `createRadialPulseFX()` – radial pulse when picking up items.
- `createShieldEffectSprite()` – simple circular hit or shield spark.
- `createPowerupCollectedSprite()` – yellow pulse when picking up powerups.
- `createEnemyDeathSprite()` – red burst shown on enemy defeat.
- `createPowerupExpireSprite()` – gray puff when a powerup fades.

## Animation Note

Most effect sprites use transient `ProceduralSpriteInstance`s and must call `.update(dt)` before rendering. Otherwise, they will freeze on frame 0 and fail to animate.
