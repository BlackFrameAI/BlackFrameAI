# Stencil Guide System (Public Summary)

The Stencil Guide System supplies high-level templates that steer procedural visual generation.
Specific shader bindings, collapse heuristics, and entropy routing remain internal. `[REDACTED]`

## Concept
- Stencils describe allowable silhouettes, emphasis regions, and animation hints without embedding final art.
- Generators sample these guides to maintain stylistic coherence while permitting variation.
- Integration with collapse pipelines mirrors the private build but excludes shader stage particulars. `[REDACTED]`

## Usage Notes
- Requests identify a stencil class; the resolver returns a descriptor with the resolved theme metadata.
- Descriptor payloads surface only the fields safe for public release (type, theme tags, tint hints).
- Callback mechanisms prevent recursive emission as in the internal version, with implementation details withheld. `[REDACTED]`

Advanced modulation strategies, entropy-weighted morphing, and GPU stencil programs are documented privately. `[REDACTED]`
