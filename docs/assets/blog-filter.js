(function (global) {
  function setupBlogFilter(rootDocument) {
    const doc = rootDocument || (global && global.document);
    if (!doc) return;

    const buttons = Array.from(doc.querySelectorAll('.filter-button'));
    const postList = doc.querySelector('[data-post-list]');
    const posts = postList ? Array.from(postList.querySelectorAll('.post-card')) : [];
    const searchInput = doc.querySelector('[data-post-search]');
    const status = doc.querySelector('[data-post-count]');
    const emptyState = doc.querySelector('[data-no-results]');

    if (!buttons.length || !posts.length) return;

    const search = (global && global.location && typeof global.location.search === 'string')
      ? global.location.search
      : '';
    const params = typeof URLSearchParams !== 'undefined' ? new URLSearchParams(search) : null;
    const initialTopic = params && params.get('topic') ? params.get('topic') : 'all';
    const state = {
      topic: initialTopic,
      query: searchInput ? searchInput.value.trim().toLowerCase() : '',
    };

    const updateStatus = (visibleCount) => {
      if (!status) return;
      const topicLabel = state.topic === 'all'
        ? 'all topics'
        : (doc.querySelector(`.filter-button[data-topic="${state.topic}"]`)?.textContent || state.topic);
      const queryLabel = state.query ? ` matching "${state.query}"` : '';
      status.textContent = `${visibleCount} post${visibleCount === 1 ? '' : 's'} in ${topicLabel}${queryLabel}`;
    };

    const postMatches = (post) => {
      const tags = (post.dataset.tags || '').split(/\s+/).filter(Boolean);
      const matchesTopic = state.topic === 'all' || tags.includes(state.topic);
      if (!matchesTopic) return false;

      if (!state.query) return true;
      const haystack = `${post.querySelector('h2')?.textContent || ''} ${post.querySelector('.post-excerpt')?.textContent || ''}`
        .toLowerCase();
      return haystack.includes(state.query);
    };

    const applyFilter = (nextTopic) => {
      if (nextTopic) {
        state.topic = nextTopic;
      }

      buttons.forEach((button) => {
        const isActive = button.dataset.topic === state.topic;
        button.setAttribute('aria-pressed', String(isActive));
      });

      let visibleCount = 0;
      posts.forEach((post) => {
        if (postMatches(post)) {
          visibleCount += 1;
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

      updateStatus(visibleCount);

      if (emptyState) {
        if (visibleCount === 0) {
          emptyState.removeAttribute('hidden');
          emptyState.setAttribute('aria-live', 'polite');
        } else {
          emptyState.setAttribute('hidden', '');
          emptyState.removeAttribute('aria-live');
        }
      }
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

    if (searchInput) {
      const handleSearch = () => {
        state.query = searchInput.value.trim().toLowerCase();
        applyFilter();
      };

      searchInput.addEventListener('input', handleSearch);
    }

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
