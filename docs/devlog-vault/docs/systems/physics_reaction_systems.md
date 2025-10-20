# physics_reaction_systems.md

This page documents the physics subsystems that generate `PhysicsReactionEvent` notifications.
The helper `ReactionEventUtils::buildEvent` should be used by all systems when
constructing events to ensure consistent fields.

## MaterialStressSystem
- Models stress, deformation and fracture for each material.
- Uses tensile strength, elasticity and fracture limits from the [materials manifest](../reference/physics/materials_manifest.md).
- When stress exceeds these limits a `PhysicsReactionEvent` is emitted with `MaterialDeform`, `MaterialFailure` or `MaterialFracture`.

## ImpactModelingSystem
- Calculates impulse from collision mass and velocity.
- Emits a `PhysicsReactionEvent` labeled `CollisionImpact`.
- See [reference/physics/collision_and_impulse_manifest.md](../reference/physics/collision_and_impulse_manifest.md).

## FluidReactionSystem
- Provides simple drag computation for liquid or gas.
- Emits `PhysicsReactionEvent` named `FluidInteraction` whenever drag is applied.
- Uses guidelines from [reference/physics/fluid_dynamics_manifest.md](../reference/physics/fluid_dynamics_manifest.md).

## TerrainDeformationSystem
- Maintains a heightmap and applies deformation values.
- Values greater than `0.5` trigger a `PhysicsReactionEvent` with `effect` `TerrainDeform`.
- Notifies `RenderSystem` via `markTerrainRegionDirty` whenever terrain data changes.
- References [reference/physics/natural_physics_manifest.md](../reference/physics/natural_physics_manifest.md).

## RagdollSystem
- Manages ragdoll joints and consults `AnatomicalConstraintRegistry`.
- When a joint angle violates its constraint the system emits a `PhysicsReactionEvent` with `effect` `RagdollConstraintFail`.
