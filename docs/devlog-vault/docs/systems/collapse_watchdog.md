# collapse_watchdog.md

The **CollapseWatchdog** monitors quantum collapse stability.

- Tracks consecutive collapses with zero entropy, repeated seeds or invalid states.
- A configurable entropy threshold determines when "healthy" collapses reset the
  counter. Low-entropy collapses do not clear consecutive issues.
- Logs each anomaly with timestamp and simulator name via `cv::Logger`.
- After more than 10 issues the watchdog marks the simulator as unstable.
- Maintains a small buffer of recent seeds. Monotonic or repeating patterns
  increment the consecutive counter and log a `seed_pattern` anomaly. The
  pattern length is configurable.
- High‑entropy collapses (>0.9 by default) reset the consecutive issue counter
  even if earlier anomalies were recorded. This allows a simulator to recover
  quickly when randomness returns.
- Seed checks run incrementally across the buffer so partial repetitions are
  detected as soon as they appear instead of waiting for the full pattern
  length.
- The watchdog emits a **soft chaos warning** if the ChaoticCollapseOracle's
  moving average entropy stays below `0.1` for **15 seconds**. The oracle keeps
  running during deterministic fallback and records entropy trendlines for
  offline analysis.
- The watchdog does **not** switch to deterministic mode. `DualLayerQuantumManager::update()` activates fallback once 60 seconds pass without a valid collapse.

Location: `engine/modules/quantum/CollapseWatchdog.*`
