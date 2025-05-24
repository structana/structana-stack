# Structana Stack

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

## TLS certificates

Use the HTTP‑01 challenge with [Let’s Encrypt](https://letsencrypt.org/) to issue certificates. If you automate DNS updates via the provided script, you can switch to the DNS‑01 challenge for certificate renewal.
