#!/usr/bin/env bash
set -e

cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  app:
    image: node:18
    working_dir: /app
    volumes:
      - ./app:/app
    command: sh -c "npm install && npm start"
    ports:
      - "3000:3000"
    depends_on:
      - mongo

  mongo:
    image: mongo:6
    volumes:
      - mongo-data:/data/db

  nginx:
    image: nginx:latest
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - app

volumes:
  mongo-data:
EOF

mkdir -p app nginx

cat > app/index.js << 'EOF'
// Simple Express app
const express = require('express');
const app = express();
const port = 3000;
app.get('/', (_, res) => res.send('Hello from Structana!'));
app.listen(port, () => console.log(\`Listening on http://localhost:\${port}\`));
EOF

cat > app/package.json << 'EOF'
{
  "name": "structana-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
EOF

cat > nginx/nginx.conf << 'EOF'
events {}
http {
  server {
    listen 80;
    location / {
      proxy_pass http://app:3000;
    }
  }
}
EOF

echo "Bootstrap complete. Now run:"
echo "  git add . && git commit -m 'chore: bootstrap Structana stack' && git push -u origin main"

