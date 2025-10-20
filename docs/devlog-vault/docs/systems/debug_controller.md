# debug_controller.md

The **DebugController** handles runtime debug shortcuts. It receives input from `InputManager` and toggles overlays and engine options like visual debug mode.

- **F2** toggles visual debug rendering.
- **F7** toggles OpenGL debug output.
- **F8** toggles the system info overlay which now shows CCP size and entropy drain.
- **F9** toggles the score overlay and secondary window input block.
- **U** starts or stops the ChaoticCollapseOracle.
- **Y/X/Z** collapse the CPU, state vector and CUDA gates respectively.
- **P** promotes the latest chaotic seed into active use.

See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the current modularization status.
