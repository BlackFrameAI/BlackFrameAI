# engine_design.md

This document outlines the intended architecture and functional goals of the game engine being developed for *Purge of the Crescent Veil*.

It provides CODEX with reference for what to scaffold and implement in `/engine/`.

This engine is organized around modular systems that can be replaced or removed independently. The live integration status is tracked in [docs/modular/game_system_tree.md](modular/game_system_tree.md) and [docs/modular/engine_system_tree.md](modular/engine_system_tree.md).
Systems remain **In-Progress** in these trees until their documentation, cleanup, and tests are merged and verified.

## Engine Source Layout

Engine subsystems live under dedicated folders within `/engine/`.
Key locations:

- `core/` – Engine startup and management (`engine/Engine.*`, `time/time_system.*`, etc.)
- `debug/` – Debug utilities and logging (`diagnostics/diagnostics.*`, `logging/logger.*`)
- `quantum/` – Procedural randomness systems
- `biology/` – Biological reaction logic (**BiologyCore**, moved from `physics/biology`)



## Purpose

- The engine is designed for *Purge of the Crescent Veil* but follows modular principles and project-scale flexibility which allows for a wide range of features and additions
- The engine has evolved over time to be multi purpose, it is structured for clean reuse, subsystem showcases, and future extensions beyond this game.
- It must support all features needed for the game to function, render, and run efficiently — while remaining extensible for long-term demonstration value.


## Target Language

- Use modern C++17 features where appropriate  
- Avoid STL-heavy solutions unless justified  
- Lua 5.4 is embedded for lightweight scripting support

## Platform Support

- **Windows** and **Linux** builds are fully supported through the provided scripts.
- Rendering API: **OpenGL 4.5+ core profile** (default)
  - Shaders are written in GLSL and compiled at runtime.
  - OpenGL functions are loaded via **GLAD**.
- Additional APIs such as Vulkan, DirectX 11/12 and Metal are integrated through the `RenderBackend` interface.
  - These backends are integrated but remain under active implementation. OpenGL is the stable, fully supported backend.
  - All backends remain isolated and can be reloaded or swapped at runtime without affecting the OpenGL pipeline.



## Core Responsibilities


- Core engine services
    - Timing and delta time management → see `/docs/systems/time_system.md`
    - Logging and debugging hooks
        - Game loop (main update loop)
        - Windows builds configure the console for UTF-8 output and binary mode during logger initialization
	
- Rendering pipeline
    - 2D and/or 3D as required
    - Basic window management
    - Fullscreen / windowed support
    - Abstracted via `RenderBackend` to allow additional APIs later
	
- Input handling
    - Keyboard
    - Mouse
    - Gamepad (detected via GLFW joystick callback)
    - Input code must remain backend-agnostic
    - Current backend: GLFW
    - Input events are processed by the **InputManager** using GLFW callbacks
    - Basic actions map to left stick/D-Pad movement, `A` for attack, and
      `Start` or `A` to accept menu selections
    - The older *InputSystem* module has been removed
    - System must remain swappable (e.g., other libraries or raw Win32 later)
	
- Audio playback
    - Background music
    - Sound effects
  - Physics simulation powered by the **PhysicsCore** (`engine/modules/physics/core`)
    which now manages bodies and constraints internally.
    - **MaterialStressSystem**, **ImpactModelingSystem**, **FluidReactionSystem**,
      **TerrainDeformationSystem** and **RagdollSystem** emit
      `PhysicsReactionEvent` messages. These systems load constants from
      manifests such as [materials_manifest](reference/physics/materials_manifest.md),
      [fluid_dynamics_manifest](reference/physics/fluid_dynamics_manifest.md) and
      [anatomical_mechanics_manifest](reference/physics/anatomical_mechanics_manifest.md).
  - Biological reaction handling lives under **BiologyCore** (`engine/modules/biology`)
    and interfaces with PhysicsCore for damage and effect triggers.
	
- Scene and entity management
    - Load / unload scenes
    - Entity component system (ECS or simple equivalent)
    - Scenes invoke `RenderSystem::renderImGui(sceneName, windowIndex)` each frame to draw per-window overlays, which now validate the active OpenGL and ImGui contexts before rendering.

- Asset loading
    - Audio
    - Fonts – `ProceduralFontGenerator` auto-loads a default vector font on first use
    - Shader programs via `ResourceSystem`
    - Other data as required
    - No binary assets are tracked in source control. Compiled files such as `.spv`, `.dll` or `.bin` are generated automatically during the build.
	
