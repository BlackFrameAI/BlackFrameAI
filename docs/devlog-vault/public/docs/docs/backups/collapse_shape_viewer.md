# collapse_shape_viewer.md

The **Collapse Shape Viewer** is a small console utility that reads a JSON file
exported from `CollapseLineageLogger` and prints the magnitude of each qubit
state before and after collapse. The program does not require an OpenGL
context and relies only on the engine library for the logger structures.

---

## Usage

Build the tool and run it with a path to a JSON log file:

```bash
./CollapseShapeViewer collapse_log.json
```

The JSON file should contain an array of entries, each matching the fields of
`CollapseLineageEntry` (`hash`, `pre`, `post`). The tool outputs the hash and
vectors' magnitudes in a simple text format.
