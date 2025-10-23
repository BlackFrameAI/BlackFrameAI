# boss_design.md

This document defines the **Boss Design** systems for *Purge of the Crescent Veil*.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.


---

## Core Concepts

- Bosses are major encounter events.
- Bosses influence stage progression and alignment system.
- Boss encounters are intended to:
    - Challenge player builds
    - React to player alignment
    - Provide narrative context
    - Unlock progression paths

---

## Boss Types

- Faith-aligned bosses
- Veil-aligned bosses
- Neutral / rogue bosses
- Multi-phase bosses (planned)

---

## Boss Behavior Features

- Phase changes based on:
    - Player alignment
    - Player performance
    - Environmental triggers
- Unique boss abilities
- Boss interactions with Psychic Storms
- World-state triggered bosses (future)

---

## Planned Features

- Boss alignment scaling
- Boss passive resistances / vulnerabilities
- Dynamic boss intro sequences
- Alignment-reactive boss dialogue

### New Mechanics

- `BossManager` tracks resistance multipliers and intro lines for each spawned boss.
- `BossManager` owns spawned bosses and deletes them when the encounter ends.
- Resistances include **Faith** and **Corruption** values that influence damage calculations.
- Intro sequences are short dialogue snippets announced once when the boss enters.

### Phase Transitions

- `BossManager` notifies `StageManager` when a boss is defeated.
- Additional bosses may be queued to represent multi-phase fights.
- Unit tests verify that each defeated phase triggers `NotifyBossPhaseComplete()`.

### Implementation Details

- `Boss` objects receive an `AlignmentManager` reference via `BossManager`.
- `Boss::UpdateAlignmentStats` scales health and damage when alignment
  leans strongly toward Faith or Corruption.
- Dialogue pools can be provided with `SetDialogueLines` and fetched with
  `PickDialogueLine()` which selects lines based on `getAlignment`.
