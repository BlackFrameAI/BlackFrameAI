# post_processing_manager.md

The **PostProcessingManager** runs a configurable chain of framebuffer effects.

- `initialize(renderSystem, width, height)` sets up temporary render targets.
- `addPass()` registers a callback to process a texture.
- `apply()` executes all passes and blits the result to the default framebuffer.
- Helpers in `SimplePostProcess` configure basic invert and grayscale effects.
- `RenderSystem::endFrame()` calls `PostProcessController::apply()` before any
  overlays or debug windows render so the final scene output is processed first.

See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for status.
