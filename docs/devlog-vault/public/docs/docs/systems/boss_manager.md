# boss_manager.md (Public Summary)

The manager module coordinates boss encounter lifecycles during a stage. Fine-grained spawn rules, stat formulas, and narrative callouts are stored in the private backup and referenced as `[REDACTED]`.

## Responsibilities
- Spawn and track active encounters while relaying critical events to stage flow systems.
- Provide a single integration point for alignment-aware scaling and dialogue triggers without disclosing proprietary multipliers.
- Ensure defeated phases notify downstream systems before cleanup routines execute.

## Integration Notes
- Hooks into combat, alignment, and progression services remain unchanged; sensitive identifiers are withheld here for security.
- Designers working on encounter scripting can access the archived original for comprehensive API usage.
