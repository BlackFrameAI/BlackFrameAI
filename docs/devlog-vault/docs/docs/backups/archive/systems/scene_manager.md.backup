# scene_manager.md

The **SceneManager** maintains a stack of active scenes and handles transitions.

## Responsibilities
- `PushScene` and `PopScene` manage the active scene list.
- `StartTransition` and `CompleteTransition` replace the top scene when ready.
- Call `Update` and `Render` on all active and transitioning scenes each frame.
- `Render` skips scenes whose `IScene::GetWindowIndex` doesn't match the pipeline
  window, logging a warning instead.

See [docs/modular/game_system_tree.md](../modular/game_system_tree.md) for the current modularization status.
