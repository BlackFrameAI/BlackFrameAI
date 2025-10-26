(function () {
  const SITE_KEY = '0x4AAAAAAB8yHm3IjOiTatk2';
  const CSRF_COOKIE = 'bf_csrf';
  const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

  document.addEventListener('DOMContentLoaded', () => {
    const csrfToken = ensureCsrfToken();
    document.querySelectorAll('input[name="csrfToken"]').forEach((input) => {
      input.value = csrfToken;
    });

    document.querySelectorAll('.cf-turnstile').forEach((container) => {
      if (!container.dataset.sitekey) {
        container.dataset.sitekey = SITE_KEY;
      }
    });

    document.querySelectorAll('form[data-endpoint]').forEach((form) => {
      attachFormHandler(form);
    });
  });

  function attachFormHandler(form) {
    const endpoint = form.dataset.endpoint;
    const successMessage = form.dataset.successMessage || 'Thanks! We received your submission.';
    const feedback = form.querySelector('.form-feedback');
    const turnstileContainer = form.querySelector('.cf-turnstile');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const turnstileResponseInput = form.querySelector('input[name="cf-turnstile-response"]');
      const turnstileToken = turnstileResponseInput ? turnstileResponseInput.value.trim() : '';
      const csrfInput = form.querySelector('input[name="csrfToken"]');
      const payload = formToPayload(form);

      if (!payload.csrfToken || payload.csrfToken !== getCookie(CSRF_COOKIE)) {
        setFeedback(feedback, 'We could not validate your session. Refresh the page and try again.', 'error');
        resetTurnstile(turnstileContainer);
        return;
      }

      if (!turnstileToken) {
        setFeedback(feedback, 'Please complete the human verification challenge.', 'error');
        resetTurnstile(turnstileContainer);
        return;
      }

      setFeedback(feedback, 'Sending…', 'pending');
      toggleForm(form, true);

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
          body: JSON.stringify(payload),
        });

        const result = await parseJson(response);

        if (response.ok) {
          form.reset();
          const csrfToken = ensureCsrfToken();
          if (csrfInput) {
            csrfInput.value = csrfToken;
          }
          setFeedback(feedback, result?.message || successMessage, 'success');
        } else {
          const errorMessage = result?.error || 'We could not submit the form. Please try again.';
          setFeedback(feedback, errorMessage, 'error');
        }
      } catch (error) {
        setFeedback(feedback, 'Network error. Check your connection and try again.', 'error');
      } finally {
        toggleForm(form, false);
        resetTurnstile(turnstileContainer);
      }
    });
  }

  function ensureCsrfToken() {
    let token = getCookie(CSRF_COOKIE);
    if (!token) {
      token = generateToken();
      setCookie(CSRF_COOKIE, token, COOKIE_MAX_AGE);
    }
    return token;
  }

  function generateToken() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  function setCookie(name, value, maxAge) {
    const attributes = [
      `${name}=${value}`,
      'Path=/',
      `Max-Age=${maxAge}`,
      'Secure',
      'SameSite=Strict',
    ];
    document.cookie = attributes.join('; ');
  }

  function getCookie(name) {
    const cookieString = document.cookie || '';
    return cookieString.split(';').reduce((acc, part) => {
      const [key, ...rest] = part.trim().split('=');
      if (!key || key !== name) {
        return acc;
      }
      return decodeURIComponent(rest.join('='));
    }, '');
  }

  function formToPayload(form) {
    const data = {};
    const formData = new FormData(form);

    for (const [key, value] of formData.entries()) {
      if (key === 'cf-turnstile-response') {
        data.turnstileToken = String(value).trim();
      } else if (key === 'csrfToken') {
        data.csrfToken = String(value).trim();
      } else {
        data[key] = typeof value === 'string' ? value.trim() : value;
      }
    }

    return data;
  }

  function setFeedback(element, message, state) {
    if (!element) return;
    element.textContent = message;
    element.dataset.state = state;
  }

  function toggleForm(form, isSubmitting) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) return;
    submitButton.disabled = isSubmitting;
    submitButton.classList.toggle('is-disabled', isSubmitting);
  }

  function resetTurnstile(container) {
    if (window.turnstile && container) {
      window.turnstile.reset(container);
    }
  }

  async function parseJson(response) {
    try {
      return await response.json();
    } catch (error) {
      return null;
    }
  }
})();
