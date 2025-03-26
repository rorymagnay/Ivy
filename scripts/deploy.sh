#!/bin/bash

# Exit on error
set -e

# Load environment variables
if [ -f .env ]; then
  source .env
fi

# Check for required environment variables
required_vars=(
  "NEXT_PUBLIC_APP_URL"
  "NEXT_PUBLIC_APP_NAME"
  "NEXTAUTH_URL"
  "NEXTAUTH_SECRET"
  "DATABASE_URL"
  "OPENAI_API_KEY"
)

for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "Error: $var is not set"
    exit 1
  fi
done

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building the application..."
npm run build

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Check for deployment platform
if [ "$DEPLOY_PLATFORM" = "vercel" ]; then
  echo "Deploying to Vercel..."
  vercel deploy --prod
elif [ "$DEPLOY_PLATFORM" = "netlify" ]; then
  echo "Deploying to Netlify..."
  netlify deploy --prod
else
  echo "Starting production server..."
  npm start
fi

echo "Deployment complete!" 