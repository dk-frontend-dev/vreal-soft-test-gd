#!/bin/sh
set -e
cd /app/packages/api

# Run migrations
yarn prisma migrate deploy

node dist/main.js
