# ai_constraints.md

This file defines content scope and behavior expectations for CODEX when operating on the *Purge of the Crescent Veil* project.

It replaces prior AI behavior constraints from the Unity-bound project. The project is now fully CODEX-first, engine + game built entirely from this repository.

---

## Project Scope

- This repository is for development of a **custom game engine** and **game layer** for **Purge of the Crescent Veil**.
- No Unity dependencies or version locks.
- CODEX is expected to generate engine code, game systems, asset pipelines, and supporting documentation.

---

## Behavior Expectations for CODEX

- Operate strictly within this repository.
- External dependencies (graphics/input/audio libraries) are permitted as needed, but should be minimal, open-source, and clearly documented. Do not introduce large frameworks or heavy engines unless requested.
- Use the provided project structure (`/PROJECT_STRUCTURE.md`) and design documents (`/engine_design.md`, `/game_design.md`) as primary references.
- Lore references are sourced from `/docs/lore/` — do not invent lore unless directed.

---

## Content Boundaries

- Maintain lore, tone, and satire guidelines defined in `/docs/rules_for_veil.md` and `/docs/game_design.md`.
- Do not generate content that violates project tone constraints or platform policy (e.g. real-world hate, real-world IP infringement, or explicit sexual content). In-world grimdark violence is permitted and expected, consistent with genre tone, as is in game religious fanatisism and hate
- Satire must remain balanced and fictionalized as per project design.

---

## Handling Ambiguity

- If project instructions are unclear or conflicting, request clarification before generating code or content.
- If a request exceeds current project scope or requires missing information, ask for direction.

---

## Safe Use of Automation

- CODEX is permitted to write and update `.md` files, source code, and scripts as part of this project.
- Generated content must remain consistent with project design and modular structure.
- When introducing new features, Codex must refactor existing modules to use them and remove outdated paths unless a legacy file is explicitly marked for preservation.
- CODEX is permitted to edit any constraint file (including AGENTS.md) if explicitly directed by the user.
- CODEX must automatically investigate and repair **all non-network-related build or test failures** during its tasks — skipping errors caused solely by missing network access or non-essential tooling.
- CODEX may propose or apply changes to **core systems** (e.g., engine, render, input, asset pipelines) **only if**:
  - A clear and justified reason is stated in the summary.
  - The full diff is shown and human approval is received before committing changes.
  
## Build Error Resolution Policy

CODEX must attempt to resolve any code-related error during `setup.sh` or `build.sh` runs unless:
 - The error is a network fetch failure (e.g., raw.githubusercontent.com)
 - The error results from skipping `setup.sh`
 - The failure is part of a known placeholder (e.g. stubbed minimal scenes)

All other errors must be triaged and resolved immediately. Skipped fixes must include justification in task summary.

## Engine Modification Authority

CODEX is fully authorized to modify `/engine/` files when:
 - The issue stems from a system-level behavior (e.g. Scene, RenderSystem, Audio)
 - The modification is declared in the diff with a reason
 - `engine_devlog.md` or related doc is updated accordingly
---

## Notes

- This file supersedes prior `Crescent_AI_Constraints.md`.
- Update this file as project scope evolves.