- Rendering and visual system constraints
    - Primary gameplay is 2D, with 3D elements used for bosses, major events, and environmental effects.
    - Shaders are written in GLSL and loaded directly from source files unless other methods are required for alternative backend pipelines
    - The engine compiles GLSL code at startup using the system OpenGL driver
    - ProceduralSprite types can be used in place of textures. Each sprite owns a custom draw function made from basic shapes.
    - The engine supports a **fully procedural sprite system** as an alternative to textures.
    - `ProceduralSprite` objects contain one or more `ProceduralSpriteFrame`s with draw lambdas.
    - Each frame can define time-based offsets, scale, and tint, powered by the `animTime` field.
    - `ProceduralSpriteInstance` tracks animation time and is used by all in-game entities.
    - The `RenderSystem` exposes `drawRect`, `drawCircle`, `drawPolygon`, and other primitives used by procedural sprites.
      Each primitive accepts a stroke color, optional fill color, stroke width and
      anti-alias radius. Circles and arcs also take a `segments` hint so curves are
      tessellated relative to the active fidelity multiplier.
    - Default GL objects such as the sprite and batch VBOs and the runtime shape texture are allocated once through `SharedGLResourceFactory`, which verifies the active GLFW context before generating handles and warns when missing. Each `RenderSystem` acquires shared handles and releases them when no longer needed.
    - Any skipped sprite draw (due to invalid GL state) should be treated as a critical wiring failure, not cosmetic.
    - The system now stores per-frame data in a **ProceduralSpriteFrame** struct.
    - Frames include rotation, scale, tint color and animation time for lightweight effects.
    - Color values use **ABGR** ordering (`0xAABBGGRR`) to match the `RenderSystem` extractors.
    - A helper `ColorRGBA` struct converts `0xAARRGGBB` integers into normalized RGBA floats
      and can be passed directly to `drawRectVGU`, `drawCircleVGU` and other primitives.
    - `RenderSystem` exposes `drawRectScreenVGU` and `drawCircleScreenVGU` helpers for screen-space shapes.
    - Rendering duties are split into smaller modules:
        - `Renderer2D` implements primitive draw calls.
     - A 1000×1000 **Virtual Grid Unit (VGU)** space normalizes all procedural coordinates. `RenderSystem` now computes a uniform scale using the smaller framebuffer dimension so `pixelsPerVGU_X` and `pixelsPerVGU_Y` match. The constant `VGU_GRID_SIZE` defines this 1000-unit dimension and should remain unchanged.
     - All draw functions accept floating point coordinates. Vertex data and shaders preserve fractional values so sub-pixel positioning works consistently across resolutions.
    - High-DPI windows now rely solely on the framebuffer resolution. The uniform scale no longer factors in `pixelScale`.
    - `RenderSystem::handleResize` updates the VGU scales and recomputes a `pixelDensityMultiplier` used by procedural fidelity.
        - `OverlayRenderer` manages overlay classes and screen-space drawing.
        - `GLStateManager` owns VAO and VBO setup.
        - `PostProcessController` wraps post-processing passes.
        - `DebugOverlayManager` handles optional debug overlay windows.
        - `ImGuiPass` drives Dear ImGui frame updates and rendering. The pass
          initializes once when the owning `RenderSystem`'s main GLFW window and
          OpenGL context are ready. It renders a small **StableWindow** overlay
          containing static text and a debug circle each frame. The overlay
          label now includes the window index and active scene name so each
          window displays its unique identifier.
          `RenderSystem` guards calls to `newFrame()` and `render()` with
          `m_inImGuiPass` so nested passes are avoided. `RenderSystem::beginFrame`
          now forwards the window index and active scene name to
          `ImGuiPass::newFrame`, ensuring mismatch warnings report both values.
          `RenderSystem::endFrame` warns if an ImGui pass is still active and
          resets `m_inImGuiPass` so the next frame begins a new pass.
          Each `RenderSystem` owns its own ImGui context, stored in the associated
          `WindowContext::imguiCtx` pointer, rather than sharing a global
          context across windows. `ImGuiPass::newFrame` and `ImGuiPass::render`
          warn and skip execution if the window or context pointer becomes
          null, preventing crashes when a window closes unexpectedly.
          `RenderSystem::renderImGui` forwards the window index and scene name
          to `ImGuiPass::render` and logs the ImGui context pointer every frame
          so multi-window traces clearly identify the active scene. An internal
          `ImGuiContextGuard` restores the previous context after each pass to
          enforce balanced lifecycle pairs.
	
