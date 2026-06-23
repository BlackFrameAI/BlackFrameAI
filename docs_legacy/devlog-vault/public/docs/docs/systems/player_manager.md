# Player Manager (Public Summary)

The player manager aggregates sanitized player state so collaborators receive
consistent snapshots without privileged handles. Position, vitals, status effects,
and loadout metadata are shared only through curated facades.

## Responsibilities

- Mirror motion updates from the controller via anonymized channels that hide component
  names and transform handles.
- Maintain core stats, shields, and temporary effects using obfuscated identifiers so
  callers only observe safe aggregates.
- Provide inventory queries and mutation hooks that redact storage slots, blueprint
  hashes, and any sensitive identifiers.
- Surface diagnostic counters (health percentage, buff uptime) for dashboards while
  filtering out raw physics or networking references.

## Coordination

- Downstream systems request read-only snapshots instead of direct structure access.
- Admin tooling can trigger support workflows (e.g., revive, cleanse debuff) through
  audited, parameter-light endpoints that avoid leaking internal schema details.
