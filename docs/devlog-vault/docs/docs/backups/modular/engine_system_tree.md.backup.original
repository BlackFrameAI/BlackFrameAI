# Engine System Tree

This document lists all current subsystems and modules under the `engine/` directory. It mirrors the style of `game_system_tree.md` and tracks modularization progress.

Every subsystem should live in its own folder under `engine/`. The status remains **In-Progress** until documentation, cleanup and tests are merged and verified.

## Modularization Status Legend

- ✅ Completed
- 🟡 In Progress
- ❌ Not Started

## Core Systems
- ✅ **Engine** (`core/engine/Engine.*`)
- ✅ **SystemManager** (`core/system/system_manager.*`)
- 🟡 **RenderSystem** (`engine/modules/render/RenderSystem.*` and `engine/modules/render/*`) – In Progress
  - ✅ **MultiDisplayManager** (`modules/display/MultiDisplayManager.*`) – Completed
  - 🟡 **DebugOverlayManager** (`render/overlay/DebugOverlayManager.*`) – In Progress
  - 🟡 **ImGuiPass** (`render/ImGuiPass.*`) – In Progress
  - 🗄️ **Renderer2D** (`render/Renderer2D.*`) – Archived
  - 🗄️ **GLStateManager** (`render/shared/GLStateManager.*`) – Archived
  - 🗄️ **PostProcessController** (`render/shared/PostProcessController.*`) – Archived
  - 🟡 **OverlayRenderer** (`render/overlay/OverlayRenderer.*`) – In Progress
  - 🗄️ **PostProcessingManager** (`render/postprocess/PostProcessingManager.*`) – Archived
  - *Previous overlay implementations are archived and being rewritten alongside the RenderSystem and UISystem.*
  - 🟡 **RendererBinding** (`render/interfaces/RendererBinding.*`)
    - 🟡 **OpenGLBinding** (`render/bindings/OpenGLBinding.*`)
    - 🟡 **VulkanBinding** (`render/bindings/VulkanBinding.*`)
    - 🟡 **VulkanRTXBinding** (`render/bindings/VulkanRTXBinding.*`)
    - 🟡 **DX11Binding** (`render/bindings/DX11Binding.*`)
    - 🟡 **DX12Binding** (`render/bindings/DX12Binding.*`)
    - 🟡 **DX12RTXBinding** (`render/bindings/DX12RTXBinding.*`)
    - 🟡 **MetalBinding** (`render/bindings/MetalBinding.*`)
    - 🟡 **AndroidGLESBinding** (`render/bindings/AndroidGLESBinding.*`)
  - 🟡 **DisplaySession** (`modules/display/DisplaySession.h`)
  - 🟡 **OpenGLBackend** (`render/backends/OpenGLBackend.*`) – validated
  - 🟡 **VulkanBackend** (`render/backends/VulkanBackend.*`) – validated
  - 🟡 **Vulkan2Backend** (`render/backends/Vulkan2Backend.*`) – validated
  - 🟡 **VulkanRTXBackend** (`render/backends/VulkanRTXBackend.*`) – validated
  - 🟡 **DX11Backend** (`render/backends/DX11Backend.*`) – validated
  - 🟡 **DX12Backend** (`render/backends/DX12Backend.*`) – DXR device creation in place with rasterization fallback – validated
  - 🟡 **DX12RTXBackend** (`render/backends/DX12RTXBackend.*`) – validated
  - 🟡 **MetalBackend** (`render/backends/MetalBackend.*`) – validated
  - 🟡 **AndroidGLESBackend** (`render/backends/AndroidGLESBackend.*`) – validated
- ✅ **ResourceSystem** (`resource/ResourceSystem.*`)
 - ✅ **InputManager** (`modules/input/InputManager.*`)
- ✅ **InputBroker** (`modules/input/InputBroker.*`)
- ✅ **Input Interfaces** (`input/interfaces/*`)
- ✅ **Input Shared** (`input/shared/*`)
- ✅ **AudioManager** (`audio/manager/AudioManager.*`)
  - ✅ **SynthEngine** (`audio/synth/SynthEngine.*`)
- ✅ **AudioEventTracker** (`audio/shared/AudioEventTracker.*`)
- ✅ **Audio Interfaces** (`audio/interfaces/*`)
- 🗄️ **PhysicsSystem** (`physics/physics_system.*`)
- ✅ **PhysicsCore** (`physics/core/*`)
  - ✅ **MaterialStressSystem** (`physics/core/material_stress/MaterialStressSystem.*`) – Completed
  - ✅ **ImpactModelingSystem** (`physics/core/impact_modeling/ImpactModelingSystem.*`) – Completed
  - ✅ **FluidReactionSystem** (`physics/core/fluid_reaction/FluidReactionSystem.*`) – Completed
  - ✅ **TerrainDeformationSystem** (`physics/core/terrain/TerrainDeformationSystem.*`) – Completed
  - ✅ **RagdollSystem** (`physics/core/ragdoll/RagdollSystem.*`) – Completed
