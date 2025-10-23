# Intelligence Dispatcher System — Modular Engine Subsystem

engine/modules/intelligence_dispatcher/

├── /dispatcher/
│   └── EventUnroller.cpp/.h         # Core dispatcher for high-level logic tasks
│   └── ManifestBinder.cpp/.h        # Links manifest topic to usable runtime params

├── /resolver/
│   └── ReferenceWalker.cpp/.h       # Walks /docs/reference manifests, extracts entries
│   └── DomainClassifier.cpp/.h      # Categorizes task type (visual, physics, bio, entropy)

├── /cache/
│   └── SummaryCache.cpp/.h          # Local DuckDB/SQLite summary + semantic cache
│   └── HotEntryCache.cpp/.h         # In-memory cache for repeated logic pulls

├── /query/
│   └── LogicQuery.cpp/.h            # Handles formatted procedural questions
│   └── DispatchRouter.cpp/.h        # Routes output to target engine subsystems

├── /ingest/
│   └── ManifestIngestor.py          # Offline/boot-time manifest reader + parser
│   └── SourceDistiller.py           # Extracts summaries or embeddings from live URLs

├── /api/
│   └── IntelligenceInterface.h      # Public interface for engine/game access
│   └── ILogicConsumer.h             # For systems that want logic from dispatcher

├── /config/
│   └── dispatcher_flags.json        # Toggles: enable_live_fetch, fallback_mode, compress_threshold

└── README.md                        # Explains the role, flow, and how Codex interacts with it

# Optional:
# If using an LLM assistant backend:
# └── /llm_backend/
#     └── LLMQueryEngine.py          # Local LLM wrapper (e.g. Mistral/Nous)
#     └── PromptFormatter.py         # RAG context injection for Codex-style logic
#     └── EmbedSearch.py             # FAISS or Chroma local lookup fallback






✅ PHASE 1: Stub Creation Prompts (Safe to Run Immediately)
🧠 Create Dispatcher Layer

Create the following stub files in `engine/modules/intelligence_dispatcher/dispatcher/`:

- EventUnroller.cpp/.h: Main dispatcher entry point, handles high-level logic requests.
- ManifestBinder.cpp/.h: Converts resolved manifest concepts into usable runtime parameters.

Each should include class definition, header guards, and a TODO for implementation.
🔍 Create Resolver Layer

Create the following stub files in `engine/modules/intelligence_dispatcher/resolver/`:

- ReferenceWalker.cpp/.h: Reads and walks reference manifests under `/docs/reference`.
- DomainClassifier.cpp/.h: Classifies tasks as visual, physics, biological, entropy, etc.

Include minimal class scaffolds and interface stubs, no runtime logic yet.
🧠 Create Cache Layer (DuckDB-Ready)

Create these stubs in `engine/modules/intelligence_dispatcher/cache/`:

- SummaryCache.cpp/.h: Manages DuckDB-backed cache of reference summary lookups.
- HotEntryCache.cpp/.h: Tracks high-frequency entries in memory.

Stub each with init/teardown functions, and document that `SummaryCache` will embed DuckDB.
🧩 Create Query Layer

Create these files in `engine/modules/intelligence_dispatcher/query/`:

- LogicQuery.cpp/.h: Takes structured requests and converts them to logical resolution calls.
- DispatchRouter.cpp/.h: Routes final answers to engine systems (e.g., particles, audio, visuals).

Stub routing logic and engine hooks — do not implement backends yet.
🔄 Create Ingest Layer

In `engine/modules/intelligence_dispatcher/ingest/`, create:

- ManifestIngestor.py: Scans all `.md` manifests in `/docs/reference`, extracts source entries.
- SourceDistiller.py: Fetches and summarizes remote URLs in manifest entries (optional, disabled by default).

Each script should have function stubs and docstrings but not be wired into runtime yet.
🧩 Create Public API Interface

Add these to `engine/modules/intelligence_dispatcher/api/`:

- IntelligenceInterface.h: Public dispatcher interface for engine and gameplay access.
- ILogicConsumer.h: Interface that systems can implement if they want to receive logic answers.

Include class headers, virtual methods, and brief usage comments.
⚙️ Create Config Stub

Create `dispatcher_flags.json` in `engine/modules/intelligence_dispatcher/config/` with default fields:

{
  "enable_live_fetch": false,
  "fallback_mode": "summary",
  "compress_threshold": 500
}
📘 Create README.md

