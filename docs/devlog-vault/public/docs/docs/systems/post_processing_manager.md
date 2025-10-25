# Post-Processing Manager (Public Summary)

The post-processing manager orchestrates a configurable chain of visual passes while
protecting implementation specifics such as render target names, shader uniforms,
and hardware tuning values.

## Capabilities

- Allocates intermediate buffers through abstracted handles so no raw framebuffer IDs
  or resolution heuristics are exposed.
- Registers visual passes via sanitized callback descriptors that hide shader names,
  blend states, and routing order.
- Applies the configured sequence before UI composition while redacting tone-mapping
  constants, dithering values, and bloom thresholds.

## Operational Notes

- Debug builds may surface anonymized counters (active passes, average cost) but never
  reveal texture formats or GPU queue data.
- External modules can opt in through vetted configuration files that omit any
  proprietary parameter names.
