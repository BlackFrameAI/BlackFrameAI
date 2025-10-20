# Blog Publishing Guidelines

- All HTML articles within this directory tree must include the standard community section with:
  - A CountAPI-powered like button with `data-counter-key` set to the article slug.
  - An Utterances comment embed configured for `BlackFrameAI/BlackFrameAI`, using the page pathname and the `blog-comments` label.
  - Place the entire community section as the final visible block of the article content so likes and comments are always available at the bottom of the page.
  - Reuse the community markup from the `birth-of-vibe-coding` article (or extract a shared partial and adopt it across all posts) to keep styling identical from post to post.
- Blog headers must provide a link back to `/blog/` along with the “Follow on X” and “Contact Studio” call-to-action buttons.
- Keep the visual style, typography, and background assets consistent with the `birth-of-vibe-coding` article to preserve brand continuity.
- Every article must define front-matter metadata (`title`, `description`, `slug`, `publishDate`, and `socialImage`) so generated feeds, previews, and analytics stay in sync.
- Whenever you publish or significantly edit a post, update any aggregate listing pages (e.g., `index.html`, `tags/*.html`) so the new content is discoverable.
