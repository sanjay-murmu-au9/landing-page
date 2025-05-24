# Push to GitHub script
Write-Host "Starting GitHub push process..." -ForegroundColor Green

# Set working directory
$workingDir = "c:\Users\Sanjay Murmu\OneDrive\Desktop\Landing-Page\real-estate-landing"
Set-Location $workingDir

# Check if Git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
} else {
    Write-Host "Git repository already initialized" -ForegroundColor Green
}

# Add remote origin
try {
    $remoteExists = git remote | Where-Object { $_ -eq "origin" }
    if (-not $remoteExists) {
        Write-Host "Adding remote repository..." -ForegroundColor Yellow
        git remote add origin https://github.com/sanjay-murmu-au9/landing-page.git
    } else {
        Write-Host "Remote 'origin' already exists" -ForegroundColor Green
    }
} catch {
    Write-Host "Error adding remote: $_" -ForegroundColor Red
}

# Add all files
Write-Host "Adding all files to staging..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Initial commit - Prestige Somerville landing page"

# Set main branch
Write-Host "Setting main branch..." -ForegroundColor Yellow
git branch -M main

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "You may be prompted for your GitHub credentials." -ForegroundColor Cyan
git push -u origin main

Write-Host "`nIf push was successful, your code is now on GitHub!" -ForegroundColor Green
Write-Host "View your repository at: https://github.com/sanjay-murmu-au9/landing-page" -ForegroundColor Cyan
Write-Host "`nNext steps:" -ForegroundColor Green
Write-Host "1. Go to GitHub repository Settings > Pages" -ForegroundColor White
Write-Host "2. Set Source to 'GitHub Actions'" -ForegroundColor White
Write-Host "3. Wait for the GitHub Action to complete" -ForegroundColor White
Write-Host "4. Your site will be available at: https://sanjay-murmu-au9.github.io/landing-page/" -ForegroundColor White
