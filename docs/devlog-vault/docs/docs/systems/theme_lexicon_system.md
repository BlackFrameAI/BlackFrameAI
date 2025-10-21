# Theme Lexicon + Interpretation System

This spec defines how Codex must build the theme interpretation system that allows the runtime engine to translate semantic visual terms (like "gothic" or "techno") into concrete visual output.

The system must be fully modular, engine-runtime-compatible, and usable by all overlay, reaction, and procedural systems. Codex is expected to generate all code and mappings necessary to bridge semantic terms into usable instructions.

---

## 🎯 Objective
Enable the engine to understand and act on declarative theme values without Codex at runtime. Themes define the visual tone, font, frame, and rendering behavior using keyword-based configuration.

Examples:
```json
{
  "theme": "gothic",
  "font_family": "gothic_serif",
  "frame_style": "arched_iron",
  "base_tint": "#3C2A2A",
  "highlight_tint": "#C0A060",
  "allow_noise": true
}
```

Another example:
```json
{
  "theme": "neon_industrial",
  "font_family": "neon_slick",
  "frame_style": "neon_tube",
  "base_tint": "#202030",
  "highlight_tint": "#00FFFF",
  "allow_noise": false
}
```

## Theme JSON Format
Theme definitions live under `game/assets/themes/` and share these common fields:

- `theme` – identifier name of the theme file.
- `font_family` – maps to `ThemeLexicon::FontFamily`.
- `font_style` – maps to `ThemeLexicon::FontStyle`.
- `frame_style` – maps to `ThemeLexicon::FrameStyle`.
- `texture_density` – `low`, `medium` or `high`.
- `base_tint` – hex color string like `#3C2A2A`.
- `highlight_tint` – hex color string.
- `allow_noise` – boolean toggle for noise effects.

---

## 🧱 Required Systems

### 1. ThemeLexicon
- Define all valid theme keywords and options:
  - `font_family`, `font_style`, `frame_style`, `base_tint`, `highlight_tint`, `texture_density`, `allow_noise`
  - Recognized values: `gothic_serif`, `bone_metal`, `neon_slick`, `neon_tube`, `bone_spiked`, etc.
- Codex must define all enums or identifiers that back these values

The engine's **ThemeLexicon** enumerates the core options:
* `FontFamily` – `GothicSerif`, `BoneMetal`, `NeonSlick`
* `FontStyle` – `Serif`, `Gothic`, `Fluid`, `Alien`, `Slab`, `Techno`
* `FrameStyle` – `MetalFrameArched`, `NeonTube`, `BoneSpiked`
* `TextureDensity` – `Low`, `Medium`, `High`

### 2. ThemeMaterialResolver
- Converts keyword strings into engine-understood enums or class instances
- Provides simple helpers like `resolveFontFamily("gothic_serif")` to translate
  theme JSON values into the enumerations listed above
- Examples:
```cpp
FrameStyle ThemeMaterialResolver::resolveFrameStyle("arched_iron") → FrameStyle::MetalFrameArched
FrameStyle ThemeMaterialResolver::resolveFrameStyle("neon_tube") → FrameStyle::NeonTube
FontFamily ThemeMaterialResolver::resolveFont("gothic_serif") → FontFamily::GothicSerif
```

### 3. ThemeManager
- Loads theme `.json` files at runtime
- Exposes getters like:
```cpp
ThemeManager::getFrameStyle()
ThemeManager::getFontFamily()
ThemeManager::getTintColor()
ThemeManager::getNoiseEnabled()
```
- Injects resolved styles into:
  - `UIOverlayRenderer`
  - `ProceduralSpriteGenerator`
  - `StencilGuideSystem`
  - `RenderSystem` (font style via `FontStyleResolver`)

RenderSystem registers a callback with ThemeManager so that when
`setActiveTheme()` changes the active theme, font parameters are refreshed using
`FontStyleResolver`.

The initial theme can be selected via the `--theme` command line option or by
setting the `CV_THEME` environment variable. DebugController maps the **M** key
to cycle available themes at runtime through `ThemeManager::setActiveTheme()`.

-### 4. ReactionStencil Integration
- All `PhysicsReactionEvent` handlers and `StencilGuide` systems must query the ThemeManager for styling rules
- Visual reactions (blood, fracture, particle, deformation) must match the current theme tone

---

## ✒️ Procedural Font Layer

### Fallback SDF Font
- Include one default Signed Distance Field (SDF) font as fallback (e.g., ASCII-only gothic-serif)
- Used if `font_family` or `font_file` is not resolved in theme

### ProceduralFontGenerator
- Procedurally generate SDF glyphs at runtime using theme-driven parameters
- Required capabilities:
  - Bézier-based glyph generation
  - Theme-controlled:
    - Weight (boldness)
    - Angle (italic/slant)
    - Serif vs sans-serif
    - Edge softness
- Must support:
  - Dynamic font scaling
  - Outline and inner fill
  - Curve resolution blending

### FontStyleResolver
- Codex must implement logic to map keywords like:
  - `serif`, `gothic`, `fluid`, `alien`, `slab`, `techno`
- To rules for:
  - Glyph curvature
  - Weight distribution
  - Edge detailing
- Connect this to `ThemeManager::getFontStyle()`

---

## 🔒 Codex Constraints
- Codex must define all required enums, classes, and rendering paths
- No hardcoded visual behavior — all output must stem from resolved theme data
- Theme values may be overridden via scripting, dynamic entropy, or active zone triggers
- All systems must remain modular, testable, and introspectable

