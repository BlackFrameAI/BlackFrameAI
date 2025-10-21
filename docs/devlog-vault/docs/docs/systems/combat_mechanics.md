# combat_mechanics.md

This document defines the **Combat Mechanics** for *Purge of the Crescent Veil*.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.


---

## Core Combat Systems

- 8-way movement
- Dodge roll (press **Space** while moving to gain temporary invincibility)
- Hold **Shift** to sprint when stamina is available
- Primary weapon slot
- Secondary weapon / utility slot
- Ability slots (Chapter powers, Faith/Veil powers)
- Targeted and AoE attacks
- Combo potential (planned)

---

## Damage & Scaling

- Damage scaling with:
    - Player alignment
    - Boss modifiers
    - Enemy type
    - Faction standing (planned)

---

## Passive Abilities

- Passives are defined in `game/assets/passives/*.json` and loaded at runtime.
- Each passive specifies an alignment threshold and damage multiplier.
- Active passives modify projectile damage during collision checks.

---

## Combat Events

- Psychic Storm events
- Alignment event triggers
- Dynamic enemy behaviors
- Boss wave encounters

---

## Planned Enhancements
The following items have been implemented in prototype form:

- Chapter-based passives loaded from data files
- Alignment-triggered damage bonuses
- Environmental interactions
    - Destructibles
    - Hazard zones
