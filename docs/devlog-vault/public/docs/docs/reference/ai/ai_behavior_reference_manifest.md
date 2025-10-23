# AI Behavior Reference Manifest (Sanitized)

This manifest summarizes neutral guidelines for structuring enemy and NPC behavior without referencing specific individuals, proprietary methodologies, or restricted datasets. Use these principles to support realistic decision-making, threat assessment, and group coordination across factions and creature types.

---

## 📘 General AI & Game Logic

- Emphasize modular state machines, behavior trees, and steering systems to keep transitions readable and debuggable.
- Separate perception, decision, and action layers so enemies can react to new stimuli without rewriting core states.
- Keep goal arbitration transparent by defining clear priorities for patrol, search, pursuit, and retreat behaviors.

---

## 🧠 Flocking, Group Behavior, and Emergence

- Implement cohesion, alignment, and separation rules to simulate herds, swarms, or crowds without full pathfinding.
- Add lightweight wander and avoidance forces so groups can re-center, flow around obstacles, and split/rejoin naturally.
- Allow faction-specific modifiers so emergent packs can feel distinct (e.g., disciplined formations vs. chaotic mobs).

---

## 🪖 Tactical & Combat Behavior

- Model uncertainty and partial information when planning engagements; let agents hesitate or reposition when vision is obscured.
- Balance aggressive pushes with suppression, cover-seeking, or flanking logic to keep encounters varied.
- Include psychological triggers for fear, morale, or frenzy states so enemies escalate or withdraw based on perceived threat.

---

## 🔍 Debugging & Tuning Tips

- Visualize perception cones, flock vectors, and decision weights to validate that sanitised logic matches design intent.
- Log state transitions and influence factors so designers can quickly identify odd loops or stuck behaviors.
- Expose key parameters (awareness radius, cohesion strength, morale thresholds) for rapid iteration without code changes.
