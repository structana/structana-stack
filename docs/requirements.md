# Structana Stack Enhancement Requirements

This document summarizes the intended features of the stack.

- **Domains**: `structana.com`, `funemployed.tools` and `cosmicauracle.com`.
- **Redirects**: each bare domain redirects to its `www` subdomain.
- **Static sites**: stub pages are served for each `www.<domain>` from the `www/` directory.
- **Backends**: two services expose `GET /api/py/hello` and `GET /api/js/hello` but only
  under `test.structana.com`.
- **Reverse proxy**: Traefik v2 handles routing and issues TLS certificates via
  Let's Encrypt (HTTP‑01 by default).
- **Testing**: scripts in `tests/` perform simple `curl` smoke tests. More detailed
  unit tests can be added later.
- **CI/CD**: GitHub Actions builds the Docker images, runs tests, pushes the images
  to a registry and deploys them on a remote host via `docker compose pull && docker compose up -d`.

See `docs/decision-log.md` for notable design choices.
