# Core Game Controller (Sanitized)

## Role
- Serves as the primary orchestrator for gameplay sessions.
- Owns references to high-level subsystems (player control, stage progression, encounter logic) through dependency injection rather than hardwired globals.

## Lifecycle Summary
- Instantiated automatically during engine boot.
- Steps the active subsystems each frame and coordinates teardown when the session ends.

## Notes
- Internal member names, hooks, and file paths have been intentionally masked.
- Legacy harnesses referenced in the private documentation are deprecated and not mirrored here.
