# audio_event_tracker.md

The **AudioEventTracker** logs playback events for debugging and balance. Recent events can be displayed in an overlay or exported as CSV.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.

---

## Usage

Call `AudioEventTracker::recordEvent()` whenever a sound plays. Events are kept in a small ring buffer.

```cpp
engine::AudioEvent evt{"pickup","health",1.0f,1.0f};
engine::AudioEventTracker::recordEvent(evt);
```

---

## Folder Location

`engine/modules/audio/shared/AudioEventTracker.*`
