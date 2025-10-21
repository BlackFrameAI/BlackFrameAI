# passive_tree.md

This document defines the **PassiveTree** system for *Purge of the Crescent Veil*.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.

---

## Purpose

`PassiveTree` stores a collection of passive ability nodes. Chapters and quests unlock these nodes based on progression triggers.

---

## Nodes

Each `PassiveNode` contains:

- `id` – unique identifier string
- `unlocked` – whether the node has been obtained
- `prerequisites` – list of node ids that must be unlocked first

Nodes are registered through `addNode(id, prereqs)` which creates the entry if it does not already exist.

---

## Unlock Rules

`unlock(id)` simply marks the given node as unlocked. The caller is responsible for verifying that all prerequisites listed in `prerequisites` have already been unlocked. `isUnlocked(id)` returns the current status for a node.

This lightweight design keeps `PassiveTree` focused purely on state tracking. Higher level systems such as `ChapterManager` or narrative events enforce when nodes become available.

