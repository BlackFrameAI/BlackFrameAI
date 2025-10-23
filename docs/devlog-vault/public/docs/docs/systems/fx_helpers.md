# FX Helper Utilities (Sanitized)

## Purpose
- Provide lightweight wrappers for triggering pre-approved visual responses such as impact flashes or burst effects.
- Keep gameplay and UI code concise by hiding effect routing details.

## Behavior Summary
- Each helper delegates to the centralized visual-effects dispatcher, which applies duration and positioning rules.
- Callers request a semantic token (e.g., "explosion", "damage flash") instead of touching particle enumerations or backend hooks.
- The dispatcher ensures effects respect safety filters before spawning them in the scene.

## Notes
- Detailed API names and engine hooks are intentionally masked.
- Future updates should continue to route new effect types through the same dispatcher abstraction.
