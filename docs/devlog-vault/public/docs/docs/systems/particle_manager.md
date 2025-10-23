# particle_manager.md

The **ParticleManager** system handles short-lived FX like explosions, damage flashes, and powerup collections. It spawns `ParticleEffect` instances that animate using `ProceduralSprite` frames and removes them once their lifetime expires. Rendering occurs through the `RenderSystem` using batched primitives defined in shared effect assets.

See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for current modularization status.
