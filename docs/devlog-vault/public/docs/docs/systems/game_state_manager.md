# Game State Tracker (Sanitized)

## Purpose
- Maintains the lightweight counters required for the core gameplay loop (score accumulation, remaining attempts, etc.).
- Exposes safe accessors for querying totals without disclosing internal method names.

## Behavior Summary
- Provides additive and subtractive operations behind a controlled interface.
- Reports when terminal conditions are reached so other systems can react appropriately.

## Notes
- Source file paths, class identifiers, and helper names from the private documentation have been masked.
- The tracker remains intentionally simple to keep the gameplay prototype stable.
