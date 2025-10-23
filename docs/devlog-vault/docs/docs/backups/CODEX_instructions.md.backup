# CODEX Instructions — Purge of the Crescent Veil

This document defines how CODEX is to interact with this repository.

---

## Scope of Work

CODEX is expected to assist in writing:

1. The **engine core**:

   * Game loop
   * Rendering
   * Input handling
   * Audio
   * Scene management
   * Entity/component system
   * Procedural visual system via `RenderSystem` and `ProceduralSpriteInstance`

2. The **game layer**:

   * Combat system
   * Faction system
   * Character system
   * Progression and upgrades
   * UI layer (custom)
   * Procedural sprite assignments to game entities (player, enemies, UI, etc.)

3. The **asset pipeline**:

   * Basic asset loading and management
   * Multi backend pipeline loading and management

4. **Other layers**

   * All other layers as project requires

---

## Constraints

* The engine is purpose-built for **Purge of the Crescent Veil**
* The engine may perform multi-purpose tasks but should be separated from **game layer**
* CODEX is to prioritize **simplicity, clarity, stability, and maintainability**
* Engine is to be written in **C** or **C++** (CODEX will confirm best choice)
* No Unity, Unreal, Godot, or other engine dependencies, other than for rendering or backend pipelines when no other option can be found or made, and should then be separated and not referenced by all other elements of project other than the specific things needed it
* **No binary assets** may be committed. Compiled files like `.spv`, `.dll`, `.exe`, or `.bin` must be generated during the build from their source counterparts.
* Devlogs are historical journals and must never drive design or implementation decisions.

---

## Process

* CODEX will write and manage `/engine` and `/game` and any other elements of `/` and it's sub folders
* CODEX will refer to `/docs` for lore, gameplay design, and guidance
* CODEX must refer to `docs/systems/procedural_sprite_system.md` when modifying visual rendering logic
* CODEX must treat missing `sprite` assignments or skipped procedural draws as **render bugs**, not ignorable warnings
* Codex is now allowed to modify `engine/` core files without explicit permission **if**:
  - The issue originates from engine-level behavior (e.g., scene/renderer bugs)
  - The diff clearly explains which engine system was modified and why
  - A corresponding devlog or system doc is updated with the rationale
* If `setup.sh` or `build.sh` fails during task execution:
  - Codex must **attempt to fix** any code-related error
  - Do **not** attempt to fix network errors or missing build directories from setup order errors
  - Always state the cause and reasoning if not attempting a fix
**CRITICAL: Visual Batching Enforcement:** All in-game 2D rendering for core content
      (game entities and normal UI) should use the `RenderSystem`'s batched drawing primitives
      (`drawRect`, `drawCircle`, `drawLine`, `drawPolygon`) for performance. 
Debug overlays and external tooling (e.g., ImGui) are exempt from this rule, as long as they are 
isolated from core game rendering and do not interfere with RenderSystem state.
* All commits should be clean and explain what was added
* Code should be modular and well-documented
* When a new system or feature replaces existing functionality, Codex must refactor all related files and scenes to adopt the new implementation. Remove or rewrite legacy paths in the same update unless they are explicitly preserved for regression tests.
* Every modular system must reside in its own folder (e.g., `game/Stage/StageManager.*`)
* After each modularization step, update `docs/modular/game_system_tree.md` with the current status of every system (Completed, In-Progress, or Not Started). A system stays **In-Progress** until its documentation, cleanup, and tests are merged and verified.
* CODEX must reference `docs/systems/entropy_system.md`, `quantum_statevector_system.md`, and `quantum_system.md` when working on systems tied to chaos, entropy, or quantum behavior. These are core to the collapse oracle, entropy stencils, and chaos-driven simulation.
* CODEX must consult `docs/systems/reactive_animation_constraint_system.md` for procedural anatomy responses, impact modeling, and entropy-weighted motion.
* CODEX must treat `/docs/reference/` as the canonical real-world source manifest system. These files guide physics, AI behavior, material response, and audio systems. Codex must not hallucinate system logic when a reference manifest exists.

---

## Historical Note

The instructions above describe the very earliest stage of development. The
engine and game are now fully operational. All managers listed in
`AGENTS.md` are active, and procedural systems drive sprites, audio and UI.
These early scaffolding steps are retained for reference only and should not be
followed, and should be updated with new systems or references as the project evolves.

---

## Current Status

✅ **ENGINE AND GAME SYSTEMS ACTIVE**
