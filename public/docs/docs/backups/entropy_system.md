# Entropy Service Summary

The entropy service centralizes random data collection so that gameplay and tooling share the same high-quality bitstream. Specific sampling formulas, weighting rules, and device integrations are intentionally omitted in this public version.

## Goals
- Offer a single API for requesting non-deterministic bytes on both CPU and GPU.
- Allow multiple input sources to be registered and mixed without leaking vendor details.
- Provide diagnostic hooks so developers can monitor pool health and latency.

## Operational Model
- Each source exposes a `poll` function that returns raw bytes when asked. Sources may represent hardware devices, timing jitter, or other environmental signals.
- A manager advances through registered sources in a round-robin fashion, with optional weights for slower providers.
- When demand exceeds supply, the system logs a warning and falls back to a deterministic pattern so simulations can continue while still flagging the issue.

## Usage Patterns
- Engine subsystems request buffers of entropy during initialization and at runtime through a thread-safe interface.
- GPU consumers mirror a ring buffer or staging area that is synchronized periodically from the CPU-side pool.
- Test builds expose deterministic overrides so automated suites can replay scenarios reliably.

This summary communicates behaviour expectations without detailing proprietary algorithms, seeds, or device identifiers.