- Event system
    - Allows registering callback listeners
    - Dispatches string-based events via the `EventSystem`
    - Modules subscribe to named events using callback registration
    - `SystemManager` orchestrates subsystem updates for plug-and-play integration and now shuts systems down in reverse initialization order to avoid dangling dependencies
    - Supports decoupled communication between systems with minimal boilerplate
	
- Layer separation
    - Engine systems must not contain hardcoded gameplay behavior  
    - All Engine-specific behavior resides in the Engine layer  
    - All Game-specific behavior resides in the Game layer  
    - Engine and Game behaviors must remain cleanly separated  


## Constraints

- No Unity, Unreal, or similar dependencies unless separated to a contained system only usable by specific system/demo. Should never be considered core or primary use when avoidable 
- No licensing traps — must be fully owned, open, and modifiable  
- External libraries allowed (e.g. SDL, SFML, stb, etc.)  
- Codex may recommend safe options  
- Simple, maintainable architecture preferred over hyper-optimized complexity  


## Completed Milestone Phases

1. Project scaffolding and engine bootstrapping
2. Platform-agnostic window and render loop initialization
3. OpenGL 4.5 pipeline initialization confirmed
4. RenderBackend interface added to allow future backends
5. RendererBinding introduced to manage per-window backend initialization
6. GLFW-based **InputManager** established (old InputSystem removed)
7. Engine loop + ESC-exit system confirmed
7. Scene, entity, and basic asset loader in place
8. GameUIManager integrated *(deprecated with the archival of the old UI/render system)*
9. Custom PhysicsCore integration
10. Lua-based scripting system scaffolded
11. SaveSystem added for incremental checkpoints
12. Vulkan2 backend integrated alongside OpenGL and is actively being expanded
13. DirectX 11, DirectX 12 and Metal backends are now integrated and continue to be implemented
14. Lua compiled with `LUA_USE_POSIX` so `mkstemp` is used for temporary files
15. DirectX backends now configure alpha blending for 2D primitives
16. Window-to-scene mapping isolates debug pipelines from main gameplay scenes
17. Metal backend mirrors OpenGL's default alpha blend state

## Completed Feature Summary (Phase 9.4+)

- The **InputManager** now relies entirely on GLFW event callbacks and supports
  runtime debug toggles via the F5–F12 keys.
- Gamepads are detected using GLFW's joystick callback and map movement,
  attack, and menu navigation.
- Shader compilation errors are written to `logs/shader_errors.txt` for easier
  debugging.
- The modular `PostProcessingManager` is integrated into the render pipeline and
  processes a chain of frame passes before overlays draw.
- `RenderSystem` provides `drawLine` and `drawPolygon` helpers with a dedicated
  GLSL line shader compiled alongside existing rectangle and circle programs.
- Circle and arc helpers accept an optional **segments** parameter. Shapes use
  fidelity-based tessellation so the actual segment count is multiplied by the
  `RenderSystem` fidelity multiplier.
 - `SetFidelity` adjusts the global tessellation fidelity used when procedural
    fonts tessellate curves via `GlyphPathLibrary`. `GetFidelity` queries the current setting.
- `RenderSystem` can be given a `Camera2D` instance. All world geometry is
  offset by the camera position so the view follows the player.
- `RenderSystem::isWorldVisible(x, y, w, h)` returns `true` when a world-space
  rectangle intersects the camera view. Managers use this to cull offscreen
  sprites before invoking `ProceduralSpriteInstance::render`. `EnemyManager`
  records how many frames each enemy is invisible and removes them after a
  configurable threshold.
- `Camera2D` exposes `shake(magnitude, duration)` which randomly offsets the
  view for short bursts.
- `Camera2D` tracks a zoom factor. `RenderSystem::handleResize` scales the
  projection using this zoom so mouse wheel scrolling can zoom the camera.
- The `SceneManager` handles multi-scene streaming through transition calls.
  `StartTransition` now stores the incoming scene before invoking
  `OnEnter`, allowing assets to load seamlessly while gameplay continues.
Legacy UI overlays and scene logic have been moved into the `archive/` directory. The engine now boots into the full game by default. Debug overlays can be created at runtime using `Engine::CreateDebugOverlayWindow` and remain disabled by default.
- The visual/UI system is being rebuilt from scratch; the previous implementation
  now lives under `engine/legacy/` and is no longer maintained.
