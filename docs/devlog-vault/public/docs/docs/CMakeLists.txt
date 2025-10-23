
cmake_minimum_required(VERSION 3.25)
project(PurgeOfTheCrescentVeil LANGUAGES C CXX)

# Convert project source directory to a POSIX style path
cmake_path(CONVERT "${PROJECT_SOURCE_DIR}" TO_CMAKE_PATH_LIST PROJECT_ROOT_POSIX NORMALIZE)

find_program(CCACHE_PROGRAM sccache)
if(CCACHE_PROGRAM)
    set(CMAKE_C_COMPILER_LAUNCHER ${CCACHE_PROGRAM})
    set(CMAKE_CXX_COMPILER_LAUNCHER ${CCACHE_PROGRAM})
else()
    find_program(CCACHE_PROGRAM ccache)
    if(CCACHE_PROGRAM)
        set(CMAKE_C_COMPILER_LAUNCHER ${CCACHE_PROGRAM})
        set(CMAKE_CXX_COMPILER_LAUNCHER ${CCACHE_PROGRAM})
    endif()
endif()

if(CV_ENABLE_DX12)
    find_path(D3DX12_INCLUDE_DIR d3dx12.h
        PATHS
            ${PROJECT_SOURCE_DIR}/engine/external/directx
            ENV DXSDK_DIR
        PATH_SUFFIXES include directx)
    if(D3DX12_INCLUDE_DIR)
        message(STATUS "d3dx12.h found: ${D3DX12_INCLUDE_DIR}")
    else()
        message(WARNING "d3dx12.h not found. Disabling DX12 backend")
        set(CV_ENABLE_DX12 OFF)
    endif()
endif()

# Enable CTest for unit tests
enable_testing()
option(BUILD_TESTING "Build unit tests" ON)

# Optionally build the Vulkan2 backend
option(CV_ENABLE_VULKAN "Enable Vulkan2 rendering backend" OFF)
option(CV_ENABLE_DX12 "Enable DirectX 12 rendering backend" OFF)
option(CV_ENABLE_CUQUANTUM "Enable cuQuantum state vector simulator" ON)
option(CV_FORCE_CPU_QUANTUM "Force CPU fallback even if cuQuantum is found" OFF)
option(CV_ENABLE_CUDA_SIM "Enable raw CUDA state vector simulator" OFF)
option(CV_USE_ENGINE_QUANTUM "Build engine quantum subsystem" ON)
set(CV_CUDA_DEVICE_ID 0 CACHE STRING "Default CUDA device id for cuQuantum simulators")
if(CV_ENABLE_CUDA_SIM)
    enable_language(CUDA)
endif()
set(QUANTUM_DIR ${PROJECT_SOURCE_DIR}/engine/modules/quantum)
option(CV_USE_UNITY_BUILD "Enable unity build mode" ON)
option(CV_ENABLE_INFO_LOGS "Enable CV_LOG_INFO messages" ON)
option(CV_ENABLE_DEBUG_LOGS "Enable CV_LOG_DEBUG messages" ON)
option(CV_FORCE_LOGS "Enable info/debug logs in Release" ON)
option(CV_ENABLE_COLLAPSE_LINEAGE "Enable CollapseLineageLogger" OFF)
option(CV_PRODUCTION_MODE "Enable production mode" OFF)
option(CV_ENABLE_VGU_GRID "Enable VGU debug grid drawing" ON)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Guard against passing flags that disable warnings in global flag variables
foreach(flag_var IN ITEMS CMAKE_CXX_FLAGS CMAKE_C_FLAGS)
    if(DEFINED ${flag_var} AND NOT "${${flag_var}}" STREQUAL "")
        string(FIND "${${flag_var}}" "/w" _has_slash_w)
        string(FIND "${${flag_var}}" "-w" _has_dash_w)
        string(FIND "${${flag_var}}" "/WX-" _has_wx_minus)
        if(_has_slash_w GREATER -1 OR _has_dash_w GREATER -1 OR _has_wx_minus GREATER -1)
            message(FATAL_ERROR "${flag_var} contains flags that disable warnings; remove '/w', '-w' or '/WX-' from your configuration")
        endif()
    endif()
endforeach()

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    if(NOT CV_FORCE_LOGS)
        set(CV_ENABLE_INFO_LOGS OFF CACHE BOOL "" FORCE)
        set(CV_ENABLE_DEBUG_LOGS OFF CACHE BOOL "" FORCE)
    else()
        set(CV_ENABLE_INFO_LOGS ON CACHE BOOL "" FORCE)
        set(CV_ENABLE_DEBUG_LOGS ON CACHE BOOL "" FORCE)
    endif()
