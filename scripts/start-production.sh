#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if .env file exists
if [ ! -f .env ]; then
  echo -e "${RED}Error: .env file not found${NC}"
  echo "Please create a .env file with your environment variables."
  echo "You can copy .env.example and update the values:"
  echo "cp .env.example .env"
  exit 1
fi

# Check if .next directory exists (built application)
if [ ! -d .next ]; then
  echo -e "${RED}Error: .next directory not found${NC}"
  echo "Please build the application first:"
  echo "npm run build"
  exit 1
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
  echo -e "${YELLOW}Warning: node_modules not found${NC}"
  echo "Installing dependencies..."
  npm install --production
fi

# Start the application
echo -e "${GREEN}Starting the application in production mode...${NC}"
npm run start 