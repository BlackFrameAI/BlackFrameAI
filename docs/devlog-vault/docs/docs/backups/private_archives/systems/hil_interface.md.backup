# hil_interface.md

The **HILInterface** provides a lightweight bridge for hardware-in-the-loop (HIL)
**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.

communication. It abstracts serial or network links so game systems can issue
commands and receive sensor packets without managing low level transport code.

---

## Purpose

- Support connecting to external simulators or prototype hardware.
- Allow game logic to run against physical devices in real time.

## Usage

```cpp
#include "modules/hardware/hil/HILInterface.h"

cv::HILInterface hil;
hil.setCommandCallback([](const std::vector<uint8_t>& cmd) {
    // forward command bytes to serial port or socket
});
hil.setSensorCallback([](const std::vector<uint8_t>& data) {
    // parse incoming sensor bytes
});

hil.connect("127.0.0.1", 9000);
hil.sendCommand({0x01, 0xFF});
// when new data arrives from the device
hil.onReceive(sensorBytes);
```

The interface leaves actual I/O implementation to the user supplied callbacks.
`connect` and `disconnect` simply toggle an internal flag and log activity.

The engine now creates a single `HILInterface` during startup and attaches
simple logging callbacks. Game code may replace these callbacks to forward
commands or parse incoming sensor packets.

## Gameplay Hooks

The game layer now uses `sendCommand` when the player collects a powerup. Each
powerup type maps to a short command byte that external hardware can react to.
Incoming sensor packets are routed through `Game::handleSensorData` which
applies shields or alignment shifts based on the first byte of data.
