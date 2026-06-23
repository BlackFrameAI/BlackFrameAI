# satellite_telemetry.md

This document outlines the **SatelliteTelemetrySystem** located under
`game/tracking/satellite/` used by the engine.
**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.

---

## Purpose

- Provide optional satellite tracking data for the Combat Simulation and other modules.
- Fetches JSON from a remote API using libcurl.
- Offers a simulation mode when network access is unavailable.

## Initialization

`SatelliteTelemetrySystem` is initialized with a configured API endpoint defined in secure runtime settings. When the endpoint is unavailable you can supply a JSON payload for offline testing.

```cpp
#include "tracking/satellite/SatelliteTelemetrySystem.h"

game::SatelliteTelemetrySystem telemetry;
telemetry.initialize(loadConfiguredEndpoint());
telemetry.setSimulatedResponse(buildSimulatedPayload());
```

> **Payload Summary:** The simulated response contains an object with the satellite identifier plus latitude, longitude, and altitude values expressed in floating point units.

## Fetch Example

```cpp
auto result = telemetry.fetch(requestedSatelliteId);
if (result) {
    float lat = result->latitude;
    float lon = result->longitude;
    float alt = result->altitude;
}
```

The call requests the given satellite identifier. If the network request fails it falls back to the simulated JSON payload described above.

## Engine Workflow

`SatelliteTelemetrySystem` implements `ITelemetrySource` and registers with
`TelemetryManager` during `Game::StartGame`.
The manager gathers packets every frame and forwards them to systems such as
`SpaceManager` or `CombatSimulator` for processing.

## Simulated Generator

When no network data is available, the system can produce synthetic
telemetry using `SatelliteTelemetryGenerator`. The generator supports
randomized values or a simple orbital model.

```cpp
game::TelemetryGenOptions opts;
opts.mode = game::TelemetryGenMode::Orbit;
opts.orbitInclination = 45.f;
telemetry.enableSimulation(opts);
```

Each call to `fetch` will advance the generator and return new latitude,
longitude and altitude values.
