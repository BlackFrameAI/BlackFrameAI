# Testing Guide

This guide summarizes how the engine and game are validated.

## Unit Testing

Unit tests cover individual engine modules and game systems. They
compile with `BUILD_TESTING=ON` and run via `ctest`.

## Integration Testing

- Integration tests for the **Render System** require the proprietary
  **NVKStack** library. NVKStack is provided separately as compiled
  binaries.
