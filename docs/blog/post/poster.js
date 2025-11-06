'use strict';

const passwordHash = 'd5a226c87fe957fa58e08821fcaaf28abebb6e1730e7dbe836d6908179fa83b0'; // sha256(new passcode)
const storageKey = 'blogPosterAuthV3';

const loginView = document.getElementById('login-view');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const posterView = document.getElementById('poster-view');
const resultsView = document.getElementById('results-view');
const form = document.getElementById('post-form');
const resetBtn = document.getElementById('reset-btn');

const outputFields = {
  postPath: document.getElementById('post-path'),
  postHtml: document.getElementById('post-html'),
  indexCard: document.getElementById('index-card'),
  jsonLd: document.getElementById('json-ld'),
  rssItem: document.getElementById('rss-item'),
  atomEntry: document.getElementById('atom-entry'),
  commitMessage: document.getElementById('commit-message'),
};

const passwordForm = document.getElementById('password-form');
const passwordResetBtn = document.getElementById('password-reset-btn');
const passwordOutput = document.getElementById('password-output');
const passwordFeedback = document.getElementById('password-feedback');
const newPassInput = document.getElementById('new-passcode');
const confirmPassInput = document.getElementById('confirm-passcode');
const passwordHashOutput = document.getElementById('password-hash-output');
const passwordSnippet = document.getElementById('password-snippet');
const passwordCommand = document.getElementById('password-command');

async function sha256Hex(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function showPoster() {
  loginView.classList.add('hidden');
  posterView.classList.remove('hidden');
  loginError.classList.add('hidden');
}

function hidePoster() {
  posterView.classList.add('hidden');
  loginView.classList.remove('hidden');
}

function checkStoredAuth() {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored && stored === passwordHash) {
      showPoster();
    }
  } catch (_) {
    // Ignore storage errors on strict browsers
  }
}

function setDefaultDates() {
  const publishInput = form.elements['publish-date'];
  const logInput = form.elements['log-date'];
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setUTCDate(today.getUTCDate() + 1);
  const fmt = (d) => d.toISOString().slice(0, 10);
  if (publishInput) publishInput.value = publishInput.value || fmt(tomorrow);
  if (logInput) logInput.value = logInput.value || fmt(today);
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, '&#96;');
}

