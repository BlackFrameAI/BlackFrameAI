# Blog Publishing Guidelines

- All HTML articles within this directory tree must include the standard community section with:
  - An Utterances comment embed configured for `BlackFrameAI/BlackFrameAI`, using the page pathname and the `blog-comments` label.
  - A short call-to-action inviting readers to follow @blackframeai on X and engage via comments.
  - Place the entire community section as the final visible block of the article content so conversation tools are always available at the bottom of the page.
  - Reuse the community markup from the `birth-of-vibe-coding` article (or extract a shared partial and adopt it across all posts) to keep styling identical from post to post.
- Blog headers must provide a link back to `/blog/` along with the “Follow on X” and “Contact Studio” call-to-action buttons.
- Keep the visual style, typography, and background assets consistent with the `birth-of-vibe-coding` article to preserve brand continuity.
- Every article must define front-matter metadata (`title`, `description`, `slug`, `publishDate`, and `socialImage`) so generated feeds, previews, and analytics stay in sync.
- Whenever you publish or significantly edit a post, update any aggregate listing pages (e.g., `index.html`, `tags/*.html`) so the new content is discoverable.
- Each daily devlog recap must cite concrete evidence from the Devlog Vault or associated day notes. Quote or link the exact documents (for example `docs/devlog-vault/public/Master_Devlog.txt` or `docs/devlogs/day6-first-frame-validation.md`) so readers can verify the claims.
- Highlight both the successes and the failures that unlocked them. Any breakthrough born from a regression or outage—like the Codex bootstrap fix that swapped `apt-get` for `apt`—belongs in that day’s article with explicit attribution to the log entry that proved it happened.
- Summaries should call out at least one failure mode and how it was corrected before celebrating the win.
- Preserve the running cadence: include the production log callout at the top of each dispatch with the in-universe date (e.g., “Day 7 • June 14, 2025”).
