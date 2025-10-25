# Quantum System

This document provides a high-level orientation to the experimental quantum simulation stack used for entropy-aware features. All references to gate recipes, collapse equations, hardware identifiers, and other sensitive implementation details have been intentionally removed.

## Lightweight Simulator
- Offers configurable registers with themed gate collections while withholding the exact operations.
- Relies on a registry so extensions can contribute new behaviors without altering the simulator core.
- Exposes measurement hooks that generate pseudo-random bits for gameplay tuning.

## Extended Statevector Simulator
- Expands capacity for teams that need richer entropy surfaces.
- Can operate on GPU hardware when permitted, otherwise falling back to CPU execution automatically.
- Produces deterministic entropy tokens instead of raw amplitude data, protecting simulator internals.

## Collapse Infrastructure
- Collapse requests flow through a manager that coordinates triggers from frame updates, world chunks, or custom events.
- Mixed-mode execution blends CPU and GPU contributions through anonymized hashing routines.
- Statistics are summarized as aggregate counters so observers can monitor health without accessing detailed traces.

## Operational Guidance
- Always validate that background oracle components report readiness before consuming their data.
- Treat entropy tokens as sensitive identifiers; avoid storing them alongside user PII or unreduced telemetry.
- Log activity through sanitized audit channels that omit qubit counts and device assignments.

## Extensibility Notes
- New gate sets or simulator variants should register through vetted extension points.
- Keep experimental features behind feature flags and document activation criteria separately from this public summary.
- Coordinate with security reviewers before exposing additional debugging output or developer tooling.
