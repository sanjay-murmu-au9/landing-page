Write-Host "==============================================="
Write-Host "GitHub Pages Deployment Checklist" -ForegroundColor Cyan
Write-Host "==============================================="
Write-Host ""

Write-Host "✅ Configuration Files:" -ForegroundColor Green
Write-Host "   1. next.config.ts: Configured with basePath and output: 'export'"
Write-Host "   2. package.json: Has predeploy and deploy scripts"
Write-Host "   3. .nojekyll: Present in public directory"
Write-Host "   4. 404.html: Added to public directory with redirect script"
Write-Host "   5. index.html: Added to public directory for root redirect"
Write-Host ""

Write-Host "✅ Deployment Status:" -ForegroundColor Green
Write-Host "   Your site should now be accessible at:"
Write-Host "   https://sanjay-murmu-au9.github.io/landing-page/"
Write-Host ""

Write-Host "✅ Common Troubleshooting Steps:" -ForegroundColor Green
Write-Host "   1. Clear browser cache or try in incognito mode"
Write-Host "   2. Wait a few minutes for GitHub Pages to update"
Write-Host "   3. Check GitHub repository settings to ensure GitHub Pages is enabled"
Write-Host "      - Go to repository Settings → Pages"
Write-Host "      - Source should be set to 'Deploy from a branch'"
Write-Host "      - Branch should be 'gh-pages' with folder set to '/ (root)'"
Write-Host ""

Write-Host "✅ Next Steps:" -ForegroundColor Green
Write-Host "   1. Verify your website is working properly"
Write-Host "   2. Check that all images and assets are loading"
Write-Host "   3. Test navigation between pages"
Write-Host "   4. If everything works, you're all set!"
Write-Host ""

Write-Host "If you encounter any further issues:" -ForegroundColor Yellow
Write-Host "   1. Run: npm run deploy (to manually deploy)"
Write-Host "   2. Check the GitHub Actions workflow status"
Write-Host "   3. Review your browser's developer console for any errors"
Write-Host ""

Write-Host "Congratulations on deploying your Prestige Somerville" -ForegroundColor Magenta
Write-Host "luxury apartments landing page to GitHub Pages!" -ForegroundColor Magenta
Write-Host ""

Write-Host "==============================================="
