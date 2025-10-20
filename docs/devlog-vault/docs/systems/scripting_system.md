# scripting_system.md

This document defines the **Scripting System** for *Purge of the Crescent Veil*.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.
Implementation files live under `game/modules/system/scripting/`.


---

## Overview

The engine embeds **Lua 5.4** as a lightweight scripting layer. `ScriptingSystem` loads scripts from the `game/assets/scripts/` directory and executes them at runtime. Lua is compiled as part of the build via CMake.

During engine initialization the game now provides a set of callback functions using `GameScriptBindings`. These callbacks are registered with the scripting system so gameplay code remains decoupled from engine internals.

## Interacting with Gameplay Objects

Lua scripts can call engine functions registered by the C++ layer. The initial binding exposes the logger:

```lua
log_info("Hello from Lua")
```

Scripts now have helpers for spawning enemies, creating powerups, modifying player resources, adjusting stage progression, checking boss state and repositioning the ship. Narrative events automatically load matching scripts from `game/assets/scripts/` when triggered. These bindings should be used to modify gameplay state instead of accessing engine internals directly.

### Per-frame updates

Define a global function `on_update(dt)` in your Lua scripts to receive a callback each frame. The engine passes the elapsed time in seconds so scripts can run lightweight behaviour code.

## Lua API

The following functions are available to scripts:

- `log_info(message)` – write a message to the engine log.
- `spawn_enemy(type, x, y)` – spawn an enemy of `EnemyType` at world coordinates.
- `add_powerup(type, x, y)` – create a powerup of `PowerupType` at the given location.
- `add_faith(amount)` – increase the player's faith resource.
- `set_stage(stage)` – change the current stage difficulty.
- `get_stage()` – return the current stage number.
- `has_active_boss()` – check if a boss encounter is running.
- `set_ship_position(x, y)` – reposition the prototype ship in space mode.
- `add_item(name, quantity)` – add an item to the player's inventory.
- `use_item(name)` – consume one item if available and return `true` on success.
- `add_hub_upgrade(id)` – unlock a hub upgrade by identifier.
- `adjust_reputation(faction, amount)` – modify faction reputation.
- `show_ui(id)` – display a UI overlay identified by `UIElementId`.
- `hide_ui(id)` – hide a UI overlay.

Scripts named after narrative event IDs (e.g. `faith_threshold.lua`) are loaded
automatically from `game/assets/scripts/` when those events trigger via
`NarrativeEventSystem`.
