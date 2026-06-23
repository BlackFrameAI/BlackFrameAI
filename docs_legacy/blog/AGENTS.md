# Blog Publishing Guidelines

These rules apply to every file under `docs/blog/`. Treat them as non-negotiable unless a more specific `AGENTS.md` overrides them.

## File organization
- Place individual articles in their own folder using the pattern `YYYY-MM-DD-slug/` so the URL slug and publish date are obvious at a glance.
- Inside each article folder keep the primary HTML/MDX file named `index.html` (or `index.mdx` if using Astro components) so static-site routing remains consistent.
- Co-locate supporting assets (images, diagrams, downloads) inside an `assets/` subdirectory under the article folder. Refer to them with relative paths.

## Front matter & metadata
- Every article must start with front matter defining `title`, `description`, `slug`, `publishDate`, `updatedDate` (if different), `tags`, and `socialImage`.
- Dates must be ISO8601 strings (e.g., `2025-06-14`). If you revise an article substantially, bump `updatedDate` and add a changelog entry at the bottom.
- Keep `slug` identical to the article folder name and the canonical URL path.

## Narrative structure
- Open with the production log callout containing the in-universe day count and calendar date (e.g., `Day 7 • June 14, 2025`).
- Follow immediately with a concise TL;DR summary (3 bullet points max) covering the primary outcome, one challenge, and the key takeaway.
- The main body should progress chronologically: `Setup`, `Breakthroughs`, `Failures & Fixes`, `Next Steps`.
- Each daily devlog recap must cite concrete evidence from the Devlog Vault or associated day notes. Quote or link the exact documents (for example `docs/devlog-vault/public/Master_Devlog.txt` or `docs/devlogs/day6-first-frame-validation.md`) so readers can verify the claims.
- Highlight both the successes and the failures that unlocked them. Summaries should call out at least one failure mode and how it was corrected before celebrating the win.

## Visual & interaction standards
- Blog headers must provide a link back to `/blog/` along with the “Follow on X” and “Contact Studio” call-to-action buttons.
- Keep the visual style, typography, and background assets consistent with the `birth-of-vibe-coding` article to preserve brand continuity.
- All HTML articles must include the standard community section as the final visible block of content. It consists of:
  - A short call-to-action inviting readers to follow @blackframeai on X and engage via comments.
  - An Utterances comment embed configured for `BlackFrameAI/BlackFrameAI`, using the page pathname and the `blog-comments` label.
  - The community markup should match the `birth-of-vibe-coding` article (or a shared partial derived from it) to keep styling identical.

## Cross-linking & listings
- Whenever you publish or significantly edit a post, update aggregate listing pages (e.g., `index.html`, `tags/*.html`, RSS feeds) so the new content is discoverable.
- Maintain per-post `related articles` links pointing to at least two other entries that share a tag or theme.
- When you add a new tag, ensure the tag archive page exists and is linked from `/blog/tags/`.

## Quality bar
- Run the HTML validator (`npm run lint:content` if available) before committing new or updated posts.
- Ensure all images include descriptive `alt` text and are optimized for <200 KB where possible.
- Proof every article for tense consistency and correct voice; use American English spelling unless quoting.
- Peer review: have at least one teammate read the draft and sign off in the pull request checklist before publishing.

