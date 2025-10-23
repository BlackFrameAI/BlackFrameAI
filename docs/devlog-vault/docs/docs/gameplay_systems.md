# gameplay_systems.md

This document defines the **Gameplay Systems** for *Purge of the Crescent Veil*.

---

All in-game visuals are generated procedurally. The player sprite comes from
`createPlayerSprite()`, enemies default to `createBaseEnemyVisual()` and
powerups rely on functions like `createHealthOrbSprite()`. No texture atlases or
external animations are loaded.

## Core Concepts

- Gameplay is driven by:
    - Faction alignment (Faith/Corruption)
    - Procedural combat stages
    - Progression through Hub-based upgrades and Chapter powers
    - Modular space combat integration
- Game loop:
    - Hub → Stage → Boss → Return to Hub
    - Optional space combat (mid-run or meta progression)

---

## Build Philosophy

- Simple, maintainable architecture over hyper-optimized complexity.
- Systems must be **data-driven** and **modular**.
- CODEX should prioritize **clarity**, **extensibility**, and **clean separation of concerns**.

---

## Game Flow Management

- `SceneCoordinator` wraps `SceneManager` to handle scene transitions and per-frame updates.
- `PhaseController` tracks the current game phase (MainMenu, Hub, Playing, etc.).
- `SaveLoadCoordinator` gathers runtime state from managers when saving and stores pending profile data when loading.
- `GameManager` acts as a facade that forwards calls to these modules.

---

## Combat System

### Core Combat Features

- 8-way movement
- Dodge roll (press **Space** while moving for brief invincibility)
- Hold **Shift** to sprint while stamina > 0
- Primary weapon slot
- Secondary weapon / utility slot
- Ability slots (Chapter powers, Faith/Veil powers)
- Targeted and AoE attacks
- Combo potential (planned)
- Hit feedback
- Alignment-based damage scaling
- Boss wave encounters
- Multi-wave event triggers
    - Timed waves
    - Boss gates
    - Event modifiers (e.g. darkness phase, Psychic Storm phase)

### Combat Enhancements

- Passives system → Chapter-based
- Alignment-triggered combat bonuses
- Environmental interactions
    - Destructibles
    - Hazard zones
- Faction-based enemy behaviors
- Psychic Storm event integration
- Military combat simulation for scripted scenario testing
- Real-world scenario parameters for terrain, weather and difficulty curves
- Satellite Telemetry system → detailed in `/docs/systems/satellite_telemetry.md`.
- Simulated telemetry generator provides randomized or orbital data when offline.
- Telemetry Manager unifies all sensor sources → see `/docs/systems/telemetry_manager.md`.
- Hardware-in-the-loop bridging via HILInterface → see `/docs/systems/hil_interface.md`.
  The engine instantiates the interface and wires default callbacks during initialization.
- Experimental quantum biasing using a multi-qubit simulator.
  `QuantumStateVectorManager` supplies entropy seeds per frame, chunk or event for procedural systems.
  Additional details on the entropy infrastructure can be found in `/docs/systems/entropy_system.md`.

---

## Alignment System

### Core Features

- Faith Pool / Corruption Pool → core alignment mechanic.
- Alignment dynamically shifts during runs based on:
    - Player actions
    - Power usage
    - Altar interactions
    - Event outcomes
- Alignment impacts:
    - Powers unlocked
    - Shop offerings
    - NPC interactions
    - Boss behaviors
    - World state (visual and mechanical)
- Neutral alignment (0 point) provides unique effects.

### Planned Features

- Alignment-based events:
    - Invasions
    - Elite enemy spawns
    - Environmental changes
- Alignment milestones unlocking passives.
- Cross-system alignment hooks:
    - Hub visuals
    - Space combat effects

---

## Chapter System

### Core Features

- Chapters replace old Creeds.
- Chapter choice impacts:
    - Powers unlocked
    - Progression paths
    - Alignment scaling
    - Faction interactions
    - NPC relationships
    - Visual customization

### Planned Features

- Chapter questlines
- Chapter-driven power unlocks

### Implemented

- Chapter passive trees integrated with SaveSystem

---

## Hub System

### Core Features

- Hub serves as player progression anchor.
- Hub elements:
    - Chapter selection
    - Faction reputation display
    - Hub station access
    - Vendors
        - Alignment-reactive inventory
        - Faction-based offerings
    - Crafting terminals
    - Arena/Challenge terminals
    - Story progression access
    - Space Combat access (planned, gated)

### Crafting Subsystem

- Hub-based crafting:
    - Rites / Powers crafting
    - Weapon mod crafting
    - Cosmetic crafting

