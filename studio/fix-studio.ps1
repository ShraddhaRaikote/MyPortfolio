# Sanity Studio network fix helper (Windows)
Write-Host ""
Write-Host "=== Sanity Studio fix ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. In studio/.env set:" -ForegroundColor Yellow
Write-Host "   SANITY_STUDIO_LOCAL_AUTH=true"
Write-Host "   SANITY_API_TOKEN=sk... (your Editor token)"
Write-Host ""
Write-Host "2. Restart Studio: npm run dev"
Write-Host "   Open http://localhost:3333"
Write-Host ""
Write-Host "3. Or edit in terminal (always works):" -ForegroundColor Yellow
Write-Host "   npm run edit:profile"
Write-Host ""
Write-Host "3. Antivirus: disable HTTPS scanning / web protection, then reload Studio."
Write-Host ""
Write-Host "4. In Studio, F12 -> Console, run once:" -ForegroundColor Yellow
Write-Host '   localStorage.removeItem("_sanity_debugProtocol"); location.reload();'
Write-Host ""
Write-Host "5. Start dev server from studio folder:" -ForegroundColor Yellow
Write-Host "   npm run dev"
Write-Host ""
Write-Host "6. Optional — hosted Studio (no local proxy):" -ForegroundColor Yellow
Write-Host "   npm run deploy"
Write-Host "   Then open https://cq64slan.sanity.studio"
Write-Host ""

$open = Read-Host "Open http://cq64slan.localhost:3333 in browser now? (y/n)"
if ($open -eq 'y') {
  Start-Process "http://cq64slan.localhost:3333"
}
