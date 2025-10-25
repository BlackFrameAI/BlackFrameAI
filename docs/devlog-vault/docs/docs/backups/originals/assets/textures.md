# Procedural Sprites

Gameplay visuals use lambda-driven `ProceduralSprite` definitions instead of image textures. Each sprite is generated at runtime and drawn directly with OpenGL.

`ProceduralSpriteFrame` lambdas now consume a `SpriteParams` struct that provides
position, rotation, scale, tint color and an optional animation time value. This
makes it easy to reuse drawing code for different effects.

The engine previously kept dummy `.txt` files under `game/assets/` so the
`ResourceSystem` had something to load. These placeholders are gone because
sprites are built entirely in code. Player characters, enemies and powerups all
render via `ProceduralSpriteInstance`.

Placeholder assets `player_frame0.txt`, `player_frame1.txt`, `enemy_light.txt` and `player_idle.json` have been removed from the repository.

