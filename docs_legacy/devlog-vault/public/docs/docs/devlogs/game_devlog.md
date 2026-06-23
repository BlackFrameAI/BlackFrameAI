# game_devlog.md

Progress updates on game systems.

> **Log Guidelines**
> - Run `date -Iseconds` or `date -u` before writing an entry to confirm the current date and time.
> - Use the real-time date for every entry. Multiple entries per day are encouraged.
> - Do not project future dates when documenting work.
> **Timestamp Style:** bullet entries start with time in `HH:MM:SSZ`. Use `--` when the exact time is unknown.

## Monthly Index
- [2025-06](#2025-06)
- [2025-07](#2025-07)
- [2025-08](#2025-08)

### 2025-06
## 2025-06-08
- -- Created HubScene and MainScene stubs with initial PlayerController, EnemyManager, ProjectileManager and PowerupManager.

## 2025-06-11
- -- Connected alignment audio hooks to the AudioManager.

## 2025-06-13
- -- Implemented initial boss framework for multi-phase encounters.
- 10:02:18Z Scene0Diagnostic now drives the renderer proof pass, building the diagnostic grid VBO and binding telemetry overlay sprites.
- 10:47:03Z GameManager routes RenderSystem metrics into LogChannel so gameplay and engine telemetry stay in lockstep during the first visible frame run.
- 11:12:49Z Logged validation tag frame-proof-1 against the Day 6 build artifacts, pairing frame hash 9c4a-d6 with the June 13 production log.

## 2025-06-16
- -- Began testing space combat prototype with basic controls.
- -- Added StarMap module with fleet deployment, zone control and encounter triggers.
- -- HubScene now allows TAB access to the Star Map once unlocked.
- -- Added Lua bindings for inventory, hub upgrades, faction reputation and UI overlays.
- -- Implemented Chapter passive tree with save/load support.
- -- Questline triggers now unlock passive nodes.
- -- Faction reputation now persists via FactionManager and feeds HubScene.
- -- Hub overlays adjust color based on alignment and reputation.
- -- Vendors filter inventory using reputation thresholds.
- -- Boss stats now scale with player alignment via `BossManager`.
- -- Added alignment-based dialogue hooks for bosses.
- -- Music system blends ambient, combat and boss tracks based on alignment.
- -- Hub UI now lists unlocked achievements via AchievementsOverlay.
- -- Introduced EnemyStateMachine with alignment and environment driven transitions.
- -- States adjust enemy speed when aggressive or fleeing.
- -- Replaced `FactionManager` with new `FactionReputation` manager.
- -- SaveSystem now stores faction reputation values.
- -- NPC dialogue and shop inventory read reputation data.

## 2025-06-17
- -- HubScene now sets hub menu theme colors based on alignment and faction.
- -- Added PassivesSystem loading JSON definitions and applying alignment bonuses.
- -- Altars now adjust stage alignment and display a notice.
- 04:59:00Z VendorInventory now shuffles items each run and weights selection by player alignment.
- -- PowerupManager exposes temporary buff templates for shop offerings.
- 06:20:00Z Stage definitions gain a `faction` field controlling enemy pools.
- -- StageManager reads faction and expands spawn types accordingly.
- 06:38:00Z SpaceManager tracks ship upgrade stats and forwards sector battle results.
- -- StarMap now resolves sector control and adjusts faction reputation.
- 06:52:00Z EnemyManager now loads Lua-based behavior trees and dispatches events on state changes.
- -- Alignment and environment values feed into scripted decisions.
- 07:21:00Z BossManager now stores per-boss resistances and intro lines. AlignmentManager modifies stats and dialogue.

- 07:40:00Z ChapterManager now tracks quest arcs loaded from assets.
- -- Stage and Hub scenes can trigger quests via Game hooks.
- -- PlayerManager supports cosmetic toggles.
- 07:48:00Z Implemented `DialogueTree` with reputation-based branches.
- -- `NarrativeEventSystem` now supports betrayal triggers affecting quests.
- 08:39:00Z Added `CombatSimulator` for randomized battle resolution.
- -- Documented new system under `/docs/systems/combat_simulation.md`.

- 09:22:00Z Extended combat system with `CombatScenario` parameters influencing terrain,
  weather and randomness.
- -- Updated documentation for scenario-based simulation.
- 09:32:00Z CombatSimulator now uses a difficulty curve for round scaling.
- -- Added helper functions for attack and defense scaling.
- -- Seeded simulations remain deterministic when a seed is supplied.
- 09:37:00Z Documented `CombatScenario` and dynamic difficulty behavior.
- -- Advanced simulation features were introduced earlier at 09:32Z today.
- 19:07:00Z Build files now compile SatelliteTelemetrySystem, QuantumSimulator and the training modules.

- 19:20:01Z SatelliteTelemetrySystem integrated with CombatSimulator for optional live targeting data.
- -- QuantumSimulator influences random combat events.
- -- AdaptiveTrainer feeds scenarios to OpposedForceTrainer for dynamic scaling.

## 2025-06-20
- 00:15:19Z TelemetryManager aggregates sensor data for combat and hub systems.
- -- Satellite telemetry can be simulated from JSON files when offline.

## 2025-06-21
- 01:36:56Z Main menu now uses a selectable list with Start and Quit.

- 02:01:55Z StageManager now logs a warning when no stage definitions are found and clears the active definition.
- 02:44:00Z AudioManager registration now checks each sound and logs a warning when a file fails to load.

- 03:00:58Z MainMenuScene supports mouse selection and clicking.

- 03:52:57Z Added SampleBoss for boss framework testing and hooked it into StartGame.

- 03:59:00Z PowerupManager now draws active powerups with RenderSystem::drawCircle and Game::Render uses it.
- 07:13:43Z CollisionSystem now tests rectangles for projectiles and player hazard hits.

- 12:47:57Z BossManager now notifies StageManager when a boss phase completes.

- 13:12:36Z BossManager now owns spawned bosses and deletes them when defeated or when shutting down.

- 14:16:58Z Removed placeholder texture assets from repository to reduce binary size
- 14:41:42Z Player, enemy and powerup visuals now use ProceduralSprites built from rectangles and circles.
- 18:14:33Z EnemyManager now assigns procedural sprites for each enemy type by default and Game no longer loads enemy textures.
- 18:38:39Z Added procedural sprite helpers for damage and defense buffs.
- -- StageManager now spawns these buff types and PowerupManager assigns their sprites.
- 18:50:08Z Updated textures documentation to describe ProceduralSprite usage and placeholder `.txt` assets.


- 18:58:47Z Removed unused texture loading from Game::Init after procedural sprite conversion.

- 19:12:13Z Added duration, spawn_interval and powerup_interval fields to stage definitions. StageManager now loads these values from JSON.

- 19:24:12Z Score, stage progress and player status overlays now show by default when a run starts. DebugController toggles still work as before.

- 19:51:51Z Added PlayerPositionOverlay to the default UI layout and adjusted existing overlays so no two share coordinates.

- 20:14:30Z CollisionSystem now renders destructible objects and hazards using simple
  shapes. Game spawns a few sample items at unique positions for testing.

- 20:25:12Z Game now configures SaveSystem checkpoint callbacks during StartGame so
  player position, stage and powerups are saved automatically.

- 20:37:21Z Documented how to create custom UI layout files and select them at runtime.
  Noted that GameUIManager::LoadLayout applies coordinates from game/assets/ui_layouts/default.json by default.
- 22:10:25Z GameUIManager now logs a warning and applies built-in overlay positions if a layout file cannot be loaded or parsed.
- 22:24:13Z Layout JSON can specify an `anchor` for each overlay. Offsets are measured from the chosen corner.
- 22:33:53Z Added StageManager unit test covering SetStage, Update and CheckpointReached.


- 23:11:12Z Added sprint and dodge mechanics. PlayerController now drains stamina while sprinting and triggers invincibility during dodge rolls.
- 23:20:52Z Checkpoint saves now include player inventory items and ability cooldowns.
- 23:51:31Z EnemyManager and PowerupManager no longer refer to .png assets and now assign procedural sprites unconditionally.
- -- Updated textures documentation to state that placeholder files under assets are unnecessary.

## 2025-06-22
- 00:03:59Z Procedural sprites now accept a `SpriteParams` struct with rotation, scale and tint color. Factory helpers populate default tints for enemy and player shapes.
- 02:55:01Z Static character module sprites now cached inside draw lambda to avoid per-frame construction.

- 03:43:33Z Character modules now apply frame tint when drawing each part. Paladin and AssaultMech variants visibly recolor armor.
- 04:10:26Z Expanded all character module sprites with layered plating and detail. Helmet visor and chest light now pulse over time.
- 04:20:25Z 
 - Documented ProceduralSprite layering, tint usage and variant colors in `systems/visuals/character_visuals.md`.
- 04:27:17Z Added enhanced armor sprites with customizable tint support.
- 05:04:32Z Added StageVisuals helpers for room decor. StageManager now spawns and renders decorative sprites.
- 05:23:42Z Added EnemyVisuals helper and threat-based rendering tweaks.
- 05:31:53Z Introduced `PickupVisuals` for health orbs, ammo cells, buffs, chests and terminals.
- -- StageManager and PowerupManager now use these sprites instead of placeholder shapes.
- 05:45:59Z Added `EffectSprites` with slash trails, explosion puffs, shield bubbles, laser beams and charge animations.
- -- ParticleManager now renders these procedural FX instead of plain circles.

- 06:26:57Z Documented ProceduralUI integration and updated character visuals accordingly.
- 09:13:22Z Game now receives NetworkSimulationManager to update each frame.

- 11:10:23Z SpaceManager now renders procedural ship and star map sprites.

- 11:39:56Z SpaceManager parses TelemetryPacket data to update fleet positions.

- 11:53:16Z Added faith-based narrative triggers through `NarrativeEventSystem`.
- -- `Game` now registers a faith threshold event instead of hardcoded logic.
- 12:34:08Z CombatSimulator now scales difficulty based on telemetry packets.

- 13:25:45Z PlayerManager and EnemyManager created Box2D bodies via PhysicsSystem and
  destroyed them when entities were removed. *(Historical; replaced by PhysicsCore)*

- 14:07:51Z PlayerManager rendering no longer calls `drawSprite`. The method now relies solely on
  `ProceduralSpriteInstance` and converts animation frames to temporary procedural sprites.
- 17:20:02Z Removed unused texture handles from Enemy and Powerup data.
- -- Managers now rely solely on ProceduralSprites during rendering.
- 17:34:01Z Loading a save now reconnects the HIL interface and restores network frame.
- 17:44:29Z Game replicates player position each frame and applies incoming network states.
- 17:55:04Z Added HIL gameplay hooks. Collecting a powerup sends a command byte and sensor packets now trigger shield or alignment changes.
- 20:29:24Z Player sprite variants can now be cycled with the V key.
- 20:41:20Z StageManager refreshes decorations when a new stage begins.
- -- Procedural instances animate each frame as stages progress.
- 20:59:04Z Added GameOverScene with vector-font restart and quit options.
- -- GamePhaseManager includes `GameOver`; GameManager transitions when lives reach zero.
- 23:30:04Z CombatSimulator now resolves Star Map battles. Press **B** while viewing the map to trigger a simulated sector clash and update faction reputation.
- 23:49:04Z Characters and enemies now play idle animations using additional procedural sprite frames.

## 2025-06-23
- 00:33:14Z Added DamageFlash and WeaponFlash effect sprites. CollisionSystem now spawns DamageFlash when the player or enemies take hits and triggers a WeaponFlash when projectiles strike.
- 00:51:37Z Added ExplosionFX and RadialPulseFX sprites. EnemyManager spawns ExplosionFX on removal and camera now supports simple shake.
- 01:29:49Z CollisionSystem triggers camera shake when the player is hit or an enemy dies.
- -- StageManager supports optional parallax layers for scrolling backgrounds.
- 01:48:56Z Enemies and pickups can now be recolored at runtime. `ProceduralSpriteInstance::setTintColor` updates the tint used when frames draw.

- 02:06:06Z Added FXHelpers with convenience functions for explosion and damage flash effects.
- -- CollisionSystem and PowerupManager now use these helpers when spawning particles.
- 03:11:26Z Engine now creates 'saves/user_flags.json' if missing and sets 'disclaimer_ack' false by default.
- 03:20:48Z Game now checks for missing audio files before registering sounds.
- 03:58:06Z Gameplay sounds now use the procedural SynthEngine. CollisionSystem and DebugController trigger synthesized effects.
- 15:08:09Z Added runtime key 'L' to toggle RenderDebugOverlay showing depth order and counts.
- 15:50:52Z DebugController now toggles AudioEventOverlay with F5 and dumps audio logs with F6.
- 16:20:32Z Audio overlay toggle confirmed on F5 with CSV dump on F6. Save slot overlay key removed.

- 21:05:59Z Removed placeholder test geometry from Game initialization.
- 23:49:01Z Removed legacy `.ogg` audio loading. StartGame now triggers procedural music using SynthEngine.

## 2025-06-24
- 00:25:46Z Game initialization now generates player, enemy and powerup sprites with their helpers.
- -- EnemyManager and PowerupManager register these sprites on startup and no longer fall back to shapes.

- 00:41:33Z Core gameplay managers now warn when sprites are missing and skip rendering.
- -- Game logs warnings if SynthEngine or CollisionSystem are null at startup.
- 01:56:35Z Sprite creation functions now report their frame counts during StartGame.
- -- SynthEngine logs waveform details whenever notes are queued.
- 03:06:29Z Added detailed startup logs and per-frame scene updates to isolate freezing issues.

- 03:27:12Z Documented F4 debug key and added runtime log when toggling player invincibility.

- 05:08:58Z Player now defaults to the paladin procedural sprite for better visibility.
- -- PlayerManager draws a debug circle if the sprite fails to load and logs sprite
  bounds on assignment.

- 05:19:04Z `GameUIManager::LoadLayout` now validates that each overlay entry exists.
- -- Missing overlays trigger a warning and their built-in default position is used.

- 16:17:59Z Added debug option to block input for stats windows via F9.
## 2025-06-25
- 08:18:21Z Removed outdated rectangle spawner from `Game::Init`.
- 14:11:54Z Game exposes Lua binding callbacks through IGame interface to reduce engine dependencies.

- 20:23:44Z Enemies now store a `ProceduralSpriteInstance` and advance animations during
  `EnemyManager::Update`. Rendering reuses this instance for per-enemy state.

- 20:33:52Z SpaceManager now keeps persistent procedural sprites for the star map, ship,
  and fleets. Animation timers update in `update` and rendering reuses these
  instances.
- 21:03:39Z Added new stage variants and decoration logic. Stage definitions now specify `variant` and StageManager loads the appropriate visuals.

- 21:47:22Z Restored default UI layout file; overlay warnings no longer appear.

- 23:05:54Z Fixed star map memory leak. Fleet sprites now shrink when fleets are pruned,
  avoiding 'not rendered for XXX frames' warnings.
- 23:28:52Z Star map sprites pause when the map is hidden to reduce log spam.
## 2025-06-26
- 00:09:22Z StarMap now removes inactive fleets after 30s and SpaceManager trims sprite instances accordingly.
- 04:49:48Z Satellite telemetry default ID is now numeric and invalid IDs no longer spawn fleets.

- 05:03:18Z SpaceManager caps fleet sprites to `kMaxFleets` and freezes animations when the star map is hidden. Documentation updated.
- 18:13:11Z CollisionSystem, ParticleManager and ProjectileManager no longer draw primitives directly.

- 20:53:09Z EnemyManager now registers sprites from `createBaseEnemyVisual()` for each
  enemy type. Spawned enemies animate automatically and docs updated.

- 21:04:58Z Removed example terrain asset and cleaned documentation references.

- 21:32:55Z Overlay and enemy visual upgrades integrated. `PlayerStatusOverlay` now animates via `ProceduralUISprite` but other HUD elements still use ProceduralSprite. Full migration is underway.
- -- EnemyManager now applies sprite-based animations across the roster.
## 2025-06-27
- 05:29:33Z Autotest mode moves the player randomly for unattended testing.

- 06:22:01Z Main menu adds a `Quit` option and highlights the selected entry with a
  tinted rectangle for improved visibility.
- -- Mouse wheel scrolling now zooms the camera toward the player.
- 07:00:05Z MainMenuScene binds the default UI state before drawing menu options to prevent OpenGL warnings.

- 07:06:51Z Player sprite now scales to 4x and the camera zooms accordingly at game start.


- 10:11:31Z Corrected vertical movement mapping in PlayerController.
- -- Added early return in MainMenuScene when clicking Start to prevent a crash.
- -- Restored default UI overlays during StartGame.

- 11:12:54Z Camera follow moved to end of Game::Update for smoother tracking.

- 17:36:53Z Offscreen enemies, powerups, projectiles and particles are now culled using
  RenderSystem::isWorldVisible to reduce overdraw.
- 18:19:15Z Overlay draws call `bindDefaultUiState()` to restore GL state after custom passes.
- -- GL warning messages are throttled so the log reports each invalid state once per second.
- 19:01:24Z Managers now fetch sprites from `ProceduralSpriteRegistry` instead of static instances.
- 19:48:49Z Overlay rendering state handled entirely by RenderSystem.endFrame.
- -- Multi-window stats overlay preserves and restores previous GL bindings.
- -- Sprite invalid state warnings now throttle once every 60 frames.

## 2025-06-28
- 05:51:30Z Removed unused `m_CurrentAnimation` from `PlayerManager`.
- 06:12:39Z Overlays render using a fixed projection and remain constant when zooming the camera.

- 16:56:24Z Removed Alignment, Reputation, Achievements and StageDetail overlays from the default game flow.

- 17:16:12Z Disabled StageProgress and PlayerStatus overlays to isolate performance issues.
- -- Default UI layout now only spawns the Score overlay.

- 17:25:01Z Removed all remaining HUD overlays. Only the main menu text remains.
- -- Quit option and tinted selection rectangle cut from MainMenuScene.

- 18:15:12Z Fixed unused variable warning in MainMenuScene rendering.

- 19:40:01Z EnemyManager cleans up offscreen and expired enemies each frame.

- 19:52:32Z Newly spawned enemies, powerups, projectiles and particles record their
  creation frame to avoid premature "not rendered" warnings when offscreen.

- 20:03:34Z Offscreen enemies are culled after 60 frames without visibility or when leaving the stage boundaries.

- 20:21:46Z DebugController adds an **I** hotkey that logs sprite counts each second when
  verbose logging is enabled.

- 21:17:36Z Gameplay and UI systems reset to minimal versions. All previous scenes and overlays archived under legacy/.
- 23:27:09Z PlayState_Minimal now tracks position via `posX/posY` members and moves using `IsKeyHeld` checks.
- 23:52:55Z Removed remaining `GameStateManager` references from active code. `GameManager` save/load functions are stubbed and collision logic no longer modifies score or lives.

## 2025-06-29
- 17:36:13Z `PlayState_Minimal` now sets a starting position and scales the player sprite for quick testing.

- 18:02:25Z Added accessible minimal main menu with Start, Continue and Exit options.
- -- Menu supports keyboard, gamepad and mouse input with a yellow highlight.


- 18:41:51Z Main menu layout uses descending positions so navigation arrows align with the on-screen order.

- 19:37:23Z Corrected VectorFont row orientation so menu text appears upright.

- 19:54:09Z Menu navigation restored so pressing Down selects the option below and Up selects the option above.

## 2025-06-30
- 00:39:48Z Fixed VectorFont orientation bug in debug overlay. Letters and numbers now render correctly.
- 01:28:43Z Documented complete game system tree for upcoming modular refactor.
- -- Added `docs/modular/` folder for new architecture notes.

- 05:36:33Z Refactored GameManager into a facade over new modules:
  - SceneCoordinator handles scene transitions.
  - PhaseController wraps GamePhaseManager.
  - SaveLoadCoordinator manages save/load state.
- -- Updated documentation to describe the new flow managers.
- 05:58:27Z Split StageManager into helper classes for modular control:
  - StageProgression tracks timers and checkpoints.
  - SpawnController manages enemy and powerup spawn intervals.
  - StageEventDispatcher dispatches boss, altar and shop events.
- -- Updated gameplay_systems.md and modular tree accordingly.

- 15:23:30Z Implemented `GameHUD` which uses the legacy `GameUIManager` internally.
- -- UI code now routes overlay and input handling through new engine layers.
- -- Documented the transition in ui_core.md and marked systems as In-Progress.

- 17:29:37Z Introduced BehaviorRouter and IEnemyBehavior abstraction.
- -- EnemyAIController now routes state decisions through behaviors.
- -- EnemyManager builds router with default and scripted behaviors.

- 17:51:12Z Started isolating EnemyAIController into its own module for future scripting improvements.
- -- Updated docs and system tree to reflect the new manager status.

- 18:13:31Z Added unit test for `EnemyAIController` using mock scripting and event systems.
- -- Documentation now explains enabling `BUILD_TESTING` for automated test builds.
- 19:19:22Z Modularized StageProgression into its own `game/modules/stage` module.
- -- Added unit test and documentation for the system.
- -- Updated modular tree to mark StageProgression as Completed.
- 19:28:30Z Modularized SpawnController into `game/modules/stage` directory.
- -- Added simple unit test and created documentation page.
- -- Updated modular tree to mark SpawnController as Completed.
- 20:05:22Z Moved `StageManager` and `StageEventDispatcher` headers into `game/modules/stage`.
- -- Updated includes, CMake entries and documentation paths.
- -- Modular tree now references `stage/StageManager.*` and `stage/StageEventDispatcher.h`.

- 20:28:53Z Moved `EnemySpawner` source files into `game/modules/enemy/spawner/`.
- -- Updated includes, CMake references and documentation paths.

- 20:37:28Z Moved `CollisionSystem` into new `game/collision` module.
- -- Updated include paths, CMake references and documentation.
- 20:51:24Z Finalized EnemySpawner as a standalone module.
- -- Created documentation page and marked system as Completed in the modular tree.
- -- Verified build after include updates.
- 21:01:18Z Completed documentation for `CollisionSystem`.
- -- Updated modular tree to mark the system as Completed.

- 21:09:26Z Modularized PlayerManager, ProjectileManager and PowerupManager into their own `game` subdirectories.
- -- Updated include paths across the engine and tests.
- -- Marked all three managers as Completed in the modular tree.
- 21:28:05Z PlayerController modularized with documentation and a unit test for basic movement and stamina.
- -- Marked the system as Completed in the modular tree.
- 21:44:45Z Documented ParticleManager system and added unit tests.
- -- Registered the test target in CMake and marked the manager as Completed.
- 21:52:33Z Documented BossManager system and added unit test for boss removal.
- -- Registered the test with CMake and marked the system as Completed.
- 22:01:55Z Added NarrativeEventSystem documentation covering questline, betrayal and faith triggers.
- -- Implemented unit tests for all trigger types and hooked them into CMake.
- -- Marked NarrativeEventSystem as Completed in the modular game tree.
- 22:13:10Z VendorInventory modularized with alignment-weighted selection test.

- 22:39:28Z Documented PassiveTree nodes and unlock rules.
- -- Added unit test verifying node addition and unlock behavior.
- -- Marked PassiveTree as Completed in the modular system tree.
- 22:45:56Z Documented PassivesSystem JSON loading and damage multiplier logic.
- -- Added unit tests for PassivesSystem covering definition parsing and CalculateDamageMultiplier.
- 23:02:37Z Documented EnemyStateMachine usage and added unit tests.
- 23:20:12Z Documented GameUIManager layout loading and render flow.
- -- Linked the doc from ui_core and marked GameUIManager as Completed.
- 23:35:48Z Documented FXHelpers usage and marked the system Completed.
- 23:54:34Z Expanded procedural sprite system docs with sections for ProceduralSprites.h and EffectSprites.h.
- -- Standardized include paths for these headers across managers.
- -- Marked both helper modules as Completed in the game system tree.
### 2025-07
## 2025-07-01
- 00:16:21Z Created AlignmentManager design summary and unit test.
- -- Marked AlignmentManager as Completed in the modular system tree.
- 01:42:23Z Verified AchievementManager resides under `game/modules/system/achievement/`.
- -- Added unit tests for unlocking logic and registered a new test target.
- -- Documented the manager in `achievement_system.md` and marked the system Completed in the modular tree.
- 01:53:40Z Confirmed ChapterManager files are under `game/chapter/` and documented responsibilities.
- -- Added ChapterManagerTests for quest progression and passive tree usage.
- -- Marked ChapterManager as Completed in the modular system tree.
- 02:12:50Z Documented FactionReputation usage and added unit tests. Marked the system Completed in the modular tree.

- 02:24:51Z Audited EnemyManager modules and finalized modular layout. Added spawn/despawn tests and updated documentation.
- 03:00:18Z Moved `GameStateManager` into `game/state/` and updated all includes.
- -- Added unit tests for score and life transitions.
- -- Documented the manager and marked it Completed in the modular tree.
- 03:23:57Z Migrated MainMenuScene and HubMenuOverlay into `game/modules/ui/menu/`.
- -- Documented the new Game Menu system and added a simple scene load test.
- -- Marked the system Completed in the modular tree.
- -- Wrapped SpaceManager and StarMap into a self-contained module under `game/modules/system/space/`.
- -- Added unit tests covering basic map navigation and fleet cleanup.
- -- Documented SpaceManager responsibilities in `space_combat.md` and marked the system Completed.
- 03:57:30Z Modularized satellite telemetry and training systems into dedicated folders.
- -- Added SatelliteTelemetryTests and TrainerTests.
- -- Updated documentation and marked both systems Completed in the modular tree.
- 04:10:20Z Modularized QuantumSimulator and CombatSimulator into dedicated folders.
- -- Added unit tests for both systems.
- -- Updated documentation and marked systems Completed.
- 04:34:47Z Moved DebugController and Game into module subdirectories, removing the legacy testing stub.
- -- Added DebugController unit tests and documentation.
- -- Updated modular tree and marked systems Completed.
- 04:49:29Z Added DialogueTree and boss phase tests.
- -- Documented modules and marked them Completed.
- 05:21:01Z Reviewed sprite visual headers for modular consistency.
- -- Added SpriteRegistryTests verifying registration functions populate the registry.
- -- Documented SpriteRegistrations and marked the system Completed in the modular tree.
- 05:31:52Z Audited PassivesSystem and CombatScenario for modular placement.
- -- Confirmed PassivesSystemTests exist and build.
- -- Marked both systems Completed in the modular tree and updated documentation.

- 07:39:55Z Added unit tests for NetworkSimulationManager and expanded TelemetryManager
  coverage.
- -- Updated documentation for both systems and synchronized the modular tree.

- 15:18:25Z Finalized UIManager and UISystem modularization.
- -- Documented overlay modules and added regression tests.
- 15:43:00Z Integrated engine post-processing and physics module relocations.
- -- Added tests for invert/grayscale passes and physics stepping.
- -- Marked both systems Completed in the modular tree.
- 16:17:47Z Documented `EnemyManager` behavior and added missing broker docs.
- -- All systems now have matching entries under `docs/systems/`.
- -- Test build failed due to unresolved MockEnemyManager constructor.

- 18:25:16Z Restructured enemy AI sources under `game/modules/enemy/behaviors` and updated build
  files.
- -- Documented new behavior modules in the modular system tree.
- 23:59:36Z Implemented `PlayState_Game` and integrated MainMenuScene for default runtime.
- -- Added minimal mode toggle to GameManager and build files.
## 2025-07-02
- 00:51:06Z Duplicated sprite and position handling from PlayState_Minimal into PlayState_Game.
- -- Main menu "Start" now loads the new state when minimal mode is off.

- 01:45:05Z MainMenuScene adds an Exit option with GLFW quit handling and now highlights the selected entry. Mouse clicks select options like in MinimalMainMenuScene.

- 03:01:25Z Documented that MainMenuScene and PlayState_Game mirror the minimal scene logic.
- -- Verified build `build_2025-07-02T03-01-22Z.log` after updating docs.

- 09:28:32Z Implemented `BackendValidationScene` mirroring `PlayState_Minimal` and drawing a rotating line.

- 16:18:46Z Ran `BackendValidationScene` with the new display configuration.
- -- Every backend window displayed the test line correctly.
- 19:56:40Z Added QuantumStateVectorSimulator with optional cuQuantum acceleration.

- 20:21:53Z Refactored QuantumSimulator to allow runtime qubit counts and updated CPU
  collapse logic.
- 20:40:59Z Added cuQuantumCollapseSim allowing variable register sizes with GPU or CPU
  fallback.
- 21:03:01Z Systems now request quantum simulators via QuantumManager.
- 21:12:40Z Expanded quantum system docs with adjustable qubits and mixed collapse notes.

- 21:23:09Z Documented multi-GPU support and new `CV_CUDA_DEVICE_ID` build option.
- 21:34:37Z Introduced QuantumStateVectorManager for centralized collapse triggers.

- 21:47:18Z QuantumStateVectorManager now logs entropy spread and collapse seeds after each trigger.

- 22:08:38Z Documented test flow and CPU fallback flag for cuQuantum.
- 22:20:26Z Player sprite now mutates on movement input using QuantumStateVectorManager.

- 22:33:25Z PlayState_Game now generates the player sprite using QuantumStateVectorManager
  on scene entry. A warning is logged if collapse fails and the default sprite is
  used.

- 22:40:48Z PlayerController triggers a new quantum collapse every frame while input is
  active, continuously regenerating the procedural player sprite.

- 23:32:11Z createEntropyPlayerSprite now derives color, flip state and shape directly
  from the seed bits. Added diamond and cross variants using RenderSystem
  primitives.
- 23:52:36Z Quantum collapse functions now log seed and failure info. PlayerController and PlayState_Game propagate these logs.

## 2025-07-03
- 00:01:07Z Player and scene creation now log sprite color, shape and flip flags.

- 00:04:24Z PlayState_Game receives the QuantumStateVectorManager through its constructor.
  Entropy collapse only occurs when the manager is valid, logging the collapse
  seed or a warning if unavailable.
- 00:09:27Z Player sprites visibly mutate in shape and color each time a quantum collapse occurs.

- 00:42:12Z PlayerController now accepts arrow keys in addition to WASD.
- -- Arrow key presses log brief input activity messages to runtime.log.


- 01:23:16Z PlayState_Game now forwards Update and Render calls to the IGame instance when available.
- 02:38:34Z QuantumStateVectorSimulator collapse now logs debug details for each step when `CV_ENABLE_DEBUG_LOGS` is on.
- 05:43:05Z Game HUD no longer depends on the removed GameUIManager.
- -- Player and scene generation now use entropy armor sprites derived from quantum collapse.
- 06:07:18Z QuantumSimulator exposes new themed gates used by QuantumStateVectorSimulator.

- 06:33:35Z Added SeedBucket for grouping collapse seeds by category.
- -- QuantumStateVectorManager now records seeds into named buckets when triggers specify one.

- 18:25:37Z QuantumSimulator now contains additional themed gate functions but integration is ongoing.
- -- SeedBucket buckets collapse seeds by name; QuantumStateVectorManager records them during gates.
## 2025-07-04
- 00:02:02Z Introduced `CudaStateVectorSimulator` under `engine/modules/quantum/cuda`.
- -- Windows setup enables `CV_ENABLE_CUDA_SIM` when CUDA 12 is detected.
- 01:16:46Z Gameplay systems now fetch randomness from EntropyManager.

- 01:32:28Z Gameplay documentation links to the new entropy_system details.
- 02:34:02Z Implemented HybridGatedCollapseSimulator and ChaoticCollapseOracle.
- -- Updated modular game tree with new quantum collapse systems.
- 03:16:38Z Observer mode for ChaoticCollapseOracle aids debugging of invalid seeds.
- 03:41:14Z Added optional CollapseLineageLogger behind `CV_ENABLE_COLLAPSE_LINEAGE`.
- -- Logger captures entropy hash, timestamp and qubit states on each collapse.
- 03:52:05Z Added ChaoticSeedPromoter with configurable replacement chance for gated collapses.
- 04:11:29Z Engine entropy sources are now scheduled with weighted round robin.

- 05:07:01Z DebugController toggles quantum simulators and manual chaotic seed promotion.
- -- System info overlay shows Chaotic Collapse Pool size and entropy drain rate.

- 15:24:26Z QPTL allows AI scripts to request collapse seeds without managing qubits.

- 15:31:29Z CollapseStateMapper suggests seed reuse across similar entropy.
- 16:03:41Z QuantumPatternTranslationLayer and CollapseStateMapper listed in system tree docs.

- 16:12:04Z Added Collapse Shape Viewer tool under `tools/`.
- -- QPTL exposes basic entropy hint support.

- 16:25:08Z Vendor inventory and SynthEngine now seed their PRNGs from
  `EntropyManager::requestBits`. RandomUtils module removed.

- 19:22:57Z Game now pulls available quantum gates from Engine's GateRegistry.
- -- QuantumSimulator uses registered gates for combat event rolls.

- 20:17:40Z SaveLoadCoordinator now serializes runtime data from managers before calling SaveSystem.
- 21:11:26Z QuantumPatternTranslationLayer integrated with gameplay. PlayerController, StageManager and CombatSimulator request seeds via `requestCollapse`.
- -- CollapseStateMapper logs all seeds and ChaoticSeedPromoter may override gated collapses.
- -- Updated system tree statuses for QPTL, CollapseStateMapper and ChaoticSeedPromoter.
- 21:55:07Z DualLayerQuantumManager introduced for combined hybrid/oracle collapses with fallback logic.
- -- Game now creates the manager during StartGame and passes it to QuantumPatternTranslationLayer.

- 23:39:47Z Quantum systems now automatically distribute work across GPUs when available.
- -- `CV_GPU_DEVICE_INDEX` can force a specific device.
- -- Fallback to CPU occurs when memory limits prevent GPU allocation.
- -- Gameplay logs record the selected device and any fallback.

## 2025-07-05
- 04:38:28Z Archived the old GameUIManager overlays. HUD rendering now relies solely on the modular UI system.

- 20:26:59Z Gameplay managers updated to use PhysicsCore.
- 22:03:14Z ReactionPatternResolver integrated with Game and CollisionSystem. Reactions log on enemy death and projectile impacts.

## 2025-07-06
- 03:45:18Z Game updated to include BiologyCore headers after module split.

- 06:45:31Z Stencil descriptors now generated for UI elements and reactions.
- 07:42:59Z New VisualTestScene demonstrates theme-aware stencil UI and reaction events.

- 17:26:36Z Removed the obsolete UISystem parameter from the game initialization routine to match the IGame signature.
- -- Verified project builds after HUD cleanup.

- 18:24:46Z Main menu scenes now request `UI_Button` stencils and render via ProceduralUISprite instances.
- -- Direct drawRectScreen calls removed.

- 18:41:17Z HubMenuOverlay now initializes `StencilGuideSystem` and `ProceduralUIGenerator`.
- -- Overlay text is rendered via procedural sprites and framed using a generated `UI_Frame` stencil.

- 22:59:01Z Removed obsolete *\_moved placeholder directories.

## 2025-07-07
- 00:43:11Z Updated paths to reference `game/assets/` throughout docs.
- -- Verified build after asset directory move.

- 02:16:06Z Moved SaveSystem to game/modules/system/save and updated references.

- 04:30:57Z Moved ScriptingSystem to game/modules/system/scripting and updated all references.

- 06:40:43Z Moved `BackendValidationScene` from `game/backend_validation` to `game/scene`.
- -- Updated build scripts and documentation to reflect the new scene path.

- 17:09:43Z Updated enemy modules to reference new EventSystem path.

- 20:47:00Z Engine overlays removed; HUD now initializes without them.

### 2025-08
## 2025-08-02
- 20:09:23Z GameManager now skips scene transitions when the RenderSystem is missing.
- 20:53:29Z Placeholder scenes now invoke `RenderSystem::renderImGui` to show the
  window index and scene name overlay.
## 2025-08-03
- 21:11:24Z Scene0 logs framebuffer binding and viewport before and after drawing the diagonal gradient for diagnostics.
## 2025-08-07
- 01:08:01Z Reorganized folders and files for improved flow; further systems require adjustments.
## 2025-07-08
- 01:41:15Z Procedural UI sprites now honor descriptor width/height and callbacks.
- -- VisualTestScene demonstrates clickable buttons registered with the input system.

- 02:56:38Z VisualTestScene now registers sprites through the generator callback.
- -- Hover and click callbacks log to the console for easy testing.

- 03:03:14Z Interactive procedural sprites now handle mouse events through ProceduralUIInputSystem.

- 07:25:13Z Added neon_industrial.json and bone_metal.json theme files.
- -- ThemeMaterialResolver now supports NeonTube and BoneSpiked frame styles.
- 08:22:51Z Themes can now be switched at runtime with the **M** key via DebugController.
- -- Startup scenes respect `--theme` or `CV_THEME` when configuring visuals.

- 16:25:38Z Fixed crash when switching from the main menu by reserving button vector capacity to keep sprite pointers valid.

- 18:35:12Z Archived obsolete DebugController and UI overlay render tests.
- -- Moved deprecated test UI layout to ui_legacy.
- 18:59:42Z Removed outdated F11/F12 overlay references from DebugController::PrintControls.


## 2025-07-16
- 05:26:32Z Added visual debug letters to all active scenes and the HubMenu overlay.
- -- MultiDisplayManager appends window index numbers to titles on creation.

- 07:27:06Z Removed StartupScene and the disclaimer screen. Game launches straight into
  the main menu.

- 08:26:38Z Deleted MainMenuScene, HubMenuOverlay and all related menus.
- -- Scenes have been replaced by simple Scene0/1/2 placeholders.

- 15:38:19Z Startup now pushes Scene0 and shows DebugWindow0 on the secondary monitor.
- -- Enter from Scene2 advances to Playing state.

- 16:13:42Z Removed leftover MainMenu logic. Engine pushes `Scene0` immediately and
  DebugWindow0 is displayed on window index 1.
- 18:50:34Z Scene transitions now replace the active scene instead of stacking.
- -- Scene0 shows for 3 seconds; Scene1 for 2 before Scene2.
- -- DebugWindow0 renders a 'D' on window 1.

- 19:16:44Z Scenes now set bright clear colors for visual debugging.
- -- DebugWindow0 logs initialization and rendering each frame.

- 20:08:38Z Scene0, Scene1 and Scene2 now pass unique ABGR color constants to `drawTextScreen`.
- -- Scene0 uses `0xff0000ff` (red), Scene1 uses `0xff00ff00` (green) and Scene2 uses `0xffff0000` (blue). DebugWindow0 remains `0xff00ffff` (yellow).

- 20:52:09Z SceneManager now logs which scenes are replaced and activated during transitions.

- 21:24:58Z DebugWindow0 now logs which window index it attaches to on activation.
## 2025-07-17
- 01:36:38Z DebugWindow0 now stores its window index and logs it during OnEnter, Render and OnExit. Font renderer shuts down on exit.
- 02:52:25Z DebugWindow0's fallback marker now displays `DEBUG` in magenta using `drawTextScreen` and logs its centered coordinates.

- 15:26:36Z DebugWindow0 renders a centered 10x10 ASCII diagnostics grid with VectorFont and logs the position and bounds of each glyph.
- 21:12:20Z Rendering moved through ProceduralSpriteManager with scenes calling drawAll.
- 21:32:35Z Scene0 spawns a ProceduralSprite rectangle frame below the VectorFont text and registers it with the manager.
- -- drawAll now occurs after text rendering so UI sprites overlay correctly.
- 21:44:23Z Added docs for ProceduralSpriteManager and registered rectangle test sprite.

## 2025-07-18
- 14:51:38Z Entering `Playing` from `Scene2` no longer reloads `Scene1` when minimal mode is enabled.

- 15:37:53Z Scene0 and Scene1 now wait for the Enter key before moving to the next scene.

- 16:18:02Z Implemented a placeholder `Scene3` that loads after `Scene2` when the game
  enters the `Playing` state.
- -- Scene transitions are now driven by the Enter key: pressing Enter in `Scene0`
  pushes `Scene1`, pressing it again in `Scene1` pushes `Scene2`, and the third
  press from `Scene2` switches the `GameManager` to the `Playing` state.
- 17:26:09Z Game now logs descriptor types at start via StencilGuideSystem and unregisters the callback on shutdown.
- 17:52:32Z Fixed startup crash by guarding `ProceduralSpriteManager` against recursive `drawAll` calls.

- 20:51:24Z Scene0 now renders a grid of procedural vector shapes using `ProceduralSpriteManager`.
- -- Shapes include circle, ellipse, square, rectangle, two triangles, lines, a plus sign,
  hollow ring, arrow and a composite example. All use solid black color.

- 21:14:15Z Scene0 now derives a 'unit' from VectorFont dimensions and scales all procedural shapes using this grid.
- 21:22:19Z DebugWindow0 now clamps its ASCII grid within the viewport and logs a warning when the grid cannot fit at the current spacing.
- 22:52:50Z Scene0 enables draw logging for all procedural sprite instances for debugging.
## 2025-07-19
- 00:32:36Z Assert InputManager presence in StartGame to prevent null pointer startup.

- 00:42:39Z Removed SpriteManager null checks in Game and added assertion for its existence.

- 01:08:03Z Scene0 and Scene1 now use Virtual Grid Units for all layout logic.
- 04:39:16Z Updated scenes to query view size in VGU and distribute the shape grid across the 1000×1000 virtual space.
- 21:20:13Z Scene0 demonstrates the new 5×7 VectorFont rendering for clearer text.
- 00:12:25Z Fixed UTF-8 multiplication symbol string and namespace closure in DebugWindow0.
- 00:58:17Z Updated default display configuration to 1920x1080.

## 2025-07-20
- 11:42:46Z Replaced manual grid offsets with AlignmentHelpers so Scene0 and
  DebugWindow0 stay within the 1000×1000 VGU bounds.
- 2025-07-20T17:31:07+00:00Z Scenes 1-3 anchor letters to corners using AlignmentHelpers
- 2025-07-20T17:49:32+00:00Z Marked Scenes 1-3 and DebugWindow0 as Completed in the modular tree with VGU-based layout descriptions.
- 2025-07-20T21:23:38+00:00 Updated font docs to describe stroke glyphs and new fidelity setting.
- 2025-07-20T22:14:58+00:00 Scene0 and effect sprites now honor sprite frame fidelity for smoother circles.
- 2025-07-20T22:27:28+00:00 Scene0 and DebugWindow0 render the complete VectorFont grid with bounding boxes and showcase high-resolution shape samples.
- 2025-07-21T01:11:14Z Replaced vector glyph rendering with SDF sprites and centered scenes around letters A–D. Debug window trimmed to the font grid only.
- 2025-07-21T05:10:58+00:00 Updated validation scenes to showcase unique gradient colors. Scene0 now blue, Scene1 remains green, Scene2 yellow, Scene3 red, DebugWindow0 purple.
- 2025-07-21T05:54:54Z Scene0 shapes colored individually for better visibility.
- 2025-07-21T08:35:32Z Added explicit stroke, fill and AA params to procedural and effect sprites.
- 2025-07-21T09:16:37Z Scenes use unscaled glyph textures and AA radius; RenderSystem manages fidelity.
- 2025-07-21T17:22:06+00:00 Scene0 trimmed to blue gradient background only. Removed demo glyph and shape instances.
- 2025-07-21T17:44:29Z Scenes adjust layout in OnResize without recreating textures.

## 2025-07-22
- 02:20:12Z Scene0 background now drawn with `drawSprite` to cover the full viewport.
- 2025-07-22T02:45:10Z Glyph textures now use size 64 for clearer debug font.
- 2025-07-22T03:04:24Z VGU grid enabled by default in all scenes; DebugWindow0 uses 128px glyph textures and purple gradient background.
- 2025-07-22T06:17:25Z Scene0 now logs gradient texture creation and usage for
  overflow debugging.

- 2025-07-22T17:30:41Z Scenes query view size on enter and recreate their gradient backgrounds on resize.
- 2025-07-22T20:05:46Z Scenes compute SDF AA radius using RenderSystem fidelity and auto-scale the ASCII grid.
- 2025-07-22T22:33:47Z Simplified placeholder scenes. Each sets a solid clear color:
  Scene0 red, Scene1 blue, Scene2 green, Scene3 purple. DebugWindow0 now uses
  orange.
- 2025-07-22T22:50:59Z Scene0 now renders a blue gradient background using
  createAlphaGradientTexture and drawSpriteSDF.
- 2025-07-22T23:27:28Z Scene0 uses createDiagonalGradientTexture for a dark-to-light diagonal gradient.
- 2025-07-23T00:08:50Z Scene0 now shows a red to blue diagonal gradient and RenderSystem exposes readTexturePixels for tests.
- 2025-07-23T00:33:21Z Scene0 uses drawSprite to display the gradient without SDF masking.
- 2025-07-23T00:50:05Z Scene0::Render logs background texture handle and draw parameters when info logs are enabled.
- 2025-07-23T01:01:17Z Scene0 gradient colors defined as constants for easier tweaks.
- 2025-07-23T01:08:48Z Scene0 now draws a procedural vertical gradient via RenderSystem::drawVerticalGradientRect.
- 2025-07-23T01:37:16Z Scene0 background switched to drawDiagonalGradientRect for
  a top-left to bottom-right color ramp.
- 2025-07-23T01:54:19Z Updated Scene0 gradient constants to red and blue in ABGR.

- 2025-07-23T02:30:53Z Scenes1-3 and DebugWindow0 now draw diagonal gradient backgrounds using their base colors with contrasting ramps.
## 2025-07-30
- 22:04:54Z Refactored save slot path handling to use PathUtils joins and filesystem paths for cloud sync.
- 22:50:00Z Stage and quest definition loading switched to std::filesystem::path with PathUtils joins.
## 2025-07-31
- 00:15:12Z Game::Render now calls managers directly and skips scene rendering.
- 00:24:16Z StageManager::Render binds the default 2D state before drawing
  parallax layers and decorations.
- 02:53:47Z Documented that StageManager::Render must be called before entity
  rendering and noted Game::Render enforces the order.
- 2025-07-31T03:12:30Z Scene3 now forwards rendering to GameManager's Game instance.
- 12:47:21Z Updated README; all file paths normalized using std::filesystem::path.

## 2025-08-03
- 21:22:12Z Scene0 now displays "Window0: Scene0 Rendering OK" via ImGui on the primary window.
- 21:47:47Z Scene0::Render now warns and skips rendering if invoked on a non-primary window to prevent cross-window contamination.

## 2025-10-22
- 2025-10-22T13:05:44Z Documented how the new InputRouter stub will hand controller events to GameManager once gameplay scenes wire in, keeping the runtime merge plan aligned with Phase 4 notes.
- 2025-10-22T18:20:09Z Verified the stubbed scene handshake still boots through EngineController and logged future hooks so Day 5’s rendering work can attach without rewriting game state transitions.