- OverlayRenderer queues UI draw callbacks from UIOverlayManager and submits them after the world frame through the active RenderBackend.
- Repository documentation updates are self-managed by Codex through pull
  requests.
- When a system or feature is upgraded, Codex must refactor dependent modules and scenes to use the new implementation and remove or rewrite any superseded code paths unless they are intentionally preserved.
- `NetworkSimulationManager` (in `engine/modules/network/manager/`) provides UDP-based replication using Asio to keep
  deterministic simulations in sync.
- RenderSystem can now initialize either OpenGL or Vulkan2 backends via
  command line flag `--vulkan`.
- The rendering code has been moved under `engine/modules/render/`.
  `RenderSystem` now builds an OpenGL 4.5 pipeline using GLAD and GLFW.
  All primitives are batched through `Renderer2D` and flushed via a
  pluggable `RenderBackend` instance.
- Frame lifecycle tasks such as clearing are delegated to
  a `RenderBackend` instance created during initialization. Buffer swapping
  for all windows is performed by `MultiDisplayManager::presentAll`.
  - Each window is represented by a `DisplaySession` storing the GLFW handle and a `RendererBinding`. `MultiDisplayManager` selects the backend for each session using `BackendType`. `RenderSystem` receives the primary session's binding during initialization but does not own it.
  - Because every `DisplaySession` owns a separate binding, each window can use a different rendering API. The configuration file specifies the backend for each window and `MultiDisplayManager` instantiates the appropriate binding automatically.
  - `RendererBinding` instances are initialized on demand. `RenderSystem` invokes `initialize()` only when `getBackend()` returns `nullptr`, logging when initialization is skipped due to an existing backend.
  - `RenderSystem::initialize(window, resources, type, binding, windowIndex)` accepts a `windowIndex` (defaulting to `0`). The index maps the GLFW context to a specific VAO set so each window selects its own rendering resources.
  - Each `DisplaySession` also creates its own `RenderSystem` and ImGui context. `MultiDisplayManager::takeRenderSystem` transfers these objects to the engine so `Engine` maintains a vector of per-window pipelines in `m_renderPipelines`.
    `Engine::Run` skips null or uninitialized pipelines, logging "Window<i> pipeline not ready; skipping frame" before continuing. Ready pipelines log the active index and execute `beginFrame`/`endFrame`.
    `Engine::Shutdown` stops global rendering loops, invokes `shutdown` on every pipeline, validates and destroys per-window ImGui contexts before closing windows, and then clears `m_renderPipelines`.
    `RenderSystem::shutdown` stops render-loop callbacks before tearing down its ImGui passes and renderer binding.
  - `RenderSystem::endFrame` no longer calls `m_backend->endFrame()` directly. Presentation for all windows occurs exclusively via `MultiDisplayManager::presentAll()`.
  - `MultiDisplayManager` supports an arbitrary number of GLFW windows defined in
    `game/assets/config/display.json`. Every window owns a dedicated
    `RenderSystem`, ImGui context, and pipeline so additional displays can run
    unique scenes without affecting each other. Override the configuration path
    with the command line flag `--display-config=<path>`.
  - All windows are created with `GLFW_RESIZABLE` enabled. The values in
    `display.json` specify the initial size only.
  - Specify the initial visual theme with `--theme=<name>` or set the
    `CV_THEME` environment variable. Available names correspond to files under
    `game/assets/themes/`.
  - Debug overlays are modular scene components attached per window. Scenes
    register overlay modules to any window and they render through that window's
    ImGui context after the scene.
  - `RenderSystem` stores per-window VAO sets in a vector sized via
    `MultiDisplayManager::getWindowCount()`. `setDebugWindow` allocates an
    additional VAO set when a new window is registered.
  - `game/assets/config/backend_validation.json` lists all supported backends so
    `MultiDisplayManager` can spawn a window for each one. The
    `cv_backend_validation` demo and the in-game `BackendValidationScene`
    both use this file to open a window per backend. `MultiDisplayManager`
    also exposes `enumerateAllBackends()` to generate the same configuration
    programmatically.
- Use the command line flag `--cloud-save` to enable SaveSystem cloud syncing.
- Use `--autotest[=<seconds>]` to bypass the main menu and run a short automated
  play session for stability testing. The duration defaults to 60 seconds.
