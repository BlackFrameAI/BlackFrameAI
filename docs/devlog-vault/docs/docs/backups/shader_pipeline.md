# shader_pipeline.md

This document outlines the shader build process for **Purge of the Crescent Veil**.

---

## Compiling Shaders

The engine's shaders live in `engine/shaders` with subfolders like
`core/` and `postprocess/`. Sources are written in **GLSL** targeting the
OpenGL 4.5 default profile. No external build
step is required. The engine compiles shader source files at runtime
using the system OpenGL driver.

### Editing Shaders

Simply modify the `.glsl` files under `engine/shaders` (e.g. `core/rect.vert`). Changes are picked up
the next time the engine is launched. No precompiled binaries are stored in the
repository. Any required `.spv` files for Vulkan or other backends are generated
by `glslc` during the build and written to the build directory.

## Runtime Loading

During initialization `RenderSystem` requests shader source strings from
`ResourceSystem`. These strings are compiled into OpenGL programs at runtime.
Compilation errors are written to `logs/shader_errors.txt` so you can fix
issues directly in the files.

## Vulkan2 Backend

When the engine is built with Vulkan support the optional `Vulkan2Backend`
becomes available. Shaders are still authored in GLSL under `engine/shaders`.
The build scripts invoke `glslc` to translate these files for Vulkan. Launch the
game with the `--vulkan` flag to use this backend. The OpenGL renderer remains
the default path.

## Optional DirectX and Metal Backends

Starting with the 2025-06-20 build the renderer can initialize additional backends besides Vulkan2. Use the following command-line flags to select a backend at startup:

- `--vulkan1` – standard Vulkan backend
- `--vulkan` – Vulkan2 backend
- `--vulkan-rtx` – Vulkan RTX pipeline
- `--dx11` – DirectX 11 backend (Windows only, supports rectangles and lines)
- `--dx12` – DirectX 12 backend (Windows only)
- `--dx12-rtx` – DirectX 12 RTX backend (Windows only)
- `--metal` – Metal backend (macOS only)
- `--android-gles` – Android GLES backend (Android only)

If no flag is passed the OpenGL backend remains active. Shader sources are still the GLSL files under `engine/shaders` and each backend performs any necessary translation during initialization.

Shader compilation errors from all backends are written to `logs/shader_errors.txt`.

### Shader Debug Pipeline

A debug pipeline was introduced on 2025-06-12 to capture intermediate shader stages for troubleshooting. Enable the debug overlay to inspect these stages at runtime.

## RenderSystem Integration

`RenderSystem` owns the active `RenderBackend` and requests shader programs from
`ResourceSystem` during initialization. Each frame `beginFrame` clears the bound
framebuffer and prepares projection matrices. Draw calls queue geometry through
`Renderer2D` and are flushed in `endFrame`. When post processing is enabled the
output is passed through `PostProcessingManager` before
`MultiDisplayManager::presentAll` swaps the windows. `RenderSystem` itself no
longer calls the backend's `endFrame`; presentation is handled entirely by the
display manager.
Each window may use a different backend chosen by `MultiDisplayManager`. The
engine reads this from the display configuration so the main window can use
OpenGL while debug overlays run under Vulkan or another API. Bindings for each
window handle the details transparently.