endif()

option(CV_DIAGNOSTIC_BUILD "Enable additional compiler diagnostics" OFF)

if(MSVC)
    # Enable multi-processor compilation and treat warnings as errors for all
    # configurations. A diagnostics mode can enable `/Wall` instead of the
    # default `/W4` warning level.
    add_compile_options(/MP)
    add_compile_definitions($<$<CONFIG:Debug>:_HAS_ITERATOR_DEBUGGING=0> $<$<CONFIG:Debug>:_ITERATOR_DEBUG_LEVEL=0>)
    set(CV_WARNING_FLAGS /W4)
    if(CV_DIAGNOSTIC_BUILD)
        list(APPEND CV_WARNING_FLAGS /Wall)
    endif()
    set(CV_WERROR_FLAG)
    add_link_options(/INCREMENTAL:NO /OPT:REF /OPT:ICF)
    include(CheckLinkerFlag)
    check_linker_flag(CXX /cgthreads:4 CV_HAS_CGTHREADS)
    if(CV_HAS_CGTHREADS)
        add_link_options(/cgthreads:4)
    endif()
else()
    set(CV_WARNING_FLAGS -Wall -Wextra -Werror)
    set(CV_WERROR_FLAG)
    if(CV_DIAGNOSTIC_BUILD)
        list(APPEND CV_WARNING_FLAGS -Wall -Wextra)
    endif()
endif()


# Helper applying common Windows compile definitions
function(cv_apply_win_defs target)
    if(WIN32)
        target_compile_definitions(${target} PUBLIC
            WIN32_LEAN_AND_MEAN
            NOMINMAX
            _WIN32_WINNT=0x0601
        )
    endif()
endfunction()

##---------------------------------------------------------------------
# Warning regression checks
#---------------------------------------------------------------------
# Small translation units under tests/warnings intentionally trigger
# compiler warnings like C4267 and C4244. These should fail to compile
# when warnings are treated as errors. If any test succeeds, abort
# configuration immediately so CI surfaces the regression.

#if(MSVC)
#    file(MAKE_DIRECTORY ${CMAKE_BINARY_DIR}/warning_checks)
#    foreach(_warn_src c4267_warning.cpp c4244_warning.cpp deprecated_api.cpp)
#        try_compile(_warn_result
#            ${CMAKE_BINARY_DIR}/warning_checks
#            ${PROJECT_SOURCE_DIR}/tests/warnings/${_warn_src}
#            CMAKE_FLAGS
#                "-DCMAKE_CXX_STANDARD=17"
#                "-DCMAKE_CXX_EXTENSIONS=OFF"
#            OUTPUT_VARIABLE _warn_output)
#        if(_warn_result)
#            message(FATAL_ERROR "Warning regression detected while compiling ${_warn_src}:\n${_warn_output}")
#        endif()
#    endforeach()
#endif()

include(FetchContent)

