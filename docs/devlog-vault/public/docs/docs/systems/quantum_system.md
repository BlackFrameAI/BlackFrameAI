# Quantum System

The quantum system documentation introduces the experimental simulation stack that underpins entropy-aware gameplay features. It summarizes the lightweight baseline simulator, extended statevector implementation, and supporting management utilities while omitting sensitive gate recipes or hardware identifiers.

## Baseline Simulator
- Provides a configurable number of qubits with a catalogue of themed gate sequences.
- Uses a registry so new gate collections can be added at runtime without modifying the simulator core.
- Supports basic measurement for generating pseudo-random bits used by combat and progression systems.

## Extended Statevector Simulator
- Scales to larger registers and can optionally run on GPU hardware when authorized.
- Accepts initialization, gate application, and collapse commands through sanitized interfaces.
- Derives deterministic seeds from probability caches without exposing raw amplitude data.

## Resource Manager
- Supplies preconfigured simulator instances to other systems based on requested capacity.
- Keeps GPU assignments abstract so deployments can balance workloads without revealing device indices.
- Allows callers to request adjustable qubit counts while enforcing guardrails to prevent low-entropy setups.

## Operational Safeguards
- Mixed-mode operation blends CPU and GPU results through anonymized hashing rather than transferring state vectors.
- Probability statistics are reported as aggregated counters for observability without leaking fine-grained collapse history.
- Asynchronous oracle components expose readiness checks so consumers only draw from validated pools.
