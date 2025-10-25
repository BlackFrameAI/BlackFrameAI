# Physics + Biological Reference Manifest

This manifest defines external sources of truth for biological constraints, physical limits, and real-world anatomical or simulation reference data. These files and repositories are NOT stored in the main project but are used during development to guide Codex scaffolding.

Codex is expected to reference these when generating:

- Animation constraint systems
- Motion stencils
- Joint limits
- Particle behaviors (blood, splash, fracture, etc.)
- Anatomical responses to impact

---

## 📘 Anatomy Reference

**Name:** Gray’s Anatomy (1918)\
**Type:** Public Domain PDF (with labeled visuals)\
**URL:** [https://archive.org/download/anatomyofhumanbo1918gray/anatomyofhumanbo1918gray.pdf](https://archive.org/download/anatomyofhumanbo1918gray/anatomyofhumanbo1918gray.pdf)

Use: Human bone/muscle structure, joint limit reference, tissue layer mapping

---

## 🦿 Biomechanical Simulation

**Name:** OpenSim Core\
**Type:** GitHub Repository\
**URL:** [https://github.com/opensim-org/opensim-core](https://github.com/opensim-org/opensim-core)

Use: Joint torque modeling, gait simulation, limb response curves, musculoskeletal templates

---

## 🏃 Human Motion Data

**Name:** OpenBiomechanics Project\
**Type:** Dataset & Analysis Tools\
**URL:** [https://www.openbiomechanics.org](https://www.openbiomechanics.org)(https://github.com/drivelineresearch/openbiomechanics)

Use: Motion capture profiles, sports biomechanics (walk/run/throw), joint angle ranges, stride patterning

---

## 📚 Biomechanics Theory

**Name:** Fundamentals of Biomechanics – Duane Knudson\
**Type:** PDF textbook\
**URL:** [https://www.academia.edu/96976765/Book\_FundamentalsOfBiomechanics](https://www.academia.edu/96976765/Book_FundamentalsOfBiomechanics)

Use: Real-world definitions of mechanical behavior in tissue, body modeling under stress, fluid/body reaction to force

---

## Setup Instructions

Use the `fetch_references.sh` script to populate a local `dev_references/` folder with the required materials. Do not commit the downloaded files — they are for Codex dev only.

Expected Codex usage:

```cpp
// Codex reference context:
// docs/references/physics_biology_manifest.md
// dev_references/GraysAnatomy1918.pdf
// dev_references/opensim-core/Models/
```

---

## Note

All resources listed are open-source, public domain, or educational-use safe. If newer resources are added, update this manifest with:

- Name
- Type
- Direct URL
- Summary of how Codex can use it
Keep this manifest lean and up to date. If you add internal documents or private datasets, mark them clearly with INTERNAL USE ONLY and avoid committing large binary files to Git.