- ✅ **BiologyCore** (`engine/modules/biology/*`)
- ✅ **NetworkSimulationManager** (`network/manager/NetworkSimulationManager.*`)
- ✅ **ScriptingSystem** (`modules/system/scripting/ScriptingSystem.*`)
- ✅ **SceneManager** (`modules/scene/manager/SceneManager.*`)
- 🗄️ **UISystem** (`archive/ui_legacy/UISystem.*`)
  - 🗄️ **UIManager** (`archive/ui_legacy/UIManager.*`)
  - 🗄️ **UIOverlayManager** (`archive/ui_legacy/UIOverlayManager.*`)
- ✅ **SaveSystem** (`game/modules/system/save/SaveSystem.*`)
- ✅ **LocalizationSystem** (`localization/system/LocalizationSystem.*`)
 - ✅ **ProceduralFontGenerator** (`modules/procedural/font/ProceduralFontGenerator.*`)
 - 🗑️ **VectorFont** (`modules/vectorfont/VectorFont.h`) – Deprecated
 - 🟡 **ProceduralUI** (`modules/procedural/ui/ProceduralUI.h`)
 - 🟡 **ProceduralUIGenerator** (`modules/procedural/ui/ProceduralUIGenerator.*`)
 - 🟡 **ProceduralSprite** (`modules/procedural_sprite/ProceduralSprite.*`)
 - 🟡 **ProceduralSpriteRegistry** (`modules/procedural_sprite/ProceduralSpriteRegistry.*`)
- ✅ **ThemeManager** (`modules/theme/ThemeManager.*`)
- ✅ **ThemeMaterialResolver** (`modules/theme/ThemeMaterialResolver.*`)
  - includes theme assets `game/assets/themes/neon_industrial.json` and `game/assets/themes/bone_metal.json`
- ✅ **StencilGuideSystem** (`modules/stencil/StencilGuideSystem.*`)
- ✅ **TelemetryManager** (`modules/telemetry/manager/TelemetryManager.*`)
 - ✅ **EventSystem** (`modules/events/system/EventSystem.*`)
 - ✅ **HILInterface** (`modules/hardware/hil/HILInterface.*`)
- ✅ **Logger** (`debug/logging/logger.*`)
- ✅ **MemoryTracker** (`core/memory/memory_tracker.*`)
- ✅ **Diagnostics** (`debug/diagnostics/diagnostics.*`)
- ✅ **ScreenshotSystem** (`debug/screenshot/ScreenshotSystem.*`)
- ✅ **FrameCounter** (`core/performance/frame_counter.*`)
- ✅ **TimeSystem** (`core/time/time_system.*` and `modules/time/*`)
- ✅ **Quantum Systems** (`quantum/*`) – Completed
  - ✅ **EntropyManager** (`entropy/*`) – Completed
  - 🟡 **HybridGatedCollapseSimulator** (`quantum/collapse/HybridGatedCollapseSimulator.*`) – In Progress
  - 🟡 **ChaoticCollapseOracle** (`quantum/collapse/ChaoticCollapseOracle.*`) – In Progress
    - adds seed validation and optional observer mode
  - 🟡 **DualLayerQuantumManager** (`quantum/DualLayerQuantumManager.*`) – In Progress
  - ✅ **QuantumPatternTranslationLayer** (`quantum/qptl/QuantumPatternTranslationLayer.*`) – Completed
  - ✅ **CollapseStateMapper** (`quantum/qptl/CollapseStateMapper.*`) – Completed
  - 🟡 **GateRegistry** (`quantum/gates/GateRegistry.*`) – In Progress
  - 🟡 **CollapseWatchdog** (`quantum/CollapseWatchdog.*`) – In Progress

-## SEED Kernel Layer
- ✅ **SeedCore** (`modules/seed/core/SeedCore.*`)
- ✅ **SeedControl** (`modules/seed/managers/SeedControl.*`)
- ✅ **KernelSlotManager** (`modules/seed/kernel/KernelSlotManager.*`)
- ✅ **KernelLoader** (`modules/seed/kernel/KernelLoader.*`)
 - 🗄️ **GpuBroker** (`modules/seed/brokers/GpuBroker.*`) – Deprecated; replaced by **MultiDisplayManager**

This tree reflects the state of the repository as of July 2025 and will be updated as systems are modularized.
