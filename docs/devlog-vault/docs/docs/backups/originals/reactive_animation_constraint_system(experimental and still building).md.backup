# Reactive Animation Constraint System (RACS)

> **Experimental Notice:** The Reactive Animation Constraint System is still under development and currently not implemented. This document describes the proposed design and may change.

> **Progress:** Initial data structures for motion stencils and action templates are now part of the engine. Constraint utilities provide simple limb-angle clamping.

## Purpose

This document defines the architecture, structure, and Codex scaffolding patterns for a runtime-executed, declaratively-defined animation constraint system. It enables procedurally animated motion, chaos-reactive behavior, and physics-consistent outcomes without relying on authored animation files.

This spec is for **Codex to generate systems**, not to run them.

---

## System Objective

To allow the engine to:
- Animate **organically** (limbs, particles, fluids)
- React to **what just happened** (impacts, wounds, motion triggers)
- Stay within **physical and anatomical boundaries** (joint constraints, mass arcs)
- Be **modulated, not controlled**, by chaos/entropy
- Guarantee **hybrid fallback** when chaos outputs exceed safe thresholds

---

## Codex Responsibilities

Codex is responsible for generating:

1. **Motion Stencil Definitions**  
   - Constraints per body part or object
   - E.g. `ArmSwingBiped`, `DoorHingeExplode`, `ShardBounceScatter`

2. **Semantic Action Templates**  
   - Contextual behavior guides
   - E.g. `BipedalStride`, `SurfaceImpact`, `FluidSplashOnEntry`

3. **Entropy Modulation Rules**  
   - Defines how chaos affects timing, angles, spray, jitter, etc.

4. **Constraint Enforcement Systems**  
   - Prevents animations from exceeding bounds unless authorized

5. **Fallback Routing Logic**  
   - Swaps to hybrid animation path if chaos output is invalid, unsafe, or glitchy

Codex does **not** execute animations. It creates the framework so the engine can.

---

## Runtime Responsibilities

The engine will:
- Observe input events (hits, physics, interactions)
- Pull appropriate motion stencil + action template
- Sample entropy and apply modulation
- Check constraints and apply animation
- Call fallback routines if chaos fails

---

## Motion Stencil Format

Codex will define structs or classes like:
```cpp
struct MotionStencil_ArmSwingBiped {
    float minAngle = -30.0f;
    float maxAngle = 140.0f;
    float restSpeed = 0.8f;
    float maxSpeed = 1.6f;
    float inertiaBias = 0.3f;
    ChaosJitter jitterModel = ChaosJitter::Low;
    bool allowInversion = false;
};
```

Codex ensures:
- Values match expected physics and entity anatomy
- Limits are respected unless overridden by collapse flags
- Chaos-modulation targets are named, not hardcoded

---

## Semantic Action Template Format

Codex defines actions such as:
```cpp
struct ActionTemplate_WoundImpactBleedJet {
    ReactionType reaction = ReactionType::Pierce;
    float velocityMin = 3.0f;
    float velocityMax = 20.0f;
    bool allowDecal = true;
    float sprayAngleBase = 45.0f;
    bool entropyModulatesSpray = true;
};
```

Linked to:
- Impact event payload (velocity, force, object type)
- Target surface/material
- Stencil bindings (where blood spawns, how it moves)

---

## Entropy Modulation System

Codex generates modulation wrappers:
- `ChaosModulate(velocity, ChaosBias::Jitter)`
- `ApplyNoisePattern(particleStream, entropyDelta)`
- `WarpLimbFlow(jointPath, collapseSeed)`

These calls apply non-deterministic movement, spray, deformation **within** a bounded rule space.

Chaos should not **drive** animation — it **bends** it.

---

## Constraint Enforcement Layer

Codex writes enforcement logic such as:
```cpp
if (limbAngle > maxAngle && !overrideEnabled) {
    limbAngle = maxAngle;
    logConstraintBreach(entityId, "ArmSwingBiped");
}
```

Or uses physics-authorized fallback stencils:
```cpp
if (!chaosOutput.valid || chaosOutput.entropy > ENTROPY_OVERLOAD_CUTOFF) {
    ApplyHybridAnimation(entityId, ActionTemplate_FallbackWalk);
}
```

---

## Fallback Rules

Codex ensures all animation paths have:
- Fallback templates pre-linked per intent type
- Runtime-checkable constraint validation hooks
- Runtime tolerance caps (e.g., max chaos entropy per frame)

Fallback must be:
- Deterministic
- Physically coherent
- Visually stable

---

## Use Cases

- Leg swing obeys joint constraints, but entropy jitters gait subtly
- Door explodes into entropy-shaped debris arcs — but only within force vector cones
- Blood flows and sprays based on wound depth, hit angle, and bone proximity
- Rock splashes into fluid with both ripples and chaotic droplets, scaled by mass and height

### Usage Notes

The `engine/modules/animation/reactive` folder now contains skeleton
definitions for motion stencils and action templates. Use
`clampLimbAngle` to enforce joint limits defined by a stencil before
applying entropy-modulated motion.

---

## Summary

Codex enables the engine to animate reactively, not randomly. It defines the skeletal rules, semantic action templates, modulation logic, and fallback safety net. The engine runs the system — Codex only declares it.

This is not motion capture.
It’s entropy-aware procedural behavior that feels *real*, *chaotic*, and *physically grounded.*

