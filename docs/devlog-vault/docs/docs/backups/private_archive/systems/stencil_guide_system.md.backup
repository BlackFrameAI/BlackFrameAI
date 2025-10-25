# Stencil Guide System

## Overview

The Stencil Guide System introduces a non-traditional method for guiding procedural visual generation using **mathematical templates** instead of pre-authored sprite sheets. These "stencils" act as *visual influence maps* — structures that constrain and shape the output of both the Oracle and Hybrid quantum systems without directly specifying final pixel data.

This system enables consistent, stylized, high-fidelity visual output without asset bloat or authoring overhead.

---

## Core Function

A stencil is a **template of constraints**, not content. It defines:

- Allowed silhouettes or geometry regions
- Visual weight distribution
- Noise masks or distortion zones
- Edge highlights or shadow zones
- Damage overlays or corruption bias
- Animation flow paths or region velocity curves

Stencils are stored as data assets (e.g., vector maps, flowfields, shape grammars) and are entropy-aware.

---

## Integration with Collapse Pipeline

### Step-by-Step:

1. **IntentRequest specifies stencil class**  
   Example: `IntentRequest(ArmorType::Knight, StencilType::CorruptionLayered)`

2. **Oracle and Hybrid systems receive stencil metadata**  
   - Oracle seeds are tested for stencil alignment  
   - Hybrid generator uses stencil to constrain geometry and layers

3. **Filter & Mutation Layer applies stencil rules**  
   - Clips, redirects, or reshapes generated visual features  
   - Applies style overlays, edge logic, or flow-guided pixel placement

4. **Final visual result is rendered or cached**  
   - Can be dynamically baked into sprite sheets for compatibility  
   - Or rendered live via procedural draw paths

---

## Advantages Over Traditional Sprite Sheets

| Factor                  | Traditional Sprite Sheets               | Stencil-Based Procedural Gen                   |
|-------------------------|-----------------------------------------|------------------------------------------------|
| Disk Size               | 🐘 Huge, especially at HD or 4K         | 🪶 Tiny — pure math + data                     |
| Generation Time         | ❌ Fixed — pre-baked only               | ✅ On-demand, adaptive                         |
| Visual Flexibility      | ❌ Static frames only                   | ♾️ Infinite variation within stencil class     |
| Damage/Corruption State | ❌ Needs extra frames/assets            | ✅ Procedural overlays with entropy gates      |
| Animation Fluidity      | ❌ Discrete, choppy transitions         | ✅ Smooth, entropy-modulated morphing          |
| Memory Bandwidth        | ❌ Needs VRAM for entire sheet          | ✅ Only generated regions needed               |
| Entropy Responsiveness  | ❌ Impossible                           | ✅ Fully reactive to system field entropy      |
| Authoring Time          | 🧍‍♂️ Artist-dependent                  | 🧠 Template + entropy = endless results        |

---

## Use Cases

- Corrupted armor with entropy-reactive scratch patterns  
- Helmet silhouettes that always obey anatomical correctness but vary in detail  
- Spell glyphs that evolve based on field resonance  
- Enemy species with shared body plans but chaotic trait overlays  

---

## Advanced Possibilities

- **Entropy-weighted stencil morphing** — stencils themselves mutate slightly under high chaos  
- **Stencil LOD layers** — simplified versions with fewer regions or detail passes  
- **Hybrid fallback stencils** — more rigid shapes used when chaos stencils fail to promote  
- **Animated stencils** — region masks that shift in time for procedural idle or movement animation  

---

## Summary

The Stencil Guide System bridges chaos and structure. It enables:

- Consistency without repetition  
- Entropy with stability  
- Style without asset bloat

Combined with the engine’s quantum collapse architecture, stencil-based visual scaffolding offers a scalable, generative, and performance-safe method for expressing infinite visual states across characters, items, environments, and effects.

It replaces the *what to draw* model with *how to shape what emerges.*

### Runtime Resolver
`StencilResolver` interprets `PhysicsReactionEvent` information and the current `ThemeManager` state to produce a **StencilDescriptor**. This descriptor contains the resolved stencil type, the active theme style, tint color, `size`, optional `width`/`height`, anchor point and an entropy modulation value. Callback fields may be attached so UI sprites can respond to input. `StencilGuideSystem` emits these descriptors to registered callbacks or a polling queue so that procedural generators can create visuals on demand.

Two helper APIs are provided:

```cpp
StencilDescriptor requestStencilByEvent(const PhysicsReactionEvent&);
StencilDescriptor requestStencilByType(const std::string& name);
```

Descriptors can describe UI stencils such as `UI_Button`, `UI_TextField` and `UI_Frame`, ensuring the system can drive both gameplay effects and interface components without direct asset dependencies.

Callbacks are registered via `registerDescriptorCallback`, which returns a handle
that can be passed to `unregisterDescriptorCallback` when the listener is no
longer needed.

### Callback Guard

`StencilGuideSystem` now prevents recursive emission. `emitDescriptor` sets an internal `m_emitting` flag while notifying callbacks so a callback that queues another descriptor will not trigger a loop.
