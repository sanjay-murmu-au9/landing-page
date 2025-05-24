Write-Host "==============================================="
Write-Host "GitHub Pages 404 Error Resolution Guide" -ForegroundColor Cyan
Write-Host "==============================================="
Write-Host ""

Write-Host "Your site has been redeployed with these fixes:" -ForegroundColor Green
Write-Host ""

Write-Host "1. Added custom 404.html page with redirection script"
Write-Host "2. Added index.html at the root level for redirection"
Write-Host "3. Verified basePath setting in Next.js config"
Write-Host "4. Ensured .nojekyll file is present"
Write-Host ""

Write-Host "To access your site:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Use the correct URL:" -ForegroundColor White
Write-Host "   https://sanjay-murmu-au9.github.io/landing-page/"
Write-Host ""

Write-Host "2. If still seeing 404 error:" -ForegroundColor White
Write-Host "   a. Clear your browser cache or try in incognito mode"
Write-Host "   b. Wait a few minutes for GitHub Pages to update"
Write-Host "   c. Check GitHub repository settings to ensure GitHub Pages is enabled"
Write-Host "      - Go to repository Settings > Pages"
Write-Host "      - Make sure it's set to deploy from gh-pages branch"
Write-Host ""

Write-Host "3. Verify GitHub Pages deployment status:" -ForegroundColor White
Write-Host "   a. Go to your repository's Actions tab"
Write-Host "   b. Check that the latest deployment workflow completed successfully"
Write-Host ""

Write-Host "If still encountering issues, try running:" -ForegroundColor Yellow
Write-Host "npm run deploy" -ForegroundColor White
Write-Host ""

Write-Host "==============================================="
