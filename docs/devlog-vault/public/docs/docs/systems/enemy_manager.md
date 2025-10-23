# enemy_manager.md

The **Enemy Manager** tracks active combatants and keeps their lifecycle organized. It stores lightweight records for each
instance, forwards them to AI helpers for decision making, and exposes iterators used by collision and targeting systems.

## Responsibilities

- Maintain a synchronized collection of enemies created by spawning systems.
- Delegate behavior updates to the AI controller each frame without leaking internal identifiers.
- Remove defeated units, trigger public-facing events, and recycle pooled resources.
- Provide safe lookup helpers for systems that need read-only access to enemy data.

Refer to [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest module status.
