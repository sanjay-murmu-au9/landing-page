# This script helps run the site locally with the correct configuration
# Usage: .\run-local.ps1

Write-Host "Starting local development server for Prestige Somerville landing page..." -ForegroundColor Cyan

# Set environment to development mode
$env:NODE_ENV = 'development'

# Run the development server
Write-Host "Launching Next.js development server..." -ForegroundColor Green
npm run dev

# Note: The site will be available at http://localhost:3000/
