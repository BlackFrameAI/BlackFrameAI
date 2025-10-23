# Player Manager (Public Summary)

The player manager centralizes position, statistics, and visual state for the
player avatar while abstracting sensitive identifiers. Other systems query it for
normalized snapshots of player status rather than direct handles.

## Responsibilities

- Synchronizes movement updates coming from the controller without exposing
  device bindings or internal component names.
- Maintains health, shields, and temporary boosts with redacted identifiers so
  downstream systems only see high-level effects.
- Provides inventory accessors that redact storage keys while still allowing
  gameplay features to grant or consume items.
