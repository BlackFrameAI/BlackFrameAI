# Security Hardening Plan

This document captures the follow-up actions for the recent external audit of the BlackFrameAI website and supporting repositories. It prioritises quick wins, establishes owners, and schedules deeper work so that we can respond to the audit with clear, measurable improvements.

## Guiding principles

- Keep the founder story public while safeguarding the team and visitors. We only redact details if they materially increase risk without advancing our mission.
- Prefer configuration-first mitigations (e.g., Cloudflare settings) before writing custom code.
- Automate monitoring and dependency updates to reduce future regressions.
- Document each change in the appropriate repo (website, infrastructure, or engine) so auditors can trace remediation.

## Immediate (Week 1)

| Task | Owner | Notes | Status |
| --- | --- | --- | --- |
| Enforce HSTS via Cloudflare | Web Ops | Enable "Always Use HTTPS" and "HSTS" (12 month max-age, includeSubDomains, preload). Submit for preload once the response header is visible. | ✅ `_headers` file now injects the preload-grade HSTS header site-wide; keep the Cloudflare toggle enabled so edges mirror the repo config. |
| Define and deploy a strict Content Security Policy | Web Ops | Start with `default-src 'self'; script-src 'self' https://utteranc.es; frame-src https://utteranc.es; img-src 'self' data:; connect-src 'self'; font-src 'self'; style-src 'self' 'unsafe-inline';` and tighten after testing. Use securityheaders.com for validation. | ✅ CSP shipped both as `<meta>` fallback and as an HTTP header via `_headers`; rerun securityheaders.com after deploy. |
| Add CSRF protection to the blog subscription endpoint | Web & Backend | Confirm backend accepts and validates CSRF tokens. If Cloudflare handles the form, use Turnstile or double-submit cookies. | ✅ Forms disabled until Turnstile + CSRF tokens ship; manual opt-in documented. |
| Add human verification to forms | Web Ops | Enable Cloudflare Turnstile or hCaptcha to rate-limit bot submissions without storing personal data. | 🔄 **Pending** — instructions in `docs/security/runbooks/cloudflare.md`; web forms remain offline. |
| Enable GitHub Advanced Security (secret scanning, Dependabot alerts) | Repo Admin | Activate in repository settings. Require Dependabot security updates. | 🔄 **Pending** — permissions required; `.github/dependabot.yml` plus detailed toggles documented in `docs/security/runbooks/cloudflare.md`. |
| Document security contact and responsible disclosure policy | Web Ops | Add to `public/security.txt` and surface in footer. | ✅ `/.well-known/security.txt` published, linked in site footers, and now includes the `BC00A155E4A5313AECAF1C803F6332130DA59824` encryption fingerprint from the PGP runbook. |

## Near term (Week 2-4)

| Task | Owner | Notes | Status |
| --- | --- | --- | --- |
| Review public-facing biography for social engineering risk | Leadership & Legal | Keep core founder story but remove unnecessary identifiers (exact rehab facility, family names). Add a short privacy statement explaining intentional transparency. | ✅ Biography copy trimmed; privacy page linked from homepage. |
| Add privacy policy and subscription consent copy | Legal & Web | Include GDPR/CCPA language, describe analytics choices, and clarify newsletter data handling. | ✅ `/privacy/` page published with consent instructions. |
| Integrate privacy-friendly analytics (Plausible.io or Matomo) | Web Ops | Configure CSP to allow the analytics domain. Ensure IP anonymisation is enabled. | 🔄 **Pending** — add domain exceptions once provider is chosen. |
| Add `robots.txt` and SEO meta tags | Web Ops | Allow indexing of public pages; block drafts. Add OpenGraph/Twitter cards for sharing. | ✅ Existing assets reviewed; no changes needed post-remediation. |
| Establish branch protection rules | Repo Admin | Require PR review, passing CI, and signed commits for `main`. Define CODEOWNERS for security-critical files. | 🔄 **Pending** — requires repository admin access. |
| Run dependency health checks | Engineering | Execute `npm audit`, update vendored GLFW/GLAD, and review change logs. Document results in the devlog. | 🔄 **Pending** — schedule after Dependabot is enabled. |
| Set up automated DAST/SAST scans | Engineering | Add GitHub Actions workflows for OWASP ZAP baseline scan and CodeQL or SonarCloud. | 🔄 **Pending** — reference actions to be added once CI credentials are available. |

## Medium term (1-3 months)

- **Replace Utterances if needed:** If moderation burden grows, evaluate self-hosted options (e.g., Commento, Remark42) to control data residency.
- **Formalise secure coding standards:** Extend existing devlogs with a `docs/security/secure_coding.md` checklist (input validation, error handling, logging).
- **Archive sensitive devlogs:** Mirror internal devlogs to a private repo, leaving only sanitized summaries public.
- **Disaster recovery rehearsals:** Regularly backup site content and test restoration procedures.

## Monitoring and verification

- Schedule quarterly security reviews covering headers, certificates, dependency status, and policy updates.
- Track remediation progress in the issue tracker; close items only when deployed and verified.
- Keep `docs/security/` updated so auditors can repeat this review without direct interviews.

## Current status

- No critical vulnerabilities detected in audit.
- Founder biography intentionally retains personal history to highlight diversity and mission roots; review annually to ensure continued alignment with risk tolerance.
- `_headers` ensures HSTS, CSP, and allied headers match the audit recommendations even before Cloudflare rules propagate.

