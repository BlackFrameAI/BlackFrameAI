# chapter_system.md

This document defines the **Chapter System** (successor to the old Creed system) for *Purge of the Crescent Veil*.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.


---

## Core Concepts

- Players align with **Chapters** → sub-factions within the Eternal Empire or Crescent Veil.
- Chapter choice influences:
    - Powers unlocked
    - Alignment scaling
    - Narrative options
    - Faction relations
    - Progression trees (planned)

---

## Alignment Impact

- Chapter choice interacts with the **Faith/Corruption alignment system**.
- Alignment shifts may:
    - Unlock Chapter-specific passives
    - Alter Chapter storylines
    - Impact faction reputation

---

## Planned Features

- Chapter-specific quests / story arcs
- Chapter-driven visual customizations

## Implemented

- Chapter passive trees with questline unlock triggers
- Quest tracker loads arc data from `game/assets/chapters/`
- Scenes can trigger quests via `Game::TriggerQuest`
- Player cosmetics toggled through `PlayerManager`

### Manager Responsibilities

The `ChapterManager` owns the player's current Chapter state. It also:

- Maintains the `PassiveTree` used for unlockable perks.
- Uses `PassivesSystem` to derive combat bonuses from alignment.
- Loads quest arc definitions from `game/assets/chapters/`.
- Provides helpers to trigger and complete quests at runtime.
