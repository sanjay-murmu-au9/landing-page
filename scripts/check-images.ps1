# Check if images directory exists in public folder
if (-not (Test-Path "public/images")) {
    Write-Host "❌ Error: 'public/images' directory not found!" -ForegroundColor Red
    exit 1
}

# Check if all required images exist
$requiredImages = @(
    "hero-luxury-exterior-1.jpg",
    "hero-luxury-exterior-2.jpg",
    "hero-pool-view.jpg",
    "hero-living-space.jpg"
)

$missingImages = @()
foreach ($image in $requiredImages) {
    if (-not (Test-Path "public/images/$image")) {
        $missingImages += $image
    }
}

if ($missingImages.Count -gt 0) {
    Write-Host "❌ Error: Missing required images:" -ForegroundColor Red
    $missingImages | ForEach-Object { Write-Host "  - $_" }
    exit 1
}

Write-Host "✅ All required images present" -ForegroundColor Green
