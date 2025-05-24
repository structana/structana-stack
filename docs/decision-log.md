# Decision Log

- **Traefik vs Nginx**: Traefik was chosen because it easily manages certificates
  and multiple domains. The old Nginx files remain only for reference and are no
  longer used.
- **Staging Hostname**: API backends are available only at `test.structana.com`
  to keep production endpoints clean.
- **DNS Updates**: A script (`scripts/update-namecheap-dns.js`) exists for
  automating Namecheap DNS records when API credentials are available.
