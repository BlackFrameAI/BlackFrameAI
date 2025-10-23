# Combat Simulation System

The Combat Simulation System provides an offline sandbox for testing encounter balance without exposing the underlying source code.

## Purpose

- Runs automated skirmishes that pit two abstract forces against each other.
- Consumes designer-authored data to determine unit compositions, morale, and relative strength.
- Produces reports describing overall outcomes so that encounter tuning can be iterated quickly.

## Scenario Controls

- Supports terrain, weather, and difficulty concepts, letting designers explore a wide range of combat contexts.
- Allows optional randomization to study variance while shielding the math that drives casualty resolution.
- Accepts scripted curves that reshape challenge over time, with the exact scaling functions kept private.

## Integrations

- Can ingest telemetry or other external signals to adjust difficulty, but request formats and normalization rules are redacted.
- Optional quantum biasing introduces deterministic noise; implementation specifics remain internal.

This document intentionally omits class names, data schemas, and algorithmic details to protect proprietary logic.
