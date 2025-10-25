# Projectile Manager

The projectile manager coordinates high-level lifecycle events for projectiles spawned by gameplay features. This record omits implementation specifics, focusing instead on safe integration practices.

## Core Duties
- Accept sanitized spawn descriptors from combat or scripting systems.
- Advance projectile lifetimes and schedule removal when conditions are met.
- Notify the rendering abstraction that a projectile should appear or disappear without exposing batching or buffer strategies.

## Safe Workflow
1. Gameplay code issues a spawn request through the approved façade.
2. The manager retrieves or creates an instance, applies motion policies, and tracks ownership metadata.
3. On expiry, impact, or manual cancellation the manager cleans up resources and broadcasts a minimal event payload.

## Extension Guidance
- Encapsulate homing, status payloads, and visual modifiers inside plug-ins so sensitive calculations remain outside shared docs.
- Validate spawn requests before enqueueing them to avoid leaking raw coordinates or physics parameters.
- Keep analytics hooks separate from core update loops to prevent disclosure of combat heuristics.
