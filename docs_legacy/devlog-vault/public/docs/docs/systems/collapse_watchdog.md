# Collapse Watchdog (Public Summary)

The Collapse Watchdog monitors the health of probabilistic collapse routines and reports anomalies when entropy patterns look suspicious.

- Tracks consecutive collapses with abnormal entropy or repeated seeds and keeps a short window of recent inputs for pattern analysis.
- Uses configurable thresholds supplied by the host application to decide when an issue counter should be reset.
- Records anomaly metadata for later review without exposing simulator internals.
- Emits a soft warning when sustained low entropy persists, enabling supervisory services to examine the simulator before hard failures occur.
- Leaves fallback activation to the owning quantum manager while still reporting trend information that helps evaluate recovery.
