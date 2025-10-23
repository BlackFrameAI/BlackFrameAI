# ui_altars.md

This document defines the **Altar UI systems** for *Purge of the Crescent Veil*.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.


---

## Altar UI Elements

- Altar interaction menu:
    - Cleanse
    - Corrupt
    - Bargain
- Result display (alignment shifts, rewards, triggered events)
- Flavor text (narrative tone for altar interactions)

---

## Planned Features

- Altar UI should dynamically reflect current alignment state.
- Player choices at altars should trigger appropriate events and alignment shifts.

## Implemented Triggers

- `StageManager::NotifyAltarInteraction` now accepts an `AltarChoice` and updates
  the current stage alignment.
- `NoticeOverlay::showAltarResult` displays a short message indicating the
   outcome and new alignment value. **NoticeOverlay is deprecated following the UI overhaul.**
