# Collapse Watchdog

The Collapse Watchdog is a supervisory service that monitors quantum collapse activity for signs of instability.

- Aggregates collapse metrics and flags unusual streaks or repeating seeds without exposing runtime counters or entropy thresholds.
- Works with the entropy oracle to observe long-term stability trends and surface early warnings when randomness deteriorates.
- Keeps a short history of recent inputs so that designers can audit collapse health without exposing raw simulator logs or hashes.
- Emits advisory status updates that other systems can use to decide when to fall back to safer execution modes.

This summary omits implementation specifics, internal thresholds, and code locations to keep the monitoring strategy private.
