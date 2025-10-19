---
title: Birth of Vibe Coding
date: 2025-10-19
tags:
  - announcement
  - research
summary: Charting the experimental pipeline that lets our AI co-pilot sketch a playable mood board in minutes.
description: First look at the BlackFrame AI Vibe Coding workflow that fuses ML-driven level blocking with human direction.
cover: /assets/blog/vibe-lab-placeholder.svg
---

> "Make the vibe, and the build will follow." — studio mantra, 2025.

Welcome to the very first entry in the BlackFrame AI lab journal. We're kicking things off with a behind-the-scenes look at **Vibe Coding**, our internal toolchain for sketching game feel long before a single asset ships.

## What is Vibe Coding?

Vibe Coding is a *directional prompt* system that feeds our generative runtime a mixture of annotated concept art, ambient scoring clips, and tactile descriptors ("floaty", "grit", "wet stone"). The runtime returns a playable graybox where lighting, pacing, and traversal already match the brief.

![Vibe coding console mockup](/assets/blog/vibe-lab-placeholder.svg "Prototype console that orchestrates prompts, training checkpoints, and live sim captures.")

The console above shows the three-lane workflow we run on every sprint spike:

1. **Prompt** – Markdown briefs with references to `/logs/` entries and design boards.
2. **Synthesize** – A swarm of GPU-side agents negotiates candidate beats, culling anything that breaks canon.
3. **Validate** – The build exports a replay log and *confidence heatmap* for human review.

## Syntax-highlighted agents

Every agent in the swarm is just a regular JavaScript module with a small contract. Here's a real snippet pulled from the synthetic traversal agent.

```js
export default {
  id: "synthetic-traversal",
  guards: ["navmesh-ready", "lighting-baked"],
  async run({ world, metrics }) {
    const trace = world.player.tracePath({
      aggression: 0.42,
      curiosity: 0.81,
      tolerance: 0.15,
    });

    metrics.record("path.length", trace.totalDistance);
    metrics.record("path.elevation", trace.ascents.max());

    if (trace.failures.length) {
      world.flags.raise("pathing-break");
    }

    return trace;
  },
};
```

Notice the guard list: agents won't activate until the navmesh is cooked and the dynamic lights finish baking. That's how we keep the swarm honest.

## Linkable lab logs

We publish raw agent output in Markdown alongside the polished posts. Here's a direct link to the [October 2025 swarm log](/logs/2025-10-19-vibe-swarm-log.md) for anyone who wants to audit the simulation noise.

## What comes next?

Vibe Coding is already running in our internal builds, but we have plenty left to explore: co-creative particle editors, AI sound stage warmups, and procedural QA heuristics that learn your shipping bar.

If you want to follow along, subscribe to the RSS feed or hang out in the blog — the next entry breaks down how we instrument *cinematic shivers* without hand-animating a single camera path.
