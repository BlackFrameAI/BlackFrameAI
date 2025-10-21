# save_system.md

This document defines the **Save and Load System** for *Purge of the Crescent Veil*.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.
Implementation files live under `game/modules/system/save/`.


---

## Core Concepts

- The game must **NEVER lose a player run due to crash or error**.
- Save system must support:
    - **Crash-resilient run saving** → like Isaac / Brotato
    - Incremental save points (safe spots, wave checkpoints)
    - Periodic checkpoint writes while playing
    - Meta progression save (Hub state, Achievements, Unlocks)
    - Space Combat state save

---

## Save Architecture

- Must support:
    - Player profile (named save profiles stored with metadata)
    - Hub state
    - Chapter progression
    - Faction reputation
    - Narrative event states
    - Achievement state
    - Space Combat state
    - Current run state (stage, alignment, inventory, progression)

---

## Crash Resilience

- In-run:
    - **Incremental save points** after:
        - Each wave
        - Each boss
        - Altar interaction
        - Narrative event
        - Shop interaction

- On crash/reload:
    - Player resumes at **closest safe point**.
    - NO full-run loss.

### StageManager Integration

- `StageManager` emits events whenever waves, boss phases or special
  interactions conclude.
- These events call back into `SaveSystem::saveGame` using the currently
  active profile.

---

## Cloud Sync

Enable cloud syncing with the `--cloud-save` command line flag. This flag
passes `true` to `SaveSystem::initialize`, causing the engine to copy save files
between the local `game/saves` directory and `game/saves/cloud` on startup and whenever
saving. Files in `game/saves/cloud` that are newer than the local version are
downloaded on initialization. Saving a slot uploads the file to the cloud
directory.

## Hub Backup

The Hub menu now exposes a **Backup Current Run** option. Selecting it copies
the active save slot into the `game/saves/backups` directory with a timestamped
filename. This is useful for archiving progress before experimenting or
switching chapters.

## Save Slot Overlay

 - No default key binding. Use the debug controller or UI to open the overlay when available.
- Overlay lists save slots returned by `SaveSystem::getMetadata`.
 - On startup `SaveSystem::initialize` scans the `game/saves` folder and populates
  available slots based on each file's timestamp.
- If cloud sync is enabled it also pulls newer files from `game/saves/cloud` before
  scanning.
- Use **W/S** to change the highlighted slot.
- Press **Enter** to load the selected slot.
- Press **Space** to overwrite the selected slot with the current state.

### Profiles

- Each save slot stores a **profile name** and timestamp.
- The overlay displays the profile name when listing slots.
- Slots can be selected to load or save progress under that profile.

### Data Format Additions

- `reputation` object stores faction standing:
    - `empire` – Empire reputation value
    - `veil` – Crescent Veil reputation value
    - `neutral` – Neutral faction reputation
- `inventory` array stores items held by the player:
    - each entry has `name` and `quantity`
- `abilities` array lists learned abilities:
    - each entry has `name`, `cooldown` and current `timer`
- `playerVx` and `playerVy` store the player's physics velocity.
- Each enemy entry now includes `vx` and `vy` fields for its body velocity.
- `networkFrame` records the current deterministic networking frame.
- `hilEndpoint`, `hilPort` and `hilConnected` store the active HIL interface configuration.

### Corrupted File Handling

- If a save file fails to parse, `SaveSystem` now logs the file path and error
  reason. The unreadable file is automatically renamed with a `.corrupt_TIMESTAMP`
  suffix so the slot can be recreated on the next save.
- Failed write attempts when saving also generate a warning with the path that
  could not be written.
