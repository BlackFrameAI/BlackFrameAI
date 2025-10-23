Procedural Sprite System

This document defines the architecture, lifecycle, and usage responsibilities of the ProceduralSprite system in Purge of the Crescent Veil. This system replaces texture-based sprites with runtime-generated geometry and is used across most visual layers of the game.

As of July 2025 all core procedural modules live under `engine/modules/procedural/`. The sprite system resides in `engine/modules/procedural_sprite` alongside the UI and font generators.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.


For global integration guidance, see:

PROJECT_STRUCTURE.md for engine/game layering

README.md for build/tooling notes

AGENTS.md and CODEX_instructions.md for Codex usage policy

System Overview

Procedural sprites replace traditional texture-based assets with runtime-generated geometry. Each sprite is made of one or more lambda-driven draw functions encapsulated in ProceduralSpriteFrame objects. These are assigned to game entities via ProceduralSpriteInstance, which tracks animation time, frame index, and transform data.

The system supports static visuals (1-frame) and animated multi-frame effects.
All visuals render via OpenGL using shape-based primitives through the
`RenderSystem`. Available primitives now include rectangles, squares, circles,
ellipses, triangles, lines, plus signs, hollow rings, arrows and arcs. Each
primitive call accepts a stroke color, optional fill color, stroke width and
anti-alias radius. Circle and arc helpers expose a `segments` hint so curves are
tessellated relative to the current fidelity multiplier.

Core Types

ProceduralSprite

Contains a std::vector<ProceduralSpriteFrame>

May loop (bool loop)

Typically created via a helper like createPlayerSprite()

ProceduralSpriteFrame

Wraps a lambda: void(RenderSystem&, const SpriteParams&)

Optional per-frame offset/scale/tint

Duration (in seconds) per frame
Fidelity hint used by circle/arc helpers (default 64 segments,
up to 128 for high detail)
The final segment count is multiplied by `RenderSystem`'s fidelity
multiplier, derived from `pixelsPerVGU_X` and `pixelsPerVGU_Y`, so
high‑DPI displays render smooth curves.

ProceduralSpriteInstance

Holds pointer to ProceduralSprite

Tracks frameIndex, time accumulator, and animation time (animTime)

Optional `source` string notes which system created the instance

Supports persistent or transient use

`update()` advances animation and time and now returns a boolean
indicating whether the instance remains active.

render(RenderSystem&, float x, float y) draws current frame

ProceduralSpriteRegistry

Central container storing all built-in `ProceduralSprite` objects. The registry
is owned by `RenderSystem` and populated during game startup via
`registerDefaultSprites(registry)`. Gameplay systems query sprites by string id
instead of creating static locals.
Helpers allow registering sprites with common fidelity values so all frames
store the desired `segments` count.

Lifecycle

Assignment

Sprites are defined via .frames.push_back(...)

They must be assigned to a valid ProceduralSpriteInstance

The instance must call `.update(dt)` if animated. The function returns `true`
while the sprite is active.

.render(...) must be called every frame to avoid GL skip warnings

Failure Conditions

If sprite == nullptr → no render

If GL bindings are zero before or after draw → warning + skipped draw

If assigned but never updated → frozen frame

If instance is created but not rendered for >120 frames → warning
If not rendered for >240 frames the instance is marked **inactive**.
`update()` will return `false` and further updates are skipped.
When spawning new instances, set `instance.lastRenderFrame = cv::getFrameCount()`
to ensure the warning timer starts at creation time.

Integration Points

✅ Fully Integrated

PowerupManager: Assigns persistent ProceduralSpriteInstance to each powerup

StageManager: Creates static background and decorations per variant

PlayerManager: Assigns Paladin and other variants to persistent player sprite instance

GameUIManager (legacy): previously used ProceduralUISprite per overlay. Being replaced by modular UI modules.
ThemeManager now injects colors and frame styles into ProceduralUI helpers and StencilGuideSystem callbacks.

⚠️ Partially Wired

EnemyManager: Registers sprites from `createBaseEnemyVisual()` on startup. Each
enemy owns a `ProceduralSpriteInstance` updated every frame.

StageManager: Only adds decorations for hardcoded themes (e.g. TechLab, AlienRuins); others missing

