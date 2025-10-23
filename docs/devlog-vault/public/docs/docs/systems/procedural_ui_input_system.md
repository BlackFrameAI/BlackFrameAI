# Procedural UI Input System

The procedural UI input layer coordinates hover and click behaviour for dynamically generated interface elements without exposing low-level handles or internal identifiers. It converts pointing-device signals into the normalized grid space used by the UI renderer and maintains lightweight state flags so interface elements can react visually.

## Responsibilities
- Normalize pointer coordinates to the virtual grid before comparisons.
- Track interactive regions registered by the overlay layer.
- Update transient hover and press state during the frame loop.
- Relay state changes to any presentation logic that subscribed to updates.

## Interaction Flow
1. Registration supplies the bounds of each interactive element.
2. The system samples current pointer location and button state.
3. Hover and press flags are updated when the pointer transitions across element bounds.
4. Subscribed callbacks receive notifications without exposing concrete function names or object references.

## Integration Notes
- Designed for modular UI pipelines; elements can register or unregister at runtime.
- Visual reactions (such as highlighting or scaling) are handled by the presenting overlay rather than by the input layer itself.
- The system keeps processing costs predictable by iterating over a compact list of registered elements each frame.
