# Robotic Actuation Reference Manifest
> **Sanitized Copy:** Specific vendor curves, calibration constants, and proprietary component identifiers have been removed.

This manifest catalogues the knowledge areas Codex references when simulating motors, servos, artificial joints, and their failure behaviours.

---

## ⚙️ Servo Mechanics & Control Systems
**Source Category:** Introductory electromechanical primers and robotics textbooks\\
**Access Level:** Public technical explainers\\
**Usage:** Establishes how command signals, duty cycles, and feedback loops interact so simulations can represent latency, drift, or corrupted inputs without embedding proprietary schematics.

---

## 🔩 Industrial Joint Design
**Source Category:** Manufacturer-neutral robotics anatomy briefings and academic summaries\\
**Access Level:** Public-facing overviews and conference posters\\
**Usage:** Describes joint placement, torque balancing, and fatigue considerations to support limb collisions and shutdown logic while excluding brand-specific tolerances.

---

## 📈 Actuator Performance & Feedback Delay
**Source Category:** General motor performance calculators and control theory coursework\\
**Access Level:** Open-access tools and lectures\\
**Usage:** Supplies load-behaviour intuition, efficiency ranges, and PID tuning effects so Codex can model jitter, overheating, or unstable tracking without distributing proprietary datasets.

---

## 🦿 Synthetic Joint Simulation
**Source Category:** Academic biomechanics and biorobotics publications\\
**Access Level:** University-hosted research summaries\\
**Usage:** Provides torque-driven gait patterns and adaptive balance strategies to power bipedal walkers and chaos-reactive systems while eliding restricted experiment data.

---
