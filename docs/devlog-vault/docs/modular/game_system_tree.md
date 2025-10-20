# Game System Tree

This document lists all current classes, systems and runtime components under the `game/` directory. It serves as the baseline reference before migrating to a fully modular architecture. As systems are modularized, update the status markers below.

Every modular system must live in its own folder. For instance `game/modules/stage/StageManager.*` is kept under `game/modules/stage/`.

This tree is the authoritative reference for which systems have been modularized or remain pending.

**Important:** A system must remain **In-Progress** in this tree until all modularization tasks—documentation, cleanup, and tests—are merged and verified. Only then may it be marked **Completed**.

## Modularization Status Legend

- ✅ Completed
- 🟡 In&nbsp;Progress
- ❌ Not&nbsp;Started

## Managers and Systems
 - ✅ **AlignmentManager** (`modules/system/alignment/AlignmentManager.*`) – Completed
 - ✅ **AchievementManager** (`modules/system/achievement/AchievementManager.*`) – Completed
 - ✅ **ChapterManager** (`modules/system/chapter/ChapterManager.*`) – Completed
   - uses `PassiveTree` and `PassivesSystem`
 - ✅ **FactionReputation** (`modules/system/faction/FactionReputation.*`) – Completed
 - ✅ **StageManager** (`modules/stage/StageManager.*`) – Completed
   - ✅ **StageProgression** (`modules/stage/StageProgression.*`) – Completed
  - ✅ **SpawnController** (`modules/stage/SpawnController.*`) – Completed
   - ✅ **StageEventDispatcher** (`modules/stage/StageEventDispatcher.h`) – Completed
  - ✅ **EnemyManager** (`modules/enemy/EnemyManager.*`) – Completed
    - uses `EnemyAIController`, `BehaviorRouter`, `EnemySpawnHandler` and `EnemyCollisionRegistrar`
    - **DefaultEnemyBehavior** (`modules/enemy/behaviors/DefaultEnemyBehavior.*`)
    - **ScriptedEnemyBehavior** (`modules/enemy/behaviors/ScriptedEnemyBehavior.*`)
    - **BehaviorRouter** (`modules/enemy/behaviors/BehaviorRouter.h`)
    - **EnemyAIEvents** (`modules/enemy/behaviors/EnemyAIEvents.h`)
    - **IEnemyBehavior** (`modules/enemy/behaviors/IEnemyBehavior.h`)
 - ✅ **EnemyAIController** (`modules/enemy/EnemyAIController.*`) – Completed
 - ✅ **EnemySpawner** (`modules/enemy/spawner/EnemySpawner.*`) – Completed
 - ✅ **CollisionSystem** (`modules/collision/CollisionSystem.*`) – Completed
- ✅ **PlayerManager** (`modules/player/PlayerManager.*`) – Completed
- ✅ **PlayerController** (`modules/player/PlayerController.*`) – Completed
 - ✅ **ProjectileManager** (`modules/system/projectile/ProjectileManager.*`) – Completed
 - ✅ **PowerupManager** (`modules/system/powerup/PowerupManager.*`) – Completed
 - ✅ **ParticleManager** (`modules/system/particle/ParticleManager.*`) – Completed
 - ✅ **GameStateManager** (`modules/system/state/GameStateManager.*`) – Completed
 - ✅ **Game Menu system** (`modules/ui/menu/MainMenuScene.*`, `modules/ui/menu/*MenuOverlay.*`)
 - ✅ **BossManager** (`modules/enemy/types/boss/BossManager.*`) – Completed
- ✅ **SpaceManager** (`modules/system/space/SpaceManager.*` with `StarMap`) – Completed
- ✅ **NarrativeEventSystem** (`modules/system/narrative/NarrativeEventSystem.*`) – Completed
 - ✅ **HubUpgradeManager** (`modules/system/hub/HubUpgradeManager.*`) – Completed
 - ✅ **VendorInventory** (`modules/system/hub/VendorInventory.*`) – Completed
- ✅ **Tracking systems** (`modules/tracking/satellite/SatelliteTelemetry*.*`) – Completed
- ✅ **Training systems** (`modules/training/adaptive/AdaptiveTrainer.*`, `modules/training/opfor/OpposedForceTrainer.*`) – Completed
  - ✅ **QuantumSimulator** (`engine/modules/quantum/simulator/QuantumSimulator.*`) – Completed
- ✅ **QuantumManager** (`engine/modules/quantum/QuantumManager.*`) – Completed
  - adjustable qubit interface via `getSimulator(qubits)`
- ✅ **QuantumStateVectorManager** (`engine/modules/quantum/QuantumStateVectorManager.*`) – Completed
  - owns `QuantumStateVectorSimulator` and handles collapse triggers
  - see `docs/systems/quantum_statevector_system.md`
  - collapse debugging logs gate sequence when `CV_ENABLE_DEBUG_LOGS` is enabled
  - ✅ **SeedBucket** (`engine/modules/quantum/SeedBucket.*`) – Completed
  - groups collapse seeds by named bucket
