#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

function log(message, type = 'info') {
  const color = type === 'error' ? colors.red : type === 'success' ? colors.green : colors.yellow;
  console.log(`${color}${message}${colors.reset}`);
}

// Configuration
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';

console.log('🚀 Starting IVY in production mode...');

try {
  // Check if .env exists
  if (!fs.existsSync('.env')) {
    throw new Error('No .env file found. Please run "npm run prepare-deploy" first.');
  }

  // Check if .next directory exists
  if (!fs.existsSync('.next')) {
    log('No .next directory found. Building the application...', 'info');
    execSync('npm run build', { stdio: 'inherit' });
  }

  // Check if node_modules exists
  if (!fs.existsSync('node_modules')) {
    log('Installing production dependencies...', 'info');
    execSync('npm install --production', { stdio: 'inherit' });
  }

  // Check if .env.local exists
  if (!fs.existsSync(path.join(process.cwd(), '.env.local'))) {
    console.log('⚠️ .env.local file not found. Creating one with default values for demo mode...');
    
    const defaultEnv = `# Authentication
NEXTAUTH_URL=http://localhost:${PORT}
NEXTAUTH_SECRET=automatically-generated-${Math.random().toString(36).substring(2, 15)}

# Demo mode (enables app to work without database)
NEXT_PUBLIC_DEMO_MODE=true

# Database - Replace these in production with your actual database credentials
DATABASE_URL="postgresql://username:password@localhost:5432/ivy?schema=public"
`;
    
    fs.writeFileSync(path.join(process.cwd(), '.env.local'), defaultEnv);
    console.log('✅ Created .env.local file with default values');
  }

  // Start the application
  log('Starting production server...', 'success');
  execSync(`PORT=${PORT} NODE_ENV=${NODE_ENV} npm run start`, { stdio: 'inherit' });

} catch (error) {
  log(`Error: ${error.message}`, 'error');
  process.exit(1);
} 