# hub_upgrade_manager.md

This document defines the **HubUpgradeManager** system for *Purge of the Crescent Veil*.

**Note:** All systems are modular and self-contained. See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the latest status. A system remains **In-Progress** until its documentation, cleanup, and tests are merged and verified.

---

## Purpose

`HubUpgradeManager` tracks hub upgrades the player has unlocked.

- Upgrades are identified by unique string IDs.
- They gate access to new hub features such as vendors or portals.
- Other systems query the manager to check if an upgrade has been earned.

## Public API

```cpp
namespace game {
class HubUpgradeManager {
public:
    // Unlock the specified upgrade if not already present.
    void addUpgrade(const std::string& id);

    // Returns true if the upgrade has been unlocked.
    bool hasUpgrade(const std::string& id) const;

    // Access the list of all unlocked upgrade IDs.
    const std::vector<std::string>& getUpgrades() const;
};
}
```
