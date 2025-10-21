# seed_layer.md

This document outlines the responsibilities of the **SEED layer**, a lightweight kernel manager that runs beneath the normal engine systems. It coordinates which runtime kernel is active and provides isolation when loading updates.
**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.


---

## Responsibilities

- Run a minimal main loop that boots the engine kernel.
- Manage scheduling for kernel tasks while the engine is active.
- Expose broker interfaces for GPU, audio and input access.
- Validate new kernel images before they replace the active one.
### Broker Usage
Currently the engine instantiates the GPU, audio and input brokers directly. The SEED layer defines interfaces for future integration but does not provide brokers yet.


## Memory Layout

SEED resides in a small reserved region at the start of the process address space. The region contains the core scheduler, brokers and slot manager structures. Engine kernels are loaded after this region and referenced by pointer so they can be swapped without relocating SEED.

## Allocators

`SeedAllocator` is a simple wrapper over `malloc` that registers a context with `MemoryTracker`. SeedCore owns one allocator for the SEED layer and creates a new allocator for each kernel that is loaded. This allows memory usage and leaks to be reported independently per allocator.

## Version Ring

KernelSlotManager maintains a three slot "version ring":

1. **Active** – the kernel currently running the engine.
2. **Backup** – a known good kernel that SEED can revert to on failure.
3. **Test** – a newly loaded kernel used for validation before promotion.

SEED can switch between these slots at runtime. If the active kernel crashes, SEED restarts it from the backup slot. New kernels are first loaded into the test slot and only promoted after passing validation.

## Usage

`SeedCore` works together with `SeedControl` to manage kernel upgrades. `SeedControl` queues requests so they can be processed when the engine is idle. This keeps heavy loading and validation work outside the main engine loop.

- `Startup(path)` loads the given kernel and activates it.
- `SeedControl::RequestUpgrade(path)` queues an upgrade using the provided image.
- `SeedControl::RequestRollback()` reverts to the previous kernel.
- `SeedControl::GetCurrentVersion()` returns the version string reported by the active kernel.
- `SeedCore::ProcessRequests()` promotes queued upgrades or rollbacks after the engine shuts down.

Example:

```bash
crescent_runtime --kernel=bin/default_kernel.so --update-kernel=bin/new_kernel.so
```
