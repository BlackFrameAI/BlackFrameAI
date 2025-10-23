# narrative_events.md

This document defines the **Narrative Events System** for *Purge of the Crescent Veil*.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.


---

## Core Concepts

- Narrative Events are **branching story hooks** triggered by:
    - Player alignment
    - Chapter choice
    - Faction standing
    - Boss outcomes
    - World state changes
    - Space Combat outcomes (planned)

---

## Narrative Event Types

- Stage intro narrative
- Mid-run dynamic events
- Hub-based narrative arcs
- Chapter storylines
- Faction reputation events
- Alignment-based NPC interactions

---

## System Features

- Event triggers must be **data-driven**.
- Narrative outcomes may:
    - Unlock powers
    - Alter faction standing
    - Shift alignment
    - Alter world state
    - Unlock Space Combat sectors
    - Influence future event availability

### Alignment Triggers

- Faith-based events can be registered with `registerFaithTrigger(threshold, id)`.
- `checkFaith(alignment)` evaluates these triggers each frame.

### Dialogue Trees

- Branching conversations use the `DialogueTree` module.
- Each node contains dialogue text and conditional options.
- Options evaluate faction reputation and may trigger narrative events.
- `advance()` selects the first option that meets its requirements.

---

## Save Integration

- Narrative event state must be **persisted across runs**.
- Branch outcomes must be restorable after crash/reload.
