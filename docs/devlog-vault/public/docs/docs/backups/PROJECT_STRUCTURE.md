# Project Structure Overview

This public backup describes the high-level layout of the repository without exposing private workflow notes.

## Top-Level Directories

- `/engine/` — Core engine code handling rendering, audio, input, scenes, physics, and supporting systems.
- `/game/` — Game-specific logic, content modules, encounters, UI, and narrative layers.
- `/game/assets/` — Data-driven assets such as audio, localisation tables, stage definitions, and scripts.
- `/docs/` — Design documentation, lore references, system specifications, and devlogs.
- `/scripts/` — Build and tooling automation used by the team.
- `/tools/` — Stand-alone utilities and editors that interact with the engine and game data.
- `/archive/` — Legacy modules preserved for historical reference but excluded from active builds.

## Guidance

- Modular systems belong in dedicated folders and should document their status in the modular overview under `docs/modular/`.
- Procedural rendering remains the default approach for sprites, UI, and visual effects.
- Legacy implementations are retained only when necessary for regression testing and should otherwise remain archived.

Further implementation details stay in the private repository to avoid exposing sensitive file paths.
