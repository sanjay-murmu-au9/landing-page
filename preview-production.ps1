# This script builds and serves the site with production settings
# Usage: .\preview-production.ps1

Write-Host "Building and previewing production site for Prestige Somerville landing page..." -ForegroundColor Cyan

# Set environment to production mode
$env:NODE_ENV = 'production'

# Build the site
Write-Host "Building production version..." -ForegroundColor Green
npm run build

# Serve the static files
Write-Host "Starting local server for production build..." -ForegroundColor Green
Write-Host "The site will be available at: http://localhost:3000/landing-page" -ForegroundColor Yellow

# Use a simple http server to serve the static files
npx serve out -p 3000
