# Codex Prompts for DuckDB-Backed Knowledge Cache in Intelligence Dispatcher

---

## 🐣 1. Create SummaryCache Subsystem

Create `SummaryCache.cpp` and `SummaryCache.h` inside `engine/modules/intelligence_dispatcher/cache/`.

This subsystem must:
- Embed DuckDB using static linking
- Initialize a database file at `engine/data/duckdb/engine_knowledge.duckdb`
- On first launch: create table `manifest_entries(domain TEXT, topic TEXT, summary TEXT, source_url TEXT)`
- Provide a public method:
  ```cpp
  std::optional<std::string> QuerySummary(const std::string& topic);
  ```
- Optionally preload hot entries into memory (future task)

---

## 🧠 2. Implement QuerySummary()

Implement the method `QuerySummary(topic)` in `SummaryCache.cpp` to:
- Open the existing `engine_knowledge.duckdb` database
- Execute a SELECT on `manifest_entries` WHERE topic LIKE `%{topic}%`
- Return the summary if found
- Return std::nullopt if not

Use prepared statements and protect against injection.

---

## 🧼 3. Add Entry Insert Function

Add method:
```cpp
void InsertSummary(const std::string& domain, const std::string& topic, const std::string& summary, const std::string& source_url);
```

This should:
- Use DuckDB connection
- INSERT OR IGNORE into the table to avoid duplicate topic entries

This will be used by the Ingestor pipeline later.

---

## 🧪 4. Add Startup Check (Optional Hook)

Hook the `SummaryCache` initialization into engine startup or Dispatcher init.

If database file does not exist:
- Create all required tables
- Log to `engine/logs/dispatcher.log`: `"[CACHE] New DuckDB cache initialized."`

---

## 🔌 5. Add Fallback to ManifestWalker

Modify or stub `ReferenceWalker.cpp` to:
- Attempt to resolve summary via `SummaryCache::QuerySummary()`
- If `nullopt`, fallback to loading full .md manifest manually (next task)

---

## ✅ Behavior
- This setup should always prefer cached summaries
- Allow offline use
- Enable high-speed access to condensed knowledge entries from manifests

---

## 💬 Optional
Suggest future prompt:
> "Create a manifest ingestor that parses all `.md` files in `/docs/reference` and extracts summaries into the DuckDB cache."
