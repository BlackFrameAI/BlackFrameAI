# enemy_spawner.md

The **Enemy Spawner** creates combatants on a schedule during a stage. It cooperates with the stage manager and spawn
controllers to feed new units into the Enemy Manager without exposing internal spawn rules or function names.

## Redaction Notes

- Replaced method calls with plain-language descriptions of scheduling behavior.
- Clarified that proprietary spawn parameters remain in private data sets.

Public builds describe the system in broad strokes:

- Designers configure how often new enemies are requested through data-driven intervals.
- Content teams curate the set of eligible archetypes for each scenario.
- Runtime updates advance timers and invoke the spawn routine when the schedule permits.

Spawned enemies receive sanitized defaults and are registered with the Enemy Manager for AI coordination and rendering. Keep
sensitive spawn logic inside data files that are excluded from public builds.

See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for current module status.
