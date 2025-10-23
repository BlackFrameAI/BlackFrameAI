# Player Controller (Public Summary)

The player controller translates input signals into in-game actions while keeping
specific control bindings private. Movement, stamina usage, and evasive windows
are coordinated with the player management layer so other systems receive
normalized intent instead of raw key data.

## Overview

- Consumes input from the engine without exposing device-specific mappings.
- Maintains pacing rules for stamina drain and recovery alongside dodge timing.
- Broadcasts abstracted events to animation and state systems to update visuals
  without leaking internal identifiers.
- Offers inventory hooks through anonymized helpers so gameplay scripts can
  request item usage without referencing internal method names.