Create a README.md inside `engine/modules/intelligence_dispatcher/` that explains:

- This is the central logic dispatcher system for semantic tasks
- It bridges high-level instructions with procedural simulation behavior
- Ties into the reference manifest system
- Works alongside Codex and local reasoning assistants



⚙️ PHASE 2: Logic Wiring Prompts
🔌 SummaryCache DuckDB Integration

Implement `SummaryCache.cpp` and `SummaryCache.h` in `engine/modules/intelligence_dispatcher/cache/`.

- Embed DuckDB (statically linked)
- On init, create `engine/data/duckdb/engine_knowledge.duckdb`
- Create table `manifest_entries(domain TEXT, topic TEXT, summary TEXT, source_url TEXT)` if not exists

Add public methods:
- `std::optional<std::string> QuerySummary(const std::string& topic);`
- `void InsertSummary(const std::string& domain, const std::string& topic, const std::string& summary, const std::string& source_url);`

Do not cache in memory yet — file-based only.
🔍 ReferenceWalker Manifest Reader

Implement `ReferenceWalker.cpp` in `engine/modules/intelligence_dispatcher/resolver/`.

Add logic to:
- Read all `.md` files under `/docs/reference/` (recursively)
- Extract entries with structure:
  - Source name
  - Type
  - URL
  - Use

Return a list of matching entries for a given topic string. Later this will feed DispatchRouter.
🧠 DomainClassifier Routing

Implement `DomainClassifier.cpp` in `engine/modules/intelligence_dispatcher/resolver/`.

Add method:
```cpp
std::string ClassifyTopic(const std::string& topic);
Use keywords or manifest domain matches to route requests as one of:

physics, biology, visuals, entropy, audio, lore, history, ai

This will determine which engine system receives the dispatched logic.


### 🧩 EventUnroller Core Logic

In EventUnroller.cpp, implement:


void UnrollEvent(const std::string& highLevelTask);
This should:

Call DomainClassifier to determine category

Query SummaryCache for relevant info

If no match: fallback to ReferenceWalker

Package result and route through DispatchRouter

This is the core entry point for intelligent runtime decisions.



### 🔁 DispatchRouter Hook Stub

In DispatchRouter.cpp, stub:


void RouteToSystem(const std::string& domain, const std::string& logic);
Print debug logs to show what would be sent where. Do not connect to real engine systems yet — this is dry-run mode.




🔗 PHASE 3: Runtime Hook Integration
📡 IntelligenceInterface.h (Public API)

Implement `IntelligenceInterface.h` inside `engine/modules/intelligence_dispatcher/api/`.

Define a singleton-style interface with the following static methods:

- `void Init();` — Initializes SummaryCache and core dispatcher
- `void SubmitLogicRequest(const std::string& highLevelEvent);`

Optionally: allow overload for direct `domain + topic` calls

This will be exposed to gameplay systems, physics, and procedural generators.
🧬 ILogicConsumer Interface

In `ILogicConsumer.h`, define:

```cpp
class ILogicConsumer {
public:
  virtual void OnLogicResolved(const std::string& topic, const std::string& result) = 0;
};
Any engine or game system that wants to receive unrolled logic should implement this.
Codex will register these consumers in DispatchRouter.


### 🔀 DispatchRouter System Linking

Finish DispatchRouter.cpp by allowing:

Registration of ILogicConsumer targets (by domain tag)

DispatchRouter tracks which subsystems want which categories

When EventUnroller completes, it sends logic to the correct consumer(s)

Add debug logs showing resolution chain.



### 🧪 Init Hook

In EventUnroller.cpp or IntelligenceInterface.cpp, add a safe static Init() hook that:

Initializes SummaryCache

Loads fallback dispatcher_flags.json

Logs to runtime console: [Dispatcher] Ready.



Once these are in, you’ll have:

- Full reference-backed runtime logic
- System hooks for dispatchable logic consumers
- Engine-side query layer using your manifest truth




🧠 PHASE 4: Manifest Ingestor + Source Summarizer
This phase is entirely in Python, isolated under:


engine/modules/intelligence_dispatcher/ingest/
📥 ManifestIngestor.py

Create `ManifestIngestor.py`.

Responsibilities:
- Recursively scan `/docs/reference/`
- Parse every `.md` manifest using frontmatter and bullet point format
- Extract:
  - source name
  - type
  - URL
  - use summary
- Store results in DuckDB via `SummaryCache` or standalone write

