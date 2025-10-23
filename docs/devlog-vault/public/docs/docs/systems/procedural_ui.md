# Procedural UI System (Sanitized)

This document outlines the public-facing concepts behind the procedural UI helpers used throughout the project.

## Overview
- Procedural UI sprites assemble widget geometry from primitive shapes and respond to basic interaction events.
- Generators consume stencil descriptors and theme data to produce consistent visuals across overlays.
- Internal callback routing, theming heuristics, and asset bindings are [REDACTED].

## ProceduralUIGenerator
- Listens for descriptor messages, resolves the active theme, and produces sprites ready for rendering or deferred retrieval.
- Supports configurable dimensions, interaction hooks, and automatic cleanup when generators shut down.
- Implementation specifics for descriptor parsing, batching, and dependency injection are [REDACTED].

## UIShapeRegistry
- Stores reusable shape builders for widgets that rely on SDF rendering.
- Provides canonical identifiers for rounded rectangles, toggles, sliders, and similar elements.
- Shape tessellation parameters, vendor font integrations, and shader bindings are [REDACTED].

## Usage Notes
Scenes load default shapes, request generated sprites as needed, and render them via the shared procedural pipeline. Further details on renderer integration, licensing, and proprietary datasets are [REDACTED].
