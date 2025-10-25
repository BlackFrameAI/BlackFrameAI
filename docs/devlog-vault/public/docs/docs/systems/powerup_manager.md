# Powerup Manager (Public Summary)

The powerup manager governs collectible boosts while masking internal identifiers,
spawn formulas, and rendering presets.

## Highlights

- Tracks active powerups via anonymized tokens so gameplay logic cannot infer asset
  paths, procedural seeds, or database keys.
- Coordinates spawn, pickup, and expiration workflows with sanitized payloads that
  reveal only timing and category metadata.
- Dispatches notifications to UI, audio, and analytics using redacted channels that
  exclude component names and event subjects.

## Governance

- Audit trails log high-level lifecycle events (granted, refreshed, expired) without
  storing character IDs or drop tables.
- Tuning documents publish safe ranges (e.g., minimum duration, cooldown tiers) but
  omit the formulas and rendering parameters used internally.
