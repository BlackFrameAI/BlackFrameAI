# alignment_manager.md

The **AlignmentManager** tracks the player's Faith and Corruption values. Other systems
use these metrics to gate events and scale difficulty.

## Responsibilities
- Maintain floating-point counters for Faith and Corruption.
- Provide `addFaith`, `addCorruption`, `setFaith` and `setCorruption` to modify values.
- Return the current net alignment via `getAlignment` (Faith minus Corruption).
- Trigger audio modulation hooks when values change.

See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the
current modularization status.
