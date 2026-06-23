# Scene Manager Overview (Public Summary)

This briefing outlines how the runtime orchestrates active scenes while keeping implementation scripts, class names, and logging policies private.

## Primary Role

- Maintain a layered sequence of views so gameplay, menus, and overlays render in a predictable order.
- Route per-frame updates only to views that are currently active, ensuring dormant layers remain paused.
- Shield the renderer from invalid window targets; corrective actions and diagnostics are [REDACTED].

## Transition Handling

- Transition helpers coordinate loading screens, fades, and context swaps without revealing internal helper names.
- Requests to add, remove, or replace scenes flow through a moderated queue so other systems cannot directly manipulate the stack.
- Status updates feed into the public modular tracker, but underlying automation scripts stay internal.
