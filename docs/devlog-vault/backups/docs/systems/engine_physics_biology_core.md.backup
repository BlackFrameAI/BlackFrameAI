# engine_physics_biology_core.md

The **PhysicsCore** and **BiologyCore** modules work together to handle all physical simulation and biological reactions. They replace Box2D and house the systems that control motion, damage responses and anatomical limits. Box2D is no longer a dependency. **BiologyCore** now resides under `engine/modules/biology` after consolidation from `engine/modules/physics/biology`.

## Core Modules
- **DynamicsSystem** – Updates body velocities and constraints each frame.
- **EntropyFieldIntegrator** – Applies chaos field modifiers to all forces.
- **MaterialPropertyBank** – Loads density, hardness and fracture values from [materials_manifest](../reference/physics/materials_manifest.md).
- **ReactionEventUtils** – Helper to create consistent `PhysicsReactionEvent` instances.
- **RuntimePhysicsGraph** – Tracks entity bodies and joint relationships.

## Reaction Subsystems
- **MaterialStressSystem** – Emits events when material thresholds are exceeded. Uses constants from the materials manifest.
- **ImpactModelingSystem** – Calculates collision impulse and deformation. Refer to [collision_and_impulse_manifest](../reference/physics/collision_and_impulse_manifest.md).
- **FluidReactionSystem** – Models drag and flow using [fluid_dynamics_manifest](../reference/physics/fluid_dynamics_manifest.md).
- **TerrainDeformationSystem** – Updates the heightmap and notifies rendering. Constants come from [natural_physics_manifest](../reference/physics/natural_physics_manifest.md).
- **RagdollSystem** – Enforces joint limits from [anatomical_mechanics_manifest](../reference/physics/anatomical_mechanics_manifest.md).

These subsystems generate `PhysicsReactionEvent` notifications that the game layer interprets for visual and gameplay effects. All constants originate from manifests under `docs/reference/`.
