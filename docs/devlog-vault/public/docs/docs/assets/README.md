# Assets Overview

This folder catalogs external assets required by the current project in a redacted form.

## Audio Files

Sound effects are generated at runtime by the internal audio engine rather than stored as discrete samples.
Looping music tracks are provided as standard compressed audio and streamed as needed.
If synthesis or initialization fails, the system logs a warning and skips playback for the affected cue.
