# event_system.md

The **EventSystem** provides a lightweight callback dispatcher used by engine and
game code.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.

---

## Usage

Listeners register a string identifier and a lambda or function.

```cpp
cv::EventSystem events;
events.registerListener("OnReady", [](){ /* ... */ });
events.dispatch("OnReady");
```

The dispatcher simply iterates all listeners for a given key. There is no threading or priority logic.

---

## Folder Location

`engine/modules/events/system/EventSystem.*`
