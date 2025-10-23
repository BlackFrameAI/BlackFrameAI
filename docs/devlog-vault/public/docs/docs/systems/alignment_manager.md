# Alignment System Overview (Public Summary)

This overview describes how player morality metrics influence gameplay while omitting project-specific identifiers.

## Responsibilities

- Maintain paired morality values that represent virtuous and corrupt tendencies.
- Offer safe methods for increasing, decreasing, or directly setting each value.
- Provide a derived alignment score for other systems that need a single metric.
- Notify audio and presentation layers when alignment shifts occur so they can update feedback.

## Integration Notes

- Alignment-aware systems query these values to gate encounters, modulate difficulty, and unlock narrative branches.
- Audio and visual effects may react to the alignment delta to reinforce player choices.
- Documentation for modular status lives in the public-facing system tree reference.
