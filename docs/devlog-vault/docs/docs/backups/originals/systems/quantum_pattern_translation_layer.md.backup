# quantum_pattern_translation_layer.md

The **Quantum Pattern Translation Layer** (QPTL) exposes a simplified API for
requesting quantum collapse seeds. Gameplay and AI systems can submit an
`IntentRequest` without dealing with qubits or simulator state directly.

- Works with `DualLayerQuantumManager` which owns both the hybrid simulator and
  the chaotic oracle.
- Collapse routing is handled by `DualLayerQuantumManager` which chooses
  between `HybridGatedCollapseSimulator`, `ChaoticCollapseOracle` or a
  deterministic simulator as needed.
- Optionally mixes additional entropy from `EntropyManager`.
- Returns a single 32‑bit seed suitable for procedural generation.
- Accepts optional **entropy hints** through `setEntropyHint()`.

Location: `engine/modules/quantum/qptl/QuantumPatternTranslationLayer.*`

## CollapseStateMapper

`CollapseStateMapper` tracks seeds produced by the hybrid simulator and the oracle.
Each entry records the seed, the source simulator and a simple entropy hash.
Systems can call `suggestReuse(hash)` to retrieve previously recorded states with
matching hashes. This helps identify collapse results that may be reused across
similar entropy conditions.

### validateAndPromote

`validateAndPromote(const IntentRequest&, unsigned int)` checks a generated
seed against an `IntentRequest`. Seeds that meet the request are promoted into
the mapper's state list. Seeds that fail are cached for mutation or placed in a
quarantine/observation pool when anomalous. All attempts are logged through
`CollapseLineageLogger` when enabled.

Typical usage in `QuantumPatternTranslationLayer` looks like:

```cpp
unsigned int seed = qptl.requestCollapse(request);
// seed will be 0 when the validation fails
```

`requestCollapse()` only attempts a collapse when the associated
`DualLayerQuantumManager` and its oracle are ready. If either is missing or the
oracle has not finished initializing, the method logs a warning and returns `0`
without mixing entropy.

`requestPoolSeed(request, query)` searches the `ChaoticCollapsePool` for a
matching entry using `findClosestMatch`. The seed is only promoted when the
predicate or query rules pass. If no match is found the method returns `0`
without falling back to deterministic logic.

Any returned seed is already promoted and tracked for potential reuse.

Location: `engine/modules/quantum/qptl/CollapseStateMapper.*`

### Entropy Hints

`QuantumPatternTranslationLayer` exposes `enum class EntropicHint` with values
`LowEnergy` and `HighJitter`. Use `setEntropyHint()` to provide a hint about the
desired collapse behavior. The current implementation does not alter the
collapse process, but future versions may adjust entropy mixing based on the
selected hint.
## Simulator Integration

The layer can operate with either a basic `QuantumSimulator` or the GPU-accelerated `QuantumStateVectorSimulator`.

- `HybridGatedCollapseSimulator` uses whichever simulator is active to execute deterministic gates.
- `ChaoticCollapseOracle` continuously streams entropy-based collapses.
- `DualLayerQuantumManager` selects the simulator and performs the collapse.
- Each resulting seed is validated through `CollapseStateMapper` before being returned to callers.

## Runtime Integration

`Game` instantiates a `QuantumPatternTranslationLayer` alongside
`QuantumStateVectorManager`. The layer is passed to gameplay systems like
`PlayerController`, `StageManager` and `CombatSimulator`. These systems call
`requestCollapse()` to obtain seeds for procedural logic such as player spawn
appearance, powerup positions and combat bias. Every seed flows through
`CollapseStateMapper` and may be replaced by `ChaoticSeedPromoter` when the
oracle overrides a gated collapse.
