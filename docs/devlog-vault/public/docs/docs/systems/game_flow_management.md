# Game Flow Management Stack (Sanitized)

## Overview
- Coordinates transitions between macro gameplay phases (menu, active play, post-run, etc.).
- Maintains a lightweight state machine that responds to engine events and user-driven triggers.

## Component Summary
- **Flow Director** – top-level coordinator that sequences phase changes and scene swaps.
- **Scene Bridge** – mediates between the flow stack and the rendering/scene service without exposing internal hooks.
- **Phase Gateway** – exposes safe APIs for querying or updating the current high-level phase.
- **Persistence Liaison** – wraps save/load routines, packaging manager state for serialization.

## Operation Notes
- Flow Director issues transitions while ensuring atomic updates to dependent systems.
- Persistence operations run through the liaison to avoid leaking backend identifiers.
- Specific class names, directories, and engine hooks from the private docs are intentionally masked.
