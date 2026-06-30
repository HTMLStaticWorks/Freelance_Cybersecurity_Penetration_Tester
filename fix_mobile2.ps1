$files = Get-ChildItem -Filter *.html
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    $content = $content -replace '(?s)<div class="d-flex gap-3 mb-4 justify-content-center">.*?</div>\s*', ''
    
    if ($content -match '(?s)(<nav class="mobile-nav">)(.*?)(</nav>)') {
        $navStart = $Matches[1]
        $navInner = $Matches[2]
        $navEnd = $Matches[3]
        
        $navInner = $navInner -replace '(?s)<a href="booking\.html"[^>]*>Hire Me</a>\s*', ''
        
        $controls = @"
      <div class="d-flex gap-3 mt-4 justify-content-center align-items-center">
        <button class="icon-btn theme-toggle" aria-label="Toggle Theme"><i class="fas fa-sun"></i></button>
        <button class="icon-btn rtl-toggle" aria-label="Toggle RTL"><i class="fas fa-arrow-right-arrow-left"></i></button>
        <a href="booking.html" class="btn-cyber btn-cyber-primary">Hire Me</a>
      </div>
"@
        $newNav = $navStart + $navInner + $controls + "`r`n    " + $navEnd
        $content = $content -replace '(?s)<nav class="mobile-nav">.*?</nav>', $newNav
        Set-Content -Path $f.FullName -Value $content -NoNewline
    }
}
