# project_roadmap.md

This roadmap tracks major goals and ongoing work for [REDACTED PROJECT]. It is updated as development progresses so contributors can quickly see what is complete and what remains.

---

## Completed Milestones
- Core engine loop with scene and input management
- OpenGL 4.5 renderer with runtime shader loading
- Embedded Lua scripting with initial gameplay bindings
- Basic validation scenes replaced by `Scene0`, `Scene1` and `Scene2`
- Alignment, Chapter, Boss and SpaceCombat managers
- Procedural armor modules for characters (see `docs/systems/visuals/character_visuals.md`)
- Enhanced SaveSystem with incremental checkpoints
- Integrated **PhysicsCore** for stable physics simulation


## In Progress
- Additional Lua bindings for gameplay systems
- Space combat encounters tied into chapter progression
- UI overlay polish and vendor inventory integration
- **Windowing overhaul** with resizable windows and uniform VGU scaling **In-Progress** until fully tested

## Upcoming Goals
- Implement network simulation features
- Add telemetry logging and remote analysis
- Finish Scenario Editor tooling
- Optional Vulkan/DX12 render backends via `RenderBackend`
- Expand automated tests under `tests/` and integrate CI
- QuantumStateVectorSimulator collapse now randomizes gates and prints debug logs when `CV_ENABLE_DEBUG_LOGS` is enabled.
- Additional internal safety documentation covers potential hardware hazards for quantum workflows; details are restricted to authorized readers.