SpaceManager: Maintains persistent star map, ship, and fleet instances with per-frame animation. Fleet sprites are capped at `kMaxFleets` (100) and only update while the star map is visible.

❌ Missing or Incomplete

Enemies: Base visuals now assigned automatically but specialized variants are
still scarce

Altars, Crates, Shrines: Some defined but not spawned or attached

UI overlays: Most overlays use `ProceduralSprite` or `ProceduralUISprite` objects.
Each overlay owns a persistent `ProceduralSpriteInstance` updated every frame.
Direct calls to `drawTextScreen` or `drawRectScreen` should be replaced with a text or shape sprite using the VGU variants (`drawTextScreenVGU`, `drawRectScreenVGU`). with explicit stroke and fill colors
Use `instance.update(dt)` followed by `instance.render(renderSystem, x, y)`.
ScoreOverlay, PlayerPositionOverlay and the debug Grid/Anchor overlays were recently converted. **These overlays are deprecated with the retirement of the legacy UI system.**
The Achievements overlay generates its text via a `ProceduralSprite` using the procedural font system.

Known GL Failure Cause

ProceduralSpriteInstance::render() logs and skips draws when any of the following are true:

VAO/VBO/Program is zero before draw

RenderSystem::beginFrame now binds the rect VAO and color shader to ensure a valid
initial state for these checks. `RenderSystem::endFrame` re-binds this state for
each overlay before calling its `render()` method so overlay code does not need
to invoke `bindDefaultUiState()` directly.

If an overlay binds its own shader program or VAO for custom drawing, it must
preserve or restore the previous GL bindings when it is done. The easiest way to
reset state is to call `bindDefaultUiState()` after restoring its old bindings so
the next overlay starts with the rect VAO and color program active.

Frame draw lambda fails silently (no shapes drawn)

No sprite is assigned at all

These errors are not to be suppressed — they indicate broken wiring or missing visuals.

Best Practices

* Always assign a sprite pointer before calling render()
* **ABSOLUTE REQUIREMENT: GL State Restoration:** Any code that temporarily binds a custom
      VAO, VBO, or shader program (e.g., for specialized rendering passes or unique UI elements) MUST
      meticulously restore the `RenderSystem`'s default batched rendering state
     (`bindDefaultUiState()`) immediately after its custom drawing operations are complete.
      Failure to do so will break the batched rendering pipeline, leading to severe performance issues
      and invalid GL state warnings. Normal overlay rendering does not invoke this helper directly
      because `RenderSystem::endFrame` rebinds the default state before each overlay draws.

If using multi-frame animation, call `update(dt)` every frame.
Stop calling when it returns `false`.

If building one-shot visuals (e.g. explosions), set .loop = false

Use animTime in lambdas for time-based motion (e.g. sine waves, pulsing)

Use persistent instances where animation state matters

Avoid transient instance creation unless sprite is static

Codex Integration Notes

Codex should:

Reference this file before modifying sprite-related logic

Avoid silencing GL state errors — they expose real bugs

Ensure every manager that owns sprite visuals either:

Maintains a persistent ProceduralSpriteInstance

Or passes consistent animTime manually if building instances transiently

Treat missing visuals or skipped draws as a critical render bug, not cosmetic

Next Steps

Add integration tests to verify render() is called on all live instances

Ensure StageManager decorations are added for all stage types

EnemyManager now uses persistent instances and removes inactive enemies each update

Audit unassigned sprite definitions for integration opportunities

## Common Pitfalls

To avoid breaking the batched rendering system and causing performance issues, be aware of these common pitfalls:

*   **Direct OpenGL Calls:** Making `glGen*`, `glBind*`, `glUseProgram`, `glDraw*` calls
      directly outside of the `RenderSystem`'s batched primitives. This bypasses the batching and can
      leave the GL state in an unexpected configuration.

*   **Missing GL State Restoration:** Failing to call `bindDefaultUiState()` after performing custom rendering operations that change the VAO, VBO,
      or shader program. This is a frequent cause of "invalid GL state" warnings and broken batching.

