export const CSRF_COOKIE_NAME = 'bf_csrf';
const TURNSTILE_ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export function jsonResponse(status, data, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
      ...extraHeaders,
    },
  });
}

export function parseCookies(cookieHeader = '') {
  return cookieHeader.split(';').reduce((acc, part) => {
    const [name, ...rest] = part.split('=');
    if (!name) {
      return acc;
    }
    const value = rest.join('=').trim();
    if (!value) {
      return acc;
    }
    acc[name.trim()] = decodeURIComponent(value);
    return acc;
  }, {});
}

export function getCookie(cookieHeader, name) {
  const cookies = parseCookies(cookieHeader);
  return cookies[name];
}

export function sanitizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function isValidEmail(email) {
  if (!email) return false;
  const normalized = sanitizeString(email).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
}

export async function verifyTurnstile(secret, token, ipAddress) {
  if (!secret) {
    throw new Error('TURNSTILE_SECRET_KEY is not configured');
  }
  const body = new URLSearchParams({
    secret,
    response: token ?? '',
  });
  if (ipAddress) {
    body.append('remoteip', ipAddress);
  }

  const response = await fetch(TURNSTILE_ENDPOINT, {
    method: 'POST',
    body,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Turnstile verification failed (${response.status}): ${message}`);
  }

  return response.json();
}

export async function sendMail(env, { to, subject, text, html, replyTo, fromName, fromEmail }) {
  const recipients = (Array.isArray(to) ? to : String(to || ''))
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((email) => ({ email }));

  if (!recipients.length) {
    return { ok: false, error: 'Missing recipient configuration' };
  }

  const senderEmail = fromEmail || env.MAILCHANNELS_FROM_EMAIL;
  if (!senderEmail) {
    return { ok: false, error: 'MAILCHANNELS_FROM_EMAIL is not configured' };
  }

  const senderName = fromName || env.MAILCHANNELS_FROM_NAME || 'BlackFrame AI Studio';

  const content = [];
  if (text) {
    content.push({ type: 'text/plain', value: text });
  }
  if (html) {
    content.push({ type: 'text/html', value: html });
  }

  const mailPayload = {
    personalizations: [
      {
        to: recipients,
      },
    ],
    from: {
      email: senderEmail,
      name: senderName,
    },
    subject,
    content,
  };

  if (replyTo && replyTo.email) {
    mailPayload.reply_to = replyTo;
  }

  const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(mailPayload),
  });

  if (!response.ok) {
    const message = await response.text();
    return { ok: false, status: response.status, error: message };
  }

  return { ok: true };
}
