# SET YOUR ROOT PATH HERE
$rootPath = "G:\CODEX_Projects\Purge_Of_The_Crescent_Veil"

# Create main folders
New-Item -ItemType Directory -Force -Path "$rootPath\engine"
New-Item -ItemType Directory -Force -Path "$rootPath\game"
New-Item -ItemType Directory -Force -Path "$rootPath\assets"
New-Item -ItemType Directory -Force -Path "$rootPath\docs"
New-Item -ItemType Directory -Force -Path "$rootPath\docs\lore"
New-Item -ItemType Directory -Force -Path "$rootPath\scripts"

# Create markdown files
New-Item -ItemType File -Force -Path "$rootPath\README.md"
New-Item -ItemType File -Force -Path "$rootPath\CODEX_instructions.md"
New-Item -ItemType File -Force -Path "$rootPath\docs\engine_design.md"
New-Item -ItemType File -Force -Path "$rootPath\docs\game_design.md"

# Create lore markdown files
New-Item -ItemType File -Force -Path "$rootPath\docs\lore\factions.md"
New-Item -ItemType File -Force -Path "$rootPath\docs\lore\characters.md"
New-Item -ItemType File -Force -Path "$rootPath\docs\lore\world_history.md"
New-Item -ItemType File -Force -Path "$rootPath\docs\lore\powers_and_glyphs.md"
New-Item -ItemType File -Force -Path "$rootPath\docs\lore\items_and_artifacts.md"

Write-Host "✅ Scaffold created at $rootPath"
