# vendor_inventory.md

This document defines the **VendorInventory** system for *Purge of the Crescent Veil*.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.

---

## Purpose

`VendorInventory` manages shop item listings. Items are filtered by faction reputation and then selected using a weighted shuffle.

- Each `VendorItem` specifies a required faction and minimum reputation.
- During `getAvailableItems`, items that do not meet the player's reputation are discarded.
- Remaining candidates are weighted based on the player's alignment:
  - Faith-leaning alignment increases weight for Empire items.
  - Corruption boosts Veil item weight.
- Items are drawn using `std::discrete_distribution` so higher weights appear more often but still allow randomness.
- Results are shuffled before returning to keep the shop fresh.

This approach ensures vendors favour the player's current moral leaning while still offering occasional neutral or opposite faction items.
