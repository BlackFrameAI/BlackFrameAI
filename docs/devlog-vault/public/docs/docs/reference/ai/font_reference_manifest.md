# Font Reference Manifest (Sanitized)

This manifest conveys widely accepted typography principles while omitting identifiable authors, proprietary libraries, or restricted datasets. Use it to support procedural UI, faction theming, and symbol-based narrative encoding.

---

## 🔠 Font Design Principles

- Track structural attributes such as cap height, x-height, ascenders, descenders, and stroke contrast when defining new families.
- Align serif, sans-serif, script, and display styles with faction tone by adjusting geometry, stress, and rhythm.
- Prototype glyph sets with vector tools that expose nodes and tangents so spacing and curvature remain consistent.

---

## 📚 Reference Libraries & Licensing

- Favor open-license repositories for in-game UI to simplify distribution while keeping stylistic variety high.
- Maintain an internal catalog tagging each family by mood, readability tier, and supported character sets.
- Document licensing obligations for any premium assets so builds remain compliant.

---

## 🧠 Font Psychology & UX

- Match weight, width, and letterspacing to the desired emotional response (e.g., bold condensed for urgency, light extended for calm).
- Pair typography with layout grids to ensure hierarchy and scanning patterns feel deliberate.
- Evaluate readability across resolutions and screen sizes, adjusting hinting or fallback stacks as needed.

---

## 🛠️ Implementation Notes

- Use typographic tokens (e.g., heading, body, caption) within design systems to keep engineering handoff clean.
- Store fallback chains for multilingual support, covering accent marks, ligatures, and non-Latin scripts where required.
- Include automated visual regression checks that flag overflow, clipping, or kerning regressions after font changes.
