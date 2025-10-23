# Projectile Manager

The projectile manager orchestrates spawning, simulation, and removal of projectiles created by combat and environmental systems. It abstracts sprite animation and batching details so gameplay features can request projectiles without manipulating renderer internals.

## Responsibilities
- Maintain a lightweight pool of active projectile instances.
- Advance projectile motion and lifetime counters on each update tick.
- Notify the rendering pipeline when a projectile enters or leaves the visible set.
- Provide extension points for gameplay effects (homing, impact responses, status payloads) without leaking implementation details.

## Data Flow
1. Gameplay code issues a spawn request with a simple descriptor (position, direction, behaviour tag).
2. The manager initializes an instance from the pool and tracks it until expiry.
3. When projectiles expire or collide, the manager recycles their resources and triggers any registered feedback hooks.

## Integration Notes
- Designed to plug into the general modular combat loop.
- Rendering specifics remain encapsulated so alternative visual styles can reuse the same manager.
