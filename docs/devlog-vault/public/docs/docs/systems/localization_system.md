# localization_system.md

The **LocalizationSystem** loads text tables at runtime. Paths to internal modules and asset repositories have been replaced with [REDACTED]. Each table is keyed by language code.

## Responsibilities
- Parse the selected language file on initialization.
- Provide `getText` for string retrieval; unknown keys return the key itself.
- Clear cached strings on shutdown.

See the modularization tracker ([REDACTED]) for current status information.
