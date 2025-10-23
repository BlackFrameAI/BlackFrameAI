# Development Logging & Debugging

This guide explains how runtime logging and debugging are configured in the engine.

## Initializing the Logger
The logger is initialized early in `Engine::Init` so that all subsystems can write messages as they start up. It creates a `logs` directory under the project root and opens `runtime.log` inside that folder.

```cpp
cv::Logger::initialize();
```

At shutdown `Logger::shutdown()` is called after every system is cleaned up.

## Log Levels and Macros
`logger.h` defines four log levels and convenient macros for emitting messages with file and line information:

```cpp
enum class Level {
    Debug,
    Info,
    Warning,
    Error,
    Fatal
};

enum class Category {
    Runtime,
    Render,
    Screenshot,
    Memory,
    Tests
};

#if CV_ENABLE_DEBUG_LOGS
#define CV_LOG_DEBUG(msg)   cv::Logger::log(cv::Logger::Level::Debug,   msg, cv::PathUtils::toGenericString(__FILE__).c_str(), __LINE__)
#else
#define CV_LOG_DEBUG(msg)   do { } while(0)
#endif
#if CV_ENABLE_INFO_LOGS
#define CV_LOG_INFO(msg)    cv::Logger::log(cv::Logger::Level::Info,    msg, cv::PathUtils::toGenericString(__FILE__).c_str(), __LINE__)
#else
#define CV_LOG_INFO(msg)    do { } while(0)
#endif
#define CV_LOG_WARNING(msg) cv::Logger::log(cv::Logger::Level::Warning, msg, cv::PathUtils::toGenericString(__FILE__).c_str(), __LINE__)
#define CV_LOG_ERROR(msg)   cv::Logger::log(cv::Logger::Level::Error,   msg, cv::PathUtils::toGenericString(__FILE__).c_str(), __LINE__)
#define CV_LOG_FATAL(msg)   cv::Logger::fatal(msg, cv::PathUtils::toGenericString(__FILE__).c_str(), __LINE__)
```

`CV_LOG_FATAL` prints the most recent log entries to the console and then
terminates the engine.

Use these macros throughout the codebase for consistent output.

Log messages always display normalized file paths using forward slashes. Any
".." segments are collapsed so paths in logs match across platforms.

Additional convenience macros target specific logging categories:

```cpp
CV_RENDER_LOG_INFO("Shader compiled");
CV_MEMORY_LOG_WARNING("Leak detected");
```

These route messages to `render.log`, `memory.log` and so on under the `logs` directory.

`CV_ENABLE_DEBUG_LOGS` and `CV_ENABLE_INFO_LOGS` are CMake options controlling
whether the corresponding macros emit code. Both default to `ON` for Debug
builds and `OFF` for Release to avoid extra string processing overhead. A third
option, `CV_FORCE_LOGS`, defaults to `ON` so Release builds keep both log levels
enabled. Disable this with `-DCV_FORCE_LOGS=OFF` during configuration if you
need a quieter Release build.

The logger tracks a runtime log level. Debug builds start at `Debug` while
Release builds start at `Info`. Call `cv::Logger::setLogLevel` to adjust this
threshold or launch the runtime with `--debug` to force debug output.

Use `assert()` from `<cassert>` for debug-only checks. For conditions that should
immediately abort in all builds, call `CV_LOG_FATAL` directly.


## Log File Location
All log output is written to category-specific files (`runtime.log`, `render.log`, `screenshot.log`, `memory.log`, `tests.log`) inside the `logs` directory. Recent messages are also kept in memory so they can be displayed by the in‑game overlay.

Existing logs are renamed to `<name>_YYYYMMDD_HHMMSS.log` when the engine starts. Each log is limited to 25&nbsp;MB; once a file exceeds this size it is rotated again, keeping at most ten old logs per category.

### Display Configuration and Fallback
`MultiDisplayManager` reads `game/assets/config/display.json` at startup. The
file may define `default_backend` to control the renderer used when an entry
omits a backend or initialization fails. The `windows` array lists the title,
size and optional backend for each window. `MultiDisplayManager` creates every
entry in order so the list may include any number of windows. Windows are
requested as resizable so these values only determine their initial dimensions.
An optional `forceSingleWindow` flag can limit creation to the first window for
debugging, but full multi-window rendering is otherwise supported.