Requirements:
- Skip malformed entries
- Deduplicate entries by topic + URL
- Log `# entries ingested: N`
🧪 Optional: Summary Extraction

Create `SourceDistiller.py`.

Responsibilities:
- Fetch the actual URL from manifest entry
- Attempt to:
  - Extract page content (use requests + readability or html2text)
  - Truncate or summarize intelligently (GPT or local LLM if available)
  - Store reduced summary in separate DuckDB column (e.g., distilled_summary)

Fallback to placeholder if content can't be fetched.

Disable by default (controlled via dispatcher_flags.json).
🔁 Integration Prompt

Create an engine dev tool or build-time utility that calls `ManifestIngestor.py` before runtime.

Purpose:
- Prepopulate reference summaries into DuckDB before dispatcher is used

Do NOT wire to runtime directly yet — this is a dev-only operation.




💥 Phase 5: Live Fetch + Entropy-Aware Fallback System
This makes the Intelligence Dispatcher self-healing under chaotic or low-data conditions — and optionally able to learn in real time.

🔌 PART 1: Live Reference Fetching
🔧 dispatcher_flags.json Update
Add:


{
  "enable_live_fetch": true,
  "live_fetch_timeout_ms": 2500
}
🔗 Codex Prompt: Enable Live Fetch Path

Modify `ReferenceWalker.cpp`:

If `SummaryCache::QuerySummary()` fails AND `enable_live_fetch` is true:
1. Use `SourceDistiller.py` to fetch the linked source URL in the manifest
2. Parse and summarize the content (truncated or cleaned)
3. Return distilled summary as fallback logic
4. Store in DuckDB for future requests

Timeout should be controlled by config.
Do not retry failed URLs more than once per session.
⚖️ PART 2: Entropy-Aware Fallbacks
⚙️ dispatcher_flags.json Update
Add:

{
  "entropy_mode": "adaptive",
  "fallback_policy": "stencil"
}
🧠 Codex Prompt: Add Entropy-Adaptive Routing

Update `EventUnroller.cpp`:

Before processing any event, check the entropy feed from `engine/modules/entropy/EntropyFeed.cpp`.

If entropy is:
- HIGH: allow live fetch + random-derived logic
- LOW or UNSTABLE: prefer pre-cached summaries only

If no usable summary found: use domain-specific fallback stencil (e.g., `FallbackPhysicsLogic.h`)


🔥 Phase 6: Self-Training & Feedback Loop Memory

This gives your engine persistence across runs, learning which logic paths worked and which failed — allowing Codex-style tuning over time, even offline.

🧠 Overview
We’ll add a new learning/ submodule to the dispatcher:


engine/modules/intelligence_dispatcher/learning/
├── ReinforcementRecorder.cpp/.h   # Logs successful vs failed logic outcomes
├── LogicReplayBuffer.cpp/.h       # Stores reusable logic decisions (entropy-bound)
├── LearningWeightTable.db         # (DuckDB): domain/topic → score/confidence/adaptivity
🎯 Purpose
Build a memory of what logic worked best per domain/task

Reinforce summaries or stencils that resolved cleanly

Auto-weight future logic paths based on past success

Optionally prune or archive low-value summaries over time

✅ Codex Prompts
1. Create Learning Modules

Create the following files:

- ReinforcementRecorder.cpp/.h
- LogicReplayBuffer.cpp/.h

Each should be in: `engine/modules/intelligence_dispatcher/learning/`

Also create a DuckDB file at `engine/data/duckdb/LearningWeightTable.db`
2. Implement ReinforcementRecorder

Implement:

cpp
void RecordOutcome(const std::string& topic, bool success);
Updates LearningWeightTable:

Increments success/failure count for topic

Adds decay-adjusted confidence score

Uses simple exponential smoothing (alpha ~0.3)

Also add:


float GetTopicScore(const std::string& topic);
Returns confidence [0.0–1.0] based on history.



### 3. **Hook into EventUnroller**
After logic is dispatched, allow any ILogicConsumer to return:

cpp
Copy
Edit
void ReportOutcome(bool success);
On receipt, EventUnroller passes result to ReinforcementRecorder.
If no consumer reports, log as neutral.




### 4. **LogicReplayBuffer**
Implement:


void SaveReplay(const std::string& event, const std::string& resolvedLogic);
std::optional<std::string> RecallReplay(const std::string& event);
Used for:

Caching previously successful unrolls

