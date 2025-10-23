# fx_helpers.md

The **FXHelpers** header provides shorthand functions to trigger particle effects.

- `spawnExplosionFX(manager, x, y)` spawns `ParticleType::ExplosionFX` for about 0.5 seconds. Use when enemies or objects explode.
- `spawnDamageFlash(manager, x, y)` spawns `ParticleType::DamageFlash` for a brief 0.1 second hit flash.

These helpers route through `ParticleManager::SpawnParticleEffect` so collision and powerup code can stay concise.

See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for modularization status.
