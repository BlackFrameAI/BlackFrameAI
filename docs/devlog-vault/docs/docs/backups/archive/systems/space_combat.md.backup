# space_combat.md

This document defines the **Space Combat Systems** for *Purge of the Crescent Veil*.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.


---

## Core Concepts

- Space combat is a **distinct gameplay mode** → NOT layered on ground combat.
- It is intended as a **mid-game+ expansion system**.
- Space combat operates on:
    - Strategic star map
    - Fleet movement
    - Ship-to-ship combat encounters

---

## Game Loop Integration

- Players access space combat through the **Star Map interface**.
- Star Map is accessed from Hub (planned):
    - Progression gated → unlocked after certain campaign milestones.
    - Faction influence may unlock certain sectors.
    - In prototype, press **TAB** in the Hub to open the map once unlocked.
- Star Map supports:
    - Fleet deployment
    - Zone control
    - Encounter triggering

---

## Space Combat Encounters

- Space combat encounters occur as **real-time battles**:
    - Player controls flagship or combat ship.
    - AI-controlled allied ships.
    - Enemy fleet spawns based on faction state.

---

## Space Combat Mechanics

- Ship loadouts
- Ship power systems
    - Weapons
    - Shields
    - Engines
    - Utility systems
- Alignment integration:
    - Faith/Corruption alignment may affect ship powers and faction relations.

---

## Faction Dynamics

- Faction control of sectors affects:
    - Encounter types
    - Hub vendor offerings
    - Star Map travel options

- Factions involved:
    - Eternal Empire Fleets
    - Crescent Veil Voidmarked Fleets
- Rogue factions (pirates, heretic ships, xenos)

### SpaceManager module

`SpaceManager` ties the Star Map interface to in‑game events. The class
tracks the player's ship position and clamps movement inside a 100×100
sector grid. It exposes `openStarMap()` and `closeStarMap()` helpers to
toggle the tactical view and forwards battle outcomes to
`FactionReputation`.  Active fleets are stored as procedural sprite
instances so the map can render them efficiently.  `StarMap` and
`SpaceManager` live together under `game/modules/system/space/` as a self‑contained
module.

---

## Planned Features

- Player ship progression and upgrades.
- Faction reputation integration.
- Sector control wars.
- Space-based questlines.
- Interactions with ground war (planned future feature):
    - Certain space victories may affect ground stage conditions.
    - Certain ground victories may unlock Star Map sectors.

## Sector Wars and Questlines

- Each sector on the Star Map can shift between Empire or Veil control.
- Winning fleet battles increases reputation for the victor and decreases it for the loser.
- Press **B** while viewing the Star Map to run a simulated battle via `CombatSimulator`.
- Control status is tracked per-sector and influences quest progression.
- Branching questlines emerge when factions dominate key sectors.