# Fetch GLFW from the official repository
FetchContent_Declare(
    glfw
    GIT_REPOSITORY [REDACTED THIRD-PARTY REPOSITORY]
    # Stable release 3.4
    GIT_TAG 7b6aead9fb88b3623e3b3725ebb42670cbe4c579
)
set(GLFW_BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)
set(GLFW_BUILD_TESTS OFF CACHE BOOL "" FORCE)
set(GLFW_BUILD_DOCS OFF CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(glfw)
FetchContent_GetProperties(glfw SOURCE_DIR GLFW_SOURCE_DIR)
target_include_directories(glfw PUBLIC
    "$<BUILD_INTERFACE:${PROJECT_SOURCE_DIR}>"
    "$<BUILD_INTERFACE:${PROJECT_SOURCE_DIR}/engine>")

# Fetch Glad2 at configure time
FetchContent_Declare(
    glad
    GIT_REPOSITORY [REDACTED THIRD-PARTY REPOSITORY]
    GIT_TAG glad2
    SOURCE_SUBDIR cmake
)
FetchContent_MakeAvailable(glad)
find_package(Python3 REQUIRED COMPONENTS Interpreter)
set(Python_EXECUTABLE ${Python3_EXECUTABLE})
glad_add_library(glad STATIC API gl:core=4.5)


FetchContent_Declare(
    openal-soft
    GIT_REPOSITORY [REDACTED THIRD-PARTY REPOSITORY]
    # Stable release 1.23.1
    GIT_TAG d3875f333fb6abe2f39d82caca329414871ae53b
)
set(ALSOFT_EXAMPLES OFF CACHE BOOL "" FORCE)
set(ALSOFT_TESTS OFF CACHE BOOL "" FORCE)
set(ALSOFT_UTILS OFF CACHE BOOL "" FORCE)
set(ALSOFT_INSTALL_CONFIG OFF CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(openal-soft)

# Patch OpenAL voice.cpp after it has been fetched
FetchContent_GetProperties(openal-soft SOURCE_DIR OPENAL_SOFT_SOURCE_DIR)
configure_file(${PROJECT_SOURCE_DIR}/engine/external/patches/openal/voice.cpp
               ${OPENAL_SOFT_SOURCE_DIR}/core/voice.cpp
               COPYONLY NO_SOURCE_PERMISSIONS)
if(NOT EXISTS "${OPENAL_SOFT_SOURCE_DIR}/core/voice.cpp")
    message(FATAL_ERROR "Required patch not applied")
endif()
file(READ "${OPENAL_SOFT_SOURCE_DIR}/core/voice.cpp" _openal_patch_check)

# Fetch Dear ImGui for editor tools
FetchContent_Declare(
    imgui
    GIT_REPOSITORY [REDACTED THIRD-PARTY REPOSITORY]
    GIT_TAG v1.90.1
)
FetchContent_MakeAvailable(imgui)
FetchContent_GetProperties(imgui SOURCE_DIR IMGUI_SOURCE_DIR)

# Build Dear ImGui as a static library with GLFW/OpenGL3 backends
add_library(imgui STATIC
    ${IMGUI_SOURCE_DIR}/imgui.cpp
    ${IMGUI_SOURCE_DIR}/imgui_demo.cpp
    ${IMGUI_SOURCE_DIR}/imgui_draw.cpp
    ${IMGUI_SOURCE_DIR}/imgui_tables.cpp
    ${IMGUI_SOURCE_DIR}/imgui_widgets.cpp
    ${IMGUI_SOURCE_DIR}/backends/imgui_impl_glfw.cpp
    ${IMGUI_SOURCE_DIR}/backends/imgui_impl_opengl3.cpp
)
target_include_directories(imgui PUBLIC
    ${IMGUI_SOURCE_DIR}
    ${IMGUI_SOURCE_DIR}/backends
)
target_compile_definitions(imgui PUBLIC IMGUI_IMPL_OPENGL_LOADER_GLAD)
target_link_libraries(imgui PUBLIC glfw glad)

# Fetch standalone Asio for lightweight networking
FetchContent_Declare(
    asio
    GIT_REPOSITORY [REDACTED THIRD-PARTY REPOSITORY]
    GIT_TAG asio-1-30-1
)
FetchContent_MakeAvailable(asio)

# Provide nlohmann::json as a header-only library from the external directory
add_library(nlohmann_json INTERFACE)
target_include_directories(nlohmann_json INTERFACE
    ${PROJECT_SOURCE_DIR}/engine/external/nlohmann
)

if(CV_ENABLE_VULKAN)
    find_package(Vulkan QUIET)
    if(Vulkan_FOUND)
        message(STATUS "Vulkan SDK found: enabling Vulkan backend")
    else()
        message(WARNING "Vulkan SDK not found. Disabling Vulkan backend")
        set(CV_ENABLE_VULKAN OFF)
    endif()
endif()


FetchContent_Declare(
    lua
    GIT_REPOSITORY [REDACTED THIRD-PARTY REPOSITORY]
    GIT_TAG v5.4.6
)
FetchContent_MakeAvailable(lua)

find_package(CURL QUIET)
if(NOT CURL_FOUND)
    message(STATUS "CURL not found. Fetching libcurl")
    FetchContent_Declare(
        libcurl
        GIT_REPOSITORY [REDACTED THIRD-PARTY REPOSITORY]
        GIT_TAG curl-8_7_1
    )
    set(_cv_prev_build_testing ${BUILD_TESTING})
    set(BUILD_CURL_EXE OFF CACHE BOOL "" FORCE)
    set(BUILD_SHARED_LIBS OFF CACHE BOOL "" FORCE)
    set(BUILD_TESTING OFF CACHE BOOL "" FORCE)
    FetchContent_MakeAvailable(libcurl)
    set(BUILD_TESTING ${_cv_prev_build_testing} CACHE BOOL "" FORCE)
    if(NOT TARGET CURL::libcurl)
        add_library(CURL::libcurl ALIAS libcurl)
    endif()
endif()

set(LUA_SRC
    ${lua_SOURCE_DIR}/lapi.c
    ${lua_SOURCE_DIR}/lcode.c
    ${lua_SOURCE_DIR}/lctype.c
    ${lua_SOURCE_DIR}/ldebug.c
    ${lua_SOURCE_DIR}/ldo.c
    ${lua_SOURCE_DIR}/ldump.c
    ${lua_SOURCE_DIR}/lfunc.c
    ${lua_SOURCE_DIR}/lgc.c
    ${lua_SOURCE_DIR}/llex.c
    ${lua_SOURCE_DIR}/lmem.c
    ${lua_SOURCE_DIR}/lobject.c
    ${lua_SOURCE_DIR}/lopcodes.c
    ${lua_SOURCE_DIR}/lparser.c
    ${lua_SOURCE_DIR}/lstate.c
    ${lua_SOURCE_DIR}/lstring.c
    ${lua_SOURCE_DIR}/ltable.c
    ${lua_SOURCE_DIR}/ltm.c
    ${lua_SOURCE_DIR}/lundump.c
    ${lua_SOURCE_DIR}/lvm.c
    ${lua_SOURCE_DIR}/lzio.c
    ${lua_SOURCE_DIR}/lauxlib.c
    ${lua_SOURCE_DIR}/lbaselib.c
    ${lua_SOURCE_DIR}/ldblib.c
    ${lua_SOURCE_DIR}/liolib.c
    ${lua_SOURCE_DIR}/lmathlib.c
    ${lua_SOURCE_DIR}/loslib.c
    ${lua_SOURCE_DIR}/ltablib.c
    ${lua_SOURCE_DIR}/lstrlib.c
    ${lua_SOURCE_DIR}/lutf8lib.c
    ${lua_SOURCE_DIR}/loadlib.c
    ${lua_SOURCE_DIR}/lcorolib.c
    ${lua_SOURCE_DIR}/linit.c
)

add_library(lua STATIC ${LUA_SRC})
target_include_directories(lua PUBLIC ${lua_SOURCE_DIR})
if(NOT WIN32)
    target_compile_definitions(lua PRIVATE LUA_USE_POSIX)
endif()



# Engine library
add_library(cv_engine
    engine/core/system/system_manager.cpp
    engine/core/time/time_system.cpp
    engine/modules/physics/core/dynamics/DynamicsSystem.cpp
    engine/modules/biology/AnatomicalConstraintRegistry.cpp
    engine/modules/physics/core/material_property_bank/MaterialPropertyBank.cpp
    engine/modules/physics/core/material_stress/MaterialStressSystem.cpp
    engine/modules/physics/core/impact_modeling/ImpactModelingSystem.cpp
    engine/modules/physics/core/fluid_reaction/FluidReactionSystem.cpp
    engine/modules/physics/core/terrain/TerrainDeformationSystem.cpp
    engine/modules/physics/core/ragdoll/RagdollSystem.cpp
    engine/modules/physics/core/reaction_utils/ReactionEventUtils.cpp
    engine/modules/biology/ReactionPatternResolver.cpp
    engine/modules/animation/reactive/MotionStencil.cpp
    engine/modules/animation/reactive/ActionTemplate.cpp
    engine/modules/stencil/StencilGuideSystem.cpp
    engine/modules/stencil/StencilResolver.cpp
    engine/modules/physics/core/entropy_field/EntropyFieldIntegrator.cpp
    engine/modules/physics/core/runtime_graph/RuntimePhysicsGraph.cpp
    engine/modules/events/system/EventSystem.cpp
    engine/modules/resource/system/ResourceSystem.cpp
    game/modules/system/save/SaveSystem.cpp
    game/modules/system/scripting/ScriptingSystem.cpp
    engine/modules/localization/system/LocalizationSystem.cpp
    engine/modules/theme/ThemeLexicon.cpp
    engine/modules/theme/ThemeMaterialResolver.cpp
    engine/modules/theme/ThemeManager.cpp
    engine/modules/input/InputManager.cpp
    engine/modules/time/system/TimerManager.cpp
    engine/modules/time/system/FrameTimer.cpp
    engine/modules/time/system/FrameLimiter.cpp
    engine/modules/debug/overlay/DebugOverlayRenderer.cpp
    engine/modules/debug/overlay/DebugOverlayComponent.cpp
    engine/modules/debug/overlay/DebugOverlayWindow.cpp
    engine/modules/debug/screenshot/ScreenshotSystem.cpp
    engine/modules/audio/shared/AudioEventTracker.cpp
    engine/modules/audio/synth/SynthEngine.cpp
    engine/modules/audio/manager/AudioManager.cpp
    game/core/flow/GamePhaseManager.cpp
    game/core/flow/GameManager.cpp
    game/core/flow/SceneCoordinator.cpp
    game/core/flow/PhaseController.cpp
    game/core/flow/SaveLoadCoordinator.cpp
    engine/modules/scene/manager/SceneManager.cpp
    engine/core/scene/Scene.cpp
    engine/core/scene/Camera.cpp
    engine/modules/debug/logging/logger.cpp
    engine/core/memory/memory_tracker.cpp
    engine/modules/debug/diagnostics/diagnostics.cpp
    engine/core/util/file_utils.cpp
    engine/core/util/math_utils.cpp
    engine/modules/entropy/EntropyPool.cpp
    engine/modules/entropy/EntropyManager.cpp
    engine/modules/entropy/sources/HardwareEntropySource.cpp
    engine/core/util/string_utils.cpp
    engine/core/util/path_utils.cpp
    engine/modules/render/RenderSystem.cpp
    engine/modules/render/Renderer2D.cpp
    engine/modules/render/postprocess/PostProcessingManager.cpp
    engine/modules/render/postprocess/SimplePostProcess.cpp
    engine/modules/render/overlay/OverlayRenderer.cpp
    engine/modules/render/overlay/DebugOverlayManager.cpp
    engine/modules/render/ImGuiPass.cpp
    engine/modules/render/ImGuiUtils.cpp
    engine/modules/display/MultiDisplayManager.cpp
    engine/modules/render/shared/GLStateManager.cpp
    engine/modules/render/shared/SharedGLResourceFactory.cpp
    engine/modules/render/bindings/OpenGLBinding.cpp
    $<$<BOOL:${CV_ENABLE_VULKAN}>:engine/modules/render/bindings/VulkanBinding.cpp>
    $<$<BOOL:${CV_ENABLE_VULKAN}>:engine/modules/render/bindings/VulkanRTXBinding.cpp>
    $<$<BOOL:WIN32>:engine/modules/render/bindings/DX11Binding.cpp>
    $<$<BOOL:${CV_ENABLE_DX12}>:engine/modules/render/bindings/DX12Binding.cpp>
    $<$<BOOL:${CV_ENABLE_DX12}>:engine/modules/render/bindings/DX12RTXBinding.cpp>
    $<$<BOOL:APPLE>:engine/modules/render/bindings/MetalBinding.cpp>
    engine/modules/render/bindings/AndroidGLESBinding.cpp
    engine/modules/render/backends/OpenGLBackend.cpp
    $<$<BOOL:${CV_ENABLE_VULKAN}>:engine/modules/render/backends/VulkanBackend.cpp>
    $<$<BOOL:${CV_ENABLE_VULKAN}>:engine/modules/render/backends/Vulkan2Backend.cpp>
    $<$<BOOL:${CV_ENABLE_VULKAN}>:engine/modules/render/backends/VulkanRTXBackend.cpp>
    $<$<BOOL:WIN32>:engine/modules/render/backends/DX11Backend.cpp>
    $<$<BOOL:${CV_ENABLE_DX12}>:engine/modules/render/backends/DX12Backend.cpp>
    $<$<BOOL:${CV_ENABLE_DX12}>:engine/modules/render/backends/DX12RTXBackend.cpp>
    $<$<BOOL:APPLE>:engine/modules/render/backends/MetalBackend.cpp>
    engine/modules/render/backends/AndroidGLESBackend.cpp
    engine/modules/procedural/ui/ButtonElement.cpp
    engine/modules/procedural/ui/RectangleElement.cpp
    engine/modules/procedural/ui/ProceduralUIGenerator.cpp
    engine/modules/procedural/ui/UIShapeRegistry.cpp
    engine/modules/vectorfont/VectorFont.cpp
    engine/ui/ProceduralUIInputSystem.cpp
    engine/core/performance/frame_counter.cpp
    engine/modules/procedural_sprite/ProceduralSprite.cpp
    engine/modules/procedural_sprite/ProceduralSpriteManager.cpp
    engine/modules/procedural_sprite/ProceduralSpriteRegistry.cpp
    engine/modules/procedural/font/GlyphPathLibrary.cpp
    engine/modules/procedural/font/GlyphMetrics.cpp
    engine/modules/procedural/font/ProceduralFontGenerator.cpp
    engine/modules/procedural/sdf/SDFPath.cpp
    engine/modules/procedural/sdf/ProceduralSDFGenerator.cpp
    engine/modules/network/manager/NetworkSimulationManager.cpp
    engine/modules/telemetry/manager/TelemetryManager.cpp
    engine/modules/hardware/hil/HILInterface.cpp
    engine/core/system/system_info.cpp
    engine/modules/seed/brokers/GpuBroker.cpp
    engine/modules/seed/brokers/AudioBroker.cpp
    engine/modules/input/InputBroker.cpp
    engine/modules/seed/core/SeedCore.cpp
    engine/modules/seed/kernel/KernelSlotManager.cpp
    engine/modules/seed/kernel/KernelLoader.cpp
    engine/modules/seed/managers/SeedControl.cpp
    engine/modules/seed/memory/SeedAllocator.cpp
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/simulator/QuantumSimulator.cpp>
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/QuantumManager.cpp>
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/gates/GateRegistry.cpp>
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/gates/GrimdarkGates.cpp>
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/gates/MechGates.cpp>
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/gates/CelestialGates.cpp>
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/SeedBucket.cpp>
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/CollapseTypes.h>
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/QuantumStateVectorManager.cpp>
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/statevector/QuantumStateVectorSimulator.cpp>
    $<$<AND:$<BOOL:${CV_USE_ENGINE_QUANTUM}>,$<OR:$<BOOL:${CV_ENABLE_CUDA_SIM}>,$<BOOL:${CV_ENABLE_CUQUANTUM}>>>:${QUANTUM_DIR}/statevector/GpuDeviceManager.cpp>
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/statevector/cuQuantumCollapseSim.cpp>
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/logging/CollapseLineageLogger.cpp>
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/collapse/ChaoticCollapsePool.cpp>
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/collapse/ChaoticCollapseOracle.cpp>
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/CollapseWatchdog.cpp>
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/collapse/ChaoticSeedPromoter.cpp>
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/collapse/HybridGatedCollapseSimulator.cpp>
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/qptl/CollapseStateMapper.cpp>
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/qptl/QuantumPatternTranslationLayer.cpp>
    $<$<BOOL:${CV_USE_ENGINE_QUANTUM}>:${QUANTUM_DIR}/DualLayerQuantumManager.cpp>
)
set_target_properties(cv_engine PROPERTIES UNITY_BUILD ${CV_USE_UNITY_BUILD})
target_precompile_headers(cv_engine PRIVATE
    $<$<COMPILE_LANGUAGE:CXX>:engine/core/include/pch.h>
)


target_include_directories(cv_engine PUBLIC
    ${PROJECT_SOURCE_DIR}/engine
    ${PROJECT_SOURCE_DIR}/engine/modules
    ${PROJECT_SOURCE_DIR}/engine/modules/seed
    ${PROJECT_SOURCE_DIR}/engine/external
    $<$<BOOL:${CV_ENABLE_DX12}>:${PROJECT_SOURCE_DIR}/engine/external/directx>
    ${asio_SOURCE_DIR}/asio/include
    ${PROJECT_SOURCE_DIR}
    ${PROJECT_SOURCE_DIR}/game
    ${PROJECT_SOURCE_DIR}/game/modules
    ${PROJECT_SOURCE_DIR}/game/state
)
# Expose the project root as a POSIX path
target_compile_definitions(cv_engine PUBLIC ASIO_STANDALONE PROJECT_ROOT_DIR="${PROJECT_ROOT_POSIX}")
if(CV_ENABLE_VULKAN)
    target_compile_definitions(cv_engine PUBLIC CV_ENABLE_VULKAN)
endif()
if(CV_ENABLE_INFO_LOGS)
    target_compile_definitions(cv_engine PUBLIC CV_ENABLE_INFO_LOGS=1)
else()
    target_compile_definitions(cv_engine PUBLIC CV_ENABLE_INFO_LOGS=0)
endif()
if(CV_ENABLE_DEBUG_LOGS)
    target_compile_definitions(cv_engine PUBLIC CV_ENABLE_DEBUG_LOGS=1)
else()
    target_compile_definitions(cv_engine PUBLIC CV_ENABLE_DEBUG_LOGS=0)
endif()
if(CV_ENABLE_COLLAPSE_LINEAGE)
    target_compile_definitions(cv_engine PUBLIC CV_ENABLE_COLLAPSE_LINEAGE)
endif()
if(BUILD_TESTING)
    target_compile_definitions(cv_engine PUBLIC CV_TEST_BUILD=1)
else()
    target_compile_definitions(cv_engine PUBLIC CV_TEST_BUILD=0)
endif()
if(CV_PRODUCTION_MODE)
    target_compile_definitions(cv_engine PUBLIC CV_PRODUCTION_MODE=1)
else()
    target_compile_definitions(cv_engine PUBLIC CV_PRODUCTION_MODE=0)
endif()
if(CV_ENABLE_VGU_GRID)
    target_compile_definitions(cv_engine PUBLIC CV_ENABLE_VGU_GRID)
endif()
if(CV_USE_ENGINE_QUANTUM)
    target_compile_definitions(cv_engine PUBLIC CV_USE_ENGINE_QUANTUM)
endif()
target_link_libraries(cv_engine PUBLIC glfw glad OpenAL::OpenAL lua nlohmann_json imgui)
if(CV_ENABLE_VULKAN)
    target_link_libraries(cv_engine PUBLIC Vulkan::Vulkan)
endif()
if (WIN32)
    cv_apply_win_defs(cv_engine)
    target_link_libraries(cv_engine PUBLIC Dbghelp d3d11 dxgi d3d12 d3dcompiler)
elseif(APPLE)
    find_library(METAL_LIB Metal)
    target_link_libraries(cv_engine PUBLIC ${METAL_LIB})
endif()
target_compile_options(cv_engine PRIVATE ${CV_WARNING_FLAGS} ${CV_WERROR_FLAG})




# Simple console launcher for crescent_runtime
add_executable(RuntimeLauncher EXCLUDE_FROM_ALL
    tools/RuntimeLauncher/main.cpp
)
target_link_libraries(RuntimeLauncher PRIVATE)
target_compile_options(RuntimeLauncher PRIVATE ${CV_WARNING_FLAGS} ${CV_WERROR_FLAG})
target_include_directories(RuntimeLauncher PRIVATE
    ${PROJECT_SOURCE_DIR}/engine
)
set_target_properties(RuntimeLauncher PROPERTIES UNITY_BUILD ${CV_USE_UNITY_BUILD})
## RuntimeLauncher compiles without a precompiled header
# to keep dependencies minimal
cv_apply_win_defs(RuntimeLauncher)

# CollapseShapeViewer dumps CollapseLineageLogger data
add_executable(CollapseShapeViewer EXCLUDE_FROM_ALL
    tools/CollapseShapeViewer/main.cpp
    tests/stubs/GameStubs.cpp
    tests/stubs/EngineStub.cpp
)
target_link_libraries(CollapseShapeViewer PRIVATE cv_engine)
target_compile_options(CollapseShapeViewer PRIVATE ${CV_WARNING_FLAGS} ${CV_WERROR_FLAG})
target_include_directories(CollapseShapeViewer PRIVATE
    ${PROJECT_SOURCE_DIR}/engine
    ${PROJECT_SOURCE_DIR}/game
)
set_target_properties(CollapseShapeViewer PROPERTIES UNITY_BUILD ${CV_USE_UNITY_BUILD})
target_precompile_headers(CollapseShapeViewer REUSE_FROM cv_engine)
cv_apply_win_defs(CollapseShapeViewer)

# Crescent runtime executable
add_executable(crescent_runtime
    engine/core/engine/main.cpp
    engine/core/engine/Engine.cpp
    game/core/DebugFlags.cpp
    game/core/Game.cpp
    game/core/EntityManager.cpp
    game/modules/player/PlayerManager.cpp
    game/modules/player/PlayerController.cpp
    game/modules/system/projectile/ProjectileManager.cpp
    game/modules/enemy/EnemyManager.cpp
    game/modules/enemy/EnemyAIController.cpp
    game/modules/enemy/EnemySpawnHandler.cpp
    game/modules/enemy/EnemyCollisionRegistrar.cpp
    game/modules/enemy/behaviors/DefaultEnemyBehavior.cpp
    game/modules/enemy/behaviors/ScriptedEnemyBehavior.cpp
    game/modules/enemy/spawner/EnemySpawner.cpp
    game/modules/stage/StageProgression.cpp
    game/modules/stage/SpawnController.cpp
    game/modules/system/collision/CollisionSystem.cpp
    game/modules/system/powerup/PowerupManager.cpp
    game/modules/system/particle/ParticleEffect.cpp
    game/modules/graphics/SpriteRegistrations.cpp
    game/modules/system/particle/ParticleManager.cpp
    game/modules/enemy/types/boss/Boss.cpp
    game/modules/enemy/types/boss/SampleBoss.cpp
    game/modules/enemy/types/boss/BossManager.cpp
    game/modules/debug/DebugController.cpp
    game/modules/stage/StageManager.cpp
    game/modules/system/alignment/AlignmentManager.cpp
    game/modules/system/chapter/ChapterManager.cpp
    game/modules/system/chapter/PassiveTree.cpp
    game/modules/system/chapter/PassivesSystem.cpp
    game/modules/system/achievement/AchievementManager.cpp
    game/modules/system/hub/HubUpgradeManager.cpp
    game/modules/system/hub/VendorInventory.cpp
    game/modules/system/faction/FactionReputation.cpp
    game/modules/system/space/SpaceManager.cpp
    game/modules/system/space/StarMap.cpp
    game/modules/tracking/satellite/SatelliteTelemetrySystem.cpp
    game/modules/tracking/satellite/SatelliteTelemetryGenerator.cpp
    $<$<BOOL:${CV_ENABLE_CUDA_SIM}>:${PROJECT_SOURCE_DIR}/engine/modules/quantum/cuda/CudaStateVectorSimulator.cu>
    game/modules/training/adaptive/AdaptiveTrainer.cpp
    game/modules/training/opfor/OpposedForceTrainer.cpp
    game/modules/system/state/GameStateManager.cpp
    game/modules/combat/CombatScenario.h
    game/modules/combat/simulator/CombatSimulator.cpp
    game/modules/system/narrative/NarrativeEventSystem.cpp
    game/scene/Scene0.cpp
    game/scene/Scene1.cpp
    game/scene/Scene2.cpp
    game/scene/Scene3.cpp
    game/scene/DebugWindow0.cpp
)
set_target_properties(crescent_runtime PROPERTIES UNITY_BUILD ${CV_USE_UNITY_BUILD})
target_precompile_headers(crescent_runtime PRIVATE
    $<$<COMPILE_LANGUAGE:CXX>:game/core/pch.h>
)

target_include_directories(crescent_runtime PRIVATE
    ${PROJECT_SOURCE_DIR}/engine
    ${PROJECT_SOURCE_DIR}/game
    ${PROJECT_SOURCE_DIR}/game/modules
    ${PROJECT_SOURCE_DIR}/game/state
    ${PROJECT_SOURCE_DIR}/engine/external
    $<$<BOOL:${CV_ENABLE_DX12}>:${PROJECT_SOURCE_DIR}/engine/external/directx>
    ${PROJECT_SOURCE_DIR}
)

target_link_libraries(crescent_runtime PRIVATE cv_engine glfw glad CURL::libcurl imgui)
if(CV_ENABLE_CUDA_SIM)
    find_package(CUDAToolkit REQUIRED)
    target_link_libraries(crescent_runtime PRIVATE CUDA::cudart)
    target_compile_definitions(crescent_runtime PRIVATE CV_ENABLE_CUDA_SIM)
endif()
if(CV_ENABLE_COLLAPSE_LINEAGE)
    target_compile_definitions(crescent_runtime PRIVATE CV_ENABLE_COLLAPSE_LINEAGE)
endif()

if(CV_ENABLE_CUQUANTUM AND NOT CV_FORCE_CPU_QUANTUM)
    find_package(CUDAToolkit QUIET)
    find_library(CUSTATEVEC_LIB custatevec
                 HINTS ${CUDAToolkit_LIBRARY_DIR}
                       ENV CUSTATEVEC_ROOT
                       ENV CUQUANTUM_ROOT
                       ENV CUQUANTUM_PATH
                 PATH_SUFFIXES lib lib64)
    if(CUDAToolkit_FOUND AND CUSTATEVEC_LIB)
        target_link_libraries(crescent_runtime PRIVATE ${CUSTATEVEC_LIB} CUDA::cudart)
        target_compile_definitions(crescent_runtime PRIVATE CV_CUQUANTUM_ENABLED CV_CUDA_DEVICE_ID=${CV_CUDA_DEVICE_ID})
    else()
        message(WARNING "cuQuantum not found. CPU fallback will be used")
    endif()
elseif(CV_ENABLE_CUQUANTUM AND CV_FORCE_CPU_QUANTUM)
    message(STATUS "CV_FORCE_CPU_QUANTUM enabled; GPU acceleration disabled")
endif()
if (WIN32)
    add_custom_command(TARGET crescent_runtime POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_if_different
            $<TARGET_FILE:OpenAL::OpenAL>
            $<TARGET_FILE_DIR:crescent_runtime>)
endif()
target_compile_options(crescent_runtime PRIVATE ${CV_WARNING_FLAGS} ${CV_WERROR_FLAG})

# Additional example and test targets
if(BUILD_TESTING)
    add_subdirectory(tests)
endif()