Each window maintains its own overlay and input state. By convention, the first
window hosts the game while additional windows may present debugging tools or
other views. Logging macros write to the same files regardless of window count,
but overlays appear only on windows that enable them.

If `display.json` is missing or malformed an error is logged and the manager
falls back to constructing a single primary window using the fallback backend.
This is a recovery path for configuration failures only; additional windows can
still be created later.

## OpenGL Debug Callback
When the OpenGL context supports debug output, the engine registers `GLDebugCallback`. Messages of severity **HIGH** or **MEDIUM** are routed as errors while **LOW** severity becomes warnings.
Debug builds request a debug OpenGL context, and initialization now checks for the `GL_KHR_debug` extension via `glGetString(GL_EXTENSIONS)` or `GLAD_GL_KHR_debug`. Engine startup sets the GLFW_OPENGL_DEBUG_CONTEXT hint so this request happens automatically during initialization.
When the extension is present, `glEnable(GL_DEBUG_OUTPUT)` and `glDebugMessageCallback` are activated automatically even if the context lacks the debug flag.

```cpp
static void APIENTRY GLDebugCallback(...)
{
    // messages forwarded to CV_LOG_* macros
}
```

Debug output can be toggled at runtime through `RenderSystem::enableDebugOutput`.

## Input Logging
`InputBroker` records key presses and releases at the debug log level. When a key
is pressed or released, the event is written to `runtime.log` in the form
`InputBroker: key press <key>` or `InputBroker: key release <key>`. This helps
verify that input callbacks are firing without enabling any visual overlays.

## Runtime Key Toggles and Log Overlay
The `DebugController` binds several keys for development builds. Key functions include:

* **F5** — Toggle the audio event overlay showing recent playback activity.
* **F6** — Dump recent audio events to `logs/audio_events_<timestamp>.csv`.
* **F7** — Enable or disable OpenGL debug output.
* **F8** — Toggle the system info overlay that displays hardware statistics, CCP size and entropy drain.
* **F9** — Toggle input blocking for non-primary windows in multi-window setups and show/hide the score overlay in window index 1.
  The overlay content for that window is drawn by `engine/modules/debug/overlay/DebugOverlayWindow.cpp`.
* **F10** — Toggle verbose draw logging for RenderSystem.
* **L** — Toggle the render debug overlay showing layer order and sprite counts.
* **O** — Toggle overlay position logging.
* **I** — Toggle periodic sprite count logging when verbose logs are enabled.
* **B** — Toggle physics position and joint logging.
* **U** — Start or stop the ChaoticCollapseOracle background thread.
* **Y/X/Z** — Collapse CPU, state vector and CUDA gates.
* **P** — Promote the newest chaotic seed.
* **F2** — Toggle Visual Debug Mode which enables overlay boxes drawn by `DebugOverlayComponent`.
* **[** — Decrease UI font scale.
* **]** — Increase UI font scale.
* **-** — Decrease HUD opacity.
* **=** — Increase HUD opacity.
* **T** — Toggle text shadow on HUD text.
* **G** — Toggle UI grid overlay for alignment work. Scenes may enable the grid by default via per-scene settings.
* **C** — Toggle anchor marker overlay for verifying HUD anchors.
* **H** — Toggle grayscale post-processing theme.
* **F4** — Toggle player invincibility for quick testing.
* **N/A** — The log overlay does not have a runtime toggle key.
* **N/A** — The save slot overlay is opened through the UI system and has no key binding.

The overlays now use the procedural font system rendered via `RenderSystem::drawTextScreen`.
- Unsupported characters log a warning and skip the glyph.
- `GlyphMetrics::lineHeight` defines spacing between lines.
- When a future overlay relies on a textured font atlas the texture handle is verified before binding. If the ID is zero a warning is printed once for that overlay and the draw call is skipped for the frame.
- `RenderSystem::logCurrentBindings` is called before drawing and `glGetError()` checked afterward. Any reported error value is traced to `runtime.log` to help diagnose overlay state issues.

