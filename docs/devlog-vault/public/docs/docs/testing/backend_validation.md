# Backend Validation (Public Summary)

The backend validation demo confirms that each supported rendering backend starts correctly and reports its status.

## Expected Output

Running the demo opens one window per backend. Console logs report initialization success in the form:

```
Session [REDACTED BACKEND ID] [REDACTED BACKEND NAME] init ok
```

Closing all windows exits the demo. The example relies on the shared engine main loop, so no manual draw calls or verbose diagnostics are exposed here.
