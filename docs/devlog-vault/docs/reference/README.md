# Reference Index

This folder collects external source manifests used by the engine for grounded procedural generation.
Every `.md` file defines a knowledge domain such as physics, biology, materials, or mythology.  Each
manifest lists real-world sources Codex can consult when implementing or modifying systems.

Codex must check these manifests before introducing new logic. If a relevant reference is present,
it should guide implementation details. When missing references are discovered, Codex may propose a
new manifest detailing what outside sources would be cited.

The manifests share a common format:

- **Name** of the source
- **Type** (paper, dataset, textbook, etc.)
- **URL** – direct link to the resource
- **Use** – short summary of how Codex should apply it

See `physics_biology_manifest.md`, `materials_reference_manifest.md`, or `materials_manifest.md` for examples. Place new
manifests in a subfolder matching the domain (e.g. `physics/`, `visuals/`, `other/`).

This system also supports entropy modeling and collapse simulation by providing validated
scientific rules and cultural structures. These references help Codex create runtime behaviors
without relying on hallucinated data or online searches.

 Manifest files are for Codex use only. They are not intended for direct runtime parsing.
 
 Codex must never modify the engine's quantum systems based on reference data. Manifests like `quantum_behavior_manifest.md` are interpretive only and may not override the custom Collapse Oracle logic.

 Current manifest categories include: `physics/`, `visuals/`, `biology/`, `chemistry/`, `ai/`, `audio/`, `entropy/`, and `other/`. New categories may be added as needed.


Some reference manifests appear in multiple folders. This is intentional.  
 They serve multiple systems and may be accessed from each domain that uses them.  
 These are not conflicting duplicates — they are shared references used across visuals, lore, physics, AI, and entropy systems.