### Visual Debug Overlay
`DebugOverlayComponent` can draw semi-transparent bounding boxes for troubleshooting.
Add it to a scene and attach the current `RenderSystem`:

```cpp
cv::DebugOverlayComponent overlay;
overlay.attach(&render);
overlay.setEnabled(true);
```
Use `overlay.drawBox()` to annotate areas. Colors are organized per-layer (UI, Enemy, Player, FX).
When overlay position logging is active, UI overlays automatically draw their
bounds using this component for quick verification.
Overlays operate within the scene graph and automatically attach to the current
window's `RenderSystem`.

## System Info Snapshot and Frame Timing
`SystemInfo` captures a snapshot of CPU, memory and GPU details during `Engine::Init`. The values are stored in `SystemSnapshot`:

```cpp
struct SystemSnapshot {
    std::string cpuBrand;
    uint32_t coreCount;
    uint32_t threadCount;
    uint64_t totalRamMB;
    std::string osName;
    std::string osVersion;
    std::string kernelBuild;
    std::vector<std::string> gpuAdapters;
    std::string gpuVendorId;
    uint64_t vramMB;
    std::string glVersion;
};
```

`SystemInfo::initialize()` populates this structure and prints the results to `runtime.log`. The snapshot can then be queried at runtime to present system details on screen.

### Frame Timing Utilities
The engine tracks CPU and GPU frame times through `FrameTimer` (see `engine/modules/time/system/FrameTimer.h`). Call `startFrame()` at the beginning of a frame and `endFrame()` at the end to fill a `FrameTiming` struct containing `deltaSeconds`, `fps` and `gpuSeconds`.
To keep the log readable, `FrameTimer` accumulates timing for one second and then prints a single line like `FrameTimer: avg fps=60.0 gpu=0.002` before resetting the counters.

`FrameLimiter` runs alongside the timer to cap the maximum FPS. It sleeps after each frame when the work finishes faster than the 60 FPS target so debug logs reflect real-world performance.

`Engine::Run` maintains its own counters using these delta values and prints
`Engine: avg fps=<value>` every second. The message is logged at the info level
and appears even when debug overlays are turned off so basic performance data is
always captured.

### System Info Overlay
`RenderSystem` owns a `SystemInfoOverlay` that can display the current FPS and hardware snapshot for troubleshooting. The overlay is no longer part of the standard HUD and must be explicitly enabled for debugging sessions.

### Dedicated Statistics Window
This feature has been removed. The engine now always operates in a single-window mode and overlays provide the relevant performance metrics.

#### Interpreting the Values
- **FPS** is calculated as `1 / deltaSeconds` and indicates how many frames are rendered per second. Values above 60 mean the game is running faster than the typical refresh rate.
    - **CPU/GPU data** shows the hardware detected at startup and can help verify driver versions and available memory. Large discrepancies may indicate incorrect drivers or misreported VRAM.

### Crash Dumps
When a fatal signal is caught the engine automatically writes a crash dump under `logs/` with a timestamped filename `engine_YYYYMMDD_HHMMSS.dmp`. Recent log lines and system info are captured to help diagnose issues. A stack trace is saved to `logs/stacktrace.txt` so the failing call chain is clear. The engine resolves each address using `DbgHelp` on Windows or `backtrace_symbols` on other platforms so the file contains both raw addresses and human-readable symbols. The GPU state at the time of the crash is also written to `logs/gpu_state.txt` and lists the vendor, renderer, GL version and viewport dimensions.

The resulting files can be found in the `logs` directory:

* `engine_YYYYMMDD_HHMMSS.dmp` — OS specific minidump
* `stacktrace.txt` — captured call stack for the crash
* `gpu_state.txt` — snapshot of the GPU state at the moment of failure

The diagnostics module installs its fatal signal handlers near the start of
`Engine::Init` whenever safety checks are enabled. These handlers invoke
`captureStackTrace()` before re-raising the fault so segmentation faults and
other abort signals leave a readable backtrace in `logs/stacktrace.txt`.
### Draw Call Wrapper and Frame-End Context Log