Allowing zero-entropy fallback if logic repeats later




### 5. **Add Config Flags**
In `dispatcher_flags.json`:
```json
{
  "enable_learning": true,
  "replay_buffer_size": 500,
  "decay_factor": 0.9
}






🎯 Phase 7: FallbackStencilSystem
This is your engine’s last line of logic defense — when entropy is low, no reference data is usable, or systems are disconnected, stencils provide hardcoded, safe defaults.

They mimic Codex-style logic but never change at runtime.

📂 File Layout

engine/modules/intelligence_dispatcher/fallback/
├── FallbackStencilSystem.cpp/.h      # Entry point for stencil logic lookup
├── stencils/
│   ├── physics/
│   │   └── default_projectile.stencil
│   │   └── basic_friction.stencil
│   ├── visuals/
│   │   └── foliage_growth_curve.stencil
│   ├── ai/
│   │   └── pursuit_behavior.stencil
│   └── entropy/
│       └── collapse_drift_bounds.stencil
Each .stencil file is a plain-text block of logic, constraints, or fallback values.

✅ Codex Prompts
1. Create FallbackStencilSystem

Create `FallbackStencilSystem.cpp/.h` in `engine/modules/intelligence_dispatcher/fallback/`

Add:
- `std::optional<std::string> LoadStencil(const std::string& domain, const std::string& topic);`

This should:
- Look for matching file under `stencils/{domain}/{topic}.stencil`
- If not found, return nullopt
- If found, return raw logic text
2. Hook Into EventUnroller

In `EventUnroller.cpp`, add:

If SummaryCache + LiveFetch + ReplayBuffer all fail:
→ Call `FallbackStencilSystem::LoadStencil(domain, topic)`
→ If found, route logic as normal (with `[FALLBACK]` log tag)
→ If not found, return `"NO_LOGIC_AVAILABLE"` or system-defined null logic
3. Example Stencil Format

Inside `stencils/physics/default_projectile.stencil`:
```ini
[Projectile]
mass = 0.15
drag = 0.03
gravity = 9.81
lifespan = 2.5
velocity_curve = linear
Interpretation is up to DispatchRouter or target system.
You may define YAML, JSON, or INI-style syntax per domain.



---

### 4. **Devlog Tracking**
Codex should always log when fallback stencil logic is used:
[FALLBACK] Used stencil for topic: default_projectile


---

## ✅ Result

- Your engine now degrades gracefully, even with no references or entropy
- Offline-friendly fallback with persistent behavior
- Codex can always infer **some** behavior, even from empty seed states






🔮 Phase 8: Quantum Logic Integration
Your engine’s dispatcher is now ready to support quantum-collapse-driven logic resolution — meaning quantum events (e.g. collapse, entanglement, decoherence) can request logic from reference manifests, summaries, or fallback stencils in real time.

🧩 Integration Overview
We’ll add dispatcher routing into:

engine/modules/quantum/
├── QuantumCollapseOracle.cpp/.h        # Already exists
├── EntropyFieldSampler.cpp/.h          # Pulls entropy for decisions
└── QuantumEventRegistry.cpp/.h         # Tracks entangled state triggers
Dispatcher links in as a logic resolver for:

Entity state after collapse

Environmental reaction post-observation

Collapse-based procedural content (e.g., terrain, mutations)

✅ Codex Prompts
1. Expose Logic Request from Quantum Systems

In `QuantumCollapseOracle.cpp`, add:

cpp
void ResolveCollapseOutcome(const std::string& topic);
This calls:

IntelligenceInterface::SubmitLogicRequest("quantum:" + topic);
Add topic examples:

"quantum:teleport_failure"

"quantum:wave_function_drift"

"quantum:collapse_mutation_pattern"



### 2. **Route Through EventUnroller**
In EventUnroller.cpp:

When topic starts with "quantum:", strip prefix and set domain = "entropy"

This ensures logic routes to the correct manifest/fallback path.
All quantum logic will treat entropy as its governing domain.



### 3. **QuantumOutcomeListener Interface (Optional)**
In engine/modules/quantum/api/IQuantumLogicConsumer.h, define:


class IQuantumLogicConsumer {
public:
  virtual void OnCollapseResolved(const std::string& logic) = 0;
};
If implemented, DispatchRouter sends the resolved logic here.



### 4. **EntropyGate Tie-In**
If entropy_mode is "gated" in dispatcher_flags.json, EventUnroller must:

Check current field entropy from EntropyFieldSampler

