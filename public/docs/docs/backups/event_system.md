# Event Dispatcher Overview

The event dispatcher links engine and gameplay systems using lightweight notifications. The original documentation included implementation specifics and private identifiers; this public note covers only the concepts.

## Responsibilities
- Allow systems to subscribe to named events without requiring compile-time dependencies.
- Deliver callbacks synchronously in the order they were registered, keeping threading rules explicit and simple.
- Support safe removal of listeners during dispatch by deferring modifications until the current pass completes.

## Typical Workflow
1. A system registers a listener with a descriptive key.
2. Producers emit the key when state changes or milestones occur.
3. Listeners execute quickly and avoid storing engine internals so the dispatcher remains decoupled.

## Location & Integration
The dispatcher lives in the engine module tree alongside other cross-cutting utilities. Game features should use this shared service instead of rolling bespoke messaging layers.

All proprietary identifiers and code samples have been removed for the public release.
