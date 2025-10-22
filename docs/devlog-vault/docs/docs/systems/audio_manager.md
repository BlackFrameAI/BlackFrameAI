# audio_manager.md

The **AudioManager** wraps `SynthEngine` and owns the audio broker. It exposes a simple update loop for the engine.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.

---

## Responsibilities

- Initialize and shutdown the `AudioBroker` device.
- Drive `SynthEngine::Update()` each frame when playback is enabled.

---

## Folder Location

`engine/modules/audio/manager/AudioManager.*`
