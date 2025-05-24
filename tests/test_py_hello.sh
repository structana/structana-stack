#!/bin/sh
set -e
# Start py-backend and traefik in detached mode

docker compose up -d py-backend traefik >/dev/null
# Wait a few seconds for startup
sleep 5

# Perform request
response=$(curl -s http://localhost:8080/api/py/hello)

echo "$response"
# Check response contains expected text
printf "%s" "$response" | grep -q "Hello from Python"

echo "Test passed"
