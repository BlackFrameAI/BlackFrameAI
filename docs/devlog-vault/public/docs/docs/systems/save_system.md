# Save System Overview (Public Summary)

This summary outlines how player progress is preserved without exposing internal file layouts or network settings.

## Preservation Goals

- Protect ongoing runs from crashes by writing frequent checkpoints.
- Maintain long-term progression such as hub state, faction standing, and unlocks.
- Support optional remote synchronization while keeping infrastructure details [REDACTED].

## Slot & Profile Structure

- Players manage multiple profiles, each with metadata that surfaces in the UI.
- A run resume mechanism restores the most recent safe checkpoint after interruptions.
- Backup actions in the hub duplicate the active slot to an archival location; exact destinations are [REDACTED].

## Checkpoint Triggers

The system automatically records progress after major encounters, narrative beats, and shop interactions. Additional hooks exist so other systems can request manual checkpoints when needed.

## Data Protection

- Save serialization includes inventory, abilities, and combat state while omitting sensitive identifiers in this document.
- Networked validation fields (including hardware-in-the-loop support) are summarized as [REDACTED].
- Corrupted files are quarantined and renamed so the slot can be safely recreated.

## Cloud Support

When enabled through a launch option, the system mirrors slots to a secure remote store. All endpoints, flags, and directory names are [REDACTED] for public release.
