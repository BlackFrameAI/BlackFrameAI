# Core In-Run UI (Public Summary)

## Overview
The core in-run interface frames combat, progression, and status information for the player. This
summary removes sensitive layering diagrams and tooling references while preserving the intent of the
system.

## Primary Objectives
- Surface essential combat data (health, abilities, progression) in a consistent layout.
- Keep overlays modular so individual components can be replaced without full-screen rewrites.
- Ensure interaction layers respect the rendering backend and input stack abstractions.

## Implementation Notes
Legacy overlay pipelines, asset directories, and integration hooks with internal renderers are kept in
private documentation. Public contributors should treat the HUD as a collection of replaceable panels
coordinated by a lightweight manager.

## Redaction Notes
Specific class names, layout file structures, and debug overlay inventories were stripped to prevent
leakage of proprietary engine organization.
