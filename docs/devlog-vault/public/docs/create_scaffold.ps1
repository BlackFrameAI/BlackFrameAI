# Prompt for a project root path at runtime instead of hard-coding
$rootPath = Read-Host "Enter the root path for the project"

if ([string]::IsNullOrWhiteSpace($rootPath)) {
    Write-Error "Root path is required. Run the script again and provide a path."
    exit 1
}

$directories = @(
    "engine",
    "game",
    "assets",
    "docs",
    "docs\\lore",
    "scripts"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Force -Path (Join-Path $rootPath $dir) | Out-Null
}

$files = @(
    "README.md",
    "CODEX_instructions.md",
    "docs\\engine_design.md",
    "docs\\game_design.md",
    "docs\\lore\\factions.md",
    "docs\\lore\\characters.md",
    "docs\\lore\\world_history.md",
    "docs\\lore\\powers_and_glyphs.md",
    "docs\\lore\\items_and_artifacts.md"
)

foreach ($file in $files) {
    New-Item -ItemType File -Force -Path (Join-Path $rootPath $file) | Out-Null
}

Write-Host "✅ Scaffold created at $rootPath"
