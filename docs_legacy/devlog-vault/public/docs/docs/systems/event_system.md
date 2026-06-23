# event_system.md

The **EventSystem** provides a lightweight callback dispatcher shared across engine and game code. It exposes registration, deregistration, and dispatch helpers keyed by string identifiers so modules can exchange notifications without direct dependencies.

## Usage

Listeners register an identifier alongside a callable, then dispatch events using the same key. The dispatcher iterates the listeners synchronously; threading, prioritization, and replay policies are intentionally minimal so subsystems can layer their own behavior when needed.

## Folder Location

`engine/modules/events/system/EventSystem.*`
