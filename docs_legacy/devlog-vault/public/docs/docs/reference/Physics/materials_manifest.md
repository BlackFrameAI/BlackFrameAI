# Materials Manifest (Sanitized)

This table-free summary provides qualitative guidance for common material categories so designers can balance encounters without revealing restricted numerical datasets.

---

## Structural Profiles

- **Steel:** Treat as high-density and high-strength; ideal for load-bearing frames or armored exteriors. Consider gradual deformation rather than brittle shatter.
- **Wood:** Medium density with directional grain behavior. Emphasize splintering and partial fracture to communicate damage without fixed tensile values.
- **Glass:** Brittle and moderate density. Focus on transparency, shatter patterns, and fragment cleanup timers instead of hard-coded strength limits.
- **Plastic/Polymers:** Low to medium density with flexible rebound. Use adjustable elasticity curves for everything from soft impact absorption to rigid casings.

---

## Implementation Notes

- Store material traits in designer-facing data assets where ranges can be tuned safely (e.g., "high", "medium", "low" strength tiers).
- Avoid embedding raw vendor data; instead, map qualitative tiers to gameplay effects such as stagger duration, penetration chance, or debris volume.
- Cross-reference widely available engineering textbooks or open databases if more detail is required, and document any custom mappings in team wikis.
