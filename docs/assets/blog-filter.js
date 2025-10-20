(function (global) {
  function setupBlogFilter(rootDocument) {
    const doc = rootDocument || (global && global.document);
    if (!doc) return;

    const buttons = Array.from(doc.querySelectorAll('.filter-button'));
    const postList = doc.querySelector('[data-post-list]');
    const posts = postList ? Array.from(postList.querySelectorAll('.post-card')) : [];

    if (!buttons.length || !posts.length) return;

    const search = (global && global.location && typeof global.location.search === 'string')
      ? global.location.search
      : '';
    const params = typeof URLSearchParams !== 'undefined' ? new URLSearchParams(search) : null;
    const initialTopic = params && params.get('topic') ? params.get('topic') : 'all';

    const applyFilter = (topic) => {
      buttons.forEach((button) => {
        const isActive = button.dataset.topic === topic;
        button.setAttribute('aria-pressed', String(isActive));
      });

      posts.forEach((post) => {
        const tags = (post.dataset.tags || '').split(/\s+/).filter(Boolean);
        const matches = topic === 'all' || tags.includes(topic);
        if (matches) {
          post.removeAttribute('data-hidden');
          delete post.dataset.hidden;
          post.removeAttribute('hidden');
          post.removeAttribute('aria-hidden');
        } else {
          post.dataset.hidden = 'true';
          post.setAttribute('hidden', '');
          post.setAttribute('aria-hidden', 'true');
        }
      });
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const topic = button.dataset.topic || 'all';
        if (button.getAttribute('aria-pressed') === 'true') return;
        applyFilter(topic);

        if (global && global.URL && global.history && typeof global.history.replaceState === 'function') {
          const currentHref = (global.location && global.location.href) || 'http://localhost/';
          const url = new URL(currentHref);
          if (topic === 'all') {
            url.searchParams.delete('topic');
          } else {
            url.searchParams.set('topic', topic);
          }
          global.history.replaceState({}, '', url.toString());
        }
      });
    });

    const hasInitial = buttons.some((btn) => btn.dataset.topic === initialTopic);
    applyFilter(hasInitial ? initialTopic : 'all');

    return {
      applyFilter,
    };
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { setupBlogFilter };
  }

  if (global && global.document) {
    global.setupBlogFilter = setupBlogFilter;
    const autoInit = () => setupBlogFilter();
    if (global.document.readyState === 'loading') {
      global.document.addEventListener('DOMContentLoaded', autoInit, { once: true });
    } else {
      autoInit();
    }
  }
})(typeof window !== 'undefined' ? window : globalThis);
