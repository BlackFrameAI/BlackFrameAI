# Development Guidelines — Purge of the Crescent Veil

This public copy summarises the objectives that guide engine and game updates.

---

## Scope

The project focuses on three major areas:

1. **Engine Core** — rendering, input, audio, scene management, entity systems, and procedural visuals.
2. **Game Layer** — combat, factions, characters, progression, UI, and content-specific procedural assets.
3. **Asset and Tooling Pipeline** — loading, runtime management, and supporting utilities.

---

## Principles

- Prioritise simplicity, clarity, stability, and maintainability.
- Implement the engine and gameplay layers in C or C++ with modular boundaries.
- Avoid committing binary assets; generate artefacts at build time from source data.
- Treat documentation as reference material; design decisions arise from current implementation needs.

---

## Integration Notes

- Procedural rendering systems are authoritative for sprites, UI elements, and effects.
- New features should replace legacy code paths in the same update when feasible.
- Reference the systems documentation under `docs/systems/` and related design notes for canonical behaviour.
- Record significant architectural changes in the appropriate design or system documents so the public history remains consistent.

---

## Project Status

The engine and gameplay loops are active, with modular systems under ongoing refinement. Further details remain in the private repository.
