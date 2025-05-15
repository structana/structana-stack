#!/bin/bash
echo "Stopping all running Docker containers..."
docker stop $(docker ps -q)

echo "Removing all containers..."
docker rm $(docker ps -aq)

echo "All containers stopped and removed."
