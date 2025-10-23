This document defines the intended folder structure and purpose of each directory in this repository.

It is provided for CODEX to reference when generating new code, assets, and tooling.

The project is gradually being modularized. Refer to [docs/modular/game_system_tree.md](modular/game_system_tree.md) for up-to-date system status.
Systems remain **In-Progress** until their documentation, cleanup, and tests are merged and verified.

Every modular system must reside in its own folder under `/engine` or `/game` (for example `game/modules/stage/StageManager.*

Root Structure

/engine/ Core game engine source code
/game/ Game-specific code (systems, UI, gameplay logic)
/game/assets/ Data assets (music, localization, stage definitions, scripts)
/docs/ Project documentation, design documents, lore
/scripts/ Build scripts, tooling, utilities
/tools/  Standalone utilities and editors

Detailed Directory Purposes

/engine/

Contains all core engine code.

Target language: C or C++.

Provides rendering, audio, input, asset loading, entity/component system, scene management.

Procedural sprites, audio and UI overlays are the default implementation.
The debug window overlay is implemented in
`engine/modules/debug/overlay/DebugOverlayWindow.cpp`. Multiple overlay windows
are supported but only the first extra window is currently used.

See docs/systems/procedural_sprite_system.md for architecture and integration.

/game/

Contains game-specific logic.

Systems include:

Combat

Alignment system

Chapter system

Hub system

Space combat integration

Powers and Rites system (formerly Glyph System)

Faction/NPC systems

Boss systems

Progression systems

UI systems

All player, enemy and powerup sprites are constructed procedurally via helper
functions like `createPlayerSprite`, `createBaseEnemyVisual`, and
`createHealthOrbSprite`. See `docs/systems/procedural_sprite_system.md` for full
usage.

/game/assets/

Contains non-procedural data only.

Music .ogg files

Localization tables

Stage definitions and configuration JSON

Lua scripts

No sprite sheets, textures or pre-recorded sound effects are stored here.

Legacy .txt sprite placeholders were removed when procedural rendering replaced static assets.

/docs/

Project documentation.

Design documents.

Lore documents.

System specifications.

Procedural sprite system lives under docs/systems/.
Modular architecture references are stored in `docs/modular/`.

/scripts/

Build and tooling scripts.

Utilities.

/tools/

Standalone utilities and editors such as the Scenario Editor.

Console helpers like the Runtime Launcher.

Debug tools including the Collapse Shape Viewer.

Legacy Modules

Code that has been archived but not deleted now lives under `archive/`.
This directory contains deprecated scene managers, UI handlers, and other logic.

These files are excluded from current builds via CMakeLists.txt but may be restored during regression tests.

Codex may reference legacy modules for migration examples but should never reintroduce them into active builds unless specifically told to.
Whenever a new system is added, Codex must update all dependent files and scenes to use it and eliminate outdated code paths unless they are kept in `archive/` for historical testing.
