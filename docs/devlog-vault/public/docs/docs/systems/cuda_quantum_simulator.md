# CUDA Quantum Simulator (Public Summary)

The CUDA-backed state vector simulator accelerates quantum gate evaluation by running the core math on compatible GPUs.

- Mirrors the high-level API of the CPU simulator so systems can switch backends without rewriting gameplay code.
- Allocates qubit registers dynamically based on available device memory while keeping memory-management details private.
- Provides hooks for enabling or disabling optional GPU features through build and runtime configuration.
- Supports validation against the reference CPU implementation to ensure consistent results across backends.
- Integrates with the broader quantum management framework while respecting modular boundaries.