If entropy < 0.5:

Refuse to generate logic

Return "Entropy too low to resolve collapse."



## 🧠 Use Cases Supported:
- Procedural creature traits from collapse stencils
- Field-based failure propagation (entropy-dampened logic)
- High-stakes events like weapon misfire or teleport drift
- Environment reassembly using known physics models



🛠️ Phase 9: Procedural Generation Hooks
This connects your engine’s terrain, visual, sound, and entity generators to the Intelligence Dispatcher — allowing reference-aware, entropy-sensitive, physics-grounded generation of runtime content.

🧩 Integration Points
Dispatcher will now serve logic to:

game/modules/
├── ProceduralTerrainSystem.cpp/.h
├── ProceduralEntitySystem.cpp/.h
├── ProceduralSoundGenerator.cpp/.h
├── ProceduralVisualSystem.cpp/.h
Each one will request domain logic like:

"terrain:grass_distribution"

"visuals:foliage_color_drift"

"audio:creature_idle_low"

"ai:pursuit_behavior"

✅ Codex Prompts
1. Logic Hooks in Procedural Systems

In each system (terrain, entity, sound, visuals), add:

cpp
std::optional<std::string> RequestProceduralLogic(const std::string& topic) {
  return IntelligenceInterface::SubmitLogicRequest(topic);
}
For example:

ProceduralTerrainSystem might request "terrain:rock_fracture_profile"

ProceduralSoundGenerator might request "audio:insect_chitter_loops"


### 2. **Use Domain Prefixes**
Topic strings must use prefixes that match manifest domains:

physics: — for forces, materials, mechanics

visuals: — color, shape, pattern, layout

audio: — loops, reverb, envelope

ai: — reactions, timing, priorities

entropy: — collapse events, mutation logic


### 3. **Runtime Fallback Chain**
If logic fails to resolve (no summary, no stencil, entropy too low):

Systems must handle fallback to:

Default generation constants

“Safe” procedural profiles (e.g., terrain_seed = 0)

Codex should not crash or hang — fallback stencils should be used if defined.


### 4. **Optional: Generation Tuning Flags**
Add in config:
```json
{
  "procedural_use_dispatcher": true,
  "procedural_entropy_sensitivity": "adaptive"
}




🧠 Target Scope
We wire dispatcher logic into:

bash
Copy
Edit
game/modules/ai/
├── EnemyBehaviorController.cpp/.h
├── FactionLogicManager.cpp/.h
├── NPCTaskPlanner.cpp/.h
These systems will now request:

"ai:pursuit_priority"

"ai:cover_timing"

"ai:retreat_threshold"

"ai:ritual_interrupt_chance"

✅ Codex Prompts
1. Add Dispatcher Call to Enemy AI
vbnet
Copy
Edit
In EnemyBehaviorController.cpp:

Before computing movement or attack vectors, call:

```cpp
std::optional<std::string> logic = IntelligenceInterface::SubmitLogicRequest("ai:pursuit_priority");
If value returned:

Parse numeric or tier result (e.g. “high”, “low”, “0.75”)

Adjust state machine behavior weights

yaml
Copy
Edit

---

### 2. **Integrate into Faction Logic**
In FactionLogicManager.cpp:

Call dispatcher for:

"ai:faction_loyalty_mod" → float multiplier (morale decay/growth)

"ai:enemy_preference_bias" → string (e.g. “undead”, “fire-wielding”)

Codex should cache last 5 results per faction.

yaml
Copy
Edit

---

### 3. **NPCTaskPlanner Reactive Logic**
In NPCTaskPlanner.cpp:

When planning tasks, add logic gate:

cpp
Copy
Edit
if (IntelligenceInterface::SubmitLogicRequest("ai:ritual_interrupt_chance") == "high") {
    cancelTask("ritual");
}
Let dispatcher route via entropy and reference if available.

yaml
Copy
Edit

---

### 4. **Logging**
In all cases, log:

```cpp
[DISPATCHER AI] topic=ai:___ result=____ source=[summary|stencil|replay|fallback]
This makes debugging AI behavior traceable to source.

🚨 Hard Safety Rule
DO NOT let dispatcher mutate health, position, or combat result directly.
Dispatcher should influence decision weight, not simulate outcomes.

You can later add:

"ai:formation_drift_range"

"ai:panic_flee_pattern"

"ai:injury_aggression_curve"

…but keep physics and damage routing in engine-core.




