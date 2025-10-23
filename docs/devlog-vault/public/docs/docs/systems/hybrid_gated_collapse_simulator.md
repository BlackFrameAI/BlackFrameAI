# Hybrid Gated Collapse Simulator

The Hybrid Gated Collapse Simulator coordinates quantum collapse events across supported simulator backends.

## Core Behavior

* Works with the active quantum simulator implementation to execute gate open/close cycles.
* Draws entropy from the shared manager before resolving outcomes.
* Stores resolved seeds in named buckets so other systems can reuse deterministic states when needed.

## Controls

* `openGate()` marks the start of a safe window for configuring collapse parameters.
* `closeGate()` finalizes the collapse and records the result.
* `setOverrideSeed()` lets automated tests force repeatable values.
* `requestWatchdogReset()` queues a watchdog refresh without exposing internal reset routines.

The implementation lives under the quantum collapse module within the engine's source tree.
