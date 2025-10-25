# AGENTS.md - Codex usage guidance

Test sources live under `tests/` but are excluded from the default build. Running `ctest` requires building these executables manually (for example by enabling the `BUILD_TESTING` option). When updating source code or documentation, run `bash scripts/build.sh` after configuration to ensure the code compiles. Documentation lives under `docs/` and should be kept in sync with the actual engine and game state.
If any `apt-get` invocation fails during setup, fall back to running `apt update` and `apt install`.

## Please reference:##
Codex must rely on existing documentation when adding, modifying, or repairing systems. Reference the following documents as source of truth:

- `docs/engine_design.md` — for core engine structure, modular rules, rendering backend logic, and system separation.
- `docs/game_design.md` and `docs/gameplay_systems.md` — for gameplay architecture, alignment/faction logic, progression systems, and UI/UX layering.
- `docs/systems/procedural_sprite_system.md` — for visual construction, RenderSystem integration, batching constraints, and overlay restrictions.
- `docs/systems/entropy_system.md`, `quantum_statevector_system.md`, and `quantum_system.md` — for quantum state, entropy behavior, and chaos field integration. Includes both deterministic and entropy-native systems.
- `docs/systems/reactive_animation_constraint_system.md` — for physical response generation, anatomical constraints, and entropy-modulated reactions.
- `docs/reference/` — for all real-world data manifests used in procedural generation (physics, biology, visuals, AI behavior, audio, etc.). These should be used instead of hallucinated content wherever possible.
- `docs/lore/` — for narrative tone, factions, world structure, and alignment metaphysics.
- `docs/modular/game_system_tree.md` — must be kept updated. Each system must be marked **Completed**, **In-Progress**, or **Not Started**. A system is only marked Completed once it has: (1) been implemented, (2) documented, (3) cleaned, (4) tested.
- All modular systems must live in self-contained folders (e.g. `\game\modules\stage\StageManager.*` or `\engine\modules\physics_core\DynamicsSystem.*`).
- All sub systems of modular systems should life in self-contained child folders (e.g. `\engine\modules\scene\manager\` or `\game\modules\ui\mainmenu\` or `\game\modules\enemy\types\boss\`)
- Do not use legacy UI systems, scene managers, or input systems. If in doubt, refer to the current modular status tree.
- Codex may modify `/engine` systems if doing so is necessary to resolve build/runtime issues, as long as the changes are documented, logged, and don’t violate system separation.
- Codex may auto-resolve build failures unless they are caused by network issues, stub placeholders, or improper script ordering (i.e. setup.sh/build.sh).

- Always update relevant files under `docs/` AND project root folder when implementing features or refactoring.
- Record a short summary in the engine or game devlog (see `docs/devlogs/`). Devlogs are historical journals and must never drive design or implementation decisions.
- Verify the current date and time with `date -Iseconds` or `date -u` before logging entries; multiple entries per day are encouraged.
- Whenever introducing a new system or feature (rendering, input, animation, etc.), **Codex must immediately refactor all affected files, scenes and systems** to use the new implementation. Legacy code paths should be removed or rewritten in the same update unless explicitly preserved.
- Run `bash scripts/build.sh` to verify compilation before committing, but make sure `bash scripts/setup.sh` has been ran first before that

Keep new documentation concise, using Markdown headings and lists. OpenGL 4.5 via GLAD and GLFW is the default backend. Other APIs (DirectX12, Vulkan, etc.) are welcome as optional backends through the `RenderBackend` interface and should remain isolated so they can be enabled or disabled independently of the core OpenGL path and even ran in parallel with it when requested

## Codex behavioral enforcement

### Handling build or setup errors
If a proposed change results in a failed build or setup script run, Codex must:

1. Parse the error message.
2. Identify whether the failure is:
+   - A hard failure (compilation error, undefined symbol, linking error, invalid include, etc.)
+   - A soft failure (missing optional network resource, retryable apt error, non-fatal script exit)
3. Attempt to resolve only hard failures unless instructed otherwise.
4. Automatically queue a fix task for any hard failure and report the diff before committing.

Soft or irrelevant issues (like raw.githubusercontent.com failures) should be noted, but not fixed unless explicitly requested.

### Core engine/system modifications
Codex may propose changes to core engine systems (e.g., RenderSystem, Engine, GameStateManager) **without user pre-approval**, under these conditions:

1. All diffs are clearly marked as core changes.
2. The justification for the core change is included in the summary.
3. The user is reminded that approval is still required before merge.

This enables deeper debugging and performance fixes while preserving safety.
