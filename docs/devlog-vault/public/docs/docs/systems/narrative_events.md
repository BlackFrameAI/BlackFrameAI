# narrative_events.md

This document outlines the **Narrative Events System** used by the game framework.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.

---

## Core Concepts

- Narrative events are branching story hooks triggered by:
  - Player alignment thresholds
  - Chapter or mission selections
  - Standing with major factions
  - Boss outcomes
  - Global world-state changes
  - Outcomes from optional side systems (e.g., space encounters)

---

## Narrative Event Types

- Stage or mission introductions
- Mid-run dynamic events
- Hub-based narrative arcs
- Chapter storylines
- Faction reputation events
- Alignment-based NPC interactions

---

## System Features

- Event triggers are data-driven and authored through configuration assets.
- Narrative outcomes may:
  - Unlock player powers or resources
  - Adjust faction standing
  - Shift alignment
  - Alter persistent world state
  - Unlock new sectors or activities
  - Influence future event availability

### Alignment Triggers

- Faith or ideology-based events can be registered with `registerFaithTrigger(threshold, id)`.
- `checkFaith(alignment)` evaluates these triggers each frame to determine active events.

### Dialogue Trees

- Branching conversations use the shared `DialogueTree` module.
- Each node contains localized dialogue text and conditional options.
- Options evaluate faction reputation and may trigger follow-up events.
- `advance()` selects the first option that meets its requirements.

---

## Save Integration

- Narrative event state must persist across runs.
- Branch outcomes must be restorable after a crash or reload.
