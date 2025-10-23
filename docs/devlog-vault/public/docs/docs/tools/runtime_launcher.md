# runtime_launcher.md (Redacted)

The **Runtime Launcher** is a console program that assembles command line
options for `crescent_runtime`. It resides in `tools/RuntimeLauncher`
and runs on every platform supported by the engine.

---

## Options

The launcher presents prompts for common flags, including Vulkan, DirectX,
Metal, language selection, display configuration files, cloud saves,
automated testing intervals, and debug or safety overrides. Respond to the
prompts to queue the desired runtime configuration.

## Usage

Compile the tool with the standard build pipeline. Launch the executable
from a trusted environment and follow the interactive prompts to configure
the runtime before handing off to `crescent_runtime`.

Explicit shell commands, server paths, and credentials have been removed
from this public copy. Refer to internal engineering documentation for the
exact command syntax.
