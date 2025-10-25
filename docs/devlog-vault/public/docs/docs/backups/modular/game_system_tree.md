# Game System Tree (Public Overview)

This document summarizes the major gameplay modules under the `game/` directory. Internal progress notes and milestone tracking have been removed so the focus remains on structural relationships between systems.

## Managers and Systems
- **AlignmentManager** (`modules/system/alignment/AlignmentManager.*`)
- **AchievementManager** (`modules/system/achievement/AchievementManager.*`)
- **ChapterManager** (`modules/system/chapter/ChapterManager.*`)
  - Integrates with `PassiveTree` and `PassivesSystem`
- **FactionReputation** (`modules/system/faction/FactionReputation.*`)
- **StageManager** (`modules/stage/StageManager.*`)
  - **StageProgression** (`modules/stage/StageProgression.*`)
  - **SpawnController** (`modules/stage/SpawnController.*`)
  - **StageEventDispatcher** (`modules/stage/StageEventDispatcher.h`)
- **EnemyManager** (`modules/enemy/EnemyManager.*`)
  - `EnemyAIController`, `BehaviorRouter`, `EnemySpawnHandler`, `EnemyCollisionRegistrar`
  - `DefaultEnemyBehavior`, `ScriptedEnemyBehavior`, `EnemyAIEvents`, `IEnemyBehavior`
- **EnemyAIController** (`modules/enemy/EnemyAIController.*`)
- **EnemySpawner** (`modules/enemy/spawner/EnemySpawner.*`)
- **CollisionSystem** (`modules/collision/CollisionSystem.*`)
- **PlayerManager** (`modules/player/PlayerManager.*`)
- **PlayerController** (`modules/player/PlayerController.*`)
- **ProjectileManager** (`modules/system/projectile/ProjectileManager.*`)
- **PowerupManager** (`modules/system/powerup/PowerupManager.*`)
- **ParticleManager** (`modules/system/particle/ParticleManager.*`)
- **GameStateManager** (`modules/system/state/GameStateManager.*`)
- **Game Menu system** (`modules/ui/menu/MainMenuScene.*`, `modules/ui/menu/*MenuOverlay.*`)
- **BossManager** (`modules/enemy/types/boss/BossManager.*`)
- **SpaceManager** (`modules/system/space/SpaceManager.*` with `StarMap`)
- **NarrativeEventSystem** (`modules/system/narrative/NarrativeEventSystem.*`)
- **HubUpgradeManager** (`modules/system/hub/HubUpgradeManager.*`)
- **VendorInventory** (`modules/system/hub/VendorInventory.*`)
- **Tracking systems** (`modules/tracking/satellite/SatelliteTelemetry*.*`)
- **Training systems** (`modules/training/adaptive/AdaptiveTrainer.*`, `modules/training/opfor/OpposedForceTrainer.*`)
- **QuantumSimulator** (`engine/modules/quantum/simulator/QuantumSimulator.*`)
- **QuantumManager** (`engine/modules/quantum/QuantumManager.*`)
- **QuantumStateVectorManager** (`engine/modules/quantum/QuantumStateVectorManager.*`)
  - Owns `QuantumStateVectorSimulator`
  - Uses documentation in `docs/systems/quantum_statevector_system.md`
  - Debug logs controlled by `CV_ENABLE_DEBUG_LOGS`
  - **SeedBucket** (`engine/modules/quantum/SeedBucket.*`)
- **QuantumStateVectorSimulator** (`engine/modules/quantum/statevector/QuantumStateVectorSimulator.*`)
  - Supports `CollapseMode`
  - Randomizes gate operations per qubit on collapse
- **CollapseLineageLogger** (`engine/modules/quantum/logging/CollapseLineageLogger.*`)
  - Records entropy hashes and qubit states
- **cuQuantumCollapseSim** (`engine/modules/quantum/statevector/cuQuantumCollapseSim.*`)
  - Tracks probability cache statistics
- **CudaStateVectorSimulator** (`engine/modules/quantum/cuda/CudaStateVectorSimulator.*`)
- **HybridGatedCollapseSimulator** (`engine/modules/quantum/collapse/HybridGatedCollapseSimulator.*`)
- **ChaoticCollapseOracle** (`engine/modules/quantum/collapse/ChaoticCollapseOracle.*`)
- **DualLayerQuantumManager** (`engine/modules/quantum/DualLayerQuantumManager.*`)
  - **ChaoticSeedPromoter** (`engine/modules/quantum/collapse/ChaoticSeedPromoter.*`)
- **CollapseStateMapper** (`engine/modules/quantum/qptl/CollapseStateMapper.*`)
- **QuantumPatternTranslationLayer** (`engine/modules/quantum/qptl/QuantumPatternTranslationLayer.*`)
- **GateRegistry** (`engine/modules/quantum/gates/GateRegistry.*`)
- **CollapseWatchdog** (`engine/modules/quantum/CollapseWatchdog.*`)
- **CombatSimulator** (`modules/combat/simulator/CombatSimulator.*`)
  - Depends on `CombatScenario`
- **DebugController** (`modules/debug/DebugController.*`)
- **Game** (`core/Game.*`)
- **DialogueTree** (`modules/system/narrative/DialogueTree.*`)
- **Boss classes** (`modules/enemy/types/boss/Boss.*`, `modules/enemy/types/boss/SampleBoss.*`)
- **EnemyStateMachine** (`modules/enemy/EnemyStateMachine.h`)
- **ProceduralSprite registry** (`modules/graphics/SpriteRegistrations.*`, `modules/graphics/*Visuals.h`)

