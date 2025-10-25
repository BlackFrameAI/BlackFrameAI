cmake_minimum_required(VERSION 3.25)
project(PurgeOfTheCrescentVeil LANGUAGES C CXX)

# Compiler cache detection (exact launchers redacted in private repository)
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

# Feature toggles
option(BUILD_TESTING "Build unit tests" ON)
option(CV_ENABLE_VULKAN "Enable Vulkan rendering backend" OFF)
option(CV_ENABLE_DX12 "Enable DirectX 12 rendering backend" OFF)
option(CV_ENABLE_CUQUANTUM "Enable GPU state vector simulator" ON)
option(CV_FORCE_CPU_QUANTUM "Force CPU fallback" OFF)
option(CV_ENABLE_CUDA_SIM "Enable CUDA simulator" OFF)
option(CV_USE_ENGINE_QUANTUM "Build quantum subsystem" ON)
option(CV_USE_UNITY_BUILD "Enable unity build mode" ON)
option(CV_ENABLE_INFO_LOGS "Enable info logs" ON)
option(CV_ENABLE_DEBUG_LOGS "Enable debug logs" ON)
option(CV_FORCE_LOGS "Force logs in Release" ON)
option(CV_ENABLE_COLLAPSE_LINEAGE "Enable collapse lineage logger" OFF)
option(CV_PRODUCTION_MODE "Enable production mode" OFF)
option(CV_ENABLE_VGU_GRID "Enable debug grid drawing" ON)
option(CV_DIAGNOSTIC_BUILD "Enable diagnostic warnings" OFF)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Global warning policies and per-compiler flags are defined in the private
# configuration. Sensitive workflow notes, regression checks, and target-specific
# diagnostics have been removed for public distribution.

# External dependencies (full configuration removed):
#   - GLFW
#   - Glad (OpenGL loader)
#   - OpenAL Soft
#   - Dear ImGui
#   - Asio
#   - Lua
#   - cURL
#   - Optional CUDA/cuQuantum integrations

# Target definitions and internal directory layouts are intentionally omitted
# from this sanitized copy. Refer to the private repository for the complete
# source lists and build graph.
