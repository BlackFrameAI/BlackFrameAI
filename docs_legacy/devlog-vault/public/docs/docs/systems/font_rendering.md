# font_rendering.md

UI text is rendered through the **ProceduralFontGenerator**, which builds Signed Distance Field textures at runtime while still drawing curve data from the legacy vector font assets.

The generator loads a default font on demand so overlays can render text before custom assets are registered. Glyph outlines are reconstructed from vector stroke data, converted into distance fields, and cached per character/style pairing. Layout helpers provide width, line height, and bounding-box estimates, with unsupported characters logging a warning and advancing the cursor without drawing.

Implementation details for glyph tessellation, SDF sampling kernels, and cache eviction policies are proprietary and have been **[REDACTED]** in this public summary.
