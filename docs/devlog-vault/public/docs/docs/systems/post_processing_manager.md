# Post-Processing Manager (Public Summary)

The post-processing manager coordinates a configurable sequence of visual
effects applied after the main scene is rendered. Implementation details such as
framebuffer identifiers, parameter names, and render targets are withheld for
security.

## Capabilities

- Prepares intermediate buffers without sharing exact dimensions or handles.
- Allows systems to register visual passes through sanitized callbacks.
- Executes the configured chain before UI layers draw, ensuring the final output
  receives the intended tone-mapping without leaking shader identifiers.
