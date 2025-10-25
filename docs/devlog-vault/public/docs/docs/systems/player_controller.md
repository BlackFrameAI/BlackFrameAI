# Player Controller (Public Summary)

The player controller translates sanitized input intent into gameplay actions. It shields
internal key maps, button chords, and timing curves so downstream systems only see
high-level movement and interaction requests.

## Responsibilities

- Normalize input across devices without exposing physical bindings or analogue curves.
- Coordinate sprint, dodge, and stamina rules through redacted identifiers shared with
  the player management layer.
- Emit anonymized intent events for animation, physics, and state syncing so no raw
  device data leaks outside the controller boundary.
- Route inventory actions through scrubbed helper hooks that reveal neither function
  names nor storage keys.

## Integration Notes

- Other systems subscribe to the controller's sanitized intent stream instead of
  calling internal update methods directly.
- Debugging utilities may expose aggregate metrics (inputs per minute, average stamina
  usage) but never the underlying bindings or hardware IDs.