## Runtime Scenes
- **Scene0** (`scene/Scene0.*`)
- **Scene1** (`scene/Scene1.*`)
- **Scene2** (`scene/Scene2.*`)
- **Scene3** (`scene/Scene3.*`)
- **DebugWindow0** (`scene/DebugWindow0.*`)

## Core Headers
- `core/IGame.h` — interface implemented by `Game`
- `core/EntityManager.h` — entity tracking
- `modules/enemy/Enemy.h` — enemy data structure
- `modules/system/powerup/Powerup.h` — powerup definition
- `modules/system/particle/ParticleEffect.h` — particle effect definition
- `core/include/pch.h` — precompiled header
- `engine/core/scene/IScene.h` — base scene interface
- `engine/core/scene/Scene.h` — drawables used by RenderSystem
- `engine/core/scene/Camera.h` — 2D camera with shake and zoom

## Helper and Procedural Systems
- **PassiveTree** (`modules/system/chapter/PassiveTree.*`)
- **PassivesSystem** (`modules/system/chapter/PassivesSystem.*`)
- **CombatScenario** (`modules/combat/CombatScenario.h`)
- **ProceduralSprites** (`modules/graphics/ProceduralSprites.h`)
- **EffectSprites** (`modules/graphics/EffectSprites.h`)
- **FXHelpers** (`modules/graphics/FXHelpers.h`)
- **ProceduralFontGenerator** (`modules/font/ProceduralFontGenerator.*`)
- **ProceduralSDFGenerator** (`modules/procedural/sdf/ProceduralSDFGenerator.*`)
- **GlyphPathLibrary** (`modules/procedural/font/GlyphPathLibrary.*`)
- **ProceduralUI** (`modules/ui/ProceduralUI.h`)
- **ProceduralUIGenerator** (`ui/ProceduralUIGenerator.*`)
- **UIShapeRegistry** (`modules/procedural/ui/UIShapeRegistry.*`)
- **ProceduralSpriteRegistry** (`modules/graphics/ProceduralSpriteRegistry.*`)
- **ProceduralSprite** (`modules/graphics/ProceduralSprite.*`)
- **ProceduralSpriteManager** (`engine/modules/procedural_sprite/ProceduralSpriteManager.*`)

## Engine-Level Game Systems
- **GameManager** (`game/core/flow/GameManager.*`)
- **SceneCoordinator** (`game/core/flow/SceneCoordinator.*`)
- **PhaseController** (`game/core/flow/PhaseController.*`)
- **SaveLoadCoordinator** (`game/core/flow/SaveLoadCoordinator.*`)
- **GamePhaseManager** (`game/core/flow/GamePhaseManager.*`)
- **InputManager** (`modules/input/InputManager.*`)
- **InputBroker** (`modules/input/InputBroker.*`)
- **MultiDisplayManager** (`render/MultiDisplayManager.*`)
- **RenderSystem** (`render_system.*`, `render/*`)
- **ResourceSystem** (`modules/resource/system/ResourceSystem.*`)
- **SaveSystem** (`modules/system/save/SaveSystem.*`)
- **ScriptingSystem** (`modules/system/scripting/ScriptingSystem.*`)
- **TelemetryManager** (`modules/telemetry/manager/TelemetryManager.*`)
- **NetworkSimulationManager** (`network/manager/NetworkSimulationManager.*`)
- **LocalizationSystem** (`localization/system/LocalizationSystem.*`)
- **SceneManager** (`modules/scene/manager/SceneManager.*`)
- **PostProcessingManager** (`render/postprocess/PostProcessingManager.*`, `render/postprocess/SimplePostProcess.*`)
- **PhysicsSystem** (`physics/physics_system.*`)
- **MaterialStressSystem** (`engine/modules/physics/core/MaterialStressSystem.*`)
- **ImpactModelingSystem** (`engine/modules/physics/core/ImpactModelingSystem.*`)
- **FluidReactionSystem** (`engine/modules/physics/core/FluidReactionSystem.*`)
- **TerrainDeformationSystem** (`engine/modules/physics/core/TerrainDeformationSystem.*`)
- **RagdollSystem** (`engine/modules/physics/core/RagdollSystem.*`)
- **UISystem** (`archive/ui_legacy/UISystem.*`)
  - **UIManager** (`archive/ui_legacy/UIManager.*`)
  - **UIOverlayManager** (`archive/ui_legacy/UIOverlayManager.*`)
  - **UIInputLayer** (`ui/UIInputLayer.*`)
  - **ProceduralUIInputSystem** (`ui/ProceduralUIInputSystem.*`)
  - **GameHUD** (`archive/ui_legacy/GameHUD.*`)
- **EventSystem** (`modules/events/system/EventSystem.*`)
- **HILInterface** (`modules/hardware/hil/HILInterface.*`)
- **SynthEngine** (`audio/synth/SynthEngine.*`)
- **AudioEventTracker** (`audio/shared/AudioEventTracker.*`)
- **AudioManager** (`audio/manager/AudioManager.*`)
- **EntropyManager** (`engine/modules/entropy/*`)
- **ReactiveAnimationConstraintSystem** (`engine/modules/animation/reactive/*`)

## Legacy or Deprecated References
- **VectorFont** (`modules/vectorfont/VectorFont.h`)
- **GpuBroker** (`modules/seed/brokers/GpuBroker.*`)
- **UI Overlay System** (`archive/ui_legacy/overlays/*Overlay.*`)

This sanitized tree keeps the module hierarchy available publicly without the internal status markers or milestone callouts that appear in private documentation.