Each draw call now invokes `RenderSystem::logDrawState` which records the current framebuffer, viewport, VAO and active shader. The helper logs the current GLFW context so it is clear which window issued the command. The default framebuffer (ID 0) and an unbound array buffer are permitted. A draw is skipped only when the viewport has zero size, no VAO is bound or no program is active. A vertex count can be provided so the log clearly indicates how many vertices will be submitted.
`RenderSystem::logCurrentBindings` complements this helper by printing the same
state without validation so initialization issues can be diagnosed.
When issuing draw calls use the `CV_GL_DRAW` macro:

```cpp
CV_GL_DRAW(renderSystem, "Overlay", glDrawArrays(GL_TRIANGLES, 0, verts), verts);
```

It logs the program, VAO, VBO, FBO, viewport and vertex count then executes the draw only when the state is valid. These messages are printed only when `RenderSystem::setVerboseDrawLogging(true)` is active.

The helper also saves this information in `RenderSystem::lastDrawContext`. Once
`RenderSystem::endFrame` finishes, `Engine::Run` writes a single line to
`runtime.log` summarizing the last recorded draw call.

Debug builds also validate the overlay pipeline after each UI render.
`RenderSystem::validateUiState` now runs unconditionally and compares the
currently bound VAO, VBO and shader program against the default UI state.
If any mismatch occurs an error is logged (and debug builds trigger an
`assert`) so the faulty overlay can be identified.

### Stack Overflow Logging
The diagnostics module also installs a handler for stack overflows. On Windows a vectored exception handler listens for `EXCEPTION_STACK_OVERFLOW`. On Linux and other POSIX systems `sigaltstack` provides a dedicated stack so the `SIGSEGV` or `SIGBUS` handler can safely record the failure. When triggered the engine logs a fatal message, captures a stack trace and re-raises the fault so normal crash reporting still occurs.

### Launching Without Safety Checks

For performance testing there is a `--nosafety` command line switch. This starts the game without the extra diagnostics that normally run in debug mode. Use it with care because it disables memory leak detection.

Use `--debug` to force the runtime log level to `Debug` regardless of build type.

## Visual Debugging

`ProceduralSpriteInstance::render()` emits warnings such as:

```
Skipping sprite draw: invalid GL state for 'RoomBG'
```

These occur when no VAO, VBO, or shader program is bound — typically due to missing sprite assignments or transient instance miswiring. These should never be suppressed. Always treat them as integration bugs.

`RenderSystem::initialize()` now verifies that each VAO creation succeeds. If `glGenVertexArrays` returns zero the system logs `RenderSystem: failed to create <name> VAO` and initialization aborts. `bindDefaultUiState()` only binds GL state when the VAO, VBO and shader program are valid so overlay draws won't corrupt later calls.
- `drawRectImpl` rebinds the default UI state if it detects a missing VAO. When the bindings remain invalid it logs an error once and skips drawing to avoid flooding the log.
- Debug builds throttle the "Skipping sprite draw" warning to once every 60 frames so repeated invalid state logs do not overwhelm the file.

`ProceduralSpriteInstance::update()` also warns when an instance hasn't been rendered for more than 120 frames. The sprite name now appears at the end of the message:

```
ProceduralSpriteInstance: not rendered for 180 frames for 'StageDecoration' (source: StageManager)
```

## GL State Linting

Direct OpenGL calls must remain within the `engine/` folder. After each build
`scripts/build.sh` invokes `tools/scripts/gl_state_lint.py` which scans all source files
for `glBind*`, `glUseProgram` and `glDraw*` usage outside the engine. Any
matches cause the build to fail with a list of offending lines. Run the script
manually when unsure:

```bash
python3 tools/scripts/gl_state_lint.py
```

### Quantum Collapse Debug Logs
When `CV_ENABLE_DEBUG_LOGS` is enabled, `QuantumStateVectorSimulator::collapse()` prints detailed information for each collapse. Logs include initial qubit states, the random gates applied, the updated probability cache, and the hash inputs used to generate the collapse seed. Review `runtime.log` after running a collapse to interpret the sequence.
See `docs/systems/quantum_statevector_system.md#probability-cache-usage` for an overview of the cached fields.
