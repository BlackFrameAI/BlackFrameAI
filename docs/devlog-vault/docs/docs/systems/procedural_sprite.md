# procedural_sprite.md

`ProceduralSpriteManager` centralizes all runtime procedural sprite instances. The manager exposes a simple lifecycle and registry used by gameplay systems.

---

## Init / Shutdown
- `Init(RenderSystem*)` assigns the render system pointer and returns `true` when valid.
- `Shutdown()` clears the active sprite list and resets the render system pointer.

## Sprite Registration
- Managers call `addSprite(ProceduralSpriteInstance*)` to begin tracking an instance.
- `removeSprite()` removes a previously registered instance.
- The manager owns a `ProceduralSpriteRegistry` accessible via `getRegistry()` for default sprite definitions.

## drawAll
- `drawAll()` iterates the active sprite list and renders each instance.
- The method binds the correct default GL state before drawing based on the current
  render pass. Before issuing draws the manager confirms the attached
  `RenderSystem` is initialized and that its sprite VAO, VBO and shader program
  handles are valid. If any resource is missing the draw is skipped and a single
  warning is logged.

## Render Pass Handling
- `setRenderPass(RenderPass::World)` or `RenderPass::UI` selects which default state to bind.
- Scenes typically set the pass, render their sprites, then restore their own states as needed.

## Current Limitations
 - Instances lack built‑in position data; `drawAll()` renders each sprite at `(0,0)`.
 - Sprites are not culled or depth‑sorted.
 - Inactive sprites are automatically trimmed from the manager during `drawAll()`.
