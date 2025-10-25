# font_rendering.md

UI text is rendered through the **ProceduralFontGenerator** which builds
Signed Distance Field textures at runtime. The old VectorFont renderer remains
only as a stroke data source.

The generator auto-loads a default font on first use so overlays can render
text before any custom fonts are registered.

[`engine/modules/procedural/font/ProceduralFontGenerator.h`](../../engine/modules/procedural/font/ProceduralFontGenerator.h)
builds each glyph from the VectorFont curve paths. Each texel stores the
minimum distance to those curves rather than sampling any bitmap.
Generated SDF textures are cached by character and style parameters.

`GlyphPathLibrary` reconstructs glyph outlines from the VectorFont stroke data
and `SetFidelity`/`GetFidelity` still control tessellation detail.

Helpers include `measureTextWidth`, `lineHeight` and `measureTextBounds` for
layout calculations. Unsupported characters log a warning and advance the cursor
without drawing.

