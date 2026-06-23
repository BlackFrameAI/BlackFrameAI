# Game UI Manager

The legacy Game UI Manager loads archived HUD layouts so that older overlays continue to render while the modular interface fully rolls out.

## Layout Handling

* Reads layout definitions from the game's configured UI layout registry.
* Interprets positions in a virtual grid space so overlays stay consistent across resolutions.
* Falls back to default coordinates when values are missing or malformed.

## Rendering Flow

* Runs once per frame to submit overlay batches to the renderer.
* Shares the same batching pipeline used by other UI systems to remain compatible with the modern stack.
* Logs state changes (such as win or loss transitions) for debugging purposes.
