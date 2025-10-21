# collision_system.md

The **CollisionSystem** handles hit detection between projectiles, enemies and breakable environment objects. It lives under `game/collision/CollisionSystem.*` and is owned by the game layer.

- `Update` checks for overlaps and applies damage, removing projectiles when a hit occurs.
- `AddDestructible` and `AddHazard` register objects that can be destroyed or that deal area damage.
- `Render` draws destructibles and hazards for debugging purposes.

See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for current modularization status.
