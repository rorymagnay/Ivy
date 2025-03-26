#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

try {
  // Check for .env file
  if (!fs.existsSync('.env')) {
    if (fs.existsSync('.env.example')) {
      log('No .env file found. Creating from .env.example...', 'info');
      fs.copyFileSync('.env.example', '.env');
      log('Created .env file. Please update it with your configuration.', 'success');
    } else {
      throw new Error('No .env or .env.example file found');
    }
  }

  // Install dependencies
  log('Installing dependencies...', 'info');
  execSync('npm install --production', { stdio: 'inherit' });

  // Run type check
  log('Running type check...', 'info');
  execSync('npx tsc --noEmit', { stdio: 'inherit' });

  // Run linting
  log('Running linting...', 'info');
  execSync('npm run lint', { stdio: 'inherit' });

  // Build the application
  log('Building the application...', 'info');
  execSync('npm run build', { stdio: 'inherit' });

  // Check for required directories
  const requiredDirs = ['.next', 'public'];
  requiredDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      throw new Error(`Required directory "${dir}" not found`);
    }
  });

  // Check for required files
  const requiredFiles = [
    'public/logo.svg',
    'public/ai-education.webp',
    'public/ai-analysis.webp'
  ];
  requiredFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      throw new Error(`Required file "${file}" not found`);
    }
  });

  log('Deployment preparation completed successfully!', 'success');
  log('\nNext steps:', 'info');
  log('1. Ensure your .env file is configured correctly');
  log('2. Run "npm run production" to start the production server');

} catch (error) {
  log(`Error: ${error.message}`, 'error');
  process.exit(1);
} 