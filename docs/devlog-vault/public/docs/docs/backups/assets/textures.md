# Procedural Sprites

Gameplay visuals rely on lambda-driven `ProceduralSprite` definitions that are generated at runtime with OpenGL.

`ProceduralSpriteFrame` lambdas now consume a shared `SpriteParams` struct providing position, rotation, scale, tint, and an optional animation time value. This keeps drawing helpers reusable across effects.

Legacy placeholder resources were retired once procedural rendering fully replaced file-based sprites.
