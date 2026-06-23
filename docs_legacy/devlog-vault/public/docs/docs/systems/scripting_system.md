# Scripting System Overview (Public Summary)

This document presents a high-level look at the runtime scripting layer while masking concrete bindings, source locations, and debugging utilities.

## Purpose

- Host a lightweight, data-driven language so designers can author gameplay behaviors without recompiling the engine.
- Offer a curated bridge between scripts and gameplay systems that filters requests and enforces security constraints.
- Provide optional per-frame callbacks for reactive behaviors while keeping scheduling details [REDACTED].

## Content Management

- Scripts are distributed through an internal library; naming schemes, packaging format, and patch workflows are [REDACTED].
- Narrative triggers and event graphs resolve to script identifiers through a registry that is not exposed publicly.
- All imports, helper scripts, and startup order requirements remain private to avoid leaking build pipeline structure.

## Capability Envelope

Within defined guardrails, scripts may request combat encounters, adjust player-facing progression metrics, or toggle UI elements. Exact function signatures, parameter names, rate limits, and privileged helpers are [REDACTED] to prevent unauthorized reproduction of the toolchain.
