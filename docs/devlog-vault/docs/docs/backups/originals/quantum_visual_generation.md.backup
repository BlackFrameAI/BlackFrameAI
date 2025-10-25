# Quantum Visual Generation System

## Overview

This document defines the architecture, logic, and behavior of the quantum-driven visual output system used within the engine. It formalizes the dual-path collapse architecture, explains how entropy is harvested and applied, and documents how visuals are mutated, promoted, and rendered.

---

## High-Level Flow Diagram (Text Map)

```
 ┌────────────────────────────┐
 │    PLAYER STATE + INTENT   │◄──────────────┐
 └────────────────────────────┘               │
                     ▲                        │
                     │                        │
     ┌───────────────┴───────────────┐        │
     │     TRI-TEMPORAL SAMPLING     │        │
     │   Past | Present | Future     │        │
     └───────────────────────────────┘        │
                     ▲                        │
                     │ Collapse across 3 time │
                     │ windows                │
 ┌───────────────────┴───────────────────┐    │
 │       REAL-WORLD ENTROPY STREAM       │    │
 │   (CPU jitter, RAM, net, player input)│    │
 └───────────────────────────────────────┘    │
                     │                        │
                     ▼                        │
         ┌──────────────────────────┐         │
         │ FILTER & PROMOTE SEED?   │─────────┘
         └────────────┬─────────────┘
                      │
           YES        │         NO
          ┌───────────▼──────────────┐
          │   ORACLE VISUAL OUTPUT   │
          │   (Chaos Pool Result)    │
          └──────────────────────────┘
                      │
                      ▼
         ┌──────────────────────────┐
         │   VISUAL RESULT OUTPUT   │
         │ - Sprite Mutation        │
         │ - Real-Time Animation    │
         │ - Dynamic Detail         │
         │ - LOD Control            │
         └──────────────────────────┘
                      ▲
                      │
          ┌───────────┴────────────┐
          │   HYBRID GENERATION    │
          │ (Gate-Qualified Seed)  │
          │   + Detail Layers      │
          └────────────────────────┘
```

---

## Collapse Sources

### Real-World Entropy Sources:

- CPU cycle jitter
- RAM address noise
- Player movement / input
- Network packet fluctuations
- Sensor data (if present)

These sources are **not guaranteed** to cause collapse — they are sampled into an entropy pool, and collapses are **only permitted** when chaos gates allow.

### Collapse Modes:

- **Oracle (Chaos Pool)**: True chaotic collapses that may or may not happen, logged into the Chaos Seed Pool.
- **Hybrid Generator**: Deterministic and gate-driven, used for fallback and predictable logic.

## Temporal Collapse Sampling

Each entropy evaluation occurs across **three time slices**:

- `T-0.5s`: Half a second before current frame
- `T`: Current frame entropy
- `T+0.5s`: Half a second ahead (projected)

Only one collapse across this window is used. This increases chances of finding valid seeds.

---

## Filter & Promotion Logic

Seeds (from either Oracle or Hybrid) must pass:

- IntentRequest matching
- Entropy affinity / hint matching (optional)
- Gate validation

If valid, seeds are **promoted to visual generation**. If invalid:

- Oracle seeds go to observation/mutation pool
- Hybrid regenerates a new attempt

---

## Visual Mutation Pipeline

Once a seed is promoted:

- Visual assets are procedurally mutated using:
  - Sprite layering
  - Noise overlays
  - Damage/burn/corruption rules
  - Normal map or lighting approximations
  - Entropy-modulated animation parameters

Visuals are cached and reused per entity to avoid redundant generation.

---

## LOD + Draw Management

- LOD level determined by entropy quality, camera distance, player importance
- Seed mutations may be ignored at distance
- Frame-based mutation budgets are enforced
- Draw call batching is maintained via instanced visuals where possible

---

## Performance Notes

- Oracle cache has a fixed cap
- Collapse lineage is logged but not retained in release mode unless enabled
- Visuals only mutate when required: state change, damage, proximity, or high-entropy shifts

---

## Fallback and Predictability

- When Oracle cannot satisfy a visual intent, Hybrid generator guarantees deterministic output
- Hybrid output can be locked to keyframes or timeline animations for cutscenes or replay systems

---

## Summary

This system enables chaos-driven, field-reactive, and entropy-modulated visual states with a fully deterministic backup. Assets no longer require manual authorship or animation tracks — they emerge from the field, are filtered by gates, and mutate in response to real-world entropy.

Visuals are no longer static. They are **observed**, **evaluated**, and **promoted** from the fabric of chaos itself.
