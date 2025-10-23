# Stage Manager (Public Summary)

The Stage Manager maintains the public-facing structure of a stage: which biome is active, what narrative label is displayed,
and which auxiliary systems should be synchronized. It observes private runtime metrics (enemy pressure, player momentum, event
flags) and converts them into coarse public events that downstream teams can hook into.

## Key Duties
- Coordinate presentation updates (HUD banners, music cues, ambient fx) when a new stage begins.
- Relay anonymized spawn pacing information to the Spawn Controller.
- Surface milestone notifications (wave cleared, boss defeated, ritual complete) without leaking trigger formulas.

Detailed trigger thresholds, reward tables, and encounter choreography are intentionally omitted from this document.
