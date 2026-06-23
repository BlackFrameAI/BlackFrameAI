# Hub Upgrade Manager

`HubUpgradeManager` keeps track of player unlocks that gate hub features inside *Purge of the Crescent Veil*.

## Purpose

* Maintain the list of unlocked upgrade identifiers.
* Inform other systems when new vendors, portals, or similar hub features should activate.

## Public API Overview

```cpp
namespace game {
class HubUpgradeManager {
public:
    void addUpgrade(const std::string& id);
    bool hasUpgrade(const std::string& id) const;
    const std::vector<std::string>& getUpgrades() const;
};
}
```

The implementation simply stores the identifiers and exposes read-only accessors so dependent systems can remain stateless.
