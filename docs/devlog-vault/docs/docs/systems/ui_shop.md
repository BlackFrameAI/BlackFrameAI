# ui_shop.md

This document defines the **In-Run Shop UI systems** for *Purge of the Crescent Veil*.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.


---

## Shop UI Elements

### In-Run Shop

- Shop UI panel (in-run)
- Dynamic offerings display
- Item detail popups
- Currency display (temporary/run-based currencies)

### Hub Shop (Permanent Upgrades — separate system → will have its own UI spec later)

- Permanent upgrade offerings
- Purity Shards currency display
- Upgrade categories (planned)

---

## Planned Features

- Shop inventory should react to player alignment.
- Shop inventory should support run-based randomness.
- Temporary buffs and power scrolls may appear as offerings.

## Vendor Inventory Randomization

The hub vendor now shuffles available items each run. Item selection is weighted
using the player's current alignment value. Faith-leaning players see more
Empire items while Corruption favors Veil items. Temporary buff powerups from
`PowerupManager` are injected into the pool so they can appear as shop offers.
