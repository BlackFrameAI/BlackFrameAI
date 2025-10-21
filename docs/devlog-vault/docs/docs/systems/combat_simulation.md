# combat_simulation.md

This document outlines the **Combat Simulation System** (`game/combat/simulator/CombatSimulator.*`). The simulator provides a way to run fully randomized battle scenarios using data driven unit stats. It is intended for AI testing and scripted events that require approximate combat resolution without real-time gameplay.
**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.


## Core Concepts

- Armies are collections of `CombatUnit` entries.
- Each unit defines soldier count, attack, defense and morale values.
- Simulations iterate through multiple rounds until one side has no units remaining or a round limit is reached.
- Casualties are calculated using randomized attack power and defense factors, producing highly varied outcomes.

## Usage

Game systems can create `Army` structures and call `CombatSimulator::Simulate` to obtain a `BattleReport` summary. The report records rounds fought and remaining survivors on both sides. The simulation is deterministic when a seed is provided.

## Scenario Parameters

`CombatSimulator::Simulate` also accepts a `CombatScenario` describing the battle conditions.

- **Terrain** affects attack and defense multipliers (forest, mountain, urban, plain).
- **Weather** can further reduce or boost effectiveness (rain, snow, fog, clear).
- **Difficulty scaling** multiplies unit stats, allowing quick tuning of encounter strength.
- **Randomness multiplier** controls how much variance the simulator introduces each round.
- **Difficulty curve** scales attack and defense by round allowing encounters to ramp up over time.

## CombatScenario

`CombatScenario` is a data structure that defines how a simulation should behave. It is declared in `game/combat/CombatScenario.h`. Designers may load scenario definitions from JSON files or construct them in code. Each field modifies either the starting statistics or the round-to-round scaling of the armies:

- **terrain** – environment type modifying attack and defense values.
- **weather** – optional weather state that further adjusts accuracy and morale.
- **baseDifficulty** – multiplier applied to all unit stats before the simulation begins.
- **randomness** – range controlling the spread of damage each round.
- **difficultyCurve** – list of multipliers that scale attack and defense as rounds progress.

The scenario concept allows the simulator to mimic real-world battles by mixing terrain and weather effects with adjustable difficulty.

## Dynamic Difficulty

When a `difficultyCurve` is provided, the simulator looks up the appropriate multiplier for the current round and applies it to both armies. This enables scenarios where fights start easy and gradually become more lethal or vice versa. If no curve exists, the `baseDifficulty` value is used consistently. Dynamic difficulty lets designers tune encounter pacing without rewriting unit definitions.

## Satellite Telemetry Integration

A separate `SatelliteTelemetrySystem` can supply real-world tracking data to the simulator. The system retrieves JSON from an external API (via libcurl) and converts it into latitude, longitude and altitude fields. When no network is available the system accepts a simulated JSON string to emulate responses. Combat logic may query this data to update targeting or scenario parameters before running a simulation. The simulator looks for a `difficulty` or `threat` field in the incoming packet and multiplies all attack and defense values by that number. If neither field exists the altitude is normalized as `1.0 + alt * 0.001` and applied as a minor difficulty boost.

## Quantum Biasing

`QuantumSimulator` applies a Hadamard/measure cycle on the first qubit at the
start of each simulation. The measured bit slightly biases attack and defense
scaling, introducing a deterministic but unpredictable variation between runs.
