# Purge of the Crescent Veil

Purge of the Crescent Veil is an experiment in AI-assisted game development. The project demonstrates a fully custom C++ engine and a complete game built primarily by OpenAI Codex. No third-party game engines such as Unity or Unreal are used.

---

## Engine Scope

The engine serves both the game and any other runtime systems using the simulation core. It includes:

* Core game loop and timing
* Rendering for 2D gameplay with optional 3D support (multi-backend via RenderBackend)
* Input management (GLFW-based InputManager with gamepad and remappable key support)
* Audio playback via Procedural Synth Engine with alignment-reactive sound layers
* Scene and entity management via SceneCoordinator and PhaseController
* GameManager verifies the RenderSystem before performing scene transitions
* Window-specific scene mapping isolates debug windows from game scenes
* Scenes invoke `RenderSystem::renderImGui` with their name and window index to draw per-window ImGui overlays after validating the current OpenGL and ImGui contexts; lifecycle guards restore the previous ImGui context and ensure begin/end calls remain paired
* Default OpenGL objects (sprite and batch buffers, shape texture) come from a thread-safe `SharedGLResourceFactory` which verifies the active GLFW context before creating handles so RenderSystem instances reuse them instead of regenerating copies
* `ProceduralFontGenerator` auto-loads a default vector font so UI text is available even before custom fonts register
* Asset and resource loading (no binary art assets; all visuals are generated)
* Save/load system with checkpointing and progression persistence
* Embedded Lua 5.4 scripting layer with exposed gameplay API
* Multi-scene streaming with seamless state transition
* `SystemManager` shuts subsystems down in reverse initialization order for safe teardown
* RenderSystem stops its render loop before shutting down ImGui passes and renderer bindings
* ImGui contexts are tracked and validated before destruction to avoid double teardown
* Post-processing manager for framebuffer effects

Visual Architecture

* Procedural Sprite System: All visuals are generated from primitives at runtime using ProceduralSprite and ProceduralSpriteInstance. No texture atlases or pre-rendered assets are used.
* RenderSystem: All visuals (gameplay, UI, effects) must route through the optimized RenderSystem batching pipeline. No raw OpenGL draws are allowed without restoring GL state.
* Vector Font & Procedural UI: UI is shape-driven with no bitmap fonts. Fonts and buttons are drawn via shape-based UI widgets.
* See docs/systems/procedural_sprite_system.md for details.

Physics & Biology Systems

* PhysicsCore replaces Box2D with a modular simulation stack:
* DynamicsSystem: body simulation, soft/hard constraints
* AnatomicalConstraintRegistry (biology): joint limits and muscle tension models
* MaterialPropertyBank: bone, flesh, metal, and soft tissue properties
* ReactionPatternResolver (biology): procedural wound modeling and physics-based reactions
* All reactions are physics-driven — no canned animations.
* Blood, fracture, stun, and knockback visuals are generated at runtime using chaos-weighted values.

Chaos & Quantum Systems

* EntropySystem: provides global entropy to all subsystems from real-world and simulated noise
* QuantumStateVectorManager: manages live qubit-like state and collapses for high-entropy simulation
* Collapse Oracle (ChaoticCollapseOracle): a generative system that determines state collapse from entropy spikes
* CudaStateVectorSimulator: optional GPU-accelerated simulator using NVIDIA cuQuantum
* Quantum/Entropy behavior drives chaos field effects, trauma randomness, and high-complexity interactions
* These systems power both simulation stencils and collapse-based gameplay logic
* See docs/systems/entropy_system.md and quantum_statevector_system.md for architecture

External & Data Interfaces

* TelemetryManager + SatelliteTelemetry: allows ingest of sensor data or simulated inputs
* Hardware-in-the-Loop Interface (HIL): supports external signal/feedback integration
* All entropy and telemetry systems are sandboxed and fail-safe

Reference Architecture

* /docs/reference/ houses all real-world reference manifests (physics, visuals, AI, chemistry, audio, etc.)
* These documents feed Codex and future AI agents with simulation-accurate material behavior and design logic
* Each manifest contains live external sources (NASA, NIST, PubMed, etc.) used for procedural generation
* See docs/reference/README.md (if present) or AGENTS.md for usage expectations

## Modular Engine Structure

The engine has been reorganized into a tree of independent subsystems. Each
component now resides in its own folder under `/engine/` and can be replaced
without disturbing the core loop. The progress of this refactor is tracked in
[docs/modular/engine_system_tree.md](docs/modular/engine_system_tree.md).
Refer to that document for the latest status of each subsystem.

## Game Scope

The game is a grimdark action roguelike with strong faction systems and character progression. Key focuses include:

