# projectile_manager.md

The **ProjectileManager** system spawns and updates active projectiles. Each projectile holds a ProceduralSpriteInstance that animates automatically. Rendering uses RenderSystem's batched calls to draw visible projectiles.

See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for current modularization status.
