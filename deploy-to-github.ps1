# Deployment script for GitHub Pages

# Configuration variables
$repoName = Read-Host -Prompt 'Enter the repository name (e.g., prestige-somerville-landing)'
$username = Read-Host -Prompt 'Enter your GitHub username'

# Update next.config.ts to uncomment and set basePath
$configPath = ".\next.config.ts"
$configContent = Get-Content -Path $configPath -Raw
$configContent = $configContent -replace '// basePath: .+', "basePath: '/$repoName',"
Set-Content -Path $configPath -Value $configContent

# Initialize git repo if not already done
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Green
    git init
}

# Add all files to git
Write-Host "Adding files to Git..." -ForegroundColor Green
git add .

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Green
git commit -m "Prepare for GitHub Pages deployment"

# Set main branch
git branch -M main

# Add remote origin (only if not already added)
$remoteExists = git remote -v | Select-String -Pattern "origin"
if (-not $remoteExists) {
    Write-Host "Adding remote origin..." -ForegroundColor Green
    git remote add origin "https://github.com/sanjay-murmu-au9/landing-page.git"
}

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push -u origin main

# Instructions for enabling GitHub Pages
Write-Host "`nDeployment setup complete!`n" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://github.com/$username/$repoName/settings/pages" -ForegroundColor Yellow
Write-Host "2. Under 'Source', select 'GitHub Actions'" -ForegroundColor Yellow
Write-Host "3. The GitHub Action will automatically build and deploy your site" -ForegroundColor Yellow
Write-Host "4. Once deployed, your site will be available at: https://$username.github.io/$repoName/" -ForegroundColor Yellow
