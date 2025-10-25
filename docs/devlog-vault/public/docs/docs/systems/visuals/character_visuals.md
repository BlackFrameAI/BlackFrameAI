# character_visuals.md

This public summary outlines how `game/modules/graphics/CharacterVisuals.h` assembles modular armor sprites for humanoid characters while omitting confidential asset names.

The player uses a baseline sprite created through `createPlayerSprite()`. All armor modules listed below layer on top of this base to build visual variants.

## Modular Armor Helpers

Each helper returns a `cv::ProceduralSprite` composed from layered rectangles, circles, lines, and polygons. Dimensions target a ~120-unit tall figure so every module scales consistently. `SpriteParams` exposes `tint` (`p.tint`) and `tintColor` (`p.tintColor`) values. `tintColor` recolors the entire sprite at runtime (for example red enemies or green pickups) while `tint` multiplies per-frame highlights. Modules sample `p.time` to drive subtle pulsing animations.

- **`createHelmetSprite`** – helmet dome with pulsing visor, crest, and side vents.
- **`createShoulderSprite`** – layered pad with strap and triangular vent polygon. Pass `true` for left or `false` for right.
- **`createChestplateSprite`** – torso plate with accent lines and a breathing chest light.
- **`createBeltSprite`** – dual-layer strap, buckle, and vertical loops.
- **`createArmSprite`** – plated upper arm, gauntlet, elbow strap, and accent stud. Boolean controls left/right.
- **`createLegSprite`** – layered thigh armor, knee highlight, boot, and strap.
- **`createBackModuleSprite`** – pack with inner panel, vents, and power node.
- **`createCapeSprite`** – cloth panel with tapered bottom and fold highlights.
- **`createSwordSprite`** – blade with center line, crossguard, and detailed hilt.

## Combining Modules

`createBaseCharacterVisual()` instantiates each module once and draws them in a fixed order. The cape renders first so it sits behind the body, followed by the back module, chest, belt, and helmet. Shoulders, arms, and legs render using offsets from the character origin. The helper returns a single `ProceduralSprite` representing a fully armored character. Because every module shares the same `SpriteParams`, tint and scale propagate uniformly across all pieces.

The sprite includes additional idle frames that slightly offset and rotate the full body. Each frame samples `p.time` to produce a gentle sine-wave bob so the character appears to breathe while the visor flickers.

## Creating Variants

Call `createBaseCharacterVisual()` and adjust the returned frames to form variants. Two internal examples (names redacted) demonstrate how tints can differentiate silhouettes:

- `[REDACTED]` – applies a warm gold tint across all frames.
- `[REDACTED]` – applies a cool steel tint across all frames.

Additional variants may tweak tint values or swap specific module sprites with custom helpers. The warm-metal variant sets `p.tint` to `0xff80ffff`, while the cool-metal variant sets `p.tint` to `0xffff8080`. Any new variant can reuse this pattern to recolor all armor pieces at once.

### Runtime Variant Switching

`PlayerManager` exposes `ChangeProceduralSprite` and `CycleSpriteVariant` to swap between loaded variants. `Game.cpp` registers the base sprite and the redacted variant pair. Press **V** during play to cycle the active variant.

## Procedural UI Elements

The same sprite layering approach powers the interface. `engine/modules/procedural/ui/ProceduralUI.h` defines a `ProceduralUISprite` class with default, hover, pressed, and inactive tints. Helpers such as `createButtonSprite`, `createTextBoxSprite`, `createInventorySlotSprite`, and various bar sprites build rectangular UI widgets directly from `drawRectScreenVGU` calls with stroke and fill parameters. UI overlays select the tint based on mouse or controller state so these elements respond to interaction without loading textures.
