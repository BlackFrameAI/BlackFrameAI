# Procedural Font Generator

`ProceduralFontGenerator` builds runtime SDF textures for ASCII glyphs. It
rasterizes the same stroke data used by `VectorFont`, computing the signed
distance from each texel to the nearest stroke. The previous bitmap sampling
approach was removed. Stroke `weight` and italic `slant` parameters control the
thickness and skew during generation.

On first use the generator auto-loads a built-in default font so UI text is
available even before custom fonts register.

The rasterizer computes a signed distance value for each texel. Glyphs are
cached by character, style parameters and the current `VectorFont` fidelity to
avoid regenerating textures when fidelity changes.

This generator now lives under `engine/modules/procedural/font` with the rest of the procedural systems.

Use `FontStyleResolver` to map keywords such as `gothic`, `techno` and `alien`
to these parameters. When `drawText` cannot render any glyphs it returns `false`
so `RenderSystem` can fall back to the basic stroke renderer if desired.

```
FontStyleResolver resolver;
FontParams params = resolver.resolve("gothic");
ProceduralFontGenerator gen;
if (!gen.drawText(rs, "HELLO", 32, 32, 0xffffffff, params)) {
    // handle missing glyph
}
```

The default style is the Gothic‑serif theme which approximates a heavy
blackletter look.

The generator verifies that each requested character exists in the vector font
database. Unknown characters are logged via `CV_LOG_ERROR` and skipped so the
render loop continues without crashing. A flag `m_missingGlyphRequested` is set
whenever this occurs for diagnostics.
