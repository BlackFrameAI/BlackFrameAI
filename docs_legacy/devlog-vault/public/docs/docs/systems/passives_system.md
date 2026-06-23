# Passives System (Sanitized)

This summary outlines how the project interprets passive modifiers while withholding engine paths and balancing constants.

## Responsibilities
- Load passive definitions from a configurable content directory managed by [REDACTED].
- Cache each passive by a stable identifier for quick lookups.
- Provide aggregate modifiers that downstream combat systems can query when alignment-style conditions are satisfied.

## Data Expectations
Each passive entry contains at minimum:
- An `id` string.
- A threshold describing when the passive should activate (exact rule set [REDACTED]).
- One or more multiplier-style adjustments to damage or related stats.

Malformed data, missing identifiers, or invalid JSON payloads are skipped to avoid corrupting runtime state.

## Multiplier Evaluation
When gameplay code requests a multiplier, the system:
1. Starts from a neutral baseline (e.g., `1.0`).
2. Iterates over cached definitions whose thresholds are met according to [REDACTED].
3. Applies each modifier multiplicatively to produce the final value.

This preserves the behavior of the original implementation while concealing proprietary scaling logic and file layout details.
