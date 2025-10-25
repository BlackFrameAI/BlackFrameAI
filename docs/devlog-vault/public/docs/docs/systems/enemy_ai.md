# enemy_ai.md

This document outlines the **Enemy AI System** guidelines for public distribution. All combatant logic is modular, data-driven,
and validated against the latest module tree. A system remains **In-Progress** until documentation, cleanup, and tests are merged
and verified.

## Redaction Notes

- Internal behavior identifiers and event names have been removed.
- Example scripts now reference generic routing services instead of concrete class names.

---

## Core Principles

- Behaviors are faction-aware but never expose internal identifiers in shipped builds.
- AI logic must remain modular so that designers can compose behaviors from reusable components.
- Data tables and configuration assets define difficulty, alignment reactions, and stage modifiers.
- Controllers must scale to support large encounters, narrative events, and multi-environment play.

---

## Faction Playbooks

Public playbooks describe broad tendencies without revealing proprietary routines:

- **Front-Line Forces** – emphasize coordinated pushes and disciplined retreats.
- **Shadow Operatives** – favor ambush tactics, mobility, and support summons.
- **Swarm Entities** – rely on overwhelming numbers, pack tactics, and morale surges.
- **Independent Actors** – switch strategies based on player behavior and world state.

---

## Boss Framework

Boss encounters use multi-phase scripts that react to player alignment, mission progress, and story beats. Each phase defines its
own triggers, audiovisual cues, and counterplay windows to keep fights readable without exposing backend hooks.

---

## State Machines

Enemies rely on lightweight state machines hosted inside the enemy module. Typical states include `Idle`, `Engage`, and
`Retreat`. Transitions evaluate player alignment scores and environment signals supplied by the active stage. Designers can add
new states without modifying the underlying engine code, and public examples describe behavior in prose instead of executable
snippets.

---

## Behavior Routing

The AI controller collaborates with a routing service that resolves each enemy's behavior module. Implementations may reference
scripting assets or native fallbacks, but public builds should only mention safe script names. The router surfaces lifecycle events
so other systems (spawners, VFX, telemetry) can react without depending on private identifiers.

---

## Modular Collaboration

Enemy management is distributed across specialized helpers:

- **AI Controller** – updates state machines and issues behavior events.
- **Spawn Handler** – creates and removes combatants while handing off ownership to render and physics systems.
- **Collision Registrar** – forwards collision updates to the shared collision service.
- **Behavior Router** – maps metadata to behavior implementations.

Each helper stays in its lane to keep the system testable and maintainable.