### Currency System

- Currencies:
    - Purity Shards (core currency)
    - Alignment-specific currencies (planned)
    - Faction tokens (planned)

---

## Player Progression

### Core Features

- Player level progression unlocks:
    - Chapter passives
    - Power slots
    - Hub upgrades
    - Space Combat unlocks
- Alignment level provides scaling bonuses.
- Chapter reputation progression.

---

## Powerup System

- Temporary buffs and pickups spawn during stages.
- `PowerupManager` tracks active powerups and removes them when collected or expired.
- Active powerups render using sprites from `PickupVisuals.h` rather than simple circles.
  - Destructible objects and hazard zones render using dedicated
    `ProceduralSprite` definitions rather than direct primitive calls.
  - Most screen-space overlays are built from `ProceduralUISprite` objects. Some still rely on `ProceduralSprite` text rendering and will be converted.
    Each overlay owns a `ProceduralSpriteInstance` so animations update
    automatically while remaining in camera‑independent screen space.

## Stage System

- `StageManager` now coordinates stage flow using helper classes:
- Stage parameters are defined in JSON under `game/assets/stages/` with:
  - `duration` – seconds before advancing to the next stage.
  - `spawn_interval` – base rate for enemy spawns.
  - `powerup_interval` – how often powerups appear.
- Spawn timing scales with stage number but always starts from the loaded values.
- Decorative props like locked chests and terminals are spawned using `PickupVisuals` sprites.
- Optional parallax layers render background sprites at slower speeds than the main camera to add depth.

---

## Boss System

### Core Features

- Multi-phase boss encounters.
- Boss behaviors react to player alignment.
- `BossManager` notifies `StageManager` when a boss phase ends.
- `BossManager` owns spawned bosses and cleans them up when removed.
- Bosses drive stage progression and meta narrative.
- World-state driven boss spawns (planned).
- `SampleBoss` provides a minimal test implementation using simple shapes.

## Save System

- `SaveSystem` automatically writes a checkpoint every few seconds.
- `Game::StartGame` configures the checkpoint callback so the engine collects
  player position, current stage, active powerups and faction reputation.
- StageManager events (waves, bosses, interactions) also call `saveGame()` so
  progress persists across crashes.
- `SaveLoadCoordinator` serializes manager state and forwards to `SaveSystem`.

---

## Environmental Systems

### Core Features

- Stage corruption level impacts:
    - Visual presentation
    - Enemy spawns
    - Altar interactions
- Environmental destructibles.
- Dynamic hazards.
- Axis-aligned rectangle collision detection handles projectiles hitting enemies
  and player interactions with hazards.
- Faction-controlled zones (planned).

---

## Space Combat Integration

- Space combat is a **distinct modular system**.
- Accessible:
    - From Hub (meta loop)
    - Mid-run (optional mission branches, planned)
- Space Combat systems → detailed in `/docs/systems/space_combat.md`.
- Prototype controls: **WASD** or **Arrow** keys move the ship.

---

## Faith Engines (Narrative Artifact)

- Ancient Faith Engines referenced in lore.
- Planned for:
    - World-state events
    - Meta progression triggers
- Alignment-affecting artifacts.

---

## Audio System

- All music and sound effects are synthesized in real time using `SynthEngine`.
- Ambient, combat and boss themes trigger procedural note sequences.
- If synthesis fails or the engine is uninitialized, a warning is logged and playback is skipped.

---

## UI Systems

- Core UI systems defined in:
    - `/docs/systems/ui_core.md`
    - `/docs/systems/ui_hub.md`
    - `/docs/systems/ui_shop.md`
    - `/docs/systems/ui_altars.md`
    - `/docs/systems/ui_stage_intro.md`
    - `/docs/systems/ui_global.md`
- This document intentionally does not duplicate UI spec.

## Particle FX Helpers

Convenience functions exist for spawning common combat effects:

- `spawnExplosionFX(ParticleManager&, float x, float y)` – spawns a short-lived
  burst used for explosions or object destruction.
- `spawnDamageFlash(ParticleManager&, float x, float y)` – spawns a brief red
  flash at the given location to show damage feedback.

These helpers wrap `ParticleManager::SpawnParticleEffect` and should be used for
enemy deaths, destructible breakage and other similar events.

## Visual Integration

All in-game visuals are handled via the `ProceduralSprite` system. Player, enemy, powerup, and effect sprites are drawn using frame-based procedural geometry and managed via `ProceduralSpriteInstance`. These visuals are defined in `game/modules/graphics/*.h` and assigned in each system's init logic.
