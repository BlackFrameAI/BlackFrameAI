# Build Notes

## Headless Tests

- Build presets enable `BUILD_TESTING=ON`, ensuring the test executables compile. Set `CV_BUILD_TESTING=OFF` before running `scripts/setup.sh` if you need to skip them.
- Tests such as `SharedGLResourceFactoryNoContextTest`, `ProceduralFontGeneratorNoContextTest`, and `ImGuiPassNoContextTest` run without an active OpenGL context.
- These tests expect to log a single warning when no context is available and otherwise return safe values.
- `scripts/build.sh` automatically runs the full suite via `ctest`, allowing headless environments to verify behaviour.
