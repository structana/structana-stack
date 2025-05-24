#!/usr/bin/env bash
set -e

# start js-backend with traefik
docker compose up -d js-backend traefik
trap 'docker compose down -v' EXIT

# give containers time to start
sleep 5

resp=$(curl -s http://localhost:8080/api/js/hello)

echo "$resp"

echo "$resp" | grep -q "Hello from JS backend"
