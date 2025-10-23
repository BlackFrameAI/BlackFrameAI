# Backend Validation

The `cv_backend_validation` demo and the in-game `BackendValidationScene` verify
that each rendering backend initializes correctly.

## Expected Output

Running the demo with `game/assets/config/backend_validation.json` should open one
window per backend. Console logs report initialization:

```
Session 0 OpenGL init ok
Session 1 Vulkan1 init ok
Session 2 Vulkan2 init ok
Session 3 VulkanRTX init ok
Session 4 DirectX11 init ok
Session 5 DirectX12 init ok
Session 6 DirectX12RTX init ok
Session 7 Metal init ok
Session 8 AndroidGLES init ok
```

Closing all windows exits the demo. The example now relies on `cv::Engine`
for the main loop so no manual draw calls or `presentAll` logging appear.
