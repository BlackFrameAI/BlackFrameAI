# HIL Interface

The Hardware-in-the-Loop (HIL) interface bridges the engine with external simulators or prototype devices without exposing transport-level details.

## Purpose

* Allow the game to exchange command and sensor data with attached hardware in real time.
* Let gameplay systems test against physical components while keeping business logic unchanged.

## Usage Pattern

* Clients register callbacks to forward outgoing command bytes and to process sensor packets on arrival.
* Connections are established through configurable endpoints defined by the caller.
* The engine wires default logging callbacks at startup; game code may replace them to integrate real devices or simulators.

## Gameplay Hooks

* Powerup collection emits compact command codes that peripherals can react to.
* Incoming telemetry is routed through `Game::handleSensorData` so hardware signals can influence shields or alignment effects.