- ✅ **QuantumStateVectorSimulator** (`engine/modules/quantum/statevector/QuantumStateVectorSimulator.*`) – Completed
  - supports `CollapseMode` including Mixed
  - randomizes gate operations per qubit on every collapse
- ✅ **CollapseLineageLogger** (`engine/modules/quantum/logging/CollapseLineageLogger.*`) – Completed
  - records entropy hash and qubit states on collapse
- ✅ **cuQuantumCollapseSim** (`engine/modules/quantum/statevector/cuQuantumCollapseSim.*`) – Completed
  - records probability cache statistics (see `../systems/quantum_statevector_system.md#probability-cache-usage`)
- 🟡 **CudaStateVectorSimulator** (`engine/modules/quantum/cuda/CudaStateVectorSimulator.*`) – In-Progress
  - offers raw CUDA acceleration when enabled
- 🟡 **HybridGatedCollapseSimulator** (`engine/modules/quantum/collapse/HybridGatedCollapseSimulator.*`) – In-Progress
  - gate-controlled collapses with EntropyManager seeds
  - watchdog resets require `requestWatchdogReset()`
- ✅ **ChaoticCollapseOracle** (`engine/modules/quantum/collapse/ChaoticCollapseOracle.*`) – Completed
  - asynchronous entropy collapse pool
  - seed validation and observer logging
  - chaos-aligned retrieval interface via `ChaoticCollapsePool`
- 🟡 **DualLayerQuantumManager** (`engine/modules/quantum/DualLayerQuantumManager.*`) – In-Progress
  - ✅ **ChaoticSeedPromoter** (`engine/modules/quantum/collapse/ChaoticSeedPromoter.*`) – Completed
  - probability-based replacement of gated collapse seeds
 - ✅ **CollapseStateMapper** (`engine/modules/quantum/qptl/CollapseStateMapper.*`) – Completed
  - validates and promotes seeds per `IntentRequest`
 - ✅ **QuantumPatternTranslationLayer** (`engine/modules/quantum/qptl/QuantumPatternTranslationLayer.*`) – Completed
- ✅ **GateRegistry** (`engine/modules/quantum/gates/GateRegistry.*`) – Completed
- 🟡 **CollapseWatchdog** (`engine/modules/quantum/CollapseWatchdog.*`) – In-Progress
- ✅ **CombatSimulator** (`modules/combat/simulator/CombatSimulator.*`) – Completed
  - uses `CombatScenario`
- ✅ **DebugController** (`modules/debug/DebugController.*`) – Completed
- ✅ **Game** (`core/Game.*`) – Completed
- ✅ **DialogueTree** (`modules/system/narrative/DialogueTree.*`) – Completed
 - ✅ **Boss classes** (`modules/enemy/types/boss/Boss.*`, `modules/enemy/types/boss/SampleBoss.*`) – Completed
- ✅ **EnemyStateMachine** (`modules/enemy/EnemyStateMachine.h`) – Completed
- ✅ **ProceduralSprite registry** (`modules/graphics/SpriteRegistrations.*` and `modules/graphics/*Visuals.h`)

## Runtime Scenes
- ✅ **Scene0** (`scene/Scene0.*`) – Completed
- ✅ **Scene1** (`scene/Scene1.*`) – Completed – VGU-based layout
- ✅ **Scene2** (`scene/Scene2.*`) – Completed – VGU-based layout
- ✅ **Scene3** (`scene/Scene3.*`) – Completed – VGU-based layout
- ✅ **DebugWindow0** (`scene/DebugWindow0.*`) – Completed – VGU-based layout debug overlay

## Core Headers
- `core/IGame.h` – interface implemented by `Game`
- `core/EntityManager.h` – basic entity tracking
- `modules/enemy/Enemy.h` – enemy data structure
 - `modules/system/powerup/Powerup.h` – powerup data structure
 - `modules/system/particle/ParticleEffect.h` – particle effect definition
- `core/include/pch.h` – precompiled header for game sources
- `engine/core/scene/IScene.h` – base scene interface
- `engine/core/scene/Scene.h` – list of drawables used by RenderSystem
- `engine/core/scene/Camera.h` – 2D camera with shake and zoom

## Unclassified or Helper Systems
 - ✅ **PassiveTree** (`modules/system/chapter/PassiveTree.*`)
- ✅ **PassivesSystem** (`modules/system/chapter/PassivesSystem.*`) – Completed
- ✅ **CombatScenario** (`modules/combat/CombatScenario.h`) – Completed
 - ✅ **ProceduralSprites** (`modules/graphics/ProceduralSprites.h`) – Completed
 - ✅ **EffectSprites** (`modules/graphics/EffectSprites.h`) – Completed
 - ✅ **FXHelpers** (`modules/graphics/FXHelpers.h`) – Completed
 - 🗑️ **VectorFont** (`modules/vectorfont/VectorFont.h`) – Deprecated
  - ✅ **ProceduralFontGenerator** (`modules/font/ProceduralFontGenerator.*`) – Completed
  - ✅ **ProceduralSDFGenerator** (`modules/procedural/sdf/ProceduralSDFGenerator.*`) – Completed
  - ✅ **GlyphPathLibrary** (`modules/procedural/font/GlyphPathLibrary.*`) – Completed
  - ✅ **ProceduralUI** (`modules/ui/ProceduralUI.h`)
  - ✅ **ProceduralUIGenerator** (`ui/ProceduralUIGenerator.*`) – Completed
  - ✅ **UIShapeRegistry** (`modules/procedural/ui/UIShapeRegistry.*`) – Completed
  - ✅ **ProceduralSpriteRegistry** (`modules/graphics/ProceduralSpriteRegistry.*`)
  - ✅ **ProceduralSprite** (`modules/graphics/ProceduralSprite.*`)
  - ✅ **ProceduralSpriteManager** (`engine/modules/procedural_sprite/ProceduralSpriteManager.*`) – Completed
