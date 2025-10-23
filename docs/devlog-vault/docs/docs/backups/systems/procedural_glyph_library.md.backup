# Procedural Glyph Library

`GlyphPathLibrary` rebuilds vector outlines for ASCII glyphs using the stroke data stored in `VectorFont`. Each glyph is tessellated into an `SDFPath` so that it can be rasterized by `ProceduralSDFGenerator`.

## Glyph Path Generation
- `GlyphPathLibrary::getGlyphPath(char, SDFPath&)` fetches the glyph from `VectorFont` and re-tessellates its curves.
- The multiplication sign `\u00D7` is generated manually when requested, forming two diagonal lines.
- `setSegmentScale(float)` multiplies the global fidelity so high DPI windows retain smooth curves.
- `registerGlyph(char, const SDFPath&)` registers an extra glyph path from external data.
- Registered paths are searched before the built-in VectorFont data so non-ASCII characters can be provided at runtime.
- After all points are generated the Y range of the glyph is normalized to **0..1**. The lowest point becomes `0.0` and the cap height is `1.0`.
- Paths are returned in **Virtual Grid Units** (VGU) matching the vector font grid.

### Baseline and Cap Height
The normalization step anchors the baseline at `0` with the cap height at `1`. Ascenders and descenders are already accounted for in the stroke data so the library does not extend beyond this range. Layout code can therefore scale glyphs uniformly knowing that `y=0` is the baseline.

## SDF Integration
`ProceduralFontGenerator` calls `getGlyphPath` for each character and feeds the result into `ProceduralSDFGenerator`. The resulting texture is cached by character, style and fidelity. Other systems may also request glyph paths directly when drawing SDF shapes.

```cpp
cv::SDFPath path;
if (cv::GlyphPathLibrary::getGlyphPath('A', path)) {
    GLuint tex = gen.generate(render, path, 64);
    render.drawSpriteSDF(tex, 10.f, 10.f, 32.f, 32.f,
                         cv::ColorRGBA::White(),
                         cv::ColorRGBA::White(),
                         cv::ColorRGBA::White());
}
```

### External Glyphs
`registerGlyph` allows scenes to add glyph outlines from real-world fonts such as
[Google Fonts](https://fonts.google.com) or [Adobe Fonts](https://fonts.adobe.com).
The path data should be normalized to match the built-in glyphs. Once registered
`getGlyphPath` will return the custom outline when that character is requested.
