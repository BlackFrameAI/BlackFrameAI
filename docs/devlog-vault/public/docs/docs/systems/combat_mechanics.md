# Combat Mechanics Overview

This overview summarizes player combat design goals without revealing tuning values or proprietary logic.

## Core Interactions

- Omnidirectional movement with support for evasive maneuvers and short bursts of speed.
- Primary and secondary equipment slots for weapons or utilities.
- Ability channels that cover narrative powers, situational abilities, and area-focused attacks.
- Support for chaining actions into combos, with specifics retained internally.

## Damage & Scaling

- Overall damage is influenced by player progression, enemy traits, and world-state modifiers.
- Alignment or faction-based adjustments exist conceptually but their formulas remain private.

## Passive Abilities

- Passive bonuses are defined through data-driven content, enabling designers to add or tune traits without code exposure.
- Active passives influence combat resolution, but the calculation pipeline and data formats are redacted.

## Combat Events

- Encounters may trigger large-scale events, adaptive enemy behaviors, and boss phases that escalate tension.

## Ongoing Enhancements

- Additional passive layers, alignment triggers, and environmental interactions are maintained internally until finalized for public release.
