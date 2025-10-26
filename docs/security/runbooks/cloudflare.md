# Cloudflare & GitHub Security Runbook

This runbook covers the items that require elevated permissions outside the static site. Complete them to finish the security hardening sprint. The repository now ships a `_headers` file that injects the recommended HTTP headers when deployed to Cloudflare Pages or any host that honours the file—use these steps to mirror the same configuration at the edge so caching layers cannot strip them.

## 1. Enforce HSTS and security headers via Cloudflare

Follow these exact clicks so Cloudflare injects the headers at the edge (HTML `<meta>` tags alone will not pass securityheaders.com).

1. Sign in to Cloudflare and open the **blackframeai.org** property.
2. Go to **SSL/TLS → Edge Certificates** and toggle **Always Use HTTPS** on.
3. Expand **HTTP Strict Transport Security (HSTS)** and click **Enable HSTS**.
   1. Set **Max Age** to `31536000`.
   2. Check **Include subdomains**.
   3. Check **Preload** and acknowledge the warning.
   4. Click **Save**.
4. Refresh the page and confirm the yellow HSTS warning banner disappears after a few minutes. Only then submit `blackframeai.org` to [hstspreload.org](https://hstspreload.org/).
5. Navigate to **Rules → Transform Rules → Modify Response Header** and click **Create rule**.
   1. Name it `security-headers`.
   2. Under **When incoming requests match...**, add a condition:
      - **Field:** `Hostname`
      - **Operator:** `equals`
      - **Value:** `www.blackframeai.org`
      - Click **Or** and repeat for `blackframeai.org` if you serve the apex.
   3. Under **Then...**, add the following actions (each is a separate row set to **Set static**):
      - `Content-Security-Policy` = `default-src 'self'; script-src 'self' https://utteranc.es; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://utteranc.es; font-src 'self'; connect-src 'self'; frame-src https://utteranc.es; base-uri 'self'; form-action 'self'; upgrade-insecure-requests`
      - `Permissions-Policy` = `geolocation=(), microphone=(), camera=()`
      - `Referrer-Policy` = `strict-origin-when-cross-origin`
      - `X-Content-Type-Options` = `nosniff`
      - `X-Frame-Options` = `DENY`
   4. Save and deploy the rule.
6. Test from your terminal (wait a minute for cache propagation):
   ```bash
   curl -I https://www.blackframeai.org \
     | grep -Ei 'strict-transport|content-security|permissions-policy|referrer-policy|x-frame-options|x-content-type-options'
   ```
   You should see all six headers exactly once. Keep the command output for the audit trail.
7. Re-run [securityheaders.com](https://securityheaders.com/) until it reports the headers. Use the **Hide results** toggle if you want a downloadable report.

## 2. Enable Cloudflare Turnstile and CSRF tokens

1. From the Cloudflare dashboard, open **Turnstile** and create a new widget:
   - Type: **Managed**
   - Domain: `www.blackframeai.org`
2. Copy the **site key** and **secret key**. Store the secret in the shared 1Password vault.
3. Configure the Cloudflare Pages Functions environment so the new endpoints validate tokens and forward submissions:
   - `TURNSTILE_SECRET_KEY` — secret key from the widget above (keep in 1Password, set as an encrypted Pages secret).
   - `MAILCHANNELS_FROM_EMAIL` and optionally `MAILCHANNELS_FROM_NAME` — the verified sender identity used with MailChannels.
   - `CONTACT_RECIPIENT` — comma-separated inboxes for contact form alerts.
   - `NEWSLETTER_RECIPIENT` — comma-separated inboxes for newsletter opt-ins (falls back to `CONTACT_RECIPIENT` if omitted).
4. The repository now ships `/functions/api/contact.js` and `/functions/api/newsletter.js`; they enforce double-submit CSRF tokens plus Turnstile verification before invoking MailChannels. Deploy the latest build so Pages picks up the functions.
5. After redeploying, submit a test message and newsletter request. You should receive the MailChannels relayed copy and see a 200 JSON response in DevTools.

## 3. GitHub Advanced Security & Dependabot

These steps require repository owner or admin permissions. If the toggles are greyed out, ask an owner to grant temporary access or pair on a screenshare.

1. Visit `https://github.com/BlackFrameAI/BlackFrameAI/settings/security_analysis` while signed in as an admin.
2. Under **Code security and analysis**, enable each of the following (they save automatically):
   - **Dependabot alerts**
   - **Dependabot security updates**
   - **Secret scanning** (and **Secret scanning push protection** if available)
   - **Code scanning** → choose **Default setup** and keep the JavaScript/TypeScript CodeQL workflow checked, then click **Enable CodeQL**.
3. Ensure `.github/dependabot.yml` exists on the default branch (this repository now includes one). GitHub will queue an initial scan within a few minutes of the file landing on `main`.
4. Configure branch protection under **Settings → Branches** → **Add rule**:
   1. **Branch name pattern:** `main`
   2. Check **Require a pull request before merging** → set **Required approvals** to `1`.
   3. Check **Require status checks to pass before merging** → add your CI workflow (e.g., `build`) and the `CodeQL` check once it appears.
   4. Check **Require branches to be up to date before merging**.
   5. Optionally check **Require signed commits** if everyone can sign.
   6. Save the rule.
5. Open the repository **Security** tab, click **Dependabot**, and verify the “Last checked” timestamp updates after a scan. You will also receive pull requests for outdated dependencies when they are detected.

## 4. Publish the security PGP key

1. Generate or retrieve the studio security PGP key.
2. Publish the key fingerprint to [keys.openpgp.org](https://keys.openpgp.org/).
3. Replace the placeholder fingerprint in `docs/.well-known/security.txt` with the production fingerprint.
4. Verify the `.well-known/security.txt` endpoint renders the updated link over HTTPS.

---
Document completion of each step in the issue tracker and update the status column inside `docs/security/security_hardening_plan.md` when finished.
