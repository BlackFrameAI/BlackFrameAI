# localization_system.md

The **LocalizationSystem** (located under `engine/modules/localization/system/`) loads text tables from `game/assets/localization/` at runtime. Each table is a JSON file keyed by language code.

## Responsibilities
- Parse the selected language file on initialization.
- Provide `getText` for string retrieval; unknown keys return the key itself.
- Clear cached strings on shutdown.

See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the current modularization status.
