# ResourceSystem

The **ResourceSystem** handles loading and caching of engine assets such as shader programs.
It resolves paths relative to the project root and compiles GLSL at runtime using GLAD.

## Responsibilities
- Maintain a cache of loaded resources.
- Provide helpers like `getShader()` to retrieve compiled programs.
- Release all GPU objects on shutdown.

The system is initialized by the engine and accessed by rendering and UI components.
