# network_simulation_manager.md

The **NetworkSimulationManager** replicates entity states across nodes and keeps
deterministic simulations synchronized. It uses the standalone **Asio** library
for lightweight UDP networking.
The source lives under `engine/modules/network/manager/`.

---

## Purpose

- Provide a minimal networking layer for multiplayer features.
- Transmit replicated entity transforms between peers.
- Maintain frame numbers for deterministic lockstep.

## Usage

```cpp
#include "network/manager/NetworkSimulationManager.h"

cv::NetworkSimulationManager net;
net.initialize(true, "", 7777); // start as server

cv::ReplicatedEntityState state{1, 10.f, 5.f, 0.f, 42};
net.replicateEntityState(state);
```

Call `update` every frame to process network events and `consumeReplicatedStates`
to retrieve incoming state data.
The engine initializes this manager in `Engine::Init` using the same parameters,
so multiplayer tests work out of the box.

Unit tests create a server and client instance on `localhost` and verify that
replicated packets are exchanged correctly. See `NetworkSimulationManagerTests`
for reference.
