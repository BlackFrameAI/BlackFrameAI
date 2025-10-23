# stage_visuals.md

Procedural sprites describing environmental elements such as room backgrounds and decorations.

## StageVisuals Helpers
- `createRoomBackground(StageVariant variant)` – large wall panel with inner accent.
- `createPlatformTrim(StageVariant variant)` – thin trim piece used for platforms.
- `createPipeSprite(StageVariant variant)` – pipe segment with end caps.
- `createDoorSprite(StageVariant variant)` – simple door panel with accent interior.
- `createSwitchSprite(StageVariant variant)` – lever and base used for triggers.
- `createCrateSprite(StageVariant variant)` – storage crate with cross braces.
- `createPillarSprite(StageVariant variant)` – vertical support pillar.

Each helper returns a `cv::ProceduralSprite` built from rectangles, lines and circles. Colors and small geometry tweaks change depending on the `StageVariant` (e.g. `TechLab` uses cool grays while `AlienRuins` uses earthy tones).
Stage decorations created from these helpers keep an internal `ProceduralSpriteInstance`. StageManager updates each instance every frame so blinking terminals and bouncing chests animate correctly.
During `StageManager::Update`, each decoration's instance advances its frame timer, ensuring animated backgrounds and props stay in sync with gameplay.

## Usage Warning

Available `StageVariant` values:
`TechLab`, `AlienRuins`, `EchoingValley`, `SunkenRuins`, and `ForgottenForge`.
`StageManager::LoadDecorationsForVariant` creates decorations for each variant.
