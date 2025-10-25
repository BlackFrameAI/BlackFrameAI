# Procedural UI Input System

The procedural UI input system mediates cursor-driven interactions for dynamic interface sprites without exposing internal pointer math or callback wiring. It maintains lightweight handles for each sprite so layouts can be animated or repositioned without leaking implementation details.

## Responsibilities
- Accept registration from UI sprites that want hover or click feedback.
- Translate platform input events into abstract interaction states (idle, hovering, pressed) without disclosing coordinate transforms.
- Dispatch sanitized notifications to subscribing overlays or logic blocks.

## Interaction Flow
1. A sprite registers and supplies a reference to the data it wants to monitor.
2. The system samples current input state through the approved input facade.
3. State transitions trigger normalized events that user interface layers can map to their own reactions.

## Integration Guidelines
- Always unregister sprites that are destroyed to prevent dangling handles.
- Keep visual responses inside the owning overlay so interaction policy stays centralized.
- Use dependency injection for callbacks so sensitive behavior is not hard-coded into the system.

## Hygiene Notes
- Avoid embedding business rules in hover or click events; forward only minimal signals.
- Confirm that analytics hooks and scripting layers listen through vetted channels before acting on interaction data.
- Treat any direct coordinate access as privileged and gate it behind reviewable helpers.
