# GPU Broker

`GpuBroker` is a deprecated adapter that historically set up graphics devices before the multi-display manager replaced it.

## Responsibilities

* Load required GPU function bindings during startup.
* Provide a minimal compatibility layer for legacy single-window builds.
* Hand off window creation and backend management to the modern display manager.

The component remains only for backwards compatibility and should be avoided in new work.
