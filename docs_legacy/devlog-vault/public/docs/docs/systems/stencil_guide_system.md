# Stencil Guide System (Public Summary)

The Stencil Guide System provides high-level art direction signals for procedural content. Instead of prescribing shaders or
detailed mesh instructions, it shares category-level templates that help downstream generators stay stylistically aligned with
each faction or theme.

## Concept
- Stencils describe broad silhouettes, composition weighting, and thematic intent only.
- Runtime generators interpret those hints using their own proprietary methods.
- No low-level shader code, math kernels, or entropy heuristics are exposed here.

## Integration Notes
- Design tools can request stencil descriptors by theme or event type.
- Callbacks broadcast sanitized descriptors that include only presentation-safe fields (display name, color palette handle,
  optional animation tone).
- Recursive emissions and internal guardrails remain implementation details and are omitted from the public export.

This summary focuses on creative intent while preserving the confidentiality of the rendering pipeline.
