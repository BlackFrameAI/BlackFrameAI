# passives_system.md

This document explains the **PassivesSystem** used in *Purge of the Crescent Veil*.
The source lives in `game/chapter/PassivesSystem.*`. This system has been fully
modularized and verified, so it is marked **Completed** in the modular tree.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until documentation, cleanup and tests are merged and verified.

---

## Purpose

`PassivesSystem` loads passive ability modifiers from JSON files on startup. Chapters and quests can reference these definitions to apply alignment-based bonuses.

---

## JSON Loading

`LoadDefinitions(directory)` enumerates every `.json` file in the provided directory. Each file is read using `FileUtils::readTextFile` and parsed with `nlohmann::json`. A valid definition includes:

- `id` – unique identifier string
- `alignment_threshold` – alignment value required to activate the passive
- `damage_multiplier` – value multiplied with the player's damage

Files missing an `id` or containing malformed JSON are ignored. Parsed definitions are stored in `m_definitions` indexed by `id`.

---

## Alignment Multiplier

`CalculateDamageMultiplier(alignment)` returns the product of all multipliers whose thresholds are satisfied. If a definition's `alignment_threshold` is positive, the bonus applies when `alignment >= threshold`. Negative thresholds apply when `alignment <= threshold`. The base multiplier is `1.0` when no bonuses are active.

This simple system allows both faith and corruption passives to modify combat damage without additional state tracking.

