# game_design.md

This document defines the **Game Design** for *Purge of the Crescent Veil*.

All gameplay systems are modular and self-contained. See [docs/modular/game_system_tree.md](modular/game_system_tree.md) for current progress. The underlying engine uses the same modular layout; the status of each engine subsystem is tracked in [docs/modular/engine_system_tree.md](modular/engine_system_tree.md).
A system is kept **In-Progress** until documentation, cleanup, and tests are merged and verified.

- Primary gameplay is 2D, with 3D elements used for bosses, major events, and environmental effects.

## Procedural Sprite System

- Players, enemies and powerups use a shape-driven sprite system.
- Each sprite frame stores rotation, scale and tint color values for lightweight animations.
 - Effect sprite helpers drive slash trails, explosions, shields, lasers, charge animations, short damage flashes and weapon flashes.
- Rendering primitives such as `drawLine`, `drawPolygon`, `drawRectScreenVGU` and `drawCircleScreenVGU` allow UI overlays and debug visuals without texture assets. Each call now takes stroke width, stroke color and optional fill color for outline control.
- The player sprite starts at 4x scale with the camera zoomed to match for readability.


---

## Faction System

- Core factions:
    - Eternal Empire
    - Crescent Veil cults
    - Skitterkin
    - Rogue factions
    - Neutral factions
- Faction standing is influenced by:
    - Player alignment
    - Chapter choice
    - NPC interactions
    - Questlines
    - Combat outcomes

---

## Character System

- Players align with **Chapters** (sub-factions).
- Character builds are influenced by:
    - Chapter choice
    - Faith/Corruption alignment
    - Hub upgrades
    - Powers and Rites (formerly Glyph System)

---

## Combat System

- 8-way movement
- Dodge roll (cooldown)
- Sprint (planned)
- Primary and secondary weapons
- Ability slots (Chapter powers, Faith/Veil powers)
- Dynamic enemy behavior
- Faction-based enemy scaling
- Alignment-influenced combat effects
- Boss wave encounters
- Environmental interactions

---

## Progression System

- Player level progression
- Chapter reputation progression
- Hub upgrades
- Power unlocks
- Alignment-based passives
- Faction reputation

---

## Space Combat System

- Modular → distinct loop from ground combat
- Integrated with Hub and campaign progression
- Faction-based space encounters
- Alignment-based ship effects
- Tied to star map progression

---

## UI Layer

- UI systems are defined in:
    - `/docs/systems/ui_core.md`
    - `/docs/systems/ui_hub.md`
    - `/docs/systems/ui_shop.md`
    - `/docs/systems/ui_altars.md`
    - `/docs/systems/ui_stage_intro.md`
    - `/docs/systems/ui_global.md`
 - This document does not duplicate UI spec.
 - All previous HUD overlays and menu scenes have been removed.
- Early prototypes displayed a blank HUD.

## Procedural UI

A new UI toolkit assembles widgets from simple shapes. `ProceduralUISprite` defines per-state tints and frame callbacks so buttons, text boxes and status bars can be drawn entirely with `drawRectScreenVGU`. Overlay layouts choose the correct tint for hover and press states, enabling a cohesive look without texture assets.
The PlayerStatusOverlay now draws health and shield as animated bars using these sprites. **PlayerStatusOverlay is part of the deprecated HUD system.**
## Main Menu

- Displays three options centered on screen: **Start**, **Continue**, and **Exit**.
- Use Up/Down or the D-pad to move the highlight, or hover with the mouse.
- Press Enter, gamepad **A**, or click to activate.
- The selected option is drawn with a bright yellow rectangle behind the text for accessibility.
- *Start* switches to the `Playing` state.
- *Continue* loads the checkpoint if available, otherwise starts a new game.
- *Exit* closes the window and returns to the desktop.

## Game Over Screen

- Appears when the player loses all lives.
- Displays **GAME OVER** using the procedural font system.
- Options: **Restart** and **Quit**.
- Use Up/Down or the D-pad to choose an option.
- Press Enter or gamepad **A** to confirm.
- *Restart* begins a new run in the `Playing` state.
- *Quit* returns to the main menu.

---

## Notes for CODEX

- Prioritize clean, modular architecture.
- Every modular system must reside in its own folder (for example `game/modules/stage/StageManager.*`).
- Avoid Unity or engine-specific assumptions.
- Leverage data-driven design where possible.
- All game systems must remain modular and can be added, removed or replaced at any time without affecting unrelated systems.
- Systems must be scaffolded to support:
    - Alignment system
    - Chapter system
    - Hub system
    - Space combat integration
    - Modular UI
    - Procedural generation of elements and assets