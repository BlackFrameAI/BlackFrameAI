# npc_and_faction_relations.md

This document defines the **NPC and Faction Relations Systems** for *Purge of the Crescent Veil*.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.


---

## NPC Factions

- Eternal Empire Orders
- Crescent Veil cults
- Skitterkin clans
- Rogue factions
- Neutral factions

---

## Reputation System

- Players have **faction reputation values** with each major faction managed by `FactionReputation`.
- Reputation impacts:
    - Vendor offerings
    - Hub dialogue
    - Quest availability
    - Faction alignment shifts
- Enemy behavior (in some cases)

### Reputation Updates

Reputation values are stored per faction. Use `addReputation` to modify the
current value or `setReputation` for an absolute change. Large scale events like
sector battles call `applySectorOutcome`, which awards +5 to the winning faction
and -3 to the loser.

---

## NPC Systems

- NPCs may have:
    - Alignment preferences
    - Dynamic dialogue
    - Faction loyalty
    - Recruitable or hostile states (planned)

---

## Planned Features

- Faction reputation tracking
- Faction-based dialogue trees
- Reputation-driven questlines
- Faction betrayals / double agents (expansion)

### Dialogue Trees and Betrayal

- Dialogue nodes now reference `FactionReputation` values when selecting
  branches.
- Branches may trigger optional **betrayal events** that unlock or alter
  questlines via `NarrativeEventSystem`.
- Faction reputation is saved through `SaveSystem`, so dialogue outcomes persist
  across runs.
