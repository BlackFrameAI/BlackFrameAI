# chaotic_collapse_oracle.md

The **ChaoticCollapseOracle** continuously collapses a quantum state using live
entropy. It does not require gate input and can run on a background thread or GPU
kernel.

- Seeds are written to a `ChaoticCollapsePool` for later promotion. Each entry
  stores the seed value, entropy, a timestamp and optional attributes so
  additional context can be tracked. Attributes currently include `spike`,
  `latency` and `significant` when spikes exceed the moving average. Arbitrary
  tags such as `color` or `shape` may be attached for pattern queries. These
  attributes are captured directly from runtime values as each collapse occurs;
  they are not inferred or assigned after the fact.
- Undefined seeds are kept and tagged for analysis instead of being filtered.
- The oracle never writes to simulation state directly; `promoteSeed(observer)`
  returns the most recent **validated** seed and clears the pool when
  `observer` is `false`.
- Invalid or undefined seeds are logged. When `observer` is `true` the pool is
  left intact and the method simply reports issues.
- Entropy is sourced exclusively from `EntropyManager`. The oracle evaluates live entropy against a **chaotic threshold** before collapsing. The threshold reacts to spike magnitude, jitter frequency and pool saturation so collapses only occur when randomness is sufficiently unpredictable.

Location: `engine/modules/quantum/collapse/ChaoticCollapseOracle.*`

## Chaotic Seed Promotion

`ChaoticSeedPromoter` is an optional helper that can replace seeds produced by
`HybridGatedCollapseSimulator`. The promoter queries the oracle for the latest
validated seed and, based on a configurable probability, substitutes that value
for the simulator's own result. Promotion only occurs when a gate closes so
deterministic collapses can be overridden without disrupting open-gate logic.
Setting the chance to `0` or disabling the promoter keeps all gated collapses
deterministic which is necessary for automated tests.

Location: `engine/modules/quantum/collapse/ChaoticSeedPromoter.*`

## Entropy Monitoring and Timeout

`ChaoticCollapseOracle` polls `EntropyManager` each frame. Successful seeds
update the last collapse timestamp maintained by `DualLayerQuantumManager` via
`recordCollapse(true)`. When neither the oracle nor the gated simulator reports
a valid seed for **60 seconds**, `DualLayerQuantumManager::update()` switches to
deterministic mode and logs a warning. The oracle continues polling entropy
during fallback so normal operation can resume automatically once a new seed is
validated.

## Chaotic Threshold Dynamics

The chaotic threshold determines when a random collapse is considered
sufficiently unpredictable. Every loop the oracle scores the latest entropy
sample and adjusts the threshold according to several signals:

- **Entropy spikes** &mdash; large deviations from the previous sample raise the
  threshold. When a spike exceeds `0.2` the oracle logs a debug message and
  randomizes its sensitivity and decay parameters.
- **Average deviation** &mdash; the oracle maintains a running average of recent
  entropy readings. Collapses triggered by spikes more than **2.5×** the mean
  deviation emit an info log with the spike magnitude and resulting seed.
- **Jitter** &mdash; the difference between polling intervals slightly modifies the
  threshold so collapses become more likely when timing is irregular.
- **Cross-source variance** &mdash; entropy closer to 50% ones lowers the
  threshold, while strong bias tightens it.
- **Chaos density** &mdash; a saturated entropy pool lowers the threshold whereas an
  empty pool increases it.

At startup, and whenever a spike resets the parameters, sensitivity is chosen at
random between `0.2` and `0.6` while the decay factor falls between `0.001` and
`0.01`. Sensitivity slowly decays each iteration to avoid repeated collapses
without new spikes. All spike detections are logged through `CV_LOG_DEBUG`
allowing collapse decisions to be audited easily.

## Collapse Diagnostics

- Timestamps and entropy for the last few collapses are stored in a circular
  buffer. The oracle computes their moving average each iteration.
- When the average entropy stays below the viability threshold of `0.1` for more
  than **15 seconds** a "soft chaos warning" is logged.
- Each valid collapse logs the resulting seed, the entropy spread and how long
  the collapse call took so latency spikes can be monitored.

## Seed Pool Queries

`ChaoticCollapsePool` exposes two lookup helpers:

- `findMatchingSeed(predicate)` iterates the pool from most recent to oldest
  entry. The predicate receives each `ChaoticSeedEntry` and returns `true` for a
  match. When no entry satisfies the predicate, a trace-level message notes the
  miss if tracing is enabled.
- `findClosestMatch(query)` scores each entry using entropy and an exponential
  time decay. Recent, high-entropy seeds score best. Optional query fields such
  as `color`, `shape` and `minEntropy` filter the candidates. Missing matches are
  likewise traced for debugging.

The decay factor ensures older seeds drift out of relevance over time so that
only fresh collapses influence pool requests.
