# Project Structure Overview

This public outline explains the repository layout for Purge of the Crescent Veil without exposing confidential tooling or workflows.

---

## Guiding Principles

- The project is mid-transition toward fully modular engine and game systems.
- Each subsystem remains **In-Progress** until implementation, documentation, cleanup, and testing are complete.
- Engine modules and game modules reside in separate namespaces to preserve a clean boundary between technology and content.

---

## Top-Level Directories

- `/engine/` — Core engine code written in C or C++, responsible for rendering, audio, input, asset handling, entity systems, and scene management. Procedural sprite rendering is the default path, supported by debugging overlays isolated under `engine/modules/debug/`.
- `/game/` — Game-specific logic covering combat, alignment, chapters, hubs, powers and rites, factions, bosses, progression, and UI. Helper functions such as `createPlayerSprite` and `createHealthOrbSprite` construct visuals procedurally.
- `/game/assets/` — Stores non-procedural data (audio, localization, stage definitions, scripts). Static sprite sheets are intentionally excluded now that procedural rendering is standard.
- `/docs/` — Design documentation, lore archives, and system specifications. Procedural sprite details live in `docs/systems/`, while modular architecture references appear in `docs/modular/`.
- `/scripts/` — Build scripts and utility tooling.
- `/tools/` — Standalone utilities (e.g., scenario editors, runtime launchers, diagnostic viewers).
- `/archive/` — Deprecated modules retained for reference. They are excluded from active builds but can inform migrations when needed.

---

## Collaboration Notes

- New systems must replace legacy implementations across the codebase as soon as they land, unless intentionally preserved in `/archive/` for regression testing.
- Documentation updates accompany structural changes so contributors can rely on the written record without requiring access to private workflows.
