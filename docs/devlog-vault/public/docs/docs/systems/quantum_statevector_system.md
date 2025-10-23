# Quantum Statevector System

The quantum statevector system provides a managed interface for running high-fidelity quantum simulations with optional hardware acceleration. It encapsulates simulator selection, trigger management, and seed harvesting so gameplay code interacts only with stable service endpoints.

## Capabilities
- Supports both CPU and GPU execution paths and can fall back seamlessly if acceleration libraries are unavailable.
- Offers frame, chunk, and event-driven triggers so subsystems can schedule collapses without exposing sensitive identifiers.
- Tracks summary statistics (entropy levels, collapse counts, execution mode) for diagnostics while omitting raw state information.
- Stores harvested entropy seeds in named buckets, enabling later analytics without surfacing underlying probabilities.

## Operational Flow
1. Subsystems register triggers with optional tagging metadata.
2. During updates the manager evaluates pending triggers and issues collapse requests to the active simulator.
3. Resulting seeds and anonymized metrics are recorded for downstream consumers.
4. Debug builds may emit additional telemetry when explicitly enabled; release configurations remain silent by default.

## Tooling Notes
- Buckets and statistics can be cleared or queried through accessor methods that avoid leaking simulator internals.
- Hashing routines reduce detailed probability data to deterministic seeds without preserving raw amplitudes.
- Automated tests exercise initialization, fallback handling, and seed retrieval to ensure consistent behaviour across platforms.
