# Passive Tree (Sanitized)

This document provides a high-level summary of the passive tree feature without exposing proprietary quest logic or data files.

## Overview
- Maintains a registry of passive ability nodes identified by unique keys.
- Stores prerequisite relationships and unlocked state for each node.
- Delegates unlock timing to higher-level narrative or progression controllers.

## Core Behaviors
- Registration calls [REDACTED] to add nodes and prerequisite lists if they are not already present.
- Unlocking nodes flips an internal flag; prerequisite validation happens in calling systems to keep this module focused on state tracking.
- Query helpers return the current unlock status so other gameplay layers can react accordingly.

The sanitized description retains the intent of the feature while omitting implementation specifics tied to [REDACTED].