- SaveSystem now persists physics body velocities, network frame state and
  active HIL connection details so restores fully rebuild runtime state.
- `display.json` may specify `default_backend` to choose the fallback renderer
  when a window entry omits `backend` or uses an unknown value. The engine
  defaults to **OpenGL** if this key is absent.
- Statistics windows and the `StatsRenderSystem` have been removed. Performance
  metrics are now shown only via the in-game overlay toggled with **F8**.
- `InputBroker` registers callbacks for every window created by `MultiDisplayManager`, ensuring input is captured regardless of which display is focused. Before forwarding events to the engine it selects the window's ImGui context and checks `ImGui::GetIO().WantCaptureKeyboard` and `WantCaptureMouse`.
  - Each window stores a `WindowContext`. `MultiDisplayManager::initialize()` sets
    `glfwSetFramebufferSizeCallback` so resize events use this context to route
    through `Engine::OnFramebufferResize`. The engine looks up the matching
    `RenderSystem` from `m_renderPipelines` by window index and calls
    `handleResize`, allowing each pipeline to update its own projection.

- UI coordinates use a **top-left origin**. The cursor callback in `InputBroker`
  flips the raw GLFW Y position relative to the framebuffer height so overlay
  logic receives positions in this space.

### Frame Order

The render pipeline follows a consistent order each frame:
1. `RenderSystem::beginFrame` clears the frame and sets up state.
2. The active scene or stage background is drawn. Gameplay scenes delegate this step to `StageManager`.
3. Gameplay entities render in world space.
4. Scene overlays such as the HUD draw next.
5. Debug overlays render for clarity when enabled.
6. `ImGuiPass` submits Dear ImGui widgets after the debug overlays.
7. `Engine::Run` iterates over `m_renderPipelines`. Null or uninitialized pipelines log "Window<i> pipeline not ready; skipping frame" and are skipped. Valid pipelines log the window index, call `beginFrame`, the game render functions, then `endFrame`. After all windows are processed `MultiDisplayManager::presentAll` swaps buffers once. Each window sets its ImGui context before the frame using `ImGui::SetCurrentContext`.

## Networking Overview

- `NetworkSimulationManager` (found under `engine/modules/network/manager/`) replicates entity transforms over UDP using Asio.
- Frame numbers are recorded each tick to maintain deterministic lockstep.
- Use `initialize`, `update` and `consumeReplicatedStates` to drive the system.
- `Game` calls `replicateEntityState` for moving entities each frame and
  applies incoming states from `consumeReplicatedStates`.
- `Engine::Init` starts the network manager as a server on port `7777`.

### Switching Render Backends

`RenderBackend` abstracts the API details so multiple implementations can
coexist. The engine defaults to an **OpenGLBackend** that drives the
established OpenGL 4.5 pipeline. The **Vulkan2Backend** introduces
a Vulkan/RTX pipeline for hardware capable of ray tracing and is currently under active development. Pass the command
line flag `--vulkan` when launching the game to enable this path; otherwise the
OpenGL backend is used.

The Vulkan path is compiled only when the CMake option `CV_ENABLE_VULKAN` is set
to `ON`. If the Vulkan SDK is not found the build automatically falls back to
OpenGL-only mode. Vulkan-specific headers such as `Vulkan2Backend.h` and the
`VulkanBinding` sources are guarded by `CV_ENABLE_VULKAN` to avoid including or
compiling them when the SDK is absent.

The DirectX 12 backend follows a similar pattern. Pass `-DCV_ENABLE_DX12=ON`
when configuring to compile `DX12Backend` and related bindings. CMake searches
for `d3dx12.h` using the Windows SDK or the vendored copy under
`engine/external/directx`. If the header is missing the option is disabled and a
warning is printed during configuration.

When a DirectX 12 device with DXR support is detected `DX12Backend` records
rectangles and lines using a simple ray tracing pipeline. If DXR is unavailable
the backend falls back to the rasterization path.

The Vulkan2 backend queues rectangle and line primitives each frame. `beginFrame`
allocates a command buffer, clears the active swapchain image and starts a render
pass. Queued shapes are recorded just before `endFrame` submits the command
buffer for presentation. `handleResize` recreates the swapchain and associated
framebuffers when the window size changes.

*TODO:* future Vulkan render passes should configure
`VkPipelineColorBlendAttachmentState` with `blendEnable = VK_TRUE`
and standard source/destination factors so alpha blending matches
the OpenGL pipeline.

