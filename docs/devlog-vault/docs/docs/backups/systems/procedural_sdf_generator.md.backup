# Procedural SDF Generator

`ProceduralSDFGenerator` converts simple path data into a signed distance field texture.
Paths are built using `SDFPath` which supports lines and quadratic or cubic curves.
Curves are tessellated into line segments so any shape can be represented.

The generator samples each texel and computes the signed distance to the nearest
segment. Distances are mapped into the 0..1 range with 0.5 representing the
shape edge. A small smoothing range is applied when rendering via
`RenderSystem::drawSpriteSDF` so edges remain crisp at any scale.

```
cv::SDFPath path = cv::createCirclePath(0.5f, 32);
cv::ProceduralSDFGenerator gen;
GLuint tex = gen.generate(render, path, 64);
cv::ColorRGBA white(1.0f, 1.0f, 1.0f, 1.0f);
render.drawSpriteSDF(tex, 50.0f, 50.0f, 100.0f, 100.0f,
                     white, white, white);
```

Helper functions provide ready‑made paths for circles, rectangles and ASCII
glyphs using the existing `VectorFont` stroke data.

## Rendering pipeline

Scenes now generate SDF textures at load time and render them using
`RenderSystem::drawSpriteSDF`.  The path tessellation fidelity scales with
`RenderSystem::getFidelityMultiplier()` so high‑DPI windows receive more detailed
distance fields.  All vector outlines – including debug glyphs – are converted
to `SDFPath` objects via helpers such as `createGlyphPath` and
`createCirclePath`.  The resulting textures are drawn like regular sprites and
respect the batched rendering pipeline.

## drawSpriteSDF parameters

`RenderSystem::drawSpriteSDF` binds a small SDF shader that exposes a few
uniforms for color and smoothing.  The current signature is:

```cpp
void drawSpriteSDF(GLuint texture,
                   float x, float y, float w, float h,
                   const ColorRGBA &strokeColor,
                   const ColorRGBA &fillColor0,
                   const ColorRGBA &fillColor1,
                   float aaRadius = 0.015f,
                   float u0 = 0.0f, float v0 = 0.0f,
                   float u1 = 1.0f, float v1 = 1.0f,
                   const char *warnLabel = nullptr);
```

The shader receives `u_strokeColor`, `u_fillColor0`, `u_fillColor1` and
`u_aaRadius`. The radius should be multiplied by
`RenderSystem::getFidelityMultiplier()` so high‑DPI windows use a wider smoothing
range. `fillColor1` enables simple gradients when the sprite texture is a
vertical alpha ramp. Earlier versions used `createAlphaGradientTexture` or
`createDiagonalGradientTexture` to generate background gradients, but this is now
handled procedurally via `drawDiagonalGradientRect`.

Example background fill:

```cpp
render.drawDiagonalGradientRect(0.0f, 0.0f, viewW, viewH,
                                0xff333333, 0xffaaaaaa);
```
