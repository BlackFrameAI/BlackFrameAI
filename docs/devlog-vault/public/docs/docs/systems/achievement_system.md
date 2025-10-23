# Achievement System (Public Summary)

This summary outlines the meta-progression features available to players without exposing internal implementation details.

## Core Concepts

- The achievement service tracks unlock status and provides read access for menus and save data.
- Unlocks focus on long-term engagement outside of individual runs.
- Rewards can include cosmetics, hub improvements, chapter-specific bonuses, faction reputation, lore entries, and future space combat integrations.

## Achievement Types

- Combat accomplishments
- Progression milestones
- Alignment oriented challenges
- Chapter story feats
- Boss defeats
- Narrative route completions
- Space combat victories
- Time-limited community events (planned)

## System Features

- Unlocks are persistent across play sessions.
- Achievements are visible in hub-facing interfaces.
- Player profiles link to earned achievements for cross-system access.
- The structure is designed to support future expansion.

### Event Hooks

- Gameplay events broadcast to the achievement layer when notable milestones occur.
- A first enemy defeat notification can unlock the introductory achievement.
- Additional achievements can subscribe to other gameplay events following the same pattern.
