# network_simulation_manager.md

The **NetworkSimulationManager** replicates entity states across nodes and keeps deterministic simulations synchronized. It relies on a lightweight UDP layer for packet transport and abstracts the underlying socket implementation.

---

## Purpose

- Provide a minimal networking layer for multiplayer features.
- Transmit replicated entity transforms between peers.
- Maintain frame numbers for deterministic lockstep.

## Usage

```cpp
#include "network/manager/NetworkSimulationManager.h"

NetworkSimulationManager net;
net.initialize(/*isServer=*/true, /*bindAddress=*/"", /*listenPort=*/DEFAULT_PORT);

ReplicatedEntityState state{entityId, positionX, positionY, rotation, frameNumber};
net.replicateEntityState(state);
```

Call `update` every frame to process network events and `consumeReplicatedStates` to retrieve incoming state data. The engine boot sequence initializes the manager with the same parameters so multiplayer tests work out of the box.

Unit tests create a server and client instance on localhost and verify that replicated packets are exchanged correctly. See `NetworkSimulationManagerTests` for reference.
