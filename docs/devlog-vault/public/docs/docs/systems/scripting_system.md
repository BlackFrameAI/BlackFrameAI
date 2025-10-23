# Scripting System Overview (Public Summary)

This document summarizes the scripting layer while withholding sensitive bindings and file locations.

## Purpose

- Embed a lightweight language runtime that designers can use to author gameplay behavior.
- Register engine callbacks through a curated binding table so scripts interact with gameplay features without touching internals.
- Allow per-frame update hooks for reactive logic while maintaining performance safeguards.

## Content Management

Scripts are loaded from a controlled library; exact directories, naming conventions, and loader scripts are [REDACTED]. Narrative events can request matching scripts through identifiers, but implementation specifics remain internal.

## Available Capabilities

Scripts can:

- Log diagnostic information through approved channels.
- Spawn enemies or interactive objects defined by data tables.
- Adjust player progression, inventory, and reputation values within safe ranges.
- Toggle UI overlays or trigger narrative branches.

Function names, parameter lists, and additional helpers are intentionally [REDACTED] in this public summary.
