# player_controller.md

The **PlayerController** system interprets player input and drives the
`PlayerManager` each frame. It reads keyboard and gamepad state from
`engine::InputManager` and converts it into movement and actions.

## Responsibilities

- Handle keyboard and gamepad input.
- Apply sprint logic that drains stamina while Shift is held and
  recovers stamina otherwise.
- Trigger dodge moves that grant short invincibility and quick bursts
  of movement.
- Provide inventory helpers through `AddItem` and `UseItem`.
- Continuously mutate the player sprite while input is detected by
  triggering `QuantumStateVectorManager` with the `"player_input"` event
  and applying the resulting seed via `SetDynamicSprite`.

Other systems create a `PlayerController` instance and call `Update()`
inside the game loop.
