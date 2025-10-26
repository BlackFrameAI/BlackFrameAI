import {
  CSRF_COOKIE_NAME,
  getCookie,
  isValidEmail,
  jsonResponse,
  sanitizeString,
  sendMail,
  getAllowedTurnstileHostnames,
  validateTurnstileVerification,
  verifyTurnstile,
} from './_common.js';

function methodNotAllowed() {
  return new Response(null, {
    status: 405,
    headers: {
      Allow: 'POST',
    },
  });
}

export async function onRequest(context) {
  const { request } = context;
  if (request.method !== 'POST') {
    return methodNotAllowed();
  }
  return onRequestPost(context);
}

export async function onRequestPost({ request, env }) {
  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return jsonResponse(400, { error: 'Invalid JSON payload' });
  }

  const {
    csrfToken,
    turnstileToken,
    formGuard,
    name,
    email,
    company,
    topic,
    message,
  } = payload || {};

  if (sanitizeString(formGuard)) {
    return jsonResponse(400, { error: 'Unable to process submission' });
  }

  const cookieToken = getCookie(request.headers.get('cookie') || '', CSRF_COOKIE_NAME);
  if (!cookieToken || cookieToken !== sanitizeString(csrfToken)) {
    return jsonResponse(403, { error: 'Session could not be validated. Refresh and try again.' });
  }

  if (!turnstileToken) {
    return jsonResponse(400, { error: 'Complete the human verification challenge.' });
  }

  if (!sanitizeString(name)) {
    return jsonResponse(422, { error: 'Name is required.' });
  }

  if (!isValidEmail(email)) {
    return jsonResponse(422, { error: 'Provide a valid email address.' });
  }

  if (!sanitizeString(message)) {
    return jsonResponse(422, { error: 'Message cannot be empty.' });
  }

  try {
    const verification = await verifyTurnstile(
      env.TURNSTILE_SECRET_KEY,
      turnstileToken,
      request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for')
    );
    const allowedHostnames = getAllowedTurnstileHostnames(env, ['blackframeai.org', 'www.blackframeai.org']);
    const validation = validateTurnstileVerification(verification, {
      expectedAction: 'contactForm',
      allowedHostnames,
    });

    if (!validation.ok) {
      return jsonResponse(validation.status || 403, { error: validation.error || 'Human verification failed.' });
    }
  } catch (error) {
    return jsonResponse(502, { error: 'Turnstile verification failed. Try again in a moment.' });
  }

  const cleanedName = sanitizeString(name);
  const cleanedCompany = sanitizeString(company);
  const cleanedTopic = sanitizeString(topic || 'general');
  const cleanedMessage = sanitizeString(message);

  const plainBody = [
    `New contact request from ${cleanedName}`,
    `Email: ${sanitizeString(email)}`,
    cleanedCompany ? `Company: ${cleanedCompany}` : null,
    cleanedTopic ? `Topic: ${cleanedTopic}` : null,
    '',
    cleanedMessage,
  ]
    .filter(Boolean)
    .join('\n');

  const htmlBody = `<!doctype html><html><body>` +
    `<h2>New contact request from ${escapeHtml(cleanedName)}</h2>` +
    `<p><strong>Email:</strong> ${escapeHtml(sanitizeString(email))}</p>` +
    (cleanedCompany ? `<p><strong>Company:</strong> ${escapeHtml(cleanedCompany)}</p>` : '') +
    (cleanedTopic ? `<p><strong>Topic:</strong> ${escapeHtml(cleanedTopic)}</p>` : '') +
    `<hr />` +
    `<pre style="font-family: 'Segoe UI', Roboto, sans-serif; white-space: pre-wrap;">${escapeHtml(cleanedMessage)}</pre>` +
    `</body></html>`;

  const mailResult = await sendMail(env, {
    to: env.CONTACT_RECIPIENT,
    subject: `[BlackFrame AI] Contact request from ${cleanedName}`,
    text: plainBody,
    html: htmlBody,
    replyTo: {
      email: sanitizeString(email),
      name: cleanedName,
    },
  });

  if (!mailResult.ok) {
    return jsonResponse(502, { error: 'We could not deliver your message. Try again or email studio@blackframeai.org.' });
  }

  return jsonResponse(200, { success: true, message: 'Thanks! We received your message and will respond shortly.' });
}

function escapeHtml(value) {
  return sanitizeString(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
