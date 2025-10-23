# physics_core.md

The **PhysicsCore** module encapsulates all physics simulation logic for Purge of the Crescent Veil. It replaces the temporary Physics + Biology Core draft with a focused architecture that is fully modular and engine-native.

## Overview
- Manages bodies, joints, and collision shapes.
- Provides deterministic time stepping and state queries.
- Exposes debug hooks for stress metrics and body lists.
- Interfaces with `BiologyCore` for reaction events.

## Structure
```
engine/
  modules/physics_core/
    DynamicsSystem.*      # per-frame body updates
    CollisionResolver.*   # broad and narrow phase handling
    ConstraintSolver.*    # joint limits and material responses
```

Each component is isolated so alternative solvers or backends can be swapped without touching the main engine loop.

## Usage
1. Initialize PhysicsCore early in `Engine::Init`.
2. Register gameplay systems that require physics callbacks.
3. Advance simulation with `update(deltaTime)` each frame.
4. Query body state from managers like `CollisionSystem` or `DebugController`.

All implementations should remain independent from rendering and AI systems, communicating via events and shared interfaces only.
