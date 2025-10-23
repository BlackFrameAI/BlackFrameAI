# Testing Guide (Public Summary)

This guide summarizes how the engine and game are validated without exposing internal infrastructure details.

## Unit Testing

Unit tests cover individual engine modules and game systems. Build them with `BUILD_TESTING=ON` and run the suite with `ctest`.

## Integration Testing

- Integration tests for the render system rely on a proprietary middleware package. Distribution details are [REDACTED] for security.
