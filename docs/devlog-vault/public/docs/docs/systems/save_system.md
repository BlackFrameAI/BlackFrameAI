# Save System Overview (Public Summary)

This briefing explains how player progress is preserved while omitting any direct references to internal schemas, directory structures, or automation scripts.

## Resilience Priorities

- Frequent checkpointing ensures that unexpected shutdowns do not erase ongoing runs.
- Each profile maintains its own metadata so players can safely swap between campaigns.
- Manual backup actions are available through in-game menus; the destination and naming policy remain [REDACTED].

## Progression Coverage

- Core progression pillars—story advancement, character state, and strategic unlocks—are stored together for consistency.
- Sensitive fields such as faction tuning, alignment math, and combat telemetry are not described in this public note.
- Recovery routines quarantine unreadable data and rebuild the slot without exposing filenames or tooling.

## Operational Hooks

- System-wide events (boss completions, narrative milestones, vendor interactions, etc.) publish checkpoint requests through a brokered channel.
- Additional systems may subscribe to this channel to request ad-hoc saves without learning storage specifics.

## Remote Mirroring

Optional remote synchronization keeps local and off-site copies in sync. Activation methods, network targets, and credential handling are intentionally [REDACTED].
