const { setupBlogFilter } = require('../docs/assets/blog-filter');

describe('blog filter controls', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <div class="filter-bar" role="toolbar" aria-label="Filter posts by topic">
          <button class="filter-button" type="button" data-topic="all" aria-pressed="true">All posts</button>
          <button class="filter-button" type="button" data-topic="agentic-workflows" aria-pressed="false">Agentic Workflows</button>
          <button class="filter-button" type="button" data-topic="studio-culture" aria-pressed="false">Studio Culture</button>
        </div>
        <section class="posts-list" data-post-list>
          <article class="post-card" data-tags="agentic-workflows studio-culture">
            <h2>Agentic article</h2>
          </article>
          <article class="post-card" data-tags="studio-culture">
            <h2>Studio culture article</h2>
          </article>
        </section>
      </div>
    `;
  });

  test('hides non matching posts and reveals matches when a topic button is clicked', () => {
    setupBlogFilter(document);

    const agenticButton = document.querySelector('[data-topic="agentic-workflows"]');
    const allButton = document.querySelector('[data-topic="all"]');
    const matchingPost = document.querySelectorAll('.post-card')[0];
    const nonMatchingPost = document.querySelectorAll('.post-card')[1];

    agenticButton.click();

    expect(agenticButton.getAttribute('aria-pressed')).toBe('true');
    expect(allButton.getAttribute('aria-pressed')).toBe('false');

    expect(nonMatchingPost.getAttribute('hidden')).toBe('');
    expect(nonMatchingPost.getAttribute('aria-hidden')).toBe('true');
    expect(nonMatchingPost.dataset.hidden).toBe('true');

    expect(matchingPost.hasAttribute('hidden')).toBe(false);
    expect(matchingPost.hasAttribute('aria-hidden')).toBe(false);
    expect(matchingPost.dataset.hidden).toBeUndefined();
  });
});
