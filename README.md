# Structana Stack

This project uses **Traefik** as the reverse proxy to serve three stub sites and
two demo API backends.  Run the stack with:

```bash
docker compose up -d
```

The backends are reachable on `test.structana.com` while the `www` subdomains
serve static content from the `www/` directory.

## DNS automation with Namecheap

This repository includes a helper script and GitHub Actions workflow for managing DNS records on Namecheap. Store the following values in your repository secrets:

- `NAMECHEAP_API_USER`
- `NAMECHEAP_API_KEY`
- `NAMECHEAP_USERNAME`
- `NAMECHEAP_CLIENT_IP`
- `NAMECHEAP_DOMAIN` – comma separated list of domains
- `NAMECHEAP_TARGET_IP` – IP address for the A record
- `NAMECHEAP_CNAME_TARGET` – CNAME target for the `www` subdomain

The workflow `.github/workflows/update-dns.yml` runs `scripts/update-namecheap-dns.js` which updates A and CNAME records for the configured domains.

Steps to enable DNS automation:
1. Create API credentials in your Namecheap account and whitelist your public IP.
2. Add the variables listed above to your repository secrets.
3. Trigger the `Update DNS records` workflow from the GitHub Actions tab.

## TLS certificates

Use the HTTP‑01 challenge with [Let’s Encrypt](https://letsencrypt.org/) to issue certificates. If you automate DNS updates via the provided script, you can switch to the DNS‑01 challenge for certificate renewal.
Traefik stores certificate data in `traefik/acme.json`. Make sure this file
persists between deployments so renewals succeed.
Keep the file permissions restrictive (`chmod 600`) as it contains private key
material.

## Running tests

Unit tests can be executed with the helper scripts:

```bash
bash tests/test_py_hello.sh
bash tests/test_js_hello.sh
```

Docker must be available on your system for these scripts to run.
