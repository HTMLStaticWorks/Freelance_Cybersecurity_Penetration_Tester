Get-ChildItem -Filter *.html | ForEach-Object {
     = Get-Content $_.FullName -Raw
    
    # 1. Remove old toggles div if it exists
    $content = $content -replace '(?s)<div class="d-flex gap-3 mb-4 justify-content-center">.*?</div>\s*', ''
    
    # 2. Extract the part before </nav> and replace it
    # We want to replace everything after the Contact link and before </nav> inside mobile-nav
    # But wait, to be safe, let's just remove the Hire Me button inside mobile-nav.
    # It's tricky to target only inside mobile-nav using simple regex.
    # Let's find <nav class="mobile-nav"> to </nav> and do replacements inside it.
    
    if ($content -match '(?s)(<nav class="mobile-nav">)(.*?)(</nav>)') {
        $navStart = $Matches[1]
        $navInner = $Matches[2]
        $navEnd = $Matches[3]
        
        # Remove old Hire Me button from inside nav Inner
        $navInner = $navInner -replace '(?s)<a href="booking\.html" class="btn-cyber btn-cyber-primary[^>]*>Hire Me</a>\s*', ''
        
        # Add the new side-by-side container at the bottom of navInner
        $newControls = "
      <div class="d-flex gap-3 mt-4 justify-content-center align-items-center">
        <button class="icon-btn theme-toggle" aria-label="Toggle Theme"><i class="fas fa-sun"></i></button>
        <button class="icon-btn rtl-toggle" aria-label="Toggle RTL"><i class="fas fa-arrow-right-arrow-left"></i></button>
        <a href="booking.html" class="btn-cyber btn-cyber-primary">Hire Me</a>
      </div>
    "
        
        $newNav = $navStart + $navInner + $newControls + $navEnd
        $content = $content -replace '(?s)<nav class="mobile-nav">.*?</nav>', $newNav
        
        Set-Content -Path $_.FullName -Value $content -NoNewline
    }
}