function formatDisplayDate(dateStr) {
  const date = new Date(`${dateStr}T00:00:00Z`);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

function formatRssDate(dateStr, timeStr, zoneLabel) {
  const date = new Date(`${dateStr}T${timeStr || '00:00'}:00Z`);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weekday = weekdays[date.getUTCDay()];
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${weekday}, ${day} ${month} ${year} ${hours}:${minutes}:00 ${zoneLabel}`;
}

function isoPublish(dateStr, timeStr) {
  return `${dateStr}T${timeStr || '00:00'}:00Z`;
}

function buildTldrList(raw) {
  const items = raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  if (!items.length) {
    return '';
  }
  const rendered = items.map((item) => `<li>${item}</li>`).join('\n            ');
  return `<ul class="tldr">
            ${rendered}
          </ul>`;
}

function markdownLiteToHtml(input) {
  const trimmed = input.trim();
  if (!trimmed) {
    return '';
  }
  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    return trimmed;
  }

  const lines = trimmed.split(/\r?\n/);
  const html = [];
  let buffer = [];
  let inList = false;

  const flushParagraph = () => {
    if (!buffer.length) return;
    const text = buffer.join(' ').trim();
    if (text) {
      html.push(`<p>${escapeHtml(text)}</p>`);
    }
    buffer = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      return;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      const level = headingMatch[1].length + 1;
      const text = escapeHtml(headingMatch[2].trim());
      html.push(`<h${level}>${text}</h${level}>`);
      return;
    }

    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      const item = line.replace(/^[-*]\s+/, '');
      html.push(`<li>${escapeHtml(item)}</li>`);
      return;
    }

    buffer.push(line);
  });

  flushParagraph();
  if (inList) {
    html.push('</ul>');
  }

  return html.join('\n        ');
}

function tagBadge(tag) {
  const mapping = {
    'engine-rd': 'Engine R&amp;D',
    'workflow-automation': 'Workflow Automation',
    'agentic-workflows': 'Agentic Workflows',
    'partner-playbooks': 'Partner Playbooks',
    'studio-culture': 'Studio Culture',
    'devlog-vault': 'Devlog Vault',
  };
  if (mapping[tag]) {
    return mapping[tag];
  }
  return escapeHtml(tag.replace(/-/g, ' ')).replace(/\b\w/g, (c) => c.toUpperCase());
}

function generatePostTemplate(data) {
  const {
    title,
    slug,
    publishDate,
    metaDescription,
    socialImage,
    tags,
    tldrHtml,
    impactHtml,
    articleHtml,
    displayDate,
    logLabel,
    logDate,
    logDisplayDate,
    excerpt,
    relatedLinks,
    changelogNote,
  } = data;

  const frontMatterTags = tags.map((tag) => `  - ${tag}`).join('\n');
  const metaTags = tags
    .map((tag) => `  <meta property="article:tag" content="${escapeAttr(tag)}" />`)
    .join('\n  ');

  const relatedList = relatedLinks
    .filter((link) => link.title && link.url)
    .map((link) => `<li><a href="${escapeAttr(link.url)}">${escapeHtml(link.title)}</a></li>`)
    .join('\n            ');

  const changelog = changelogNote
    ? `<li><time datetime="${publishDate}">${displayDate}</time>, ${escapeHtml(changelogNote)}</li>`
    : `<li><time datetime="${publishDate}">${displayDate}</time>, Initial publication.</li>`;

  const articleBody = articleHtml || '<p>Draft content missing.</p>';

  return `<!DOCTYPE html>
<!--
---
title: ${escapeHtml(title)} | BlackFrame AI Studio
description: ${escapeHtml(metaDescription)}
slug: ${slug}
publishDate: ${publishDate}
updatedDate: ${publishDate}
socialImage: ${socialImage}
tags:
${frontMatterTags || '  - engine-rd'}
---
-->
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://utteranc.es https://plausible.io https://challenges.cloudflare.com https://ajax.cloudflare.com; style-src 'self' 'unsafe-inline' https://cloudflarefonts.com; img-src 'self' data: https://utteranc.es; font-src 'self' https://cloudflarefonts.com https://fonts.cloudflare.com; connect-src 'self' https://plausible.io; frame-src https://utteranc.es; base-uri 'self'; form-action 'self'; upgrade-insecure-requests" />
  <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
  <meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()" />
  <title>${escapeHtml(title)} | BlackFrame AI Studio</title>
  <meta name="description" content="${escapeAttr(metaDescription)}" />
  <link rel="icon" href="/favicon.ico" type="image/x-icon" />
  <link rel="canonical" href="https://www.blackframeai.org/blog/${slug}/" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeAttr(title)}" />
  <meta property="og:description" content="${escapeAttr(metaDescription)}" />
  <meta property="og:url" content="https://www.blackframeai.org/blog/${slug}/" />
  <meta property="og:image" content="https://www.blackframeai.org${escapeAttr(socialImage)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeAttr(title)}" />
  <meta name="twitter:description" content="${escapeAttr(metaDescription)}" />
  <meta name="twitter:image" content="https://www.blackframeai.org${escapeAttr(socialImage)}" />
  ${metaTags || ''}
  <link rel="manifest" href="/manifest.json" />

  <link rel="preconnect" href="https://cloudflarefonts.com" crossorigin>
  <link rel="preconnect" href="https://fonts.cloudflare.com" crossorigin>
  <link rel="preload" href="/assets/styles.min.css" as="style">
  <link rel="stylesheet" href="/assets/styles.min.css">
  <noscript><link rel="stylesheet" href="/assets/styles.min.css"></noscript>
  <link rel="stylesheet" href="https://cloudflarefonts.com/css2?family=Inter:wght@400;600;700&display=swap" crossorigin>
</head>
<body>
  <a class="skip-link" href="#article-main">Skip to article content</a>
  <header class="site-header" role="banner">
    <div class="site-header__inner">
      <a class="site-brand" href="/blog/" aria-label="BlackFrame AI blog home">
        <picture>
          <source srcset="/assets/blackflamelogo.avif" type="image/avif">
          <source srcset="/assets/blackflamelogo.webp" type="image/webp">
          <img src="/assets/blackflame_logo_cleaned.svg" alt="BlackFrame AI logo" width="400" height="400" loading="eager" fetchpriority="high">
        </picture>
        <span>Studio Blog</span>
      </a>
      <nav class="site-nav" aria-label="Primary">
        <ul class="site-nav__list">
          <li><a class="site-nav__link" href="/">Home</a></li>
          <li><a class="site-nav__link" href="/blog/" aria-current="page">Blog</a></li>
          <li><a class="site-nav__link" href="/services/">Services</a></li>
          <li><a class="site-nav__link" href="/partner-playbooks/">Partner Playbooks</a></li>
          <li><a class="site-nav__link" href="/devlog-vault/">Devlog Vault</a></li>
          <li><a class="site-nav__link" href="/contact/">Contact</a></li>
        </ul>
        <div class="site-nav__meta" role="group" aria-label="Studio quick links">
          <a href="https://cal.com/blackframeai/partnership-intro" target="_blank" rel="noopener noreferrer">Book a capabilities call</a>
          <a href="mailto:studio@blackframeai.org">studio@blackframeai.org</a>
          <a href="https://x.com/blackframeai" target="_blank" rel="noopener noreferrer">Follow @blackframeai</a>
        </div>
      </nav>
    </div>
  </header>
  <div class="page">
    <main id="article-main">
      <article class="blog-article">
        <header class="article-header">
          <div class="article-header__meta">
            <p class="article-header__details">
              <span class="article-type">Studio Dispatch</span>
              <time datetime="${publishDate}">${displayDate}</time>
            </p>
            <p class="article-production-log">Production log: ${escapeHtml(logLabel)} · <time datetime="${logDate}">${logDisplayDate}</time></p>
          </div>
          <h1>${escapeHtml(title)}</h1>
          ${tldrHtml}
        </header>

        <section class="ai-claim-callout" aria-labelledby="ai-proof-heading">
          <span class="ai-claim-callout__label" id="ai-proof-heading">Why this day matters</span>
          ${impactHtml || '<p>Summarize why this dispatch matters.</p>'}
        </section>

        ${articleBody}

        <section class="author-card" aria-labelledby="author-heading">
          <h2 id="author-heading">Authored by BlackFrame AI Studio</h2>
          <p>We pair autonomous agents with human editors to ship production-ready engines, tools, and dispatches. Have questions? <a href="mailto:studio@blackframeai.org">studio@blackframeai.org</a></p>
        </section>

        <section class="related-posts" aria-labelledby="related-heading">
          <h2 id="related-heading">Continue the arc</h2>
          <ul class="related-list">
            ${relatedList || '<li><a href="/blog/">Browse the archive</a></li>'}
          </ul>
        </section>

        <section class="changelog" aria-labelledby="changelog-heading">
          <h2 id="changelog-heading">Changelog</h2>
          <ul>
            ${changelog}
          </ul>
        </section>

        <section class="community-section" aria-labelledby="community-heading">
          <h2 id="community-heading">Join the studio signal</h2>
          <p class="community-lead">Follow <a href="https://x.com/blackframeai" target="_blank" rel="noopener noreferrer">@blackframeai</a> on X for live drops, then leave your take below—every comment feeds the training data steering the next sprint.</p>
          <div class="comment-container">
            <script src="https://utteranc.es/client.js"
              repo="BlackFrameAI/BlackFrameAI"
              issue-term="pathname"
              label="blog-comments"
              theme="github-dark"
              crossorigin="anonymous"
              async>
            </script>
            <p class="moderation-note">Community guidelines stay simple: stay constructive, cite sources, and help us keep the vault verifiable.</p>
          </div>
        </section>
      </article>
    </main>
    <footer>
      &copy; <span id="year">2025</span> BlackFrame AI Studio. All rights reserved.
    </footer>
  </div>
  <script>
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  </script>
</body>
</html>`;
}

function generateIndexCard(data) {
  const { slug, title, publishDate, displayDate, logLabel, logDate, logDisplayDate, tags, excerpt } = data;
  const tagAttr = tags.join(' ');
  const tagBadges = tags.map((tag) => `<span class="tag-badge">${tagBadge(tag)}</span>`).join('\n            ');
  const slugTail = slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  return `<article class="post-card" aria-labelledby="post-${slugTail}" data-tags="${tagAttr}" data-publish="${publishDate}" data-log="${logDate}">
  <p class="post-meta">
    <span class="latest-badge">Latest Post</span>
    <span>Studio Dispatch</span>
    <time datetime="${publishDate}">${displayDate}</time>
  </p>
  <p class="post-log-note">Production log: ${escapeHtml(logLabel)} • <time datetime="${logDate}">${logDisplayDate}</time></p>
  <h2 id="post-${slugTail}"><a href="/blog/${slug}/">${escapeHtml(title)}</a></h2>
  <div class="tag-badges" aria-label="Post tags">
    ${tagBadges}
  </div>
  <p class="post-excerpt">${escapeHtml(excerpt)}</p>
  <a class="post-cta" href="/blog/${slug}/" aria-label="Read ${escapeHtml(title)}">
    Read the full story
    <span aria-hidden="true">→</span>
  </a>
</article>`;
}

function generateJsonLdEntry(data) {
  const { title, slug, publishDate, logDate } = data;
  return `{
        "@type": "BlogPosting",
        "headline": "${escapeAttr(title)}",
        "url": "https://www.blackframeai.org/blog/${slug}/",
        "datePublished": "${publishDate}",
        "dateCreated": "${logDate}"
      }`;
}

function generateRssItem(data) {
  const { title, slug, rssSummary, rssDate, publishIso } = data;
  return `<item>
      <title>${escapeAttr(title)}</title>
      <link>https://www.blackframeai.org/blog/${slug}/</link>
      <guid>https://www.blackframeai.org/blog/${slug}/</guid>
      <pubDate>${rssDate}</pubDate>
      <dc:date>${publishIso}</dc:date>
      <description><![CDATA[${rssSummary}]]></description>
    </item>`;
}

function generateAtomEntry(data) {
  const { title, slug, publishIso, rssSummary } = data;
  return `<entry>
    <title>${escapeAttr(title)}</title>
    <link href="https://www.blackframeai.org/blog/${slug}/" />
    <id>https://www.blackframeai.org/blog/${slug}/</id>
    <updated>${publishIso}</updated>
    <published>${publishIso}</published>
    <summary type="html"><![CDATA[${rssSummary}]]></summary>
  </entry>`;
}

function buildDataFromForm(formData) {
  const title = (formData.get('title') || '').trim();
  if (!title) {
    throw new Error('Title is required.');
  }

  const publishDate = formData.get('publish-date');
  const publishTime = formData.get('publish-time') || '09:00';
  const logDate = formData.get('log-date');
  const logLabel = (formData.get('log-label') || '').trim() || 'Day 0';
  const metaDescription = (formData.get('meta-description') || '').trim();
  const excerpt = (formData.get('excerpt') || '').trim();
  const rssSummaryRaw = (formData.get('rss-summary') || '').trim();
  const socialImage = (formData.get('social-image') || '').trim() || '/assets/social/default.svg';
  const impactRaw = (formData.get('impact') || '').trim();
  const articleRaw = formData.get('article-body') || '';
  const tldrRaw = formData.get('tldr') || '';
  const changelogNote = (formData.get('changelog-note') || '').trim();
  const rssBuildTime = formData.get('rss-build-time') || '18:00';
  const timezoneLabel = (formData.get('timezone-label') || 'GMT').trim() || 'GMT';

  const relatedLinks = [
    {
      title: (formData.get('related-one-title') || '').trim(),
      url: (formData.get('related-one-url') || '').trim(),
    },
    {
      title: (formData.get('related-two-title') || '').trim(),
      url: (formData.get('related-two-url') || '').trim(),
    },
  ];

  const rawTags = (formData.get('tags') || '')
    .split(/[\s,]+/)
    .map((tag) => tag.trim())
    .filter(Boolean);
  if (!rawTags.length) {
    throw new Error('At least one tag is required.');
  }

  const slugOverride = (formData.get('slug') || '').trim();
  const generatedSlugTail = slugify(title) || 'untitled';
  const slug = slugOverride || `${publishDate}-${generatedSlugTail}`;

  const displayDate = formatDisplayDate(publishDate);
  const logDisplayDate = formatDisplayDate(logDate);
  const publishIso = isoPublish(publishDate, publishTime);
  const rssDate = formatRssDate(publishDate, publishTime, timezoneLabel);

  const tldrHtml = buildTldrList(tldrRaw);
  const impactHtml = impactRaw
    ? (/<[a-z][\s\S]*>/i.test(impactRaw) ? impactRaw : `<p>${escapeHtml(impactRaw)}</p>`)
    : '';
  const articleHtml = markdownLiteToHtml(articleRaw);

  return {
    title,
    slug,
    publishDate,
    publishTime,
    publishIso,
    metaDescription,
    socialImage,
    tags: rawTags,
    tldrHtml,
    impactHtml,
    articleHtml,
    displayDate,
    logLabel,
    logDate,
    logDisplayDate,
    excerpt,
    relatedLinks,
    changelogNote,
    rssSummary: rssSummaryRaw || metaDescription,
    rssDate,
    rssBuildTime,
    timezoneLabel,
  };
}

function handleLogin(event) {
  event.preventDefault();
  const pass = loginForm.elements['admin-passcode'].value.trim();
  if (!pass) {
    return;
  }
  sha256Hex(pass)
    .then((digest) => {
      if (digest === passwordHash) {
        try {
          localStorage.setItem(storageKey, digest);
        } catch (_) {
          // ignore storage errors
        }
        showPoster();
        posterView.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        loginError.classList.remove('hidden');
      }
    })
    .catch(() => {
      loginError.classList.remove('hidden');
    });
}

function handleGenerate(event) {
  event.preventDefault();
  try {
    const formData = new FormData(form);
    const data = buildDataFromForm(formData);

    const postHtml = generatePostTemplate(data);
    const indexCard = generateIndexCard(data);
    const jsonLd = generateJsonLdEntry(data);
    const rssItem = generateRssItem(data);
    const atomEntry = generateAtomEntry(data);
    const path = `docs/blog/${data.slug}/index.html`;
    const commitMessage = `blog: publish ${data.publishDate} ${data.title}`;

    outputFields.postPath.textContent = path;
    outputFields.postHtml.value = postHtml;
    outputFields.indexCard.value = indexCard;
    outputFields.jsonLd.value = jsonLd;
    outputFields.rssItem.value = rssItem;
    outputFields.atomEntry.value = atomEntry;
    outputFields.commitMessage.value = commitMessage;

    resultsView.classList.remove('hidden');
    resultsView.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    alert(error.message);
  }
}

async function copyToClipboard(text) {
  if (!text) return false;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      // fall through to execCommand
    }
  }
  const temp = document.createElement('textarea');
  temp.value = text;
  temp.setAttribute('readonly', '');
  temp.style.position = 'absolute';
  temp.style.left = '-9999px';
  document.body.appendChild(temp);
  temp.select();
  const success = document.execCommand('copy');
  document.body.removeChild(temp);
  return success;
}

async function handleCopy(event) {
  const trigger = event.target.closest('[data-copy-target]');
  if (!trigger) return;
  const targetId = trigger.getAttribute('data-copy-target');
  const field = document.getElementById(targetId);
  if (!field) return;
  const copied = await copyToClipboard(field.value);
  if (!copied) return;
  const original = trigger.textContent;
  trigger.textContent = 'Copied!';
  trigger.disabled = true;
  setTimeout(() => {
    trigger.textContent = original;
    trigger.disabled = false;
  }, 1500);
}

function handleReset() {
  resultsView.classList.add('hidden');
  Object.values(outputFields).forEach((field) => {
    if (field instanceof HTMLTextAreaElement) {
      field.value = '';
    } else if (field instanceof HTMLElement) {
      field.textContent = '';
    }
  });
  setDefaultDates();
}

function clearPasswordOutputs() {
  if (passwordHashOutput) passwordHashOutput.value = '';
  if (passwordSnippet) passwordSnippet.value = '';
  if (passwordCommand) passwordCommand.value = '';
  if (passwordOutput) passwordOutput.classList.add('hidden');
  if (passwordFeedback) {
    passwordFeedback.classList.add('hidden');
    passwordFeedback.textContent = '';
    passwordFeedback.classList.remove('notice--error');
  }
  if (newPassInput) newPassInput.value = '';
  if (confirmPassInput) confirmPassInput.value = '';
}

function showPasswordFeedback(message, isError = false) {
  if (!passwordFeedback) return;
  passwordFeedback.textContent = message;
  passwordFeedback.classList.remove('hidden');
  if (isError) {
    passwordFeedback.classList.add('notice--error');
  } else {
    passwordFeedback.classList.remove('notice--error');
  }
}

async function handlePasswordForm(event) {
  event.preventDefault();
  if (!newPassInput || !confirmPassInput) return;
  const pass = newPassInput.value.trim();
  const confirm = confirmPassInput.value.trim();
  if (!pass || pass.length < 8) {
    showPasswordFeedback('Passcode must be at least 8 characters.', true);
    return;
  }
  if (pass !== confirm) {
    showPasswordFeedback('Passcodes do not match. Try again.', true);
    return;
  }
  try {
    const hash = await sha256Hex(pass);
    const snippet = `const passwordHash = '${hash}'; // sha256(new passcode)`;
    const command =
      `node -e "const fs=require('fs');const file='docs/blog/post/poster.js';const hash='${hash}';` +
      `let src=fs.readFileSync(file,'utf8');` +
      `if(!/const passwordHash = '.+';/.test(src)){throw new Error('passwordHash constant not found');}` +
      `src=src.replace(/const passwordHash = '.*';/, \`const passwordHash = '\${hash}';\`);` +
      `fs.writeFileSync(file,src);"`;

    if (passwordHashOutput) passwordHashOutput.value = hash;
    if (passwordSnippet) passwordSnippet.value = snippet;
    if (passwordCommand) passwordCommand.value = command;
    if (passwordOutput) passwordOutput.classList.remove('hidden');
    showPasswordFeedback('Hash generated. Replace the constant, commit, and push to finalize the new passcode.');
  } catch (error) {
    showPasswordFeedback(`Unable to generate hash: ${error.message}`, true);
  }
}

function handlePasswordReset(event) {
  event.preventDefault();
  if (passwordForm) {
    passwordForm.reset();
  }
  clearPasswordOutputs();
}

function init() {
  setDefaultDates();
  checkStoredAuth();

  loginForm.addEventListener('submit', handleLogin);
  form.addEventListener('submit', handleGenerate);
  resetBtn.addEventListener('click', handleReset);
  posterView.addEventListener('click', handleCopy);

  if (passwordForm) {
    passwordForm.addEventListener('submit', handlePasswordForm);
  }
  if (passwordResetBtn) {
    passwordResetBtn.addEventListener('click', handlePasswordReset);
  }
}

init();
