# Virtual Grid Units (VGU)

- The engine normalizes all procedural rendering around a 1000×1000 virtual grid. Each **Virtual Grid Unit** maps to a constant pixel size determined at runtime by `RenderSystem`. This size is defined by `VGU_GRID_SIZE` and does not change.

- `RenderSystem` computes a single `pixelsPerVGU` value whenever the framebuffer is resized. The calculation uses the smaller framebuffer dimension so every grid unit maps to the same pixel size horizontally and vertically.

- The active camera adjusts its view based on the window aspect ratio so the square 1000×1000 grid stays centered while any extra space reveals more world units along the wider dimension.

- The uniform `pixelsPerVGU` scale no longer applies the deprecated `pixelScale` multiplier. High-DPI displays are handled via the framebuffer resolution alone.

- `pixelsPerVGU` also feeds a `pixelDensityMultiplier` used for procedural sprite and font fidelity.
- Helper functions `vguToPixels` and `pixelsToVGU` convert between spaces.
- World and UI drawing helpers provide `*VGU` variants which accept VGU coordinates and handle conversion internally. Procedural font functions take VGU positions to ensure consistent layout.

Existing pixel-based functions remain for compatibility but should gradually be replaced by the VGU versions.
