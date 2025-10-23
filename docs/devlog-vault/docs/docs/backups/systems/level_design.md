# level_design.md

This document defines the **Level Design** systems and encounter flow for *Purge of the Crescent Veil*.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.


---

## Core Structure

- Procedural stages → stage pool with thematic variations
- Stages tied to faction influence
- Stage progression → increasing difficulty and corruption
- Stage definitions stored under `game/assets/stages/` provide lore snippets and enemy sets
- Each definition now includes a `faction` field controlling the base enemy pool

---

## Encounter Flow

- Multi-wave combat
- Dynamic enemy spawns
    - Aligned to player current alignment
    - Tied to stage corruption level
- Boss wave triggers
- Event triggers:
    - Altars
    - Psychic Storms
    - Faction invasions

---

## Alignment Integration

- Stage corruption level impacts:
    - Visual presentation
    - Enemy types
    - Available interactions

- Player alignment impacts:
    - Stage modifiers
    - Narrative options
    - Shop offerings (in-run)

---

## Planned Features

- Additional environment interactions tied to faction control
