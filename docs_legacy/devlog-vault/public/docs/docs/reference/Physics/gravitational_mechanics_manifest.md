# Gravitational Mechanics Reference Manifest (Sanitized)

This public-facing manifest summarizes fundamental gravitational behaviors for designers who need broad guidance without exposing restricted datasets.

---

## Core Principles

- Treat gravity as an attractive force that scales with mass and weakens with distance. Use inverse-square falloff or similarly smooth curves when shaping encounter spaces.
- Keep fall acceleration values configurable so that gameplay tuning does not rely on locked physical constants.
- Distinguish between an object's mass and the apparent weight experienced in different gravity fields to avoid hard-coding hidden multipliers.

---

## Orbital and Rotational Considerations

- Model curved flight paths by blending tangential velocity with gravitational pull; ensure perigee/apogee style adjustments remain designer-driven.
- Apply gradual damping or drift terms for long-running orbital scenes so that decay can be authored without referencing proprietary research numbers.
- Reference well-known collegiate-level orbital mechanics texts or open courseware for any deeper derivations that might be required.

---

## Buoyancy, Freefall, and Collapse Scenarios

- Evaluate buoyancy qualitatively: compare displaced fluid mass with object mass and expose the balance as tunable percentages rather than fixed constants.
- When simulating gravitational collapse events, focus on narrative-friendly thresholds (e.g., "critical mass achieved") instead of quoting restricted astrophysical data.
- For stylized freefall or low-gravity encounters, author alternate gravity profiles (linear ramps, stepped zones) to communicate the intended feel without revealing sensitive parameters.