## Engine-Level Game Systems
- ✅ **GameManager** (`game/core/flow/GameManager.*`) – Completed
- ✅ **SceneCoordinator** (`game/core/flow/SceneCoordinator.*`) – Completed
- ✅ **PhaseController** (`game/core/flow/PhaseController.*`) – Completed
- ✅ **SaveLoadCoordinator** (`game/core/flow/SaveLoadCoordinator.*`) – Completed
- ✅ **GamePhaseManager** (`game/core/flow/GamePhaseManager.*`) – Completed
  - ✅ **InputManager** (`modules/input/InputManager.*`) – Completed
 - ✅ **InputBroker** (`modules/input/InputBroker.*`) – Completed
 - 🗄️ **GpuBroker** (`modules/seed/brokers/GpuBroker.*`) – Deprecated; replaced by **MultiDisplayManager**
 - ✅ **MultiDisplayManager** (`render/MultiDisplayManager.*`) – Completed
- 🟡 **RenderSystem** (`render_system.*`, `render/*`) – In Progress
- ✅ **ResourceSystem** (`modules/resource/system/ResourceSystem.*`) – Completed
- ✅ **SaveSystem** (`modules/system/save/SaveSystem.*`) – Completed
- ✅ **ScriptingSystem** (`modules/system/scripting/ScriptingSystem.*`) – Completed
 - ✅ **TelemetryManager** (`modules/telemetry/manager/TelemetryManager.*`) – Completed
- ✅ **NetworkSimulationManager** (`network/manager/NetworkSimulationManager.*`) – Completed
- ✅ **NetworkManager** (handled by **NetworkSimulationManager**)
 - ✅ **LocalizationSystem** (`localization/system/LocalizationSystem.*`) – Completed
- ✅ **SceneManager** (`modules/scene/manager/SceneManager.*`) – Completed
- 🗄️ **UIManager** (`archive/ui_legacy/UIManager.*`)
- 🗄️ **Legacy UI overlays** (`archive/ui_legacy/overlays/*Overlay.*`) *(deprecated)*
- ✅ **PostProcessingManager** (`render/postprocess/PostProcessingManager.*`, `render/postprocess/SimplePostProcess.*`) – Completed
- 🗄️ **PhysicsSystem** (`physics/physics_system.*`)
- ✅ **MaterialStressSystem** (`engine/modules/physics/core/MaterialStressSystem.*`) – Completed
- ✅ **ImpactModelingSystem** (`engine/modules/physics/core/ImpactModelingSystem.*`) – Completed
- ✅ **FluidReactionSystem** (`engine/modules/physics/core/FluidReactionSystem.*`) – Completed
- ✅ **TerrainDeformationSystem** (`engine/modules/physics/core/TerrainDeformationSystem.*`) – Completed
- ✅ **RagdollSystem** (`engine/modules/physics/core/RagdollSystem.*`) – Completed
- 🗄️ **UISystem** (`archive/ui_legacy/UISystem.*`)
- 🗄️ **UI Overlay System** – Archived
   - `GameHUD` replaces direct use of `GameUIManager` and is owned by `UISystem`.
  - 🗄️ **GameHUD** (`archive/ui_legacy/GameHUD.*`)
  - 🗄️ **UIOverlayManager** (`archive/ui_legacy/UIOverlayManager.*`)
  - 🟡 **UIInputLayer** (`ui/UIInputLayer.*`)
  - ✅ **ProceduralUIInputSystem** (`ui/ProceduralUIInputSystem.*`)
  - *Previous overlay implementations were removed along with the legacy RenderSystem.*
  - ✅ **EventSystem** (`modules/events/system/EventSystem.*`)
  - ✅ **HILInterface** (`modules/hardware/hil/HILInterface.*`)
- ✅ **SynthEngine** (`audio/synth/SynthEngine.*`)
- ✅ **AudioEventTracker** (`audio/shared/AudioEventTracker.*`)
- ✅ **AudioManager** (`audio/manager/AudioManager.*`)
- ✅ **EntropyManager** (`engine/modules/entropy/*`) – Completed
- 🟡 **ReactiveAnimationConstraintSystem** (`engine/modules/animation/reactive/*`) – In-Progress

This tree reflects the state of the repository as of July 2025 and will be updated as systems are modularized.
