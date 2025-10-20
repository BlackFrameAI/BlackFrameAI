# character_visuals.md

This document summarizes how `game/modules/graphics/CharacterVisuals.h` organizes the modular armor sprites used for humanoid characters.

The player uses a simple baseline sprite created via `createPlayerSprite()`. All
armor modules below are layered on top of this base when building variants.

## Modular Armor Helpers

Each helper function returns a `cv::ProceduralSprite` assembled from multiple layered shapes. Rectangles, circles, lines and polygons are combined to form armor details. All dimensions are expressed relative to a ~120‑unit tall body so the pieces scale consistently. `SpriteParams` exposes a `tint` field (`p.tint`) and a `tintColor` field (`p.tintColor`). `tintColor` lets a runtime instance recolor the entire sprite (for example red enemies or green pickups) while `tint` continues to multiply per-frame highlights. The modules now include pulsing highlights that sample `p.time` for simple animation effects.

- **`createHelmetSprite`** – helmet dome with pulsing visor, crest and side vents.
- **`createShoulderSprite`** – layered pad with strap and triangular vent polygon. Pass `true` for left or `false` for right.
- **`createChestplateSprite`** – torso plate with accent lines and a breathing chest light.
- **`createBeltSprite`** – dual layer strap, buckle and vertical loops.
- **`createArmSprite`** – plated upper arm, gauntlet, elbow strap and accent stud. Boolean controls left/right.
- **`createLegSprite`** – layered thigh armor, knee highlight, boot and strap.
- **`createBackModuleSprite`** – pack with inner panel, vents and power node.
- **`createCapeSprite`** – cloth panel with tapered bottom and fold highlights.
- **`createSwordSprite`** – blade with center line, crossguard and detailed hilt.

## Combining Modules

`createBaseCharacterVisual()` instantiates each module once and draws them in a specific order. The cape is drawn first so it appears behind the body, followed by the back module, chest, belt and helmet. Shoulders, arms and legs are then rendered using offsets from the character origin. This helper returns a single `ProceduralSprite` representing a fully armored character. Because each module shares the same `SpriteParams`, tint and scale propagate consistently across all parts.

The sprite now contains additional idle frames that slightly offset and rotate the full body. Each frame samples `p.time` to produce a gentle sine-wave bob so the character appears to breathe and the visor flickers.

## Creating Variants

To make a visual variant, call `createBaseCharacterVisual()` and adjust the returned frames. Two examples already exist:

- `createCharacterVariant_Paladin()` – applies a gold tint across all frames.
- `createCharacterVariant_AssaultMech()` – uses a blue steel tint.

Additional variants can modify tint values or replace specific module sprites with custom helpers. The existing Paladin variant sets `p.tint` to `0xff80ffff` for a warm gold tone, while the AssaultMech variant sets `p.tint` to `0xffff8080` for a blue‑steel look. Any new variant can follow the same pattern to recolor all armor pieces at once.

### Runtime Variant Switching

`PlayerManager` exposes `ChangeProceduralSprite` and `CycleSpriteVariant` to swap between loaded variants. `Game.cpp` registers the base sprite and the paladin variant. Press **V** during play to cycle the active variant.
## Procedural UI Elements

The same sprite layering approach now powers the interface. `engine/modules/procedural/ui/ProceduralUI.h` defines a `ProceduralUISprite` class with default, hover, pressed and inactive tints. Helpers such as `createButtonSprite`, `createTextBoxSprite`, `createInventorySlotSprite` and various bar sprites build rectangular UI widgets directly from `drawRectScreenVGU` calls with stroke and fill parameters. UI overlays select the tint based on mouse or controller state so these elements respond to interaction without loading textures.
