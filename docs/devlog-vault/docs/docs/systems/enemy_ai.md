# enemy_ai.md

This document defines the **Enemy AI System** for *Purge of the Crescent Veil*.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.


---

## Core Concepts

- Enemy AI is **faction-based** → enemies behave according to their faction identity.
- AI behaviors must be:
    - Modular
    - Data-driven
    - Scalable to support:
        - Alignment-based behaviors
        - Stage corruption modifiers
        - Faction-controlled zones
        - Boss encounters
        - Space Combat (for relevant units)

---

## Faction AI Profiles

### Eternal Empire Enemies

- Aggressive front-line tactics
- Group cohesion
- Alignment-based zealotry triggers
- “Faith-frenzy” states at certain thresholds

---

### Crescent Veil Enemies

- Ambush tactics
- Hit-and-fade behavior
- Alignment-based corruption surges
- Summoning support units

---

### Skitterkin Enemies

- Swarm AI
- Pack hunting behavior
- Alignment-based berserk triggers
- Faction loyalty overrides

---

### Rogue/Neutral Enemies

- Variable behavior sets
- Often alignment-reactive
- Potential to shift faction allegiance mid-run

---

## Boss AI

- Multi-phase behaviors
- Dynamic phase shifts
- Reactive to:
    - Player alignment
    - Player progression
    - Narrative triggers
    - Space Combat outcomes (for cross-system bosses)

---

## Planned Features

- AI profiles should support:
    - Event-driven state machines
    - Faction-specific behavior trees
    - Alignment-reactive logic
    - Environmental awareness

## Enemy State Machine

Enemies now rely on a lightweight state machine defined under `game/modules/enemy/`. Each instance owns an `EnemyStateMachine` which transitions between `Idle`, `Aggressive` and `Flee` states.
Transitions evaluate the player's alignment and a simple environmental value provided by the active stage.

### Example Behaviors

- **Idle \u2192 Aggressive**: triggered when corruption outweighs faith or the stage number exceeds 2.
- **Aggressive \u2192 Flee**: occurs if faith vastly exceeds corruption and the stage is calm.
- **Flee \u2192 Idle**: once environmental pressure drops below 1, enemies resume patrol.

### Using EnemyStateMachine

Each enemy owns an instance of `EnemyStateMachine`. Typical usage:

1. Construct the machine with a starting `EnemyState` (usually `Idle`).
2. Register transitions with `AddTransition(from, to, condition)`.
3. Call `Update(alignment, environment)` every frame to evaluate transitions.
4. Query the current state with `GetState()` when determining behavior.

```cpp
EnemyStateMachine sm(EnemyState::Idle);
sm.AddTransition(EnemyState::Idle, EnemyState::Aggressive,
    [](float align, float env){ return align < 0.f && env > 0.5f; });
sm.Update(-1.f, 1.f); // state becomes Aggressive
```

## Scripted Behavior Trees

Enemies now load Lua scripts from `game/assets/scripts/` to evaluate behavior trees.
`EnemyAIController` uses a `BehaviorRouter` to select an `IEnemyBehavior`
implementation for each enemy. Scripted behaviors execute the `decide_state`
function defined in the Lua file whenever alignment or environment values
change. When a state switch occurs the manager dispatches events such as
`kEnemyAggressiveEvent`, `kEnemyFleeEvent`, or `kEnemyIdleEvent`. These events allow other systems
to react to enemy behavior.

Alignment and environment values are passed directly to the script, enabling
faction AI to react dynamically to faith/corruption swings and stage hazards.

## Modular Controllers

Enemy AI logic is now split across focused helpers:

- **EnemyAIController** – updates each enemy's state machine and triggers behavior events.
- **EnemySpawnHandler** – handles spawning and removing enemies, including physics bodies and visual effects.
- **EnemyCollisionRegistrar** – forwards collision updates to `CollisionSystem`.
- **BehaviorRouter** – maps enemy scripts or types to `IEnemyBehavior` implementations.

`EnemyManager` delegates to these modules for cleaner separation of concerns.

## Behavior Routing

`BehaviorRouter` selects the correct AI logic for each enemy. It stores
instances implementing the `IEnemyBehavior` interface and returns one based on
the enemy type or script name. `IEnemyBehavior` defines a single method:
`decideState(const Enemy&, const EnvironmentContext&)` which returns the next
`EnemyState` for a given set of inputs.

Two behavior classes ship with the current prototype:

- **ScriptedEnemyBehavior** – loads a Lua file and calls its `decide_state`
  function. Scripts react to alignment and stage values to determine the state
  transitions.
- **DefaultEnemyBehavior** – fallback logic used when no script exists. It
  mirrors the old hard-coded decisions so legacy enemies still function.

`EnemyAIController` requests a behavior from the router every update and applies
the returned state to the enemy's `EnemyStateMachine`.

## Final Manager Behavior

`EnemyManager` stores all active `Enemy` records and orchestrates updates each frame.
After the AI controller chooses states, the spawn handler advances movement and
sprite animations. Enemies are automatically removed when they fall below the
play area, exit the stage bounds, or remain offscreen longer than the configured
threshold (60 frames by default). Removal spawns an explosion particle effect
and dispatches `kEnemyRemovedEvent`.

The manager also dispatches:

- `kEnemySpawnedEvent` whenever `SpawnEnemy` adds a new enemy.
- `kEnemyClearedEvent` when `ClearEnemies` removes all enemies at once.
- `kEnemyDefeatedEvent` when `DamageEnemy` reduces health to zero.

Physics bodies and camera shake are handled inside `EnemySpawnHandler` via the
`PhysicsCore`, keeping physics and visual effects separate from AI
concerns.
