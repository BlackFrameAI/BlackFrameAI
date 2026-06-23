# npc_and_faction_relations.md

This document outlines the **NPC and Faction Relations Systems** used across the project.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.

---

## NPC Factions

- Central governance orders
- Secretive cult networks
- Nomadic clans
- Rogue mercenary groups
- Neutral trade coalitions

---

## Reputation System

- Players have faction reputation values managed by `FactionReputation`.
- Reputation impacts:
  - Vendor offerings
  - Hub dialogue
  - Quest availability
  - Faction alignment shifts
  - Enemy behavior in certain encounters

### Reputation Updates

Reputation values are stored per faction. Use `addReputation` to modify the current value or `setReputation` for an absolute change. Large scale events call `applySectorOutcome`, which awards a configurable bonus to the winning faction and a penalty to the opposing side.

---

## NPC Systems

- NPCs may include:
  - Alignment preferences
  - Dynamic dialogue
  - Faction loyalty tiers
  - Recruitable or hostile states (planned)

---

## Planned Features

- Expanded faction reputation tracking
- Faction-based dialogue trees
- Reputation-driven questlines
- Optional betrayal events that rewire faction alliances

### Dialogue Trees and Betrayal

- Dialogue nodes reference `FactionReputation` values when selecting branches.
- Branches may trigger optional betrayal events that unlock or alter questlines via the `NarrativeEventSystem`.
- Faction reputation is saved through `SaveSystem`, so dialogue outcomes persist across runs.
