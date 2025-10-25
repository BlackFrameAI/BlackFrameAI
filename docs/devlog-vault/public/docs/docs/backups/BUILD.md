# Build Notes

## Headless Tests

- Build presets default to enabling unit tests so headless validation runs by default. Disable the testing cache variable if you need faster local builds.
- Headless validation cases cover rendering and UI components without an active graphics context and should emit a single warning when no context is present.
- Continuous integration executes the suite with `ctest` to verify stability in automated environments.
