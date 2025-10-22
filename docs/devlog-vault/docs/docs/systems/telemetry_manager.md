# telemetry_manager.md

The **TelemetryManager** aggregates data from registered sensor sources and delivers
unified telemetry packets for other systems. Sources implement `ITelemetrySource`
and push JSON payloads into `TelemetryPacket` structures. The manager can be
polled each frame to gather all pending packets.

---

## Purpose

- Provide a common interface for various data sources.
- Streamline integration of live APIs and offline simulation feeds.

## Usage

```cpp
#include "telemetry/manager/TelemetryManager.h"

cv::TelemetryManager manager;
manager.registerSource("satellite", satelliteSource);
for (const auto& pkt : manager.gather()) {
    // process pkt.payload
}
```

Each source implements `ITelemetrySource` and produces a JSON payload stored in
`TelemetryPacket`.

When unit testing you can provide a dummy source that inserts known data and
verify that `gather()` returns the expected packet. See `TelemetryManagerTests`
for a minimal example.
