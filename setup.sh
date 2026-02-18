#!/bin/bash
set -e

echo "🚀 Landing System - Setup"
echo "========================="

# Check prerequisites
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required. Install from https://nodejs.org"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required."; exit 1; }

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup environment
if [ ! -f .env ]; then
  echo "📝 Creating .env from .env.example..."
  cp .env.example .env
  # Generate random AUTH_SECRET
  AUTH_SECRET=$(openssl rand -base64 32 2>/dev/null || node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
  ENCRYPTION_KEY=$(node -e "console.log(require('crypto').randomBytes(16).toString('hex'))")
  sed -i.bak "s|generate-a-random-secret-here|${AUTH_SECRET}|" .env
  sed -i.bak "s|generate-a-32-byte-hex-key|${ENCRYPTION_KEY}|" .env
  rm -f .env.bak
  echo "✅ Environment configured"
fi

# Generate Prisma client
echo "🗄️  Generating Prisma client..."
npx prisma generate

# Push database schema
echo "🗄️  Pushing database schema..."
npx prisma db push

# Seed database
echo "🌱 Seeding database..."
npx prisma db seed

echo ""
echo "✅ Setup complete!"
echo "   Run: npm run dev"
echo "   Open: http://localhost:3000"
echo ""
echo "   Default admin: admin@landing.system / admin123"
