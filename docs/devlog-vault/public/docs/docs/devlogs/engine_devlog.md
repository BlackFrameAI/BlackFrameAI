# engine_devlog.md

Chronological notes on engine updates.

> - Run `date -Iseconds` or `date -u` before writing an entry to confirm the current date and time.
> - Use the real-time date for every entry. Multiple updates per day are encouraged.
- Avoid projecting future dates when documenting work.
> **Timestamp Style:** bullet entries start with time in `HH:MM:SSZ`. Use `--` when the exact time is unknown.

## Monthly Index
- [2025-06](#2025-06)
- [2025-07](#2025-07)
- [2025-08](#2025-08)

### 2025-06
## 2025-06-07
- -- Repository structure established with EngineCore, SystemManager and EventSystem scaffolds.
- -- First compile produced a runnable 300-frame loop.

## 2025-06-08
- -- Added SceneManager, GameManager, InputManager and TimerManager.
- -- Began integrating AudioManager.

## 2025-06-10
- -- Initial post-processing stack integrated into the renderer.

## 2025-06-12
- -- Established shader debug pipeline for inspecting intermediate stages.

## 2025-06-13
- 08:42:11Z BackgroundRenderer sheds the direct RendererFacade dependency; BatchVertex now lives in render/SharedPrimitives.hpp so both modules stay acyclic.
- 09:15:37Z GLAD regenerated with binary loader support; validation script captured hash 74f3b6d and archived the generated headers.
- 12:28:05Z RendererFacade boots against the live window, records frame hash 9c4a-d6, and logs GPU time 11.4ms for Frame 0001 on the studio dev tower.
- 12:41:26Z RenderSystem telemetry now streams per-frame metrics into LogChannel; Grafana lane render-frame-times confirmed steady 60Hz packets tagged frame-proof-1.

## 2025-06-14
- -- Added multi-scene streaming to support seamless transitions.

## 2025-06-15
- -- Improved SaveSystem with more reliable checkpoint writes.
- -- Stabilized build pipeline by un-vendorizing dependencies and updating setup script.

## 2025-06-16
- -- Documented devlog locations in README.
- -- StageManager now issues callbacks to SaveSystem after waves, boss phases and
  interactions to auto-save the active profile.
- -- Added DisclaimerOverlay showing legal notices on first launch.
- -- Integrated GLFW joystick callback for gamepad detection.
- -- Player controller and menu now respond to basic buttons.
- -- Added color customization to AlignmentOverlay and ReputationOverlay.
- -- RenderSystem exposes overlay color setters for hub UI reactions.
- -- SaveSystem now supports `BackupCurrentRun` for manual backups.
- -- Added a simple Hub menu overlay to trigger backups.
- -- AudioManager now supports multiple buffers per channel with volume blending.
- -- Alignment values drive cross-fades between ambient, combat and boss tracks.
- -- Added small unit test executable `cv_audio_tests`.
- -- Stage definitions now load from `game/assets/stages` on startup.
- -- StageManager selects one randomly each run and sets the enemy pool.
- -- StageProgressOverlay displays the chosen stage's lore snippet.
- -- StageDetailOverlay shows stage name and lore at the start of each stage.
- -- Added AchievementsOverlay to list unlocked achievements.
- -- Integrated FactionReputation persistence in SaveSystem.
- -- Updated GameManager save/load routines.
- -- SaveSystem can now sync with `saves/cloud` when initialized with the cloud
  flag.

## 2025-06-17
- -- StageDetailOverlay now accepts faction control and alignment parameters.
- -- StageManager forwards world state when showing stage intros.

- -- NoticeOverlay now shows altar results via `showAltarResult`.

- -- Fixed MSVC warnings by adding <cstdint> includes and explicit casts for stb_easy_font_print; replaced double to float conversions.
- -- Introduced RenderBackend interface and OpenGLBackend implementation as scaffolding for future rendering APIs.

- -- Added Vulkan2Backend with basic device and swapchain setup; implementation continues.
- -- RenderSystem now selects OpenGL or Vulkan via the `--vulkan` flag.
- -- Build system links against Vulkan SDK.

- 19:19:56Z Integrated SatelliteTelemetrySystem for optional real-world tracking data.
- -- QuantumSimulator exposes simple qubit operations to CombatSimulator.
- -- Added AdaptiveTrainer and OpposedForceTrainer modules for scenario scaling.

- 19:27:50Z Documented SatelliteTelemetrySystem usage under `/docs/systems/satellite_telemetry.md`.
- -- Added reference link in `gameplay_systems.md`.
- 19:35:32Z RenderSystem now delegates frame operations to RenderBackend. Initialization creates the proper backend and calls its lifecycle methods.
- 20:45:45Z RenderSystem stores the backend in a `std::unique_ptr` and no longer keeps the
  GLFW window handle. The backend receives the window directly during
  initialization and handles resize events.
## 2025-06-19
- 18:07:04Z Added initial SEED scaffolding with kernel slot manager and brokers.
- -- Updated build system and docs to reference SEED layer.
- 20:10:46Z Implemented dynamic kernel loading with promotion and rollback.
- -- SeedCore now manages kernels at startup and via external requests.
- -- Added example unit test and updated documentation.
- -- Introduced `dummy_kernel` for `KernelSlotManager` unit tests.

- 20:25:55Z Added SeedControl command queue for kernel updates.
- -- SeedCore now processes queued upgrade/rollback requests.
- -- Documentation updated with new interface.

- 20:53:30Z Introduced GpuBroker, AudioBroker and InputBroker under `engine/modules/seed/brokers`.
- -- RenderSystem, AudioManager and InputManager now use these brokers.
- -- Engine initialization requests brokers from SEED layer and passes them to managers.
- 21:03:34Z Added SeedAllocator providing per-context allocation tracking.
- -- SeedCore now creates allocators for the SEED layer and loaded kernels.
- -- MemoryTracker supports named contexts and reports per allocator.
- -- Documentation updated with new allocator design.

- 21:22:55Z KernelSlotManager now cleans up loaded kernels in its destructor and calls
  each kernel's `kernel_shutdown` before unloading.
- -- SeedCore destructor deletes the slot manager to ensure kernels are unloaded.
- 21:49:09Z Confirmed brokers are instantiated directly by Engine rather than requested from SeedCore.
- -- Updated documentation to clarify broker ownership.

## 2025-06-20
- 00:15:19Z Added TelemetryManager under `engine/modules/telemetry`.
- -- SatelliteTelemetrySystem now supports multiple API endpoints and offline JSON files.
- -- Documented telemetry manager usage and updated gameplay systems list.


- 00:58:29Z Introduced MultiDisplayManager for multi-window setups. Displays are
  loaded from `game/assets/config/display.json` or via `--display-config`.

- 04:25:44Z Added HILInterface for basic hardware-in-the-loop communication.
- -- Documented usage and updated gameplay systems overview.

- 11:58:13Z Clarified Vulkan package comment in `scripts/setup.sh`.
- 12:05:46Z build.sh now checks that the build directory exists and instructs the user to run setup.sh if missing.
- 15:35:58Z Documented command-line flags and noted `cmake --preset` usage in README.
- 15:41:42Z Added section on using CMake presets with linux-release example.
- 16:09:53Z Documented how to run unit tests with ctest in BUILD.md.
- 16:26:14Z setup.sh and build.sh now validate BUILD_TYPE and print usage if an invalid value is provided.
- 18:24:37Z Added DirectX 11, DirectX 12 and Metal backend scaffolds with implementation planned. Backends selectable via new command line flags.
- 19:32:40Z libcurl is now fetched automatically if no system installation is found.
- -- Added libcurl to dependency table in BUILD.md.
- 19:47:46Z Guarded alias creation for fetched libcurl target in CMakeLists.txt.
- 23:06:50Z Tests now place dummy_kernel outputs in tests/<config> using generator expressions.
- 23:21:15Z Added RuntimeLauncher tool to easily launch the game with common flags.

## 2025-06-21
- 00:28:09Z MultiDisplayManager now falls back to default display parameters when the
  configuration file cannot be read or parsed. The fallback is logged in
  `runtime.log`.

- 00:36:41Z Added `--single-window` command line option. When used the engine opens one
  window with default parameters and ignores any display configuration file.

- 00:48:32Z MultiDisplayManager currently only uses the primary window. Additional windows remain placeholders.
- 01:05:53Z Fixed MemoryTracker recursion when allocating the default context by using std::malloc and placement new.
- 01:15:58Z Added stack overflow diagnostics via vectored and alt signal handlers.

- 03:50:09Z Statistics window is now actively used. Render backends no longer swap buffers directly; MultiDisplayManager handles presentation.
- 04:42:00Z Additional windows now display FPS via dedicated StatsRenderSystem.
- 04:48:42Z Fixed transition scene initialization order in SceneManager.

- 06:49:31Z Added ButtonElement for clickable UI labels and extended UIManager to manage buttons.

- 07:03:54Z Added PlayerPositionOverlay with toggle via 'P' key.
- 14:41:42Z Introduced ProceduralSprite system for shape-based rendering without textures.

- 19:19:05Z SaveSystem now logs parse errors and renames corrupted files so slots recover
  gracefully. Failed writes also emit warnings.
- 22:24:13Z Overlays can now be anchored to screen corners. RenderSystem and UI layout files accept anchor values like `top_left`.
- 22:50:19Z Added project_roadmap.md documenting major milestones and upcoming goals.
- 23:01:22Z Engine now instantiates a TelemetryManager and exposes it to the Game layer.
- -- SatelliteTelemetrySystem registers as a telemetry source during StartGame.
- 23:20:52Z SaveSystem now stores player inventory and learned abilities. Load routines
  parse the new arrays for restored checkpoints.

## 2025-06-22
- 00:03:59Z ProceduralSpriteFrame now merges `SpriteParams` providing rotation, scale,
  tint color and animation time. Procedural sprite factories updated to set
  these fields.

- 00:20:13Z RenderSystem now supports line and polygon drawing via new `drawLine` and `drawPolygon` methods.
- -- CMake compiles GLSL shaders with `glslc` when Vulkan is enabled.
- 00:38:10Z Added drawRectScreen and drawCircleScreen in RenderSystem. RectangleElement and ButtonElement now call these to avoid camera offsets.

- 02:04:56Z ProceduralSprite system now stores frames with rotation, scale, tint and animation time.
- -- Added screen-space rectangle and circle helpers for UI overlays.

- 06:21:59Z Implemented minimal vector font and `drawTextScreen` helper.
- -- HUD overlays and buttons now render text via the vector font instead of `stb_easy_font`.


- 06:26:57Z Added ProceduralUI helpers for frames, buttons and bars; UI overlays now build from ProceduralUISprite.
- 06:53:27Z Tracked alt stack, audio decode and texture load allocations via MemoryTracker contexts.

- 07:24:40Z Engine instantiates HILInterface and wires logging callbacks during Game initialization.
- 09:13:22Z Added NetworkSimulationManager instance in Engine and Game.
- -- Documented networking overview in engine_design.md.

- 10:35:08Z Added `--cloud-save` flag to enable SaveSystem cloud syncing. Engine passes true to `SaveSystem::initialize` when the flag is used.

- 11:10:23Z Added SpaceVisuals with procedural sprites for ships and star map.

- 12:49:01Z MultiDisplayManager now exposes `windowShouldClose` and Engine checks every
  window each frame.
- -- InputBroker attaches callbacks to all created windows so events are captured
  regardless of which window is focused.

- -- Powerup struct stores a `ProceduralSpriteInstance` so frames advance correctly.
- 14:30:44Z Removed unused ProceduralSpriteEntity struct and header.
- 16:52:43Z `AudioManager::StopSound` now tracks each playing source by ID and stops only the requested sound.
- 17:20:02Z Removed `texture` members from `Enemy` and `Powerup` structs.
- -- Rendering branches checking GL handles eliminated.
- 17:34:01Z SaveSystem serializes physics body velocities, network frame and HIL
  connection info so runtime state is fully restored.
- 20:08:43Z Engine initializes NetworkSimulationManager on port 7777.
- 20:29:27Z Added runtime sprite variant switching helpers.
## 2025-06-23
- 01:07:22Z PlayerStatusOverlay replaced text with procedural health and shield bars.
- -- ButtonElement now scales on hover/press and renders a border glow.
- 01:29:49Z Camera2D now implements a `shake` method used by gameplay systems.
- 01:48:56Z `SpriteParams` gained a `tintColor` field. `ProceduralSpriteFrame` multiplies this with the frame tint when drawing.
- -- `ProceduralSpriteInstance` can now override tint via `setTintColor()` for dynamic recolors.
- 02:53:54Z Normalized project and executable path helpers with `make_preferred`.
- 03:58:06Z Added SynthEngine for procedural audio synthesis. Engine now initializes it alongside AudioManager and updates it each frame.

- 04:18:06Z Fixed Windows build error in `SynthEngine.cpp` by defining `_USE_MATH_DEFINES` and `M_PI` fallback.

- 04:51:59Z Removed legacy animation loading for the player. Placeholder files under `game/assets/` were deleted and the player sprite now relies solely on `ProceduralSprite` definitions.

- 05:03:09Z Removed unused audio placeholder file. Docs updated to reflect cleanup.
- 05:31:19Z StatsRenderSystem now reloads GLAD per window after making the context current.

- 05:35:59Z MultiDisplayManager now resets the current context to the primary window after
  creating all windows. Each window's context reloads GLAD when initialized.
- 05:57:04Z RenderSystem warns when draw calls occur before initialization and exposes isInitialized() helper.

- 06:06:06Z Main menu rendering checks VAO, VBO, program before binding. Warns and skips draw when missing.

- 06:30:13Z Added `DebugOverlayRenderer` for drawing bounding boxes with per-layer colors.
- -- `ProceduralSpriteFrame` now stores optional bounds and `ProceduralSpriteInstance`
  renders them when visual debug mode is active.
- 06:40:26Z `ProceduralSpriteInstance` tracks the last frame it rendered and logs a warning when unused for over 120 frames.
- -- `DebugOverlayRenderer` now tallies box draws per label and skipped draws, printing a summary every 60 frames.
- -- Added global frame counter hooked into `Engine::Run` and exposed via `frame_counter.h`.
- 15:08:09Z Added RenderDebugOverlay to visualize draw order and sprite counts per layer. Camera bounds and off-screen sprites highlight in red. Overlay toggled with 'L'.
- 15:19:06Z RenderSystem exposes `setVisualDebugMode` to enable bounding box overlays via `DebugOverlayRenderer`.
- -- DebugController now toggles this mode with F2 and logs the state. Particle spawning moved to the 'K' key.
- 15:50:52Z Added AudioEventTracker for logging playback events.
- -- AudioEventOverlay renders the last events and can be toggled with F5.
- -- F6 dumps recent audio events to CSV.
- 16:20:32Z Documentation clarified: F5 toggles AudioEventOverlay and F6 writes audio events to CSV.
- -- Log and save slot overlays no longer have bound debug keys.
- 16:50:39Z build.sh now chooses build directory based on host OS using uname.
- 16:59:17Z setup.sh now calls cmake with Visual Studio generator on Windows.

- 20:35:01Z StatsRenderSystem now restores the previous GLFW context after drawing.
- 20:39:48Z Crash dumps now capture GPU state to gpu_state.txt.

- 21:05:54Z captureGpuState now logs scissor box and framebuffer.
- -- Scenes record GPU state on entry for debugging.

- 21:26:27Z Added logDrawState helper to validate GL context before each draw call.
- 21:38:14Z `ProceduralSpriteInstance::render` now checks `RenderSystem` initialization and
  required sprite VAO/VBO/program IDs before issuing draw calls.
- 21:53:12Z Scenes now unbind GL state before deleting resources. MainMenuScene updated accordingly.
- 22:21:23Z StatsRenderSystem logs the current GLFW context after drawing and restores the main context if it changed.
- 22:37:33Z `logDrawState` no longer reports the default framebuffer or an unbound array
  buffer as invalid. Only a missing VAO, shader program or zero-size viewport
  triggers a warning.

- 23:19:43Z Added validation for OpenAL sources in SynthEngine and AudioManager to prevent crashes when broker is missing.

## 2025-06-24
- 00:17:54Z - Added lifetime checks for callbacks using raw 'this' captures.
- 01:25:19Z UI overlays now verify program, VAO and VBO IDs before drawing and log warnings when missing.
- 01:36:58Z Added isValid checks for all GL-based overlays and updated RenderSystem to skip rendering when resources are missing.

- 01:43:56Z VectorFont now logs a warning when a requested glyph is missing.
- -- StageProgressOverlay draws lore on a separate line to avoid newline characters.
- 01:56:35Z Procedural sprite helpers and SynthEngine now log construction and queued notes for easier debugging.

- 03:14:25Z Draw calls log vertex counts and warn when `logDrawState` fails with state details.

- 05:47:12Z Added overlay position logging flag in RenderSystem with runtime toggle via the DebugController.


- 06:00:34Z Scene transitions now resize the renderer using the current framebuffer size to refresh UI projections.
- 06:08:24Z StatsRenderSystem now accepts a RenderSystem pointer so overlays can issue debug draw commands in stats windows.

- 06:19:13Z StatsRenderSystem logs SystemInfoOverlay validity and resource IDs before rendering and records the vertex count and program after drawing.

- 06:39:10Z StatsRenderSystem falls back to placeholder FrameTiming when no FrameTimer is available so the stats window remains informative.

- 06:54:11Z Stats windows now verify SystemInfoOverlay initialization and log the result per window.
- 07:10:11Z OpenGL initialization now checks for `GL_KHR_debug` and enables the debug callback automatically when available.
- 07:34:42Z Documented the CV_GL_DRAW wrapper and frame-end context logging.
- -- Engine now requests a debug OpenGL context by default.
- 08:17:31Z Added `Center` option to `OverlayAnchor` and updated layout parsing.
- -- SystemInfoOverlay now color-codes the FPS line.
- -- UI overlays draw bounding boxes when position logging and Visual Debug Mode are enabled.
- -- RenderSystem exposes adjustable UI font scale with [`[`] and [`]`] keys via DebugController.
- -- StatsRenderSystem logs current GL bindings after drawing the overlay.
- 08:36:06Z Added additional overlay anchors (top_center, bottom_center, center_left, center_right).
- -- VectorFont optionally draws drop shadows controlled by a debug toggle.
- -- RenderSystem now supports global HUD opacity and a grid overlay.
- -- Added grayscale post-processing pass toggled via DebugController.

- 16:17:54Z InputBroker now validates the event source window and ignores events from secondary windows when blocked.
- -- DebugController F9 toggles secondary window input blocking and score overlay.
- 16:32:52Z Added validation for drawTextScreen parameters and VectorFont input.
- -- GameUIManager::LoadLayout now logs invalid fields and skips bad overlays.
- -- SpaceManager logs invalid numeric conversions when ingesting telemetry.
- 17:14:14Z Removed legacy test sprite from Game::Init.
- -- Overlays now use anchor-based positions and scale with the current resolution.
- -- Added AnchorDebugOverlay to visualize UI anchors (toggle with 'C').
- -- handleResize logs view size and camera bounds.
- 17:26:29Z Added optional `CMakeExtras_TestTargets.cmake` with all demo and test targets excluded from default builds.
- -- Core build now skips tests and examples unless explicitly invoked.
- 17:56:51Z RenderSystem now supports verbose draw logging toggled via DebugController F10.
- -- drawRectImpl and related helpers log at DEBUG level when enabled.
- 20:27:41Z Debug overlays now render only on secondary windows when available. Added --invert-window-roles flag.
- 20:44:46Z logDrawState and logCurrentBindings now only emit INFO output when verbose draw logging is enabled via DebugController F10.

- 21:02:59Z Build pipeline now uses ccache and unity build when available. Added global PCH and optional INFO log control.

- 21:58:31Z Enabled automatic detection of sccache or ccache in CMake.
- -- Added MSVC linker optimizations and disabled iterator debugging in Debug builds.
- -- Updated CMake presets with a default Windows Ninja configuration.
- 22:31:35Z Fixed Windows build warnings by casting JSON port values and ensuring NOMINMAX is defined before including Windows headers.

- 22:50:00Z Added missing manager includes in `scripting_system.cpp` to resolve Boss and Hub upgrade usage.
- 23:39:03Z Replaced overlapping `std::transform` calls with in-place loops to avoid MSVC iterator warnings.
- 23:47:24Z Reviewed Windows include guards; all `windows.h` usages already define NOMINMAX.
## 2025-06-25
- 00:09:26Z Resolved final MSVC warnings and corrected engine headers, allowing Windows Ninja Release builds.

- 00:22:34Z Audited all translation units for Windows macro collisions.
- -- Defined `NOMINMAX` at the top of:
  - `engine/render_system.cpp`
  - `engine/modules/seed/kernel/KernelLoader.cpp`
  - `engine/modules/seed/core/SeedCore.cpp`
  - `engine/core/system/system_info.cpp`
  - `engine/core/util/file_utils.cpp`
  - `engine/modules/debug/diagnostics/diagnostics.cpp`
  - `tools/RuntimeLauncher/main.cpp`

- 00:34:16Z Cast all `size_t` counts to `unsigned` in `Game::Render` to resolve MSVC warning C4267.
- -- Guarded `APIENTRY` before including `windows.h` to eliminate macro redefinition (C4005).
- 00:47:53Z Removed `/w` compile flag from `stb_vorbis.c` and rely on `/W4` for all targets.
- -- Included `windows.h` before GL headers and added `WIN32_LEAN_AND_MEAN` guards.
- -- Eliminated manual `APIENTRY` definitions in Windows translation units.
- 01:25:25Z Renamed local variable `n` to `part_size_local` in `decode_residue` (around line 2263).
- -- Replaced temporary page header variables with uniquely named `page_index`, `crc_local`, `goal_local`, and `len_local` in `vorbis_find_page` (lines 4579-4603).
- -- Added explicit casts for 32-bit file offsets in `set_file_offset` and OpenAL helpers (lines 4770, 4774, 5057, 5076, 5078).

- 01:40:09Z OpenAL `voice.cpp` patched post-fetch to suppress MSVC warnings.
- -- Patch stored in `engine/external/patches/openal/voice.cpp`.

- 02:01:11Z Created `platform/WinHeaders.h` to centralize Windows header guards.
- -- Replaced all direct `<windows.h>` inclusions with this header.
- -- Added the engine include path for `RuntimeLauncher` in CMake.

- 02:08:23Z `SystemInfo` now detects Windows versions using `IsWindows10OrGreater` and
  `IsWindows8Point1OrGreater` from `VersionHelpers.h`.
- -- Removed the deprecated `GetVersionEx` call and its warning suppression block.

- 02:14:38Z Added post-fetch patches for glfw and imgui to avoid `APIENTRY` conflicts on Windows.
- -- Each patch is copied into the fetched source tree using `configure_file`.

- 02:30:12Z Consolidated Windows macros through CMake compile definitions.
- -- Removed local `WIN32_LEAN_AND_MEAN` and `NOMINMAX` blocks from engine sources.
- -- All Windows includes now go through `platform/WinHeaders.h`.

- 02:36:49Z Introduced `WinHeaders.h` as the central Windows include.
- -- Removed deprecated APIs and old warning suppression macros.
- -- Automated patches now update dependencies after fetch.

- 03:35:49Z `CMakeLists.txt` now copies patched `win32_platform.h` and `imgui_impl_opengl3_loader.h`
  into the fetched glfw and imgui sources.
- -- `scripts/build.sh` succeeds after re-fetching the dependencies.

- 03:49:04Z Added `cv_apply_win_defs()` helper in `CMakeLists.txt` to apply Windows macros.
- -- Updated RuntimeLauncher, cv_example and test targets to use it.
- -- Documented the function in `BUILD.md`.

- 04:06:46Z Introduced `ApiEntryFix.h` to centralize the APIENTRY macro.
- -- `WinHeaders.h` now includes this file after `windows.h`.
- -- Updated glfw and imgui patches to rely on the shared definition.

- 04:24:39Z MSVC builds now treat warnings as errors for both Debug and Release.
- -- Added `CV_DIAGNOSTICS_WARNINGS` option to enable `/Wall` when desired.

- 04:33:32Z Replaced `CV_DIAGNOSTICS_WARNINGS` with `CV_DIAGNOSTIC_BUILD` for a unified
  diagnostics toggle.
- -- Added a new CMake preset `windows-diagnostics` and documented its usage in
  `BUILD.md`.

- 04:40:31Z Added a check in `CMakeLists.txt` that aborts if `/w`, `-w` or `/WX-` appear in
  `CMAKE_C_FLAGS` or `CMAKE_CXX_FLAGS`.
- -- `scripts/setup.sh` now scans `CFLAGS` and `CXXFLAGS` for the same patterns and
  stops early if found.

- 04:48:49Z Added patch verification checks after dependency fetches in `CMakeLists.txt`.
- -- New compile-time tests verify glfw, imgui and openal patches.

- 04:55:56Z Added warning regression checks using `try_compile`.
- -- Configuration now fails if C4267, C4244 or deprecated API warnings are not treated as errors.

- 05:02:29Z Build script now writes full build output to `logs/build_<timestamp>.log` using
  `tee` so warning messages are preserved between runs.

- 05:29:44Z Render and save systems no longer include game headers directly.
- -- Added forward declarations and local includes to keep engine layer independent.
- 05:48:35Z Moved GLFW include macros into new `engine/platform/GLFWHeaders.h`.
- -- Updated Vulkan, GPU and Input broker headers to use the shim.
- -- `render_system.cpp` now includes the shim instead of raw defines.

- 06:08:53Z Added separate precompiled header `game/core/pch.h` for the runtime.
- -- `crescent_runtime` now uses this PCH while `cv_engine` keeps `engine/core/include/pch.h`.
- 06:24:28Z Switched to `<nlohmann/json.hpp>` for JSON parsing across the codebase.
- -- Added `nlohmann_json` interface library in CMake and moved the header under `engine/external/nlohmann`.
- 06:47:38Z Non-unity build now compiles cleanly. Added missing includes for the engine and used `using ISystem::initialize` in subsystems to silence overloaded-virtual warnings.

- 07:06:56Z Replaced raw GLFW include in `Engine.cpp` with the new `platform/GLFWHeaders.h` shim.
- -- Added `<glad/gl.h>` before the shim to avoid header order issues.

- 07:12:56Z `RuntimeLauncher` no longer reuses the engine PCH and compiles without a
  precompiled header in non-unity builds.
- 14:11:54Z ScriptingSystem now registers callbacks via GameScriptBindings. Engine no longer includes game headers for script integration.
- 18:39:06Z Lua now builds with `LUA_USE_POSIX` so `mkstemp` replaces `tmpnam` in loslib.
- 20:44:31Z `RenderSystem::beginFrame` now binds the rect VAO and color program so
  early `ProceduralSpriteInstance::render` calls have a valid GL state.

- 21:47:19Z Primitive draw helpers now keep VAOs and VBOs bound so procedural sprites render reliably.

- 23:05:50Z SpaceManager now resizes `m_fleetSprites` to match active fleets. Prevents accumulated
  `ProceduralSpriteInstance` warnings when fleets are removed.
- 23:28:52Z Fleet sprites only update when the star map is visible to avoid
  'not rendered for XXX frames' logs.
## 2025-06-26
- 00:00:17Z Procedural UI sprites now assign descriptive names after frame creation.
- 02:17:30Z RenderSystem validates UI bindings after each overlay render when verbose draw
  logging is active.
- 02:36:07Z Documented requirement to rebind the default rect VAO and shader when overlays use custom GL state before calling `ProceduralSpriteInstance::render`.

- 03:00:06Z Added bindDefault2DState to restore rect VAO/VBO after overlay initialization.

- 03:14:33Z UI elements using ProceduralSpriteInstance now call `bindDefault2DState()`
  immediately before rendering to guarantee GL state.

- 03:20:44Z Documented that overlays must preserve or restore GL bindings when they use
  custom VAOs. The new `bindDefault2DState()` helper ensures the default rect
  VAO and color program are active for subsequent overlays.

- 04:21:27Z Logger now respects a runtime log level. Added `--debug` flag and CMake option
  `CV_ENABLE_DEBUG_LOGS`.


- 15:10:00Z Marked drawRectImpl and drawCircleImpl owner parameter as [[maybe_unused]] to avoid -Werror warnings when debug logs are disabled.

- 15:56:22Z ProceduralSpriteInstance now tracks inactivity and returns `false` from `update()` when a sprite has not been rendered for 240 frames. StageManager and ParticleManager remove these dormant instances.
- 16:06:57Z ProceduralSpriteInstance stores an optional source string. Debug overlay and crash dumps list this source.
- 16:39:17Z Began migrating overlays to ProceduralSprite. Achievements overlay now generates text via VectorFont.
- 17:52:39Z Invert and grayscale post-processing passes now render using a persistent ProceduralSpriteInstance instead of manual VAO calls.
- 18:13:11Z Collision, projectile and particle visuals now use ProceduralSprites. Debug fallback sprite added for player.

- 18:26:22Z Removed deprecated stb_easy_font header. All text now rendered via VectorFont or procedural UI sprites.
- 18:55:11Z Removed AnimationSystem and the JSON animation loader. Player visuals now rely exclusively on ProceduralSprite instances.

- 19:11:05Z Began migrating overlays to ProceduralSprite instances. AlignmentOverlay converted.

- 19:26:39Z Removed `TextureResource` and the texture loading path. `ResourceSystem` now compiles only shader programs and no longer depends on `stb_image`.

- 20:00:16Z Removed `AudioManager` and all stb_vorbis dependencies. Audio generation now relies solely on `SynthEngine`.
- 20:43:34Z Converted ScoreOverlay, PlayerPositionOverlay and debug grid/anchor overlays to procedural sprites.

- 21:14:31Z ButtonElement labels now use `ProceduralSpriteInstance` created via `createTextSprite`.
- -- UIManager updates and renders the text instance every frame so hover and press states modify tint and scale.

- 21:20:04Z Removed text_placeholder.h and placeholder text renderer. All overlays now use VectorFont.

- 21:32:55Z Began migrating overlays to `ProceduralUISprite`. `PlayerStatusOverlay` now uses the new struct but overlays like Achievements, Alignment, Log, Notice and StageDetail still rely on `ProceduralSprite`. Full conversion is planned.
- -- Enemy visuals now rely solely on `ProceduralSprite` definitions.
- 21:44:55Z Verified build environment using setup and build scripts. Compilation succeeded with no errors.

- 22:09:08Z StatsRenderSystem now requires a valid FrameTimer; overlay rendering is skipped when absent.
- 22:17:24Z Documented RuntimeLauncher bypasses RenderSystem and uses raw OpenGL.

- 22:37:32Z StatsRenderSystem now receives the RenderSystem and FrameTimer during initialization.

- 22:48:08Z Reduced per-frame log spam. Engine and StatsRenderSystem now only print debug details every 60 frames when debug logging is enabled.

- 23:01:57Z Removed obsolete `stb_vorbis.c` source. No remaining references in code or CMake.

- 23:26:27Z Added glyph rendering for the period character in `VectorFont`.
- 23:36:32Z Ensured bindDefaultUiState() precedes all drawRect calls and improved drawRectImpl warning logs.

- 23:45:10Z `captureGpuState` now outputs "Unknown" when GL vendor, renderer or version strings are unavailable.

## 2025-06-27
- 00:33:54Z Documented crash dump and stacktrace file names in dev_logging_debugging.md.
- 01:05:45Z Converted remaining overlays to ProceduralSprite-based text rendering.

- 01:24:31Z VectorFont::drawText now handles newline characters and advances by lineHeight.
- 01:42:25Z RenderSystem now checks glGenVertexArrays results and aborts initialization if any VAO creation fails. bindDefaultUiState() only binds when the VAO/VBO and program are valid. Documented in dev_logging_debugging.md.

- 01:54:39Z drawRectImpl attempts to recover lost GL state by calling bindDefaultUiState() when the VAO is missing. If the bindings remain invalid an error is logged once and the draw is skipped to prevent spamming the log.
- 02:53:01Z Added batched rendering pipeline for procedural shapes. Rectangles, circles and lines are now buffered each frame and drawn in large batches using a new shader and runtime-generated mask texture.

- 04:42:46Z Fixed compilation error in RenderSystem by changing ShapeType enum to use default integral type.
- 05:29:33Z Added --autotest flag for automated gameplay sessions.

- 06:22:01Z InputBroker captures mouse scroll offsets.
- -- Camera2D exposes a zoom factor which adjusts the projection during resize.

- 07:06:51Z Added PlayerManager::SetSpriteScale and applied camera zoom before handleResize.
- 07:34:39Z Removed logging of unimplemented GL handles in StatsRenderSystem to fix build error.

- 08:14:33Z Increased alternative signal stack size to 64 KiB in installStackOverflowHandler.
- 10:00:43Z Fixed health and shield bars drawing solid black by rendering borders with lines in createHealthBarSprite.

- 10:11:31Z Restored default UI overlays during StartGame.

- 17:36:53Z Added RenderSystem::isWorldVisible for simple camera-based culling and updated
  gameplay managers to skip offscreen sprite draws.

- 18:04:50Z StatsRenderSystem binds default UI state before and after overlay rendering to keep GL bindings consistent.
- 18:10:18Z Replaced all overlay calls to `bindDefault2DState()` with `bindDefaultUiState()` for consistency.
- 18:19:15Z View-frustum culling added via `isWorldVisible` to skip offscreen world sprites.
- -- Overlay rendering now binds the default UI state before and after custom draws.
- -- GL debug warnings are throttled so repeated messages log only once per source.
- 18:30:38Z `validateUiState` now runs for every overlay render in debug builds.
- -- The helper asserts and logs an error if the UI VAO/VBO/program become unbound or swapped.
- 19:01:24Z Added `ProceduralSpriteRegistry` owned by `RenderSystem`.
- -- `registerDefaultSprites` populates the registry during `Game::StartGame`.
- 19:48:49Z Reworked overlay GL state management. bindDefaultUiState now rebinds the shader before the VAO and VBO.
- -- Overlays no longer call bindDefaultUiState themselves; RenderSystem manages this in endFrame.
- -- StatsRenderSystem saves and restores GL state around SystemInfoOverlay rendering.
- -- ProceduralSpriteInstance warning spam is throttled to once every 60 frames.
- 20:34:43Z StatsRenderSystem now preserves blend, depth, texture and framebuffer bindings.
- -- `bindDefaultUiState()` is invoked after restoring the main context to keep batched drawing valid.
- 20:57:17Z StatsRenderSystem flushes queued shapes in `endFrame` so the stats overlay renders correctly.
## 2025-06-28
- 02:39:23Z Removed secondary window system. StatsRenderSystem deleted and engine now runs only a single GLFW window.

- 03:23:58Z Added glyphs for parentheses, vertical bar and comma in `VectorFont` to remove missing glyph warnings.

- 03:44:04Z `FrameTimer` now logs average FPS and GPU time once per second to reduce log spam.

- 04:43:07Z Added `FrameLimiter` to cap the game loop at 60 FPS. Engine sleeps when frames finish early.

- 05:51:30Z Removed legacy `Camera2D::addShake` method. EnemyManager now calls `shake` directly.

- 06:12:39Z Added separate `m_uiProj` matrix in `RenderSystem` for screen-space overlays.
- -- UI draw functions now set the new projection so HUD elements ignore camera zoom.

- 16:56:24Z Removed StageDetail overlay hook and trimmed default UI overlays to essentials.

- 17:16:12Z Disabled StageProgress and PlayerStatus overlays in the default game flow.
- -- Built-in layout now only positions ScoreOverlay.

- 17:25:01Z Removed Score, Alignment, Reputation and Achievements overlays.
- -- Default layout is now empty while profiling overlay impact.

- 19:19:37Z EnemyManager now removes inactive enemies after updating. Instances that return `false` from `ProceduralSpriteInstance::update` or move below the view are queued for cleanup.

- 20:03:34Z EnemyManager tracks consecutive offscreen frames and despawns enemies after 60 frames or when far outside stage bounds.

- 20:10:44Z SimplePostProcess now calls `bindDefaultUiState()` after each post-processing lambda to restore GL bindings.

- 20:21:46Z RenderDebugOverlay records sprite counts to `runtime.log` every 60 frames when
  verbose logging is active. DebugController toggles this with the **I** key.

- 23:21:17Z Updated minimal scene classes to implement `engine::IScene`.
- -- Added missing includes and stubbed `OnExit` methods.
- -- Build script reports link errors unrelated to scene changes.

## 2025-06-29
- 01:07:19Z Disabled default overlays in RenderSystem.
- -- MinimalMainMenuScene now finalizes transition and polls Enter with IsKeyHeld.

- 03:51:58Z PlayState_Minimal now calls `CompleteTransition` on enter so the main menu is
  removed correctly.
- -- InputBroker logs key press and release events to `runtime.log` at the debug
  level for troubleshooting.
- 04:47:12Z Added `CV_FORCE_LOGS` option so Release builds can keep info and debug logs enabled by default. Disable with `-DCV_FORCE_LOGS=OFF`.
- 16:56:26Z `PlayState_Minimal` now registers default sprites if none are loaded to ensure the player is visible during simple test runs.

- 18:02:25Z GameManager::LoadGame now reads data from SaveSystem and exposes it to scenes.
- -- MinimalMainMenuScene highlights selections and supports mouse input.
- 19:37:23Z Fixed VectorFont orientation so menu text renders upright across all overlays and updated main menu anchors.

- 19:54:09Z Corrected menu navigation so Up and Down keys match the on-screen option order.

- 20:05:41Z Adjusted `InputBroker` mouse coordinates for framebuffer scaling. UI clicks are accurate on high-DPI monitors.
- 20:18:17Z Flipped mouse Y position relative to framebuffer height for top-left UI origin.

- 20:36:18Z Mouse coordinates are now flipped vertically inside `InputBroker::GLFWCursorPosCallback` to align with UI space.
- 20:51:44Z Reintroduced a secondary debug window. MultiDisplayManager loads up to two displays from `display.json` and Engine renders a static overlay string in the second window each frame.

- 21:11:38Z Separated debug window rendering via RenderSystem::renderDebugWindow. Overlays no longer mirror the main scene.

- 21:37:52Z Fixed invalid GL state in the debug window by creating per-context VAOs in `setDebugWindow`. The overlay now renders correctly while the main window continues to use its own VAOs.

- 22:03:18Z Debug overlay text orientation corrected in the secondary window. `RenderSystem::renderDebugWindow` now adjusts its projection matrices per context so glyphs draw upright.

- 22:27:07Z Debug window now sets its temporary orthographic matrices with `left < right` so text renders left-to-right.

- 23:13:10Z Fixed debug window GL uniform initialization. `renderDebugWindow` uploads the updated projection matrices and binds the default UI state before drawing.

- 23:22:28Z Documented that `renderDebugWindow` requires binding the temporary left-to-right orthographic projection before drawing text or glyphs appear mirrored.

- 23:31:42Z Clarified in README and BUILD.md that `scripts/setup.sh` must be run to create
  the preset build directory (e.g. `out/build/linux-debug`) before invoking
  `build.sh`.

- 23:41:37Z Debug overlay text replaced with "A B C 1 2 3" for orientation testing.
## 2025-06-30
- 00:19:11Z Replaced hardcoded debug window text with "A B C 1 2 3".

- 00:39:48Z Corrected VectorFont column and row orientation so all debug overlay glyphs render upright.
- 05:12:43Z Split RenderSystem into helper modules (Renderer2D, OverlayRenderer, GLStateManager, PostProcessController, DebugOverlayManager).
- -- Updated docs and system tree to mark RenderSystem as In-Progress.

- 06:15:12Z Introduced `EnemyAIController`, `EnemySpawnHandler` and `EnemyCollisionRegistrar`.
- -- `EnemyManager` now delegates AI updates, spawning and collision registration to these helpers.
- -- Updated enemy AI documentation and system tree.

- 15:23:30Z Added `UIOverlayManager` and `UIInputLayer` modules.
- -- Introduced `GameHUD` wrapping the legacy `GameUIManager`.
- -- `UISystem` now aggregates these layers instead of `UIManager`.
- -- Updated UI documentation and modular tree.

- 17:51:12Z Began modularizing EnemyAIController as a standalone manager.
- -- Documented behavior routing helpers and updated system tree.

- 21:09:26Z Adjusted engine include paths for PlayerManager, ProjectileManager and PowerupManager modules.

- -- Build configuration unchanged.
### 2025-07
## 2025-07-01
- 04:10:20Z Moved combat and quantum simulators into module subdirectories to match the engine structure.
- 05:40:57Z Moved VectorFont and ProceduralUI into modules/ui and updated includes.
- 05:53:54Z Moved GameManager and related flow classes into `game/core/flow`.
- -- Added integration tests covering scene transitions and phase control.
- -- Documented the game flow management stack and updated system tree.
- 06:37:06Z Modularized InputBroker into `engine/modules/input` and updated includes.
- -- Added InputManagerBrokerTests covering key, mouse and gamepad events.
- -- Documented input handling and marked systems complete in the modular tree.
- 07:03:11Z Audited RenderSystem and MultiDisplayManager for modular compliance.
- -- Added offscreen framebuffer regression tests for both modules.
- -- Documented RenderSystem integration in the shader pipeline guide.
- -- Marked modules complete in the system tree.
- 07:15:30Z Modularized ResourceSystem, SaveSystem and ScriptingSystem under engine/.
- -- Added unit tests for resource loading, save persistence and Lua scripting.
- -- Documented each system and marked them Completed in the modular tree.

- 07:39:55Z Cleaned up TelemetryManager and NetworkSimulationManager.
- -- Added NetworkSimulationManagerTests exercising UDP packet exchange.
- -- Documented both systems and marked them Completed in the modular tree.
- 15:03:37Z Moved LocalizationSystem to `engine/modules/localization/` and SceneManager to `engine/modules/scene/manager/`.
- -- Added unit tests for localization lookup and scene registration.
- -- Documented both systems and marked them Completed in the modular tree.
- 15:43:00Z Moved PostProcessingManager and SimplePostProcess into `engine/modules/render/postprocess/`.
- -- Relocated physics_system to `engine/modules/physics/core/`.
- -- Added unit tests for post-processing effects and physics steps.
- -- Documented both systems and marked them Completed in the modular tree.
- 16:01:59Z Modularized EventSystem into `engine/modules/events/`.
- -- Moved HILInterface to `engine/hardware/hil/`.
- -- Moved AudioEventTracker to `engine/modules/audio/tracking/` and added AudioManager wrapper.
- -- Added docs and tests for these audio and event subsystems.
- -- Updated modular tree entries.
- 16:17:47Z Added standalone docs for `EnemyManager`, `GpuBroker` and `InputBroker`.
- -- Updated modular tree to mark GpuBroker Completed.
- -- Verified build with `BUILD_TESTING=ON`; compilation failed in `MockEnemyManager` tests.
- 18:00:01Z Organized UI overlays into hud, debug, and menu subdirectories. Updated build files and modular docs.
- 19:25:40Z Added `engine_system_tree.md` listing all engine subsystems and their modularization status.
- -- Linked the new document from `engine_design.md` and `README.md`.
- -- Logged progress and verified build after documentation update.
- 19:53:25Z Restructured render module directories. Added backends/, shared/, overlay/, and interfaces subfolders.
- -- Updated include paths and CMakeLists to match new layout.
- -- Documented the new structure in engine_system_tree.md.
- -- Verified build with bash scripts/build.sh.
- 20:03:14Z Moved AudioEventTracker to `engine/modules/audio/shared/`.
- -- Added `interfaces/` folders for audio and input modules.
- -- Created `engine/modules/input/shared/InputUtils.h` with simple helpers.
- -- Updated engine_system_tree documentation and build files.
- 20:08:46Z Started engine modularization refactor; establishing new subsystem directories and documenting the tree.
- 20:37:57Z Removed legacy window module files and cleaned related documentation.

- 20:52:33Z Wired SystemManager into Engine so subsystems update through the manager.
- 22:28:17Z Added unit tests for Engine, overlay and render helpers.
- 22:41:19Z Added tests for input and audio interfaces, AudioEventTracker, and SynthEngine.
- -- Marked corresponding modules completed in engine_system_tree.
- 23:03:56Z Added UIManagerTests and UIOverlayManagerTests ensuring show/hide calls forward to RenderSystem.
- -- Marked UIManager and UIOverlayManager Completed in engine_system_tree.
- 23:09:24Z Added LoggerTests, DiagnosticsTests, MemoryTrackerTests, FrameCounterTests and TimeSystemTests.
- -- Verified log rotation and log level handling in Logger.
- -- Marked respective modules completed in engine_system_tree.
- 23:17:54Z Added SeedCoreTests, SeedControlTests, KernelLoaderTests and expanded KernelSlotManagerTests.
- -- Marked SeedCore, SeedControl, KernelSlotManager and KernelLoader Completed in engine_system_tree.
- 23:59:26Z Added `--minimal` launch flag and updated Engine to select scenes accordingly.
- -- Engine now defaults to full gameplay mode unless `--minimal` is provided.
## 2025-07-02
- 00:51:06Z PlayState_Game now mirrors PlayState_Minimal's sprite logic.
- -- MainMenuScene transitions into PlayState_Game when not in minimal mode.

- 02:31:38Z Verified Release build succeeded after implementing prior fixes.
- 03:55:18Z MultiDisplayManager sessions now store windows with dedicated render backends.
- -- Engine initializes each session backend and passes the primary one to RenderSystem.

- 04:21:06Z Added placeholder backends for Vulkan1, Vulkan RTX, DX12 RTX and Android GLES with full implementation planned.
- -- Backend selection now supports --vulkan1, --vulkan-rtx, --dx12-rtx and --android-gles.
- 04:59:03Z Introduced RendererBinding interface wrapping RenderBackend per window.
- -- MultiDisplayManager now stores bindings instead of raw backends.
- -- RenderSystem and DebugOverlayWindow updated to use RendererBinding abstraction.
- 05:34:48Z Per-window backend support finalized. `MultiDisplayManager` reads a backend for
  each window from `display.json` and instantiates the matching binding.
- -- README and design docs now mention the new backends and command line flags.
- 06:29:39Z Vulkan2Backend now creates a render pass and framebuffers per swapchain image.
- -- Command buffers record a clear operation and present via vkQueuePresentKHR.
- -- Added basic pipelines for rectangles and lines with push constant parameters.
- -- VulkanBinding now instantiates Vulkan2Backend so MultiDisplayManager selects it when Vulkan is enabled.
- 06:42:03Z Removed precompiled SPIR-V binaries. Vulkan shaders now compile during the build using glslc.
- -- Vulkan2Backend loads shaders from the executable's shader directory.
- 06:52:00Z Enforced repository policy banning committed binary assets.
- -- Documentation now states that all compiled files are generated at build time.
- 07:06:11Z Vulkan2Backend now queues rectangles and lines before submitting the command buffer each frame.
- -- `handleResize` recreates swapchain resources when the window size changes.
- 07:21:42Z Added VulkanRTXBackend derived from Vulkan2Backend with placeholder ray tracing pipeline setup.
- -- VulkanRTXBinding allows DisplaySession to select the new backend via configuration.

- 07:38:49Z DX11Backend now maintains a persistent render target view and vertex buffer.
- -- Added minimal HLSL shaders and draw helpers for rectangles and lines.
- -- `handleResize` recreates the swapchain and RTV on window size changes.

- 07:55:05Z Implemented initial DirectX 12 backend support.
- -- Device creation now sets up command queue, swapchain and RTV heap.
- -- Recorded command lists clear the render target each frame.
- -- Added simple pipelines and vertex buffer logic for rectangles and lines.

- 08:03:01Z DirectX 12 backend now creates a DXR device when available and logs a warning when falling back to rasterization.
- -- `drawRect` and `drawLine` maintain rasterization paths as a fallback until DXR drawing is implemented.
- -- Command lists are executed and the swapchain presented each frame after resource barriers.

- 08:21:24Z Metal backend initializes a CAMetalLayer swapchain and command queue on macOS.
- -- `beginFrame` acquires a drawable, clears it and draws a demo rectangle and line.
- -- `endFrame` presents the command buffer.
- -- Non-macOS builds log stub messages for these calls.

- 08:42:50Z AndroidGLESBackend now creates an EGL display, context and surface on Android.
- -- `beginFrame` clears the buffer and sets the viewport.
- -- Added `drawRect` and `drawLine` implementations using OpenGL ES 3.0.
- -- Non-Android builds log stub messages for these methods.

- 09:11:13Z Vulkan, DirectX and Metal backends transitioned from placeholders to official engine modules.

- 09:28:32Z Added `backend_validation` example which opens a window per backend using `MultiDisplayManager`.
- -- Each session initializes its specific `RendererBinding` and renders a rotating line.
- -- The example now ships with `game/assets/config/backend_validation.json` which lists
  every backend so the demo opens all windows simultaneously.
- 09:57:50Z Backends now log initialization success and endFrame completion with window indices.

- 16:18:46Z Verified `cv_backend_validation` using `game/assets/config/backend_validation.json`.
- -- All sessions reported `init ok` and drew the rotating line.
- -- Successful backends: OpenGL, Vulkan1, Vulkan2, VulkanRTX, DirectX11,
  DirectX12, DirectX12RTX, Metal and AndroidGLES.

- 16:50:17Z Ran engine under gdb with Debug build.
- -- Crash occurs during Engine::Init when MultiDisplayManager fails to initialize GLFW.
- -- Backtrace saved to logs/gdb_backtrace_20250702_1650.txt showing the fatal call in Logger::fatal from Engine.cpp line 110.

- 17:28:51Z Fixed stack overflow caused by overwriting GLFW window user pointer.
- -- Windows now use `WindowContext` to share InputBroker and RenderSystem pointers.
- -- Added cleanup in MultiDisplayManager and updated callbacks.

- 18:23:09Z MultiDisplayManager warns when reinitialized and clears old sessions.
- -- Added per-session initialization logs and final session count.

- 18:35:44Z RenderSystem now skips binding initialization if an existing backend is present. Engine no longer pre-initializes bindings for all sessions.

- 20:21:53Z QuantumSimulator now supports a variable number of qubits. Hadamard, Pauli-X
  and measurement routines were updated accordingly.
- 20:51:51Z Added collapse modes (CPU/GPU/Mixed) to state vector simulators.
- -- Probability cache records simulator name, qubits, mode and entropy.
- -- Per-simulator stats track collapse count and cumulative entropy.
- 21:03:01Z Introduced QuantumManager factory for per-session simulators.
- 21:12:40Z Documented adjustable qubit interface and probability cache stats.

- 21:22:59Z cuQuantumCollapseSim now accepts a device ID per initialization and builds pass the default via `CV_CUDA_DEVICE_ID`.
- 21:34:37Z Added QuantumStateVectorManager for managing state vector collapses.

- 21:47:18Z Instrumented QuantumStateVectorSimulator and cuQuantumCollapseSim with debug logs for entropy contributions.

- 22:08:34Z Added CPU fallback option and QuantumStateVectorTests.
## 2025-07-03
- 00:22:12Z Added logStatistics() to QuantumStateVectorManager exposing collapse count and entropy totals.
- 01:16:53Z GameManager now logs the scene class name when starting transitions.
- 01:44:28Z Added GetCurrentScene() accessor to SceneManager.
- -- Updated tests to validate active scene transitions using the new method.

- 02:00:27Z QuantumStateVectorSimulator now applies a random mix of Hadamard and PauliX gates per collapse regardless of GPU availability.

- 02:26:51Z Replaced FNV hashing with a 64-bit std::hash over the probability cache, offset and collapse counter.
- -- Updated tests to verify repeated collapses generate unique seeds.

- 03:04:27Z setup.sh now installs cuQuantum on Linux and validates GPU availability.

- 03:53:12Z setup.sh checks CUDA_PATH on Windows and logs a warning if CUDA 12 isn't found.
- 05:43:05Z Removed legacy GameUIManager module and updated build/test scripts.
- -- QuantumSimulator now provides Pauli-Y/Z, phase and controlled-X gates.
- 06:07:18Z Added twelve compound quantum gates and updated documentation.

- 19:43:48Z Audited cuQuantum bindings; no Python imports of custatevec, cutensornet, or cudensitymat found.

- 19:48:59Z setup.sh now verifies `libcustatevec.so.1`, `libcutensornet.so.1` and `libcudensitymat.so.1` exist in the cuQuantum package directory. Missing libraries trigger warnings in `setup_warnings.log` and force CPU fallback.

- 22:09:26Z CV_ENABLE_CUQUANTUM now defaults to ON unless explicitly disabled.


- 23:06:22Z Canonicalized `engine/modules/quantum` as the sole simulation namespace.
- -- Updated documentation to remove `game/quantum` references.

## 2025-07-04
- 00:02:02Z Added raw CUDA simulator option compiled when `CV_ENABLE_CUDA_SIM` is on.
- -- CMake links CUDA runtime and enables CUDA language when the flag is set.
- 00:58:43Z Windows build presets now use Visual Studio 2022 by default.
- -- MSVC warnings are no longer treated as errors.

- 01:32:28Z Documented EntropyManager sources and API. Updated engine tree list.
- 02:34:02Z Added HybridGatedCollapseSimulator and ChaoticCollapseOracle with new docs.
- -- Updated engine system tree with collapse entries.
- 03:16:38Z ChaoticCollapseOracle now validates promoted seeds and supports observer mode.
- 04:03:50Z EntropyPool now supports a configurable maximum size with eviction.
- -- Warnings emit when consumption drains the pool faster than refill.
- 04:11:23Z EntropyManager now polls entropy sources using a weighted round-robin scheduler.
- -- Registration accepts a weight parameter to bias polling frequency.

- 05:07:01Z Added entropy drain tracking and CCP metrics for the debug overlay.

- 05:51:13Z Added `initTestSeed` and `peekBits` helpers to `EntropyPool` for deterministic testing.

- 06:01:06Z EntropyManager now exposes test helpers to initialize custom sources and
  inspect pooled bits without starting the polling thread.

- 06:09:33Z Added `initializeForTest` and `resetTestState` to `EntropyManager` for the new test harness.
- -- `CV_TEST_BUILD` compile flag now enables these helpers when `BUILD_TESTING` is on.

- 15:13:40Z Introduced `CV_PRODUCTION_MODE` build flag.
- -- EntropyManager now blocks deterministic sources when this flag is set.
- -- Added ProductionModeEntropyTests verifying the behavior.

- 15:24:26Z Added QuantumPatternTranslationLayer exposing simple `requestCollapse` API.
- -- New CMake source registration and documentation placeholders.

- 15:31:29Z Added CollapseStateMapper tracking collapse results.
- 15:39:11Z CollapseStateMapper can now validate and promote seeds per IntentRequest.
- -- Failed seeds enter observation pools with lineage logging.
- 16:03:41Z Documented QuantumPatternTranslationLayer and CollapseStateMapper integration with simulators.

- 16:12:04Z Added placeholder entropy hint API to QuantumPatternTranslationLayer.
- -- Created Collapse Shape Viewer tool for inspecting CollapseLineageLogger output.

- 16:25:08Z Replaced all usage of `std::random_device` and similar with
  `EntropyManager::requestBits` seeded PRNGs. Removed deprecated
  `RandomUtils` module.

- 16:43:53Z Added ChaoticSeedFuzzTests, ChaoticSeedIsolationTests and HybridSimulatorOverrideTests.
- -- build.sh now calls ctest automatically when BUILD_TESTING=ON.
- 17:30:13Z Updated IGame interface and tests to use engine::QuantumStateVectorManager pointer type.
- 17:59:41Z Added GateRegistry for quantum gates with random selection by tag.
- 18:08:12Z Quantum gates moved into free functions under `engine/modules/quantum/gates/`.
- -- GateRegistry now registers these at startup and `QuantumSimulator` wrappers
  invoke them by name.
- 18:26:05Z `QuantumStateVectorSimulator` now requests random gates from `GateRegistry` and
  falls back to Hadamard/PauliX when none are available. GPU mode executes a
  Hadamard placeholder for registered gates.

- 18:33:47Z `GateRegistry` now assigns a stable hash ID to every gate during registration.
- -- Gates include optional description and affinity metadata for future tagging.
- 19:00:13Z Added GateRegistrationTests and GateSequenceTests using GateRegistry.
- -- QuantumSimulatorTests now invoke gates via registry.

- 19:22:57Z GateRegistry subsystem integrated for centralized quantum gate management.
- -- Game layer queries the registry to randomize available gate sequences.

- 20:46:02Z Marked EntropyManager as Completed in game system tree to match engine status.
- 21:11:26Z Game now instantiates QuantumPatternTranslationLayer with HybridGatedCollapseSimulator and ChaoticCollapseOracle.
- -- CollapseStateMapper records seeds at runtime and ChaoticSeedPromoter can override gated collapses.
- -- Updated system trees to mark QPTL, CollapseStateMapper and ChaoticSeedPromoter as Completed.
- 21:55:07Z Added DualLayerQuantumManager managing both HybridGatedCollapseSimulator and ChaoticCollapseOracle.
- -- QuantumPatternTranslationLayer now attempts hybrid collapses first and records collapse timestamps via the manager.
- -- Deterministic QuantumSimulator fallback triggers after 60s without a valid collapse.
- 22:20:18Z QuantumPatternTranslationLayer delegates collapse routing to DualLayerQuantumManager.
- -- Added `requestCollapse()` helper to manager handling hybrid, chaotic and deterministic paths.
- 22:31:00Z Introduced CollapseWatchdog monitoring collapse entropy and seed stability.
- -- Hybrid and oracle simulators now fallback to deterministic mode after repeated anomalies.
- 23:17:55Z GPU simulator initialization now checks `CV_GPU_DEVICE_INDEX` and falls back to least-used device.
- -- Added GpuDeviceManager tracking active simulators and memory limits.

- 23:39:47Z GpuDeviceManager balances simulators across detected GPUs.
- -- `CV_GPU_DEVICE_INDEX` can pin a specific device.
- -- Initialization falls back to CPU when no GPU has enough memory.
- -- Logging now records device selection and fallback events.

## 2025-07-05
- 00:07:52Z CollapseWatchdog now only logs anomalies instead of toggling fallback.
- -- HybridGatedCollapseSimulator and ChaoticCollapseOracle rely on
  DualLayerQuantumManager to activate deterministic fallback after 60 seconds
  without a valid collapse.
- 00:17:06Z Documented oracle entropy monitoring and the 60-second timeout in
  `chaotic_collapse_oracle.md`.
- -- Clarified that `CollapseWatchdog` only logs anomalies and does not trigger
  deterministic mode directly.
- 00:36:40Z Added CpuJitterEntropySource and MemoryAccessEntropySource.
- -- EntropyManager::start() now registers these sources automatically.

- 00:44:20Z InputTimingEntropySource now mixes microsecond deltas with mouse coordinates for higher variance.

- 00:54:15Z EntropyPool reseeds now combine timestamp, hardware entropy and CPU jitter.

- 01:00:20Z DualLayerQuantumManager constructor now accepts a clock function. Tests can
  simulate time to trigger fallback without waiting.
- 01:19:58Z CollapseWatchdog gains a configurable entropy threshold.
- -- Low-entropy collapses no longer reset the consecutive counter.

- 01:38:42Z ChaoticCollapseOracle now uses a dynamic chaotic threshold based on entropy spikes and pool saturation. Added threshold tests.
- 01:56:19Z Documented how entropy spikes, jitter and pool density feed into collapse decisions.
- 02:08:48Z ChaoticCollapseOracle logs collapse spikes that exceed the running average by 2.5×.
- 02:48:57Z HybridGatedCollapseSimulator now exposes requestWatchdogReset() for controlled watchdog resets.

- 03:02:01Z ChaoticCollapseOracle stores collapse timestamps and entropy in a circular buffer.
- -- Moving average entropy triggers a soft chaos warning after 15s below 0.1.
- -- Valid collapses now log seed, entropy spread and collapse latency.

- 03:13:56Z CollapseWatchdog tracks recent seeds and flags monotonic or repeating patterns.

- 03:30:00Z High‑entropy collapses now reset the watchdog counter and incremental pattern
  checks catch partial repeats early.
- -- Soft chaos warning occurs when oracle entropy stays below 0.1 for 15s. Oracle
  continues running during fallback and logs trendlines for analysis.


- 04:26:29Z Commented out legacy UI test targets; UI tests are deprecated until the new system is ready.

- 04:38:28Z Archived the old UI/render system. Legacy overlays remain for reference but no longer build by default.

- 05:04:46Z Restored the renderer under `engine/render`.
- -- OpenGL 4.5 initialization now occurs through `RenderSystem` with GLAD/GLFW.
 - Legacy UI overlays were copied into `engine/ui` to keep the overlay manager compiling.
 - Later refactored into `engine/modules/ui` alongside the new procedural widgets.

- 06:36:48Z Started the render/UI reconstruction with skeleton modules for the new overlay pipeline.
- 17:18:39Z Completed migration of all overlays to `ProceduralUISprite` definitions. Legacy `ProceduralSprite` usage has been removed.

- 17:46:26Z `UIOverlayManager` now stores pointers to overlay objects and forwards `update()` calls.
- -- Added getters in `RenderSystem` for overlay access.
- -- Extended unit tests to verify overlay updates when visible.

- 18:44:09Z Updated engine system tree marking UIOverlayManager as Completed.
- -- GameHUD validated and marked Completed in the game system tree.

- 20:26:59Z Replaced Box2D with PhysicsCore. Basic body and joint management implemented. Box2D is no longer part of the build.
- 21:53:25Z Archived the old PhysicsSystem. Sources and tests moved under `archive/physics_system`.
- -- Added physics debug getters and joint stress calculations in DynamicsSystem.
- -- DebugController can log body and joint metrics with the **B** key.
- -- EntropyFieldIntegrator exposes `sampleField()` for entropy influence logging.

- 22:45:12Z Added integration testing note for the Render System requiring proprietary NVKStack binaries.

- 22:59:34Z Added ThemeManager and StencilGuideSystem modules.
- -- Reaction events now route through StencilGuideSystem for theme-aware logs.

- 23:32:06Z Implemented ThemeLexicon enums and ThemeMaterialResolver for keyword mapping.
- -- ThemeManager now exposes typed getters and parses optional theme files.

## 2025-07-06
- 00:00:50Z ThemeManager reloads theme configuration when `setActiveTheme()` is called.
- -- Added sample theme file under `game/assets/themes/gothic.json`.

- 01:13:10Z Moved visual helper docs (`character_visuals.md`, `enemy_visuals.md`, `stage_visuals.md`, `effect_sprites.md`, `pickup_visuals.md`, `vector_font.md`) into `docs/systems/visuals/`.
- -- Updated all references and code comments to match the new paths.
- 02:09:30Z Added ProceduralFontGenerator with Bézier-based SDF glyphs and FontStyleResolver.
- -- RenderSystem now prefers procedural fonts and falls back to VectorFont.


- 02:47:46Z Added StencilResolver for theme-aware reaction mapping.
- -- StencilGuideSystem now logs resolved stencil identifiers using the active ThemeManager state.

- 03:45:18Z Created `engine/modules/biology` module for reaction and anatomical data.
- -- Moved ReactionPatternResolver, PhysicsReactionEvent, and AnatomicalConstraintRegistry into it.
- -- Updated CMake and include paths to reference the new module.

- 04:05:20Z Renamed `ReactionEvent` struct to `PhysicsReactionEvent`.
- -- Updated all callbacks and systems to use the new event type.
- -- Removed the default `"BloodSplash"` effect initialization.

- 04:21:17Z Renamed `KineticsSystem` to `DynamicsSystem` across engine and gameplay.
- -- Updated documentation and build files to match the new name.

- 04:51:45Z Added MaterialStressSystem, ImpactModelingSystem, FluidReactionSystem, TerrainDeformationSystem and RagdollSystem under physics_core.
- -- Each system emits PhysicsReactionEvent notifications and has unit tests.

- 05:07:50Z Added ReactionEventUtils for consistent PhysicsReactionEvent creation.
- -- ReactionPatternResolver can now attach to any subsystem via `attachSubsystem`.
- -- Refactored physics_core systems to use the new helper utilities.

- 05:19:21Z Extended `MaterialProperties` with tensile strength, elasticity and fracture thresholds.
- -- Added `materials_manifest.md` and JSON data under `game/assets/materials`.
- -- `MaterialStressSystem` and `ImpactModelingSystem` now consult `MaterialPropertyBank` for breakage or deformation.
- -- Updated tests and documentation.

- 05:36:08Z `TerrainDeformationSystem` now forwards heightmap changes to `RenderSystem` using `markTerrainRegionDirty`.
- -- Added a new integration test demonstrating deformation triggered via `PhysicsReactionEvent`.

- 06:08:50Z Documented PhysicsCore reaction subsystems and updated system trees.

- 06:26:00Z Clarified historical Box2D references across documentation.

- 06:45:31Z Finalized StencilGuideSystem with descriptor routing and runtime request APIs.

- 07:27:48Z Added `ProceduralUIGenerator` for converting `StencilDescriptor` messages into
  `ProceduralUISprite` objects.
- -- Registered the generator with `StencilGuideSystem` so UI widgets can be
  produced from theme-aware stencils.
- 07:42:59Z Added VisualTestScene for stencil-based UI validation. Generates procedural widgets via StencilGuideSystem and ProceduralUIGenerator.

- 07:59:48Z `ProceduralUISprite` extended with bounding box fields and hover/press state flags.
- -- UI creation helpers now assign these bounds automatically.
- -- ButtonElement and key overlays updated to query the new fields.

- 16:08:35Z Archived legacy UI headers under `archive/ui_legacy`.
- -- Updated include guards and references across the build.

- 16:50:55Z - Removed legacy overlay logic from RenderSystem to simplify rendering pipeline.
- 17:09:00Z Purged remaining legacy UI references from engine and game modules.
- -- Disabled obsolete UI tests.
- 17:40:49Z Moved `UIManager`, `UIOverlayManager`, `UISystem`, `GameHUD`, and all overlay classes to `archive/ui_legacy/`.
- 17:55:09Z Verified debug build after running setup and build scripts.
- 18:12:27Z Moved OverlayStubs to archive and removed from cv_engine sources.
- 18:47:32Z Added StartupScene for simple input-driven startup flow.
- -- Engine now pushes StartupScene on first launch instead of DisclaimerOverlay.
- -- Removed obsolete disclaimer logic from the main loop.
- 19:57:31Z Moved audio, biology, debug and entropy directories under engine/modules.
- -- Updated include paths, CMakeLists, and documentation.
- -- Verified build with scripts/build.sh.
- 20:12:17Z Moved events, font, hardware HIL, and input modules under `engine/modules`.
- -- Updated include paths and build scripts.
- -- Verified build with scripts/build.sh.
- 20:29:49Z Migrated localization, network, physics_core and quantum directories under engine/modules.
- -- Updated include paths, CMake lists and documentation.
- -- Verified build with scripts/build.sh.
- 20:46:41Z Moved ResourceSystem, SaveSystem, SceneManager and ScriptingSystem under engine/modules.
- -- Updated includes, modular tree and build script entries.
- -- Verified build with scripts/build.sh.

- 21:30:57Z Migrated seed, stencil, telemetry and theme modules under engine/modules/. Updated CMake and include paths.

- 21:40:49Z Moved time and UI directories into engine/modules.
- -- Updated include paths, CMake sources and docs accordingly.
- -- All engine modules now live under engine/modules and build passes.

- 22:09:53Z Created engine/modules/procedural as a parent directory.
- -- Moved graphics, ui and font modules under procedural/.
- -- Updated includes, CMake and docs to reference the new paths.
- -- Build verified with scripts/build.sh.

- 22:58:59Z Removed obsolete *\_moved placeholder directories from engine and game.
- -- Verified build with scripts/build.sh.

## 2025-07-07
- 00:43:11Z Moved global `assets/` directory to `game/assets/`.
- -- Updated engine path defaults and documentation accordingly.
- -- Build verified with scripts/build.sh.

- 02:00:50Z Relocated game flow management to `game/core/flow`.
- -- Updated includes, CMake and docs accordingly.
- -- Build verified with scripts/build.sh.

- 05:04:02Z Consolidated biology systems under `engine/modules/biology`.
- -- Updated includes and CMake paths after moving from `engine/modules/physics/biology`.
- -- Documented new structure in engine_design and module tree.
- -- Build verified with scripts/build.sh.
- 05:24:02Z Added new `engine/shaders` directory with core GLSL sources.
- -- Copied shaders from legacy `archive/visual_system/engine_shaders` path.
- -- Resource loading now defaults to these files. Build attempted via scripts/build.sh (setup incomplete).

- 06:24:41Z Updated scene paths to `engine/core/scene/` across includes and docs.
- -- Attempted scripts/setup.sh and build.sh but setup failed due to missing sources.


- 06:32:33Z Moved RenderSystem and related files to `engine/modules/render/`.
- -- Updated includes, CMake paths and docs accordingly.
- -- Build verified with scripts/build.sh.

- 07:18:10Z Moved backend_validation example source into its own directory.
- -- Updated boss module paths and example references.
- -- Verified build with scripts/build.sh.

- 08:12:37Z Moved gl_state_lint.py to tools/scripts and updated build script and docs.


- 17:09:43Z Moved EventSystem into modules/events/system and updated includes.

- 17:35:35Z Moved LocalizationSystem into modules/localization/system and updated include paths and documentation.

- 17:48:53Z Moved ResourceSystem files to engine/modules/resource/system and updated include paths and CMake.

- 18:08:21Z Moved NetworkSimulationManager into engine/modules/network/manager.
- -- Updated CMakeLists, test targets, include directives, and docs to reflect new path.

- 18:51:37Z Moved time module sources into engine/modules/time/system and updated include paths.

- 19:18:14Z Moved physics core systems into dedicated subfolders under `engine/modules/physics/core`.
- -- Updated include paths, CMake sources, and documentation.

- 19:33:34Z Moved OpenAL patch directory to `engine/external/patches/openal`.
- -- Updated CMake patch path and devlog reference.

- 20:08:31Z Split `engine/shaders` into `core` and `postprocess` folders.
- -- Updated render and resource code to load shaders from new paths.
- -- Revised shader pipeline documentation.
- -- Build verified with scripts/build.sh.

- 20:47:00Z Removed all legacy overlay classes from the engine sources.
- -- Added minimal `StartupScene` to handle the disclaimer before main menu load.

### 2025-08
## 2025-08-07
- 01:08:01Z Moved folders for better amalgamation and flow
- -- Moved files for same reason
- -- Other systems still need to be adjusted to follow same structure and flow

## 2025-07-08
- 01:06:41Z Implemented `ProceduralUIInputSystem` for sprite-based interaction.
- -- UISystem now updates this system alongside `UIInputLayer`.
- -- Added registration APIs so overlays can hook mouse events.

- 01:29:38Z `ProceduralUISprite` now exposes `onClick`, `onHoverEnter` and `onHoverExit` callbacks.
- -- Input systems trigger these events on state changes.
- -- `ButtonElement` was updated to route its interactions through the sprite callbacks.

- 01:41:15Z `StencilDescriptor` extended with width/height and input callback fields.
- -- `ProceduralUIGenerator` now copies these fields and exposes `queueDescriptor` for manual generation.
- -- `VisualTestScene` registers generated sprites with `ProceduralUIInputSystem`.

- 01:48:56Z Documented `ProceduralUIInputSystem` usage and callbacks.
- -- Updated `ui_core.md` to reference the new system.
- -- Marked the system Completed in `game_system_tree.md`.

- 02:17:16Z Added `ProceduralUIInputSystemTests` validating hover and click callbacks.

- 02:56:38Z `VisualTestScene` now hooks `ProceduralUIGenerator` callbacks to auto-register sprites.
- -- Added console logging in example callbacks for hover and click events.

- 03:03:14Z Verified ProceduralUIInputSystem integration with interactive procedural sprites across UI overlays.

- 03:38:57Z ChaoticSeedEntry now tracks entropy, timestamp and custom attributes. Updated
  ChaoticCollapsePool and oracle integration.

- 03:55:36Z Added ChaoticSeedQuery with optional filters and pool lookup helpers.
- -- Implemented weighted entropy/recency search in ChaoticCollapsePool.
- -- Logger now exposes trace() for low level messages.

- 04:12:35Z Confirmed ChaoticSeedEntry immutability after insertion. No mutable references
  escape the pool and the attributes map remains untouched post-addition.
- 04:23:37Z Oracle entries now record spike and latency attributes when seeds are generated.

- 04:46:30Z Clarified that spike, latency and significant attributes are captured from runtime values during collapse, not assigned later.

- 05:34:57Z QuantumPatternTranslationLayer can now query the ChaoticCollapsePool via
  `requestPoolSeed`. Seeds are promoted only when the query succeeds and no
  deterministic fallback is attempted.

- 06:02:23Z Added ChaoticCollapsePool query tests covering attribute matching and decay-weighted searches.

- 06:10:27Z Introduced chaos-aligned retrieval interface for selective seed access via ChaoticCollapsePool.
- -- Oracle requests can now filter by entropy and attributes to better align with chaotic intent.

- 06:45:28Z RenderSystem now applies theme changes via `applyTheme()` and refreshes font
  parameters using `FontStyleResolver`.
- -- ThemeManager notifies registered callbacks when the active theme changes so
  subsystems like RenderSystem update automatically.
- 08:03:24Z ProceduralUIGenerator now applies FrameStyle and FontStyle when building sprites.

- 08:22:51Z Initial theme can now be selected via `--theme` or `CV_THEME`.
- -- Added runtime theme switching API and DebugController hotkey.
- -- StencilGuideSystem and ProceduralUIGenerator clear pending queues on theme change.

- 15:26:20Z Added tests/CMakeLists.txt to build unit tests via add_subdirectory.
- -- Root build now includes tests when BUILD_TESTING=ON.
- -- 109 test files registered for ctest discovery.
- 16:34:34Z Updated tests/CMakeLists.txt to auto-detect all test sources and register executables.
- -- ctest now discovers 112 executables when BUILD_TESTING=ON.

- 18:08:30Z Restructured tests/CMakeLists.txt to iterate over subsystems when generating test targets.
- -- Patch check tests link against GLFW and OpenAL when needed.
- -- Status message now reports the total number of registered tests.

- 18:20:39Z Configured the project with `BUILD_TESTING=ON` and ran `ctest -N`.
- -- 112 tests were discovered and now appear via `ctest`.

- 19:25:18Z StartupScene now scales the UI font to draw a large placeholder `A` during
  the initial disclaimer screen.
- 19:57:53Z Added trace logging around StartupScene font rendering.
- -- ProceduralFontGenerator now logs glyph generation and OpenGL errors.
- -- Updated font_rendering.md to describe procedural font pipeline.

- 20:27:48Z Added defensive checks in ProceduralFontGenerator for missing glyphs.
- -- drawText now skips unknown characters instead of aborting.
- -- RenderSystem logs when VectorFont fallback is used.
- -- Updated documentation about the procedural font pipeline.


## 2025-07-11
- 00:20:25Z OpenGLBackend and RenderSystem now retry framebuffer size after showing the window when zero was returned.

- 00:33:54Z MainMenuScene verifies view dimensions and falls back to glfwGetFramebufferSize before resizing.

- 00:44:01Z MultiDisplayManager now logs framebuffer size and viewport for each window after context activation.
- -- RenderSystem writes the framebuffer, viewport, and context at the first frame.

## 2025-07-15
- 20:11:56Z backend_validation example now uses cv::Engine alongside the standard Game class.
- -- MultiDisplayManager exposes enumerateAllBackends and initializeWithAllBackends helpers.
- -- Removed drawLine animation and manual presentAll calls.

- 21:08:37Z RenderSystem no longer calls `m_backend->endFrame`. `MultiDisplayManager::presentAll` handles presentation for OpenGL, Vulkan and DX12 backends.

- 21:31:44Z DX12Backend and Vulkan2Backend no longer present in `endFrame`.
- -- `MultiDisplayManager::presentAll` now calls backend-specific `present()` for these APIs.

- 21:46:07Z MultiDisplayManager now detects OpenGL sessions before swapping buffers.
- -- Non-OpenGL backends present within their `endFrame` implementations.
- -- DX12Backend, Vulkan2Backend and DX11Backend updated to present internally.

- 22:34:15Z Deprecated `GpuBroker` in favor of `MultiDisplayManager`.
- -- Updated system lists and documentation to reflect the new display manager.

- 23:51:45Z Removed Wayland packages from setup.sh since GLFW builds with X11 only.

## 2025-07-16
- 05:26:32Z MultiDisplayManager now appends window indices to titles for runtime
  identification.

- 07:27:01Z Removed `StartupScene` and all disclaimer handling. The engine now loads the
  main menu directly.

- 08:26:38Z Removed all legacy menu scenes and overlays.
- -- Added placeholder Scene0/1/2 for basic validation.

- 15:38:19Z Added lettered Scene0/1/2 sequence with timed transitions.
- -- DebugOverlayWindow now accepts a scene for secondary display.

- 16:13:42Z Engine now always pushes `Scene0` during initialization and no longer
  references the removed `GameState::MainMenu`.
- -- Escape key closes all windows via `MultiDisplayManager::requestCloseAll`.

- 17:03:22Z Added `VectorFont::Init` and `VectorFont::Shutdown` for lifecycle management.
- -- Engine invokes these functions during startup and shutdown.

- 17:24:48Z Removed the default invert/grayscale post-processing setup from `Engine::Init`.
- -- `RenderSystem::enableGrayscale` now only registers passes when enabled and clears them when disabled.
- -- `PostProcessingManager` exposes `hasPasses()` and `RenderSystem` skips capture and apply when no passes exist.

- 17:57:38Z Debug overlay window creation moved behind new Engine::CreateDebugOverlayWindow API.
- -- Engine no longer instantiates DebugWindow0 by default.

- 18:14:10Z Implemented PostProcessingManager::hasPasses as a non-inline method and updated RenderSystem to skip capture and apply when no passes exist.
- 18:50:17Z VectorFont logs initialization and screen text draws.
- -- Debug overlay window now attaches to the second display with DebugWindow0.

- 19:16:44Z Added unified logging in RenderSystem::drawTextScreen and removed VectorFont logging.
- -- DebugWindow0 initialization and attachment now logged with window index.
- -- Scenes set distinct clear colors for easier debugging.

- 20:32:58Z Scene clear color setup now occurs in each scene's OnEnter instead of Render.
- -- DebugWindow0's clear color uses window index 1.

- 20:45:29Z VectorFont::drawTextScreen logs bindings before rendering and traces any
  `glGetError` result after drawing. Updated dev_logging_debugging.md with the
  new diagnostics note.

- 21:10:17Z PostProcessingManager logs when its apply phase runs. Documentation
  clarifies that RenderSystem invokes apply before overlay rendering.

- 21:50:05Z Added StbFontRenderer module using stb_truetype for basic text rendering. Scenes render both fonts side-by-side for comparison.

## 2025-07-17
- 01:20:27Z RenderSystem exposes getResourceSystem for external access.
- -- Engine now initializes the debug window binding and sets its WindowContext render pointer.
- -- DebugOverlayWindow initialization no longer sets the debug window internally.

- 01:27:39Z Added logging for debug window binding pointer and validity checks when creating the debug overlay. SetDebugOverlayScene now prints the scene pointer and window index.

- 02:15:32Z `MultiDisplayManager::presentAll` now warns and skips a window when its
`RendererBinding` or backend is missing. The message reports the window
  index for easier debugging.

- 03:52:26Z Increased the default UI font scale in RenderSystem to 3.0 for better readability.

- 04:13:04Z RenderSystem::renderDebugWindow now logs framebuffer size and viewport after
  `glViewport`. The updated orthographic bounds are also reported along with the
  window index for clarity.
- 04:47:06Z RenderSystem now stores VAOs per window using a vector sized by MultiDisplayManager. setDebugWindow resizes the array when adding a debug window.
- 05:00:42Z Engine debug overlay now stores windows and scenes in vectors. Only the first extra window is active but the system can expand further.
- 06:12:49Z Added `default_backend` option to `display.json` and updated MultiDisplayManager to assign backends when missing. Engine now initializes leftover bindings before starting and warns once if a backend is still absent.

- 15:26:36Z `RenderSystem` exposes `getUiProjectionMatrix` so debug scenes can log the active UI projection.
- 16:18:49Z Fixed VectorFont horizontal mirroring by interpreting glyph bitmasks as little-endian. drawGlyph now logs the active projection matrix per glyph.
- 19:31:54Z Moved ProceduralSprite to new modules/procedural_sprite directory and updated includes.
- 19:53:13Z Introduced `ProceduralSpriteManager` with render pass control and instance tracking.
- -- `RenderSystem` no longer owns the sprite registry; managers access it via the new manager.
- 21:12:20Z Sprite instances now register with ProceduralSpriteManager. Scenes invoke drawAll after binding the UI pass.
- 21:32:35Z Scene0 now initializes a simple rectangle frame sprite and registers its instance.
- -- ProceduralSpriteManager drawAll invocation moved to after scene text rendering.
- 21:44:23Z Documented ProceduralSpriteManager behavior and limitations.

## 2025-07-18
- 15:37:53Z Scene0 and Scene1 now transition on Enter instead of timed delays.
- 16:29:49Z SceneCoordinator now finalizes transitions when GameManager changes states.
- 17:10:40Z Fixed recursion issue in sprite rendering. RenderSystem now draws sprites directly via new drawSpriteImpl.
- 17:16:12Z StencilGuideSystem now guards descriptor emission with an internal `m_emitting` flag to avoid recursive callbacks.
- 17:26:09Z Descriptor callbacks now return a handle for removal. ProceduralUIGenerator stores this handle and unregisters on destruction.

- 19:13:50Z LocalizationSystem now loads tables from `game/assets/localization`.
- -- VectorFont supports all printable ASCII characters and converts lowercase input automatically.
- 19:48:59Z ProceduralSpriteManager now validates RenderSystem initialization and sprite resources before drawing. Missing resources emit a single warning and drawing is skipped.
- 20:07:05Z Engine initializes runtime directories (`logs` and `game/saves`) automatically.

- 20:21:34Z Removed StbFontRenderer module and all related scene code. VectorFont now
  handles all text rendering.
- 21:35:42Z ProceduralSpriteInstance now includes an `enableDrawLogs` flag for optional draw logging.
- 21:53:25Z DualLayerQuantumManager now waits up to 1s for ChaoticCollapseOracle to become ready and logs a warning when timeout triggers.
- 22:52:50Z ProceduralSpriteInstance `render()` now checks `shouldDraw()` and only logs draw state when `enableDrawLogs` is true.
- -- ProceduralSpriteManager tracks drawn sprite count and logs it when `RenderSystem::isLogSpriteCounts()` is enabled.
- 23:08:44Z ProceduralSpriteInstance logs sprite name before drawing and appends draw context to post-draw logs.
- 23:35:21Z Removed the lightweight test harness; the Game class is now the sole entry used for engine initialization.

## 2025-07-19
- 01:08:03Z Added Virtual Grid Unit (VGU) system. RenderSystem now computes pixelsPerVGU_X and pixelsPerVGU_Y and exposes conversion helpers.
- -- Added *VGU drawing variants and updated VectorFont to operate in VGU space.
- 02:09:47Z - RenderSystem now tracks separate X/Y VGU scales and updated conversion helpers.
- 02:23:21Z VectorFont glyph drawing now converts positions and sizes via vguToPixels.
- 04:08:14Z VectorFont drawGlyph now converts positions via `vguToPixelsX/Y` rather than the combined helper to accommodate non-uniform VGU scaling.
- 04:39:16Z Replaced pixel-based view queries with getViewSizeVGU and updated DebugWindow0 to draw in VGU space.
- 05:00:20Z Documented pixelsPerVGU_X/Y and clarified that VGU scales apply to the full framebuffer.

- 05:12:11Z handleResize now logs computed pixelsPerVGU_X and pixelsPerVGU_Y for debugging.

- 05:31:13Z Converted overlay and procedural UI drawing to VGU helpers.
- -- Updated ProceduralUIInputSystem to translate mouse coordinates via RenderSystem.
- -- Documentation updated to reflect VGU-based screen space.

- 06:19:56Z Defined `VGU_GRID_SIZE` constant in RenderSystem to lock the virtual grid to
  1000×1000 units for all windows.
- -- Updated handleResize to compute VGU scales using the constant.
- -- Documented the constant in engine design and virtual grid unit docs.

- 07:10:45Z Added configurable `pixelScale` with setter and getters in `RenderSystem`.
- -- `handleResize` and VGU helpers now apply the scale factor.
- -- New `--pixel-scale` command line option sets the value at startup.
- -- Documentation updated for high-DPI support.

- 10:01:29Z Documented pixelScale usage and optional high-DPI scaling.


- 20:43:48Z Removed letterboxing from the VGU system. `RenderSystem` now scales the
  1000×1000 grid independently along X and Y using the full framebuffer
  dimensions. Updated docs and unit tests accordingly.

- 21:03:46Z Added `drawArc` and optional segment counts to circle helpers.
- -- `ProceduralSpriteFrame` stores a fidelity hint so sprites can request
  smoother geometry. `ProceduralSpriteRegistry` gained overloads to set this
  value when registering sprites.

- 21:20:13Z Switched VectorFont to a 5×7 dataset and added optional tessellation detail.
- -- Updated rendering helpers and docs to reflect the new glyph format.

- 21:54:52Z Removed old devlog notes about letterboxing and uniform scaling after reverting
  to per-axis VGU scaling. Updated documentation and README accordingly.
- 00:12:25Z Rebuilt after adjusting Scene0 and DebugWindow0 text encoding.
- 00:58:17Z Default window resolution updated to 1920x1080 across engine modules and configs.

## 2025-07-20
- 02:30:17Z `applyAnchorX` and `applyAnchorY` now take float view dimensions in
  VGU space. Updated documentation accordingly.
- 03:13:26Z Enforced VGU bounds on render calls and switched VectorFont to `drawRectScreenVGU`.
- 03:57:17Z Added alpha blend states for DX11 and DX12 backends and documented the change.
- 04:20:17Z Enabled Metal backend alpha blending mirroring OpenGL defaults.
- 06:24:55Z Added `AlignmentHelpers` with `centerInVGU` and anchor helpers and
  updated all sample scenes to use them.
- 06:55:59Z Implemented `drawVGUIDebugGrid` in RenderSystem and hooked it into
  all scenes. The faint grid now renders behind scene content in debug builds.
- 11:51:45Z Documented `anchorTopLeftVGU`/`anchorBottomRightVGU` examples in
  VectorFont documentation and noted that all core scenes rely on
  `AlignmentHelpers` for layout.
- 20:37:44Z VectorFont now returns per-glyph advance widths based on the 5x7 data. measureTextWidth sums each glyph.
- 20:47:02Z Added global VectorFont tessellation fidelity with SetFidelity/GetFidelity.

- 2025-07-20T21:05:27+00:00 VectorFont generator now computes SDF using stroke distances instead of bitmap samples. Cache keys unchanged.
- 2025-07-20T21:23:32+00:00 Documented stroke-based VectorFont glyphs and updated examples with fidelity parameter.
- 2025-07-20T21:51:23+00:00 ProceduralFontGenerator now rasterizes strokes with signed distance logic. Cache key includes fidelity.
- 2025-07-20T22:14:58+00:00 Updated procedural sprite fidelity to support 64-segment circles and registered defaults with high detail.
- 2025-07-20T22:37:25+00:00 Updated documentation for stroke-based VectorFont,
  new sprite primitives and scaling rules.
- 2025-07-20T22:54:30+00:00 Finalized VectorFont rewrite with stroke-based SDF generation and configurable tessellation fidelity.
- 2025-07-20T22:55:05+00:00 High-fidelity shapes enabled across ProceduralSprite with 64-segment circles and smooth arcs.
- 2025-07-20T23:11:24Z Added quadratic and cubic Bézier helpers and rewrote circle/arc tessellation to use parameterized curves.
- 2025-07-20T23:23:41Z Added fidelity multiplier based on pixelsPerVGU. Procedural sprites and VectorFont scale their segment counts for high-DPI rendering.
- 2025-07-20T23:41:40Z Added ProceduralSDFGenerator for path-based SDF textures and drawSpriteSDF helper.
- 2025-07-20T23:56:48Z Audited RenderSystem and Renderer2D for fractional coordinate support. Verified shaders and vertex formats already use floats without rounding.
- 2025-07-21T01:11:14Z Scenes now render SDF textures for shapes and glyphs. Added gradient background support and updated documentation.
- 2025-07-21T02:39:09Z Added createAlphaGradientTexture helper in RenderSystem and refactored scenes to use it.
- 2025-07-21T02:57:24Z Updated SDF sprite API with stroke/fill colors and gradient support. Shaders and scenes refactored.
- 2025-07-21T03:18:45Z Added SceneSwitchGLStateTest verifying no GL errors when toggling DebugWindow0 and Scene0.
- 2025-07-21T03:48:05Z Removed direct `glBindTexture` calls from scene code. All textures bind through RenderSystem helpers.
- 2025-07-21T04:22:23Z Scene files now compute AA radius from fidelity multiplier and use black stroke for SDF sprites.
- 2025-07-21T07:03:48Z Moved texture creation calls into RenderSystem::createTexture2D. Procedural generators and PostProcessingManager no longer bind textures directly.
- 2025-07-21T08:51:31+00:00 Documented extended shape API with stroke/fill colors and fidelity-based tessellation.
- 2025-07-21T09:16:37Z Adjusted SDF sprite AA radius scaling inside RenderSystem; scenes now pass constant values.
- 2025-07-21T15:22:48Z Added UIShapeRegistry with reusable SDF path generators for common UI widgets.
- 2025-07-21T16:07:12+00:00 Documented GlyphPathLibrary with baseline normalization rules and SDF integration. Added UIShapeRegistry usage example.
- 2025-07-21T16:07:12+00:00 Marked GlyphPathLibrary and UIShapeRegistry as In-Progress in game_system_tree.
- 2025-07-21T17:22:06+00:00 Simplified Scene0 rendering path. Gradient now drawn via drawSpriteSDF without procedural sprite grid.
- 2025-07-21T17:44:29Z handleResize updates VGU scale and pixelDensityMultiplier; scenes store view size on resize.
- 2025-07-21T18:17:05Z Windows now use GLFW_RESIZABLE hint; MultiDisplayManager warns if creation lacks this attribute.
- 2025-07-21T18:57:23Z RenderSystem now uses a uniform pixelsPerVGU computed from the smaller framebuffer dimension. Camera view size adjusts by aspect ratio.
- 2025-07-21T20:09:13Z Framebuffer resize callbacks now forward the window index. Engine makes the affected context current before calling RenderSystem::handleResize.
- 2025-07-22T01:20:50Z Verified window resizing overhaul with uniform VGU scaling across all windows.
- 2025-07-22T03:04:24Z Enabled CV_ENABLE_VGU_GRID by default so release builds show the alignment grid.
- 2025-07-22T04:00:58Z Updated VGU debug grid label to "1x1 VGU" to avoid missing glyph warnings on systems lacking the multiplication sign.
- 2025-07-22T04:16:37Z GlyphPathLibrary generates the \u00D7 sign internally so missing font data no longer logs warnings.
- 2025-07-22T04:28:03Z Marked ProceduralUIGenerator, UIShapeRegistry and ProceduralSpriteManager as Completed in game_system_tree.
  Verified with tests/GlyphPathLibraryTest.cpp, tests/UIShapeRegistryTest.cpp and tests/ProceduralSpriteManagerNullRenderSystem.cpp.
- 2025-07-22T05:19:41Z ProceduralSpriteManager now purges inactive sprites inside drawAll.
- 2025-07-22T05:37:30Z Added external glyph registration to GlyphPathLibrary and updated docs.
- 2025-07-22T05:46:23Z Added reactive animation module skeleton with MotionStencil and ActionTemplate.
- 2025-07-22T06:17:25Z Added glyph-level debug logging in RenderSystem::drawTextScreen
  and ProceduralFontGenerator::drawText. createAlphaGradientTexture now logs
  texture handles.
- 2025-07-22T06:39:42Z Split ProceduralSpriteManager tests to avoid duplicate main definitions.
- 2025-07-22T17:10:31Z RenderSystem::createAlphaGradientTexture now accepts width
  and height parameters for custom gradient sizes. Scenes and docs updated.
- 2025-07-22T17:50:03Z RenderSystem::handleResize now calculates pixelsPerVGU without the pixelScale multiplier.
- 2025-07-22T20:05:46Z SDFHelpers multiply the default AA radius by the active fidelity multiplier.

- 2025-07-22T20:38:41Z Fixed gradient texture scaling and added drawSpriteScreen variants for UI rendering.
- 2025-07-22T22:33:47Z Scenes trimmed to minimal color transitions. Engine still
  pushes Scene0 on startup and spawns DebugWindow0.
- 2025-07-22T23:27:28Z Added createDiagonalGradientTexture for diagonal color ramps.
- 2025-07-23T00:08:50Z Added readTexturePixels helper for tests and updated Scene0 gradient to red-blue.
- 2025-07-23T01:08:48Z Added drawVerticalGradientRect helper for procedural gradients and refactored Scene0 to remove texture-based background.
- 2025-07-23T01:37:16Z Added drawDiagonalGradientRect for diagonal gradients and
  updated Scene0 accordingly.
- 2025-07-30T19:44:53Z Added d3dcompiler to Windows link libraries to resolve DX11 backend linker error.
- 2025-07-30T20:23:56Z Implemented ScreenshotSystem for periodic framebuffer captures.
- 2025-07-30T20:43:13Z Logger now maintains separate files per category (Render, Screenshot, Memory, Tests) with startup rotation.
- 2025-07-30T21:16:55Z Added CollapseShapeViewer build stubs and specified language for LocalizationSystem in SceneSwitchGLStateTest to fix MSVC build errors.
- 2025-07-30T21:45:45Z Added PathUtils helpers for path joining and normalization.
- 2025-07-30T21:53:01Z ResourceSystem now uses std::filesystem::path and PathUtils
  helpers for shader resolution. RenderSystem and postprocess code updated.

- 2025-07-31T00:37:12Z Added context validation in ProceduralFontGenerator functions.
- 2025-07-31T04:27:38Z PathUtils::normalize now enforces forward slashes in returned paths for consistent logging.
- 2025-07-31T07:13:16Z Updated resource and scripting APIs to use filesystem paths.
- 2025-07-31T12:47:21Z Tests confirm path handling uses forward slashes via PathUtils.
- 2025-07-31T18:31:15Z Replaced .string() with .generic_string() for normalized paths across engine and game.
- 2025-07-31T18:58:44Z Fixed StencilResolver build failure by converting filesystem paths to strings.
- 2025-07-31T19:55:25Z Normalized file paths in logging macros and runtime warnings.
- 2025-07-31T22:36:51Z Integrated Dear ImGui initialization and new ImGuiPass for per-frame UI.
- 2025-07-31T22:54:01Z InputBroker now forwards GLFW events to ImGui callbacks so UI widgets receive input.

- 2025-07-31T23:07:43Z RenderSystem now drives ImGuiPass each frame for stable overlay.

## 2025-08-01
- 00:29:36Z Verified Debug and Release builds compile. All tests pass under ctest.
- 00:29:36Z Game execution failed to create GLFW window on CI container so ImGui overlay could not be displayed.
- 01:33:39Z ImGuiPass now renders unique labels per window using the active scene name. InputBroker respects ImGui capture flags so engine hotkeys work alongside UI.

- 02:20:59Z Removed duplicate RenderSystem::setSceneManager implementation to resolve build error.
- 2025-08-01T02:34:47Z Fixed multi-window ImGui contexts. InputBroker now selects the correct ImGui context for each callback and ImGuiPass logs active contexts.
- 2025-08-01T02:53:18Z ImGuiPass maps contexts by window ID and skips rendering when missing to prevent multi-window crashes.
- 2025-08-01T03:35:19Z Added null checks when retrieving ImGui contexts to avoid crashes.
- 2025-08-01T03:43:58Z ImGuiPass logs now reference passed windowId instead of user data.
- 2025-08-01T04:17:19Z MultiDisplayManager now constructs a RenderSystem per DisplaySession and exposes getters.
- 2025-08-01T04:38:28Z Engine::Run now loops over render pipelines and calls presentAll once.
- 2025-08-01T04:49:25Z Engine::OnFramebufferResize selects the correct pipeline by window index so each RenderSystem updates its projection.
- 2025-08-01T05:15:26Z ImGuiPass assigns each window a distinct ImGui context. Multi-window rendering now validates the active context per window.
- 2025-08-01T05:35:37Z GameManager tracks the active RenderSystem. Engine sets it each frame before scene rendering.
- 2025-08-01T06:05:41Z Documented per-window render pipelines. Engine logs "Rendering Window <index>" when processing each pipeline.
- 2025-08-01T19:26:53Z RenderSystem beginFrame and endFrame now verify the current GLFW context before proceeding.
- 2025-08-01T19:37:43Z RenderSystem logs GL state after VAOs and programs are created during initialize.
- 2025-08-01T19:49:02Z SceneManager logs which scene is rendered per window.
- 2025-08-01T20:24:23Z ImGui overlay now shows "WindowX : SceneName" so each
  render window identifies its scene. RenderSystem passes the window index to
  ImGuiPass which logs the identifier during render.
- 2025-08-01T21:25:30Z RenderSystem beginFrame now binds the GLFW context before starting ImGui and logs the pointer. Mismatched contexts attempt auto-correction.
- 2025-08-01T21:32:58Z ImGuiPass checks for null window and context before each frame and logs current contexts.
- 2025-08-01T21:37:19Z ImGuiPass::newFrame and ::render log warnings and skip when the context or window pointer becomes null to avoid crashes.
## 2025-08-02
- 2025-08-02T16:47:43Z MultiDisplayManager now resets failed render pipelines so `takeRenderSystem` returns null for uninitialized windows.
- 2025-08-02T17:11:26Z Engine verifies RenderSystem initialization and ImGui contexts per window before registering input, logging each and skipping invalid pipelines.
- 2025-08-02T17:28:29Z Engine::Run skips rendering for windows whose pipelines aren't initialized and logs when frames are skipped.
- 2025-08-02T17:42:49Z Engine::OnFramebufferResize verifies render pipeline initialization and warns when missing.
- 2025-08-02T18:00:49Z RenderSystem verifies ImGuiPass initialization and only drives ImGui when available.
- 2025-08-02T18:11:30Z SceneManager::Render warns and skips when given a null or uninitialized pipeline.
- 2025-08-02T18:22:17Z Engine::Init logs window-to-render system mapping after pipeline validation for startup verification.
- 2025-08-02T19:22:54Z ImGuiPass validates context after glfwMakeContextCurrent in newFrame and render, warning and skipping on mismatch.
- 2025-08-02T19:32:59Z Engine::Run validates GLFW context after glfwMakeContextCurrent and skips rendering on mismatch.
- 2025-08-02T19:43:03Z Engine::Init logs window to RenderSystem, scene name and ImGui context after initial scenes are bound.
- 2025-08-02T20:42:01Z Exposed RenderSystem::renderImGui for explicit ImGuiPass rendering; removed automatic calls from endFrame and renderDebugWindow.
- 2025-08-02T21:04:47Z RenderSystem::renderImGui now forwards window index and scene name to ImGuiPass::render and logs the ImGui context pointer each frame for clearer multi-window tracing.
- 2025-08-02T21:15:28+00:00 Scenes call `RenderSystem::renderImGui` themselves each frame to render per-window overlays. Docs and README updated to reflect manual handling.
- 2025-08-02T21:42:24Z RenderSystem::renderImGui now verifies both GLFW and ImGui contexts before rendering and logs mismatches.
- 2025-08-02T22:02:54Z ImGuiPass no longer auto-rebinds GLFW contexts; mismatches log window index, scene name, current and expected pointers alongside the ImGui context.
## 2025-08-03
- 2025-08-03T03:36:13Z Replaced DebugOverlayRenderer singleton with scene-level DebugOverlayComponent and removed the legacy debug grid flag; documentation updated.
- 2025-08-03T04:03:25Z Documented generic multi-window display configuration and per-window overlay behavior.
- 2025-08-03T04:19:51Z Dropped obsolete runtime flags and defaulted cloud saves to enabled for release builds.
- 2025-08-03T05:23:08+00:00 Engine and MultiDisplayManager now load all windows from `display.json` without a hard limit.
- 2025-08-03T06:18:50+00:00 `RenderSystem::renderImGui` now rebinds mismatched GLFW and ImGui contexts and warns when called outside the ImGui pass.
- 2025-08-03T06:30:20+00:00 Added tests covering context rebinding and out-of-order warnings for `RenderSystem::renderImGui`.
- 2025-08-03T07:24:43+00:00 RenderSystem beginFrame and endFrame error logs now append window indices to context pointers for clearer multi-pipeline diagnostics.
- 2025-08-03T07:35:18+00:00 RenderSystem::renderImGui resolves window context via map and warns when index has no window.
- 2025-08-03T07:47:03+00:00 ImGuiPass now rebinds mismatched GLFW contexts in newFrame and render and sets the ImGui context after correction.
- 2025-08-03T08:21:13Z RenderSystem::renderImGui sets shared context and validates primary window pointer before drawing overlays.
- 2025-08-03T15:02:02+00:00 Documented RenderSystem window index parameter and context-to-VAO mapping in headers and design docs.
- 2025-08-03T15:24:27Z Engine::CreateDebugOverlayWindow now initializes each overlay with its own RenderSystem to keep multi-window overlays independent.
- 2025-08-03T15:52:40Z ImGuiPass::newFrame and ::render attempt to rebind GLFW contexts before logging and set the ImGui context after correction for each window.
- 2025-08-03T16:06:44Z ImGuiPass now warns on mismatched GLFW contexts even after auto-correction and test validates correction and warning logs.

- 2025-08-03T16:37:41Z Engine::Run warns with scene name and expected/current GLFW context pointers when contexts mismatch.
 - 2025-08-03T17:21:14Z RenderSystem::beginFrame now selects the window by mapped index, sets the ImGui context and logs mismatched GLFW pointers with scene names.
 - 2025-08-03T17:30:57Z RenderSystem::beginFrame forwards window index and scene name to ImGuiPass::newFrame; warnings now report both identifiers.
 - 2025-08-03T17:44:33Z RenderSystem::renderImGui now ensures the target window and ImGui contexts are made current before delegating to ImGuiPass.
 - 2025-08-03T18:00:53Z MultiDisplayManager::presentAll appends session index and scene name to warning logs.
- 2025-08-03T18:10:17Z RenderSystem::endFrame warns and resets lingering ImGui passes so the next frame starts fresh.
- 2025-08-03T18:51:43Z RenderSystem caches expected GLFW windows and verifies the active context before binding, logging mismatches and skipping frames to avoid cross-window contamination.
- 2025-08-03T19:20:02+00:00 MultiDisplayManager skips redundant context binds, logs context switches, restores previous contexts, and warns on duplicate windows.
- 2025-08-03T19:30:31+00:00 Engine maps scenes to windows and skips unauthorized renders to keep debug pipelines isolated.
- 2025-08-03T19:48:12+00:00 SceneManager compares `IScene::GetWindowIndex` with the pipeline and warns when routing to the wrong window.
- 2025-08-03T20:04:06+00:00 Engine, MultiDisplayManager and RenderSystem log GLFW context switches, attempt single rebinds on mismatch and keep ImGui passes active until rendering succeeds.
- 2025-08-03T21:00:06Z Engine maps and compares scenes using demangled identifiers so Scene0 renders in the primary window.
- 2025-08-03T21:33:01Z Engine::Run now logs window index, active scene, and RenderSystem pointer each frame to verify bindings.
- 2025-08-03T22:41:11Z Engine::Init binds each window's context before handling resize and restores the previous context to avoid leaks.
- 2025-08-03T22:54:31Z Added EngineWindowContextRestoreTest verifying context restoration and log sequence during window initialization.
- 2025-08-03T23:20:33+00:00 Added ImGuiContextGuard to scope ImGui context changes; beginFrame, ImGuiPass::newFrame and renderImGui now restore the previous context and renderImGui logs the restoration.
- 2025-08-03T23:33:04+00:00 SharedGLResourceFactory centralizes shape texture and default VBO creation with mutex-guarded reference counts so RenderSystem instances reuse shared handles and cleanup happens once.

## 2025-08-04
- 03:26:36Z Engine::Init logs bound GLFW and ImGui context pointers per window and ImGuiPass::initialize confirms created contexts for clearer startup tracing.
- 22:37:58Z Logger::log uses '\n' with std::flush instead of std::endl to avoid carriage return injection.
- 2025-08-04T04:08:31+00:00 CV_GL_DRAW uses a lambda guard and RenderSystem is forward declared to slim dependencies.
- 2025-08-04T05:24:02+00:00 SharedGLResourceFactory release paths now early-return on zero refs and acquire functions are marked [[nodiscard]] to catch missing handle uses.
- 2025-08-04T06:24:25+00:00 SharedGLResourceFactory now validates the current GLFW context before generating resources, logs created handles, and returns 0 on failure.

- 2025-08-04T06:32:02+00:00 SceneManager logs scene additions with class names and window indices; Engine expands debug overlay logging and verifies RenderSystem SceneManager assignments during init.
- 2025-08-04T06:49:23+00:00 RenderSystem debug window now ends frames and logs current GLFW contexts at begin/end to trace mismatches.
- 2025-08-04T07:38:31+00:00 SharedGLResourceFactory auto-binds primary window context and warns once when missing.
- 2025-08-04T08:23:52+00:00 SharedGLResourceFactory safeguards GL context before creating shared buffers.
- 2025-08-04T08:24:05+00:00 ImGuiPass and RenderSystem add lifecycle guards to balance begin/end calls and restore contexts.
- 2025-08-04T08:24:18+00:00 ProceduralFontGenerator now auto-loads a default vector font so UI text is always available.
- 2025-08-04T08:24:30+00:00 Engine shuts subsystems down in reverse initialization order to prevent dangling references.
- 2025-08-04T17:00:12+00:00 SharedGLResourceFactory binds RenderSystem-tracked contexts when no engine window is active, logging once if none are found.
- 2025-08-04T17:21:21+00:00 ProceduralFontGenerator now binds a fallback window when no GL context is current, logging once if none are available.
- 2025-08-04T17:38:39Z RenderSystem beginFrame now unbinds overlapping contexts so scene and debug passes can share a frame without aborting.
- 2025-08-04T17:50:54Z renderImGui logs overlapping context binds and clears the previous context before rebinding.
- 2025-08-04T18:04:37Z Split ImGui handling into SceneImGuiPass and DebugImGuiPass so each window manages its own context.
- 2025-08-04T18:33:56+00:00 Engine shuts down ImGui passes before window destruction and nulls WindowContext pointers.
- 2025-08-04T18:49:08+00:00 Added headless tests for SharedGLResourceFactory, ProceduralFontGenerator and ImGui passes to ensure safe behaviour without a GL context.
- 2025-08-04T19:59:31Z Engine::Shutdown logs rendering stop, ImGui teardown, and RenderSystem shutdown while destroying per-window ImGui contexts.
- 2025-08-04T20:15:06+00:00 ImGuiPass shutdown now guards ImGui calls, clears backend user data and logs when context is missing.
- 2025-08-04T20:27:05+00:00 MultiDisplayManager logs binding shutdown, window destruction, and glfwTerminate while shutting down RenderSystem before windows to avoid post-destroy ImGui calls.
- 2025-08-04T21:10:08+00:00 Logger opens files in binary mode and sets UTF-8 locale to ensure consistent log encoding.
- 2025-08-04T21:38:43+00:00 FileUtils::writeLog opens files in binary mode, sets a UTF-8 locale, and writes lines without implicit newline conversion.
- 2025-08-04T22:04:17+00:00 Logger normalizes log messages to use LF and replaces invalid UTF-8 sequences.
- 2025-08-04T23:19:57+00:00 ImGuiPass shutdown verifies context before tearing down backends, clears user data, and logs cleanup steps.
- 2025-08-04T23:37:49Z RenderSystem stops the render loop, shuts down ImGui passes, then the renderer binding, logging each phase.
- 2025-08-05T02:36:53+00:00 Engine::Shutdown halts global render loops, shuts down pipelines, finalizes ImGui contexts, then closes windows with explicit logs.
- 2025-08-05T02:46:55+00:00 Engine verifies ImGui context validity before destruction and logs when teardown is skipped.
- 2025-08-05T03:00:33+00:00 Shutdown paths log context pointers and window indices when tearing down ImGui backends.

## 2025-10-22
- 2025-10-22T08:42:17Z Codex batch-renamed engine namespaces and include guards to align every module with the `cv::` registry; human review confirmed header dependencies stayed acyclic.
- 2025-10-22T11:58:03Z EngineController gained deterministic initialize/run/shutdown hooks and asserts that all subsystems register before the first tick.
- 2025-10-22T14:12:09Z TickTimer now reports cadence, drift, and queue depths each frame; logs confirm the loop holds 60.0Hz without manual sleeps.
- 2025-10-22T17:55:41Z Introduced LogChannel with severity filters and thread-safe buffering, then wired RendererFacade, EventQueue, ResourceLoader, InputRouter, and SceneDirector into the shared telemetry stream.
