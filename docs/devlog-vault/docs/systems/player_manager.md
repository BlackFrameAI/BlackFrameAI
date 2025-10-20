# player_manager.md

The **PlayerManager** system maintains the player's position, stats and visual sprite instance. It interfaces with the InputManager to update movement and provides helpers for temporary boosts like shields or speed bonuses. Other systems query PlayerManager for player state and inventory data.

See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for current modularization status.
