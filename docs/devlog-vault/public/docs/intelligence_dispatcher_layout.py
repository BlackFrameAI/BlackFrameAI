# Intelligence Dispatcher System — Modular Engine Subsystem

modules/intelligence_dispatcher/

├── dispatcher/
│   ├── EventUnroller.cpp/.h         # Core dispatcher for high-level logic tasks
│   └── ManifestBinder.cpp/.h        # Links manifest topics to runtime parameters
│
├── resolver/
│   ├── ReferenceWalker.cpp/.h       # Traverses reference manifests and extracts entries
│   └── DomainClassifier.cpp/.h      # Categorizes task domains (visual, physics, bio, entropy)
│
├── cache/
│   ├── SummaryCache.cpp/.h          # DuckDB/SQLite summary and semantic cache
│   └── HotEntryCache.cpp/.h         # In-memory cache for repeated logic pulls
│
├── query/
│   ├── LogicQuery.cpp/.h            # Formats procedural questions
│   └── DispatchRouter.cpp/.h        # Routes output to engine subsystems
│
├── ingest/
│   ├── ManifestIngestor.py          # Boot-time manifest reader and parser
│   └── SourceDistiller.py           # Summarises remote sources when enabled
│
├── api/
│   ├── IntelligenceInterface.h      # Public interface for engine/game access
│   └── ILogicConsumer.h             # Implemented by systems that consume dispatcher output
│
├── config/
│   └── dispatcher_flags.json        # enable_live_fetch, fallback_mode, compress_threshold
│
└── README.md                        # Explains role, flow, and integration points

# Optional LLM backend components
# └── llm_backend/
#     ├── LLMQueryEngine.py          # Wrapper around a local LLM runtime
#     ├── PromptFormatter.py         # Injects retrieved context into prompts
#     └── EmbedSearch.py             # Local vector search fallback



PHASE OVERVIEW (PUBLIC SUMMARY)

Phase 1 — Stub Foundations:
- Establish dispatcher, resolver, cache, query, ingest, and API layers with header/implementation shells.
- Document configuration defaults, data flow, and integration expectations in README.md.

Phase 2 — Core Integrations:
- Connect SummaryCache to a DuckDB database located under engine data storage.
- Extend ReferenceWalker to index markdown manifests beneath docs/reference/.
- Implement DomainClassifier heuristics to route topics across physics, biology, visuals, entropy, audio, lore, history, and AI.
- Prepare EventUnroller to orchestrate dispatcher actions while other subsystems mature.
