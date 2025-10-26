import {
  CSRF_COOKIE_NAME,
  getCookie,
  isValidEmail,
  jsonResponse,
  sanitizeString,
  sendMail,
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
    email,
    focus,
    cadence,
    notes,
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

  if (!isValidEmail(email)) {
    return jsonResponse(422, { error: 'Provide a valid email address.' });
  }

  try {
    const verification = await verifyTurnstile(
      env.TURNSTILE_SECRET_KEY,
      turnstileToken,
      request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for')
    );

    if (!verification.success) {
      return jsonResponse(403, { error: 'Human verification failed. Please retry the challenge.' });
    }
  } catch (error) {
    return jsonResponse(502, { error: 'Turnstile verification failed. Try again in a moment.' });
  }

  const cleanedEmail = sanitizeString(email).toLowerCase();
  const cleanedFocus = sanitizeString(focus || 'Studio updates');
  const cleanedCadence = sanitizeString(cadence || 'Weekly');
  const cleanedNotes = sanitizeString(notes);

  const plainBody = [
    `New newsletter request`,
    `Email: ${cleanedEmail}`,
    `Preferred cadence: ${cleanedCadence || 'Weekly'}`,
    `Focus: ${cleanedFocus || 'Studio updates'}`,
    cleanedNotes ? '\nNotes:\n' + cleanedNotes : null,
  ]
    .filter(Boolean)
    .join('\n');

  const htmlBody = `<!doctype html><html><body>` +
    `<h2>New newsletter request</h2>` +
    `<p><strong>Email:</strong> ${escapeHtml(cleanedEmail)}</p>` +
    `<p><strong>Preferred cadence:</strong> ${escapeHtml(cleanedCadence || 'Weekly')}</p>` +
    `<p><strong>Focus:</strong> ${escapeHtml(cleanedFocus || 'Studio updates')}</p>` +
    (cleanedNotes
      ? `<p><strong>Notes:</strong></p><p>${escapeHtml(cleanedNotes)}</p>`
      : '') +
    `</body></html>`;

  const mailResult = await sendMail(env, {
    to: env.NEWSLETTER_RECIPIENT || env.CONTACT_RECIPIENT,
    subject: `[BlackFrame AI] Newsletter opt-in: ${cleanedEmail}`,
    text: plainBody,
    html: htmlBody,
    replyTo: {
      email: cleanedEmail,
      name: cleanedEmail,
    },
  });

  if (!mailResult.ok) {
    return jsonResponse(502, { error: 'We could not record your request. Try again or email studio@blackframeai.org.' });
  }

  return jsonResponse(200, { success: true, message: 'Thanks! Check your inbox for a confirmation from the team.' });
}

function escapeHtml(value) {
  return sanitizeString(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
