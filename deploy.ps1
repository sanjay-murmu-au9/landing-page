Write-Host "==============================================="
Write-Host "GitHub Pages Deployment Script" -ForegroundColor Cyan
Write-Host "==============================================="
Write-Host ""

# Step 1: Check if repo exists
$remoteUrl = git remote get-url origin 2>$null
if (-not $?) {
    Write-Host "❌ Error: Git repository not initialized or remote not set" -ForegroundColor Red
    Write-Host "Initialize git repository and set remote before continuing." -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Git repository found with remote: $remoteUrl" -ForegroundColor Green
Write-Host ""

# Step 2: Make sure all changes are committed
$status = git status --porcelain
if ($status) {
    Write-Host "⚠️ You have uncommitted changes:" -ForegroundColor Yellow
    git status

    $confirmation = Read-Host "Do you want to commit these changes before deploying? (y/n)"
    if ($confirmation -eq 'y') {
        $commitMessage = Read-Host "Enter commit message"
        git add .
        git commit -m $commitMessage
        if (-not $?) {
            Write-Host "❌ Failed to commit changes." -ForegroundColor Red
            exit 1
        }
        Write-Host "✅ Changes committed successfully." -ForegroundColor Green
    } else {
        Write-Host "⚠️ Continuing with uncommitted changes." -ForegroundColor Yellow
    }
}

# Step 3: Push to GitHub
Write-Host "Pushing latest changes to GitHub..." -ForegroundColor Cyan
git push
if (-not $?) {
    Write-Host "❌ Failed to push to GitHub." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Successfully pushed to GitHub." -ForegroundColor Green
Write-Host ""

# Step 4: Run deployment
Write-Host "Starting deployment to GitHub Pages..." -ForegroundColor Cyan
npm run deploy
if (-not $?) {
    Write-Host "❌ Deployment failed." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Your site should now be available at:" -ForegroundColor Cyan
Write-Host "https://sanjay-murmu-au9.github.io/landing-page/" -ForegroundColor Yellow
Write-Host ""
Write-Host "Note: It may take a few minutes for the changes to propagate." -ForegroundColor Yellow
Write-Host "==============================================="