* Dynamic faction alignment
* Powers and Rites (abilities) with upgrades
* Varied enemy encounters and bosses
* Inventory, powerups and progression between runs
* Hub and stage structure supporting the main game loop
* Additional systems include Achievement tracking, Chapter progression,
  alignment-aware Narrative Events, a multi-phase Boss framework,
  prototype Space Combat, and a modular Hub scene.
* All visual systems use runtime-generated procedural sprites (see: `createPlayerSprite()`, `createBaseEnemyVisual()`, etc.)

## Project Constraints

* **No Unity, Unreal or similar engines**
* **CODEX-first**: the engine and game are generated through AI guidance
* C++ codebase with minimal external dependencies
* All gameplay systems are modular: any system can be added, removed or replaced without affecting unrelated modules
* Repository content is open for future public release
* OpenGL 4.5+ core profile remains the primary backend.
* The engine can also compile with other rendering systems via the `RenderBackend` interface.
* Additional rendering backends such as Vulkan, DirectX 11/12, Metal and Android GLES are now integrated into the core engine. OpenGL remains the stable default.
* GLAD2 is used for loading OpenGL functions and the loader is generated at configure time
* GLFW handles window and input management but does not mean others may not be modulated in as alternative backends
* OpenAL Soft is used for audio playback
* PhysicsCore now provides the physics simulation, replacing the former Box2D integration.
* Visual Studio 2022 is required for Windows builds. Use `scripts/setup.sh` to
  configure and build the project through CMake.
  **Run `setup.sh` at least once before invoking `build.sh`** so the build
  directory (such as `out/build/linux-debug` or the matching preset on Windows)
  exists. The script detects the host OS. Windows builds always use the Visual
  Studio preset by default. Build files are generated under
  `out/build/windows-release` on Windows or `out/build/linux-release` on
  Linux. Debug builds default to `out/build/windows-debug` or
  `out/build/linux-debug`. You can still pass a custom directory as the second
  argument.

Modularization is in progress. See [docs/modular/game_system_tree.md](docs/modular/game_system_tree.md) and [docs/modular/engine_system_tree.md](docs/modular/engine_system_tree.md) for the current status of every system. A system stays **In-Progress** until its documentation, cleanup, and tests are merged and verified.

## Quick Build Guide

1. Run `bash scripts/setup.sh <config>` to configure the build and fetch all dependencies. Set `<config>` to `Debug` or `Release`. **Allow the script to finish successfully before continuing; the first run can take several minutes while third-party libraries build.**

   * When no build directory is provided, the script defaults to the preset directory under `out/build`.
2. After `setup.sh` completes without errors, compile the project with `bash scripts/build.sh <config>`. This script expects the directory created by `setup.sh`.

3. Setup may output warnings for optional components such as **OpenAL** or **cuTensor**. These are expected and logged to `setup_warnings.log`.

## Folder Structure

```
/engine/          Custom C++ engine code
/engine/core/     Non modular engine components
/engine/modules/  Modular engine components
/game/            Game layer root
/examples/        Small usage examples
/docs/            Design documents, lore, references, and constraints
/scripts/         Build and setup scripts
/game/assets/     Stage definitions, music, localization, no textures used
/game/modules/    Modular game systems
/game/core/       Non modular game components
```

## Environment Setup

Install the Jinja2 package used by the build system:

```bash
python3 -m pip install --user --upgrade jinja2
```

The helper script `scripts/setup.sh` installs Jinja2 automatically using this
command on both Linux and Windows. Manual installation remains optional if you
prefer, but the build will fail if Jinja2 is missing when GLAD sources are
generated.

### Build Prerequisites

* CMake 3.25 or newer. Older versions may fail during configuration
* A C++17 compiler (Visual Studio 2022 on Windows or GCC/Clang on Linux)
* OpenGL 4.5 capable GPU and drivers
* NVIDIA cuQuantum 25.06.x with CUDA 12.0+ for GPU-based quantum features (enabled by default; disable with `-DCV_ENABLE_CUQUANTUM=OFF`)
* Engine quantum subsystem builds by default; disable with `-DCV_USE_ENGINE_QUANTUM=OFF`
* Git and Python 3. The GLAD loader is generated via `python3` during
  configuration. Ensure Python 3 is available in your `PATH` or set
  `Python3_EXECUTABLE` when running CMake. Jinja2 is also required.
* On Linux, development packages for OpenGL, GLFW and OpenAL Soft (installed automatically by `setup.sh`)

If the FetchContent steps fail during configuration, set an appropriate access token
environment variable and retry cloning as explained in `AGENTS.md`. Use URLs in
the form:

```
https://<OAUTH_TOKEN>:x-oauth-basic@github.com/<repo>.git
```

## Shader Usage

Shaders are written in GLSL targeting OpenGL 4.5 core profile. They are compiled at runtime by the engine.
No binary shader blobs are kept in source control. When Vulkan or other backends require compiled shaders the build scripts invoke `glslc` to generate `.spv` files under the build directory.
All backends should function independently of each other when or if conflicts arise.