*   **Creating Transient Sprites with Complex Draw Functions:** While
      `ProceduralSpriteInstance` supports transient use, creating and destroying many instances with
      complex `drawFunc` lambdas every frame can lead to CPU overhead if not carefully managed.

*   **Ignoring GL State Warnings:** Treating warnings about invalid GL state as cosmetic.
      These are critical indicators that the rendering pipeline is compromised.
      
The RenderSystem collects all primitive geometry each frame and issues batched draw calls during `endFrame()`. This batching greatly reduces the number of GL draw calls for sprites and overlays.

## Frustum Culling and Debug Throttle

World sprites are now culled against the active camera frustum via `RenderSystem::isWorldVisible()`. Gameplay managers check this helper before calling `render()` so offscreen instances skip drawing entirely.
`EnemyManager` also counts how many consecutive frames an enemy stays outside the view and despawns the unit when the count exceeds a threshold (default 60).

GL state warnings emitted by `ProceduralSpriteInstance::render()` are throttled. Repeated missing-binding errors from the same sprite source print at most once every 60 frames to keep the log readable.

### Enabling Draw Logs

Development builds automatically output per-sprite draw information. No compile-time or runtime flags are needed.

## ProceduralSprites.h

`game/modules/graphics/ProceduralSprites.h` contains inline factory helpers for common gameplay sprites. These functions populate the default sprite registry and allow managers to request sprites by id.

- `createPlayerSprite()` – white square with a blue outline.
- `createEntropyPlayerSprite(seed)` – uses seed bits for color, shape and flip.
- `createLightEnemySprite()` – red circle enemy.
- `createMediumEnemySprite()` – green square with a white center.
- `createHeavyEnemySprite()` – blue circle with a red core.
- `createPowerupSprite(color)` – colored powerup orb.
- `createProjectileSprite()` – basic white projectile.
- `createDebugSprite()` – placeholder X shaped sprite.

## Entropy-Based Mutation

`createEntropyPlayerSprite(seed)` interprets the seed as a set of bitfields that
drive visible mutations:

- **Bits 0–23** – 24-bit RGB color used for the sprite tint.
- **Bit 24** – horizontal flip flag.
- **Bit 25** – vertical flip flag.
- **Bits 26–27** – shape selection (`0=rect`, `1=circle`, `2=diamond`, `3=cross`).
- **Bits 28–29** – width scale step (`1.0 + n*0.25`).
- **Bits 30–31** – height scale step (`1.0 + n*0.25`).

Each collapse triggered by `QuantumStateVectorManager` logs the seed and the
derived traits so mutations can be verified during testing.

## EffectSprites.h

`game/modules/graphics/EffectSprites.h` defines short-lived visuals such as explosions and weapon flashes. Each helper returns a non-looping `cv::ProceduralSprite` typically spawned via `ParticleManager`.

- `createSlashTrailSprite()` – trailing slash segments.
- `createExplosionPuffSprite()` – expanding smoke puff.
- `createShieldBubbleSprite()` – protective bubble burst.
- `createLaserBeamSprite()` – short beam line.
- `createChargeSprite()` – shrinking charge-up flash.
- `createDamageFlash()` – red damage square flash.
- `createWeaponFlash()` – brief muzzle flash.
- `createExplosionFX()` – radial burst of lines.
- `createRadialPulseFX()` – pulsing ring used for pickups.
- `createShieldEffectSprite(color)` – generic shield hit circle.
- `createPowerupCollectedSprite()` – yellow pickup flash.
- `createEnemyDeathSprite()` – red burst on enemy defeat.
- `createPowerupExpireSprite()` – gray puff when a powerup fades.

Update the associated `ProceduralSpriteInstance` each frame until `update()` returns `false` so the effect can finish animating.

## SpriteRegistrations and Visual Modules

The `registerDefaultSprites()` function defined in
`game/modules/graphics/SpriteRegistrations.*` populates the central
`ProceduralSpriteRegistry` owned by the `ProceduralSpriteManager`. It aggregates sprite
creators from the various `*Visuals.h` modules so each visual component remains
self‑contained. Game initialization calls this function once to register all
default sprite IDs. Tests under `tests/SpriteRegistryTests.cpp` verify that
expected IDs like `player.base` and `enemy.light` are present after
registration.

