Write-Host "==============================================="
Write-Host "GitHub Pages 404 Error Troubleshooting" -ForegroundColor Cyan
Write-Host "==============================================="
Write-Host ""

Write-Host "Common reasons for 404 errors on GitHub Pages with Next.js:" -ForegroundColor Yellow
Write-Host ""

Write-Host "1. Checking Next.js configuration:" -ForegroundColor Green
Write-Host "   ✓ basePath is set to '/landing-page' in next.config.ts"
Write-Host "   ✓ output is set to 'export' in next.config.ts"
Write-Host "   ✓ images are set to unoptimized in next.config.ts"
Write-Host ""

Write-Host "2. Checking repository setup:" -ForegroundColor Green
Write-Host "   - Ensure gh-pages branch exists and has the latest build"
Write-Host "   - Verify GitHub Pages is enabled in repository settings"
Write-Host "   - Check that GitHub Pages is set to deploy from the gh-pages branch"
Write-Host ""

Write-Host "3. Run manual deployment:" -ForegroundColor Green
Write-Host "   This will deploy your site using the gh-pages package locally"
Write-Host ""
Write-Host "   npm run deploy"
Write-Host ""

Write-Host "4. Check browser URL:" -ForegroundColor Green
Write-Host "   Make sure you're accessing the correct URL: https://sanjay-murmu-au9.github.io/landing-page/"
Write-Host "   (Not https://sanjay-murmu-au9.github.io/)"
Write-Host ""

Write-Host "5. Clear browser cache:" -ForegroundColor Green
Write-Host "   Try accessing the site in an incognito/private browsing window"
Write-Host ""

Write-Host "==============================================="
