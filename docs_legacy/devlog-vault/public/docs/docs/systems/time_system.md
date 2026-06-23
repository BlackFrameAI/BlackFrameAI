# Time System (Public Summary)

## Overview
The timekeeping service tracks frame progression for the engine and surfaces timing data to other
modules. Implementation details, file locations, and scheduler hooks were removed from this release.

## Responsibilities
- Capture frame deltas to support deterministic updates.
- Accumulate total runtime for analytics and pacing systems.
- Offer configurable rate limiting for builds that require a capped frame rate.

## Usage Guidance
External teams can treat the time system as a read-only provider of timing metrics. Integration
samples, class names, and platform-specific tuning advice remain in the private documentation set.