### Vulkan RTX Backend

`VulkanRTXBackend` extends `Vulkan2Backend` and attempts to create a ray tracing
pipeline during initialization. If ray tracing support is unavailable the
backend falls back to the regular rasterization path so `drawRect` and `drawLine`
behave identically to the Vulkan2 implementation. When the pipeline is
available these calls dispatch through the ray‑tracing shaders. Each
`DisplaySession` instantiates a `VulkanRTXBinding` when the window's backend is
set to `VulkanRTX` in the configuration file.

DirectX and Metal windows use similar bindings. `DX11Binding`, `DX12Binding`,
`DX12RTXBinding`, `MetalBinding` and `AndroidGLESBinding` each own their
respective backend and simply forward `initialize` and `shutdown` to it.

### PostProcessingManager

`RenderSystem` integrates `PostProcessingManager` to run a chain of post-processing passes. Each pass registers via `addPass` and operates on the scene texture. After all passes run the result is blitted back to the default framebuffer before overlays render.

Post-processing is disabled by default; no passes are registered until a scene or system opts in. The helper functions can register a color invert pass followed by a grayscale pass via `RenderSystem::enableGrayscale` or by manually adding passes to `PostProcessingManager`.
Each pass draws a fullscreen quad via a `ProceduralSpriteInstance` rather than binding its own VAO.

Shader compile failures are logged to `logs/shader_errors.txt` by `ResourceSystem::loadShader`.
The `ResourceSystem` no longer loads textures. Only shader sources are compiled
and cached at runtime. All sprite visuals are procedurally generated, so texture
assets are unnecessary.

### Scene Streaming Workflow

The `SceneManager` now maintains a list of active scenes and supports streaming transitions. When a new scene is triggered, `StartTransition` stores it as the transition scene before calling `OnEnter`. The current scene continues updating until the new scene signals readiness via `CompleteTransition`, at which point the previous scene is removed. This allows assets to load while gameplay continues, preparing the engine for world streaming. `GetCurrentScene()` returns the active scene at the top of the stack for debugging and tests.
Scenes specify their target window through `IScene::GetWindowIndex`, and `SceneManager::Render` warns and skips when a scene is routed to a different window than the active render pipeline.

## SEED Kernel Layer

The **SEED layer** sits below the engine and selects which kernel to run. It exposes GPU, audio and input brokers while a kernel is active. `KernelSlotManager` keeps active, backup and test kernels available. New kernels are loaded via `KernelLoader` and promoted only after validation.


## Notes for CODEX

- Maintain modularity — each system in its own logical source files
- Every modular system must be placed in its own directory (e.g., `game/modules/stage/StageManager.*
- Document code with comments
- Prefer platform-aligned design
 - Primary development is Windows using OpenGL 4.5+ core profile
- Must never compromise Windows stability
- Update this document as new engine requirements emerge


## Engine Boundaries

- The engine provides generic systems and runtime scaffolding.  
- The Game layer (under /game/) defines all game-specific logic, assets, and narrative behaviors.  
- Engine code must not reference specific enemy types, story characters, levels, or effects.  
- Utility systems (e.g., math, file IO) should remain in /engine/ and be reused by both layers.

### Quantum Module Integration

1. Quantum simulation code resides under `engine/modules/quantum` and builds by default via the `CV_USE_ENGINE_QUANTUM` option (set to `ON`). This subsystem runs entirely in software; no specialized quantum hardware is required.
2. Safety notes and meltdown scenarios in [docs/archive/quantum_peril_scenarios.md](archive/quantum_peril_scenarios.md) and [docs/archive/radiation_exposure_handling.md](archive/radiation_exposure_handling.md) describe future hardware hazards for potential expansions and are not part of the current stable engine.

### Entropy Module

The `engine/modules/entropy` module provides random bits for CPU and GPU subsystems.
`EntropyManager` collects bytes from registered `IEntropySource` instances and
exposes `requestBits()` alongside helper functions for integers and floats. The
underlying `EntropyPool` holds a configurable number of bytes (256 by default)
and evicts the oldest entries once full. When requests drain the pool faster
than sources can refill it, the manager logs a warning before reseeding. A
round‑robin scheduler chooses which source to poll each cycle, with optional
weights assigned on registration, ensuring no single simulator monopolizes the
polling loop. Refer to `/docs/systems/entropy_system.md` for a full description
of sources and API usage.
