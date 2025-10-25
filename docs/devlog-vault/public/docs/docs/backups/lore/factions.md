# factions.md (Sanitized Overview)

This version omits operational codenames and concealed prophecy markers. Use it for high-level design alignment only.

---

## Major Power Blocs

### [REDACTED] Crusade
a galaxy-spanning militant order devoted to purging corruption. The structure remains hierarchical, enabling Chapter-level vari
ants that influence Faith versus Corruption alignment sliders.

- Visual shorthand: cathedral silhouettes, luminous heraldry, vox-filtered proclamations.
- Gameplay hooks: reputation tiers, inquisitorial audits, branching crusade objectives.

### [REDACTED] Covenant
An esoteric cult network serving an unseen cosmic principle. Cells answer to an anonymized matriarchal oracle whose true epithet
is withheld in secured files.

- Visual shorthand: crescent motifs, veiled figures, glyphwork circuitry.
- Gameplay hooks: clandestine rites, corruption pressure systems, infiltration arcs.

### [REDACTED] Swarm
A coerced xeno collective oscillating between servitude and rebellion. Clans offer modular entry points for future playable arch
types once liberation mechanics unlock.

- Visual shorthand: insectoid silhouettes, biotech grafts, swarm choreography.
- Gameplay hooks: loyalty fractures, rebellion event chains, symbiotic technology trees.

### Independent Actors
Neutral and wildcard groups — mercenary leagues, technocratic enclaves, survivor flotillas, and precursor remnants — exert regio
nal pressure without binding allegiance.

---

## Implementation Notes for CODEX

- Keep faction definitions data-driven so future expansions can append sub-orders or breakaway cells without refactoring core sy
stems.
- Expose only sanitized descriptors in UI strings; fetch canonical terminology from secured localization tables when required.
- Alignment, reputation, and world-state changes must gate access to unrevealed lore markers held in the archival backups.
