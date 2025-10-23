# engine_physics_biology_core.md

The **PhysicsCore** and **BiologyCore** modules coordinate physical simulation and biological response handling inside the engine. They replace any legacy third-party physics middleware and own the systems that control motion, damage handling, and anatomical limits.

## Core Modules
- **DynamicsSystem** – updates body velocities and constraints each frame.
- **EntropyFieldIntegrator** – applies global chaos modifiers to all forces.
- **MaterialPropertyBank** – loads density, hardness, and fracture references from shared manifests.
- **ReactionEventUtils** – helper utilities to emit consistent reaction events.
- **RuntimePhysicsGraph** – tracks entity bodies and joint relationships across the scene.

## Reaction Subsystems
- **MaterialStressSystem** – emits events when material thresholds are exceeded.
- **ImpactModelingSystem** – calculates collision responses for deformation-aware effects.
- **FluidReactionSystem** – models drag and flow interactions for liquids and gases.
- **TerrainDeformationSystem** – updates the world heightmap and notifies rendering layers.
- **RagdollSystem** – enforces joint limits from anatomical manifests.

These subsystems generate `PhysicsReactionEvent` notifications that the game layer interprets for visual and gameplay effects while sourcing all constants from vetted reference manifests.
