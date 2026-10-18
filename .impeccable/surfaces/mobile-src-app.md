---
version: 1
slug: "mobile-src-app"
primary_target: "mobile/src/app"
related_targets: []
---

# STX Robotics app (prototype port)

Mode: **Operate**. Client demo with the prototype's sample data; nothing is saved or sent.

## Scope
The whole app is a port of `prototype/stx-robotics-app.html`: white app bar (STX logo, Parent / Staff switch), five-tab bar (Home, Camps, Teams, Updates or Prints, More), parent and staff Home, Camps with a slide-up registration sheet, Teams, Prints with a print-request sheet, Mentor hours, Updates / Family texts, More, and the "Not built in this demo" screen. Desktop web keeps the phone frame and info panel.

## Deliberate differences from the prototype
- The text-message opt-in on registration starts unticked (consent is given, not assumed).
- Dropdowns (Send to, Type, For) are chip rows; React Native has no native select.
- Small buttons keep their prototype size but get a hit area of at least 44 pt.
- STL upload uses the system file picker.

## Direction contract
THESIS: Match the prototype. The user pinned it as the binding reference over DESIGN.md and the Impeccable rules.
OWN-WORLD: The prototype's CSS: Atkinson Hyperlegible, #f7fafc page, white cards with #e5e9f0 borders, maroon square buttons, black outline buttons, black stat bands, maroon donate band, uppercase eyebrows with a line before them, colored tags.
STORY: A parent sees their kids, what's owed and the latest text, and registers in a sheet; staff see seats, approvals, prints and send texts.
FIRST VIEWPORT: Parent Home: app bar, "Hi, Garza family" on white, the black 300+ / 4 / 17 band, Your kids cards, tab bar.
FORM: Single screen with tab state, bottom sheet and toast, as in the prototype. seed: none (no roll; the user pinned the prototype as the design).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
