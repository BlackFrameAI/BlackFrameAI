# physics_system.md

The legacy **PhysicsSystem** wrapped Box2D's C API for world simulation. It has
been superseded by the native `PhysicsCore` module. This document is preserved
for historical reference only—Box2D is not required to build or run the engine.

- `initialize()` creates the world with default gravity.
- `addBody()` spawns a body and returns its id.
- `update(deltaTime)` advances the simulation.
- `removeBody()` destroys a body.
- `shutdown()` releases all resources.

See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for status.