### Binary Asset Policy

No compiled binaries (`.spv`, `.dll`, `.exe`, `.bin`, etc.) are tracked in the repository. Any required binaries are produced automatically during the build. Commit the source files instead, such as `.vert`, `.frag` or `.comp` shader sources.

## CODEX Usage Notes

Codex contributors should:

* Follow the established folder structure
* Keep systems modular and well documented
* When adding new systems or features, update existing files and scenes to use the new implementation. Remove or rewrite legacy code unless a file is specifically marked for preservation.
* Reference `/docs/` for design guidance and constraints
* Refer to `docs/systems/procedural_sprite_system.md` when modifying any visual logic
* Maintain the custom engine approach
* Use `std::filesystem::path` for file operations and normalize paths to forward slashes for cross-platform logging
* Verify the current date with `date -Iseconds` or `date -u` before appending to `docs/devlogs/*.md`
* Run `bash scripts/build.sh` after making changes to confirm the code still builds as noted in `AGENTS.md`
* Multiple devlog entries in a single day are encouraged; never future-date updates

## Status

**Phase 9 – Feature Expansion/Refactoring & Gameplay Polish**

## Logging and Debugging

Release builds keep info and debug logs enabled by default thanks to `CV_FORCE_LOGS`.
You can disable this during configuration with `-DCV_FORCE_LOGS=OFF`.
Collapse lineage tracking is disabled unless built with `-DCV_ENABLE_COLLAPSE_LINEAGE=ON`.

During startup, `Engine::Init` logs each window's render system pointer and ImGui context for verification. Scenes then call `RenderSystem::renderImGui` with their name and window index to render per-window overlays after confirming both contexts remain valid.

See `docs/dev_logging_debugging.md` for runtime log info and shader capture tools.
The optional secondary debug window draws its overlay via `engine/modules/debug/overlay/DebugOverlayWindow.cpp`.

## Running the Game

```bash
./build/crescent_runtime    # or build\crescent_runtime.exe on Windows
```

Command-line options:

* `--vulkan1` – use the standard Vulkan backend
* `--vulkan` – launch with the Vulkan2 renderer
* `--vulkan-rtx` – enable the Vulkan RTX pipeline
* `--dx11` – DirectX 11 backend (Windows only)
* `--dx12` – DirectX 12 backend (Windows only)
* `--dx12-rtx` – DirectX 12 RTX backend (Windows only)
* `--metal` – Metal backend (macOS only)
* `--android-gles` – Android GLES backend (Android only)
* `--lang <code>` – override language selection
* `--display-config <file>` – load display setup from JSON
* `--cloud-save` – enable cloud save features
* `--autotest[=<seconds>]` – run automated tests and quit
* `--debug` – force debug log level
* `--nosafety` – bypass progress checks

Each window can specify its backend type in `game/assets/config/display.json`.
The optional `default_backend` field defines the fallback backend when a window
entry omits `backend` or provides an unknown value. If no per-window backend is
present the command line flags select the default for all windows.
When multiple GPUs are present the configuration file may also specify a
`device` index per window so rendering backends and the quantum simulators can
run on different cards. This enables multi-GPU setups and can be overridden at
runtime with command line options where supported.

## Running Unit Tests

Unit tests build by default and `scripts/build.sh` automatically runs
`ctest` after compiling. **Run `scripts/setup.sh` first** so the build
directory exists, then invoke the build script:

```bash
bash scripts/setup.sh Debug out/build/linux-debug
bash scripts/build.sh Debug out/build/linux-debug
```
Test results are written to `logs/tests.log` and the previous log is
rotated with a timestamp each run. The suite includes
**cv_chaotic_seed_fuzz_tests**, **cv_chaotic_seed_isolation_tests** and
**cv_hybrid_simulator_override_tests** along with additional engine and
game checks.

## Example Executables

Two small demo programs are available under `examples/` and `engine/examples/`.
These targets are excluded from normal builds and only compile when
`BUILD_TESTING` is enabled (for example with `CV_BUILD_TESTING=ON`).

* **cv_stringutils_example** – shows the utility helpers in
  `examples/utils/string_utils_example.cpp`.
* **cv_backend_validation** – located in
  `engine/examples/backend_validation`, opens one window per rendering
  backend.

## Backend Validation Example

The engine ships with a small demo named `cv_backend_validation` that opens one
window per available rendering backend. Each window displays a rotating line so
you can confirm initialization and presentation across APIs.

```bash
./cv_backend_validation --display-config=game/assets/config/backend_validation.json
```

The JSON file lists every backend (OpenGL, Vulkan1/2/RTX, DirectX 11/12/RTX,
Metal and Android GLES). `MultiDisplayManager` uses it to spawn and present each
window simultaneously, reading the entire `windows` array to support any number
of displays.
