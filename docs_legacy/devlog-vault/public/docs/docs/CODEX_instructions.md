# Development Guidelines — Purge of the Crescent Veil

This public summary captures the foundational expectations for contributors working on the Purge of the Crescent Veil project. It focuses on high-level responsibilities rather than privileged workflows.

---

## Scope of Work

Contributors collaborate across three major layers of the project:

1. **Engine Core** — manages the game loop, rendering, input, audio, scene coordination, and the procedural sprite pipeline.
2. **Game Layer** — implements combat, factions, characters, progression, and the UI layer that surfaces alignment and faction choices.
3. **Asset and Tooling Layer** — provides loading, management, and automation required to support multiple rendering backends and content pipelines.

Other tasks arise as the project evolves, but the guiding principle is to keep systems modular, comprehensible, and maintainable.

---

## Core Principles

* The technology stack is purpose-built for Purge of the Crescent Veil.
* Engine and game layers should remain cleanly separated, even when they share data contracts.
* Simplicity, clarity, stability, and maintainability take priority over experimentation.
* Engine code is authored in C or C++ and avoids dependency on commercial engines.
* Binary build artifacts (e.g., `.spv`, `.dll`, `.exe`, `.bin`) are generated during the build process and are not stored in version control.
* Devlogs provide historical journals and must not dictate design decisions.

---

## Collaboration Process

* Contributors reference the documentation under `/docs` when shaping lore, gameplay, or visual behavior.
* Rendering code should lean on the RenderSystem batching primitives (`drawRect`, `drawCircle`, `drawLine`, `drawPolygon`) to maintain performance.
* Commits should be descriptive, self-contained, and accompanied by updates to related documentation when behavior changes.
* When replacing a system or feature, refactor associated files immediately and retire superseded paths unless preserved intentionally for regression tests.
* Each modular system belongs in its own folder (for example, `game/modules/stage/StageManager.*`).
* Progress is tracked in `docs/modular/game_system_tree.md`, where systems remain **In-Progress** until implementation, documentation, cleanup, and testing are complete.

---

## Project Status Snapshot

✅ **ENGINE AND GAME SYSTEMS ACTIVE** — The project is fully operational, and ongoing work focuses on refinement, documentation, and tooling.
