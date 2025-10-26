# Security Contact PGP Key Runbook

Use this guide when you are ready to publish an encryption key for vulnerability reporters. It assumes you are using a workstation with GnuPG installed. All commands work on macOS (Homebrew `gnupg`) and most Linux distributions.

## 1. Generate a dedicated key pair

1. Open a terminal and run `gpg --full-generate-key`.
2. Choose key type **(1) RSA and RSA**.
3. Enter **4096** for the key size.
4. Set the key to **never expire** unless your policy requires rotation (you can always revoke and replace later).
5. Supply the following identity information when prompted:
   - **Real name:** `BlackFrameAI Security`
   - **Email address:** `security@blackframeai.org`
   - Leave the comment blank.
6. Choose a strong passphrase and store it in the shared password manager.

You can confirm the key details with:

```bash
gpg --list-keys security@blackframeai.org
```

## 2. Export the public key

Export an ASCII-armored copy for publishing:

```bash
gpg --armor --export security@blackframeai.org > blackframeai-security.asc
```

Upload the resulting file to the marketing/downloads area if you want to host it yourself. The `.asc` file contains no private data.

## 3. Publish the fingerprint to keys.openpgp.org

1. Display the fingerprint (copy the 40-character string):
   ```bash
   gpg --fingerprint security@blackframeai.org
   ```
2. Visit [https://keys.openpgp.org/](https://keys.openpgp.org/) and choose **Upload**.
3. Paste the armored public key from `blackframeai-security.asc` into the form and submit.
4. The service sends a confirmation email to `security@blackframeai.org`. Follow the link in that email so the key becomes searchable.

Once verified, the published URL will look like:

```
https://keys.openpgp.org/vks/v1/by-fingerprint/<YOUR_FINGERPRINT>
```

Record the full fingerprint and URL in your internal password manager for future reference.

## 4. Update `.well-known/security.txt`

After the key is searchable:

1. Edit `docs/.well-known/security.txt`.
2. Add a new line after the `Contact:` entries:
   ```
   Encryption: https://keys.openpgp.org/vks/v1/by-fingerprint/<YOUR_FINGERPRINT>
   ```
3. Deploy the site and verify `https://www.blackframeai.org/.well-known/security.txt` shows the new link.

If you ever rotate or revoke the key, repeat the steps above and update the URL to point to the replacement fingerprint.

## 5. Optional: publish a security.txt `Encryption-Key` header

For additional discoverability, you can host the `.asc` file at `https://www.blackframeai.org/security/blackframeai-security.asc` and add the following response header via Cloudflare:

```
Encryption-Key: https://www.blackframeai.org/security/blackframeai-security.asc
```

This header is not required, but it helps researchers who prefer to download the key directly from your domain.
