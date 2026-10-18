---
name: STX Robotics App
description: The stxrobotics.com look in an app for South Texas Robotics families and staff, ported 1:1 from the clickable prototype.
colors:
  page: "#f7fafc"
  white: "#ffffff"
  ink: "#222939"
  head: "#111827"
  muted: "#60739f"
  line: "#e5e9f0"
  field: "#cfd6e2"
  maroon: "#7b1f1f"
  maroon-dark: "#5a1515"
  maroon-soft: "#f6e9e9"
  black: "#000000"
  good: "#1d6b3a"
  good-soft: "#e3f1e8"
  warn: "#8a5a00"
  warn-soft: "#fbf1dc"
  blue: "#2337ff"
  blue-soft: "#e8ebff"
  idle: "#b6c0d1"
  bubble: "#e9e9eb"
typography:
  logo:
    fontFamily: "Atkinson Hyperlegible, Atkinson, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: "24px"
    letterSpacing: "-0.88px"
  display:
    fontFamily: "Atkinson Hyperlegible, Atkinson, system-ui, sans-serif"
    fontSize: "38px"
    fontWeight: 700
    lineHeight: "41px"
    letterSpacing: "-0.38px"
  headline:
    fontFamily: "Atkinson Hyperlegible, Atkinson, system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: "29px"
    letterSpacing: "-0.26px"
  stat:
    fontFamily: "Atkinson Hyperlegible, Atkinson, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: "26px"
    fontFeature: "tnum"
  title:
    fontFamily: "Atkinson Hyperlegible, Atkinson, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: "23px"
  body:
    fontFamily: "Atkinson Hyperlegible, Atkinson, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "22px"
  lead:
    fontFamily: "Atkinson Hyperlegible, Atkinson, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  meta:
    fontFamily: "Atkinson Hyperlegible, Atkinson, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "19px"
  section-title:
    fontFamily: "Atkinson Hyperlegible, Atkinson, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    letterSpacing: "1.56px"
  field-label:
    fontFamily: "Atkinson Hyperlegible, Atkinson, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.72px"
  chip:
    fontFamily: "Atkinson Hyperlegible, Atkinson, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.96px"
  eyebrow:
    fontFamily: "Atkinson Hyperlegible, Atkinson, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    letterSpacing: "1.54px"
  label:
    fontFamily: "Atkinson Hyperlegible, Atkinson, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    letterSpacing: "1.32px"
  tag:
    fontFamily: "Atkinson Hyperlegible, Atkinson, system-ui, sans-serif"
    fontSize: "10.5px"
    fontWeight: 700
    letterSpacing: "0.84px"
  tab:
    fontFamily: "Atkinson Hyperlegible, Atkinson, system-ui, sans-serif"
    fontSize: "10.5px"
    fontWeight: 700
    letterSpacing: "0.63px"
rounded:
  none: "0px"
  bubble: "18px"
  phone: "54px"
spacing:
  gutter: "18px"
  card: "14px"
  stack: "10px"
  section-top: "20px"
  row: "12px"
  chip-gap: "6px"
components:
  button-primary:
    backgroundColor: "{colors.maroon}"
    textColor: "{colors.white}"
    typography: "{typography.lead}"
    rounded: "{rounded.none}"
    padding: "11px 16px"
  button-primary-pressed:
    backgroundColor: "{colors.maroon-dark}"
  button-primary-sm:
    backgroundColor: "{colors.maroon}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "7px 11px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.black}"
    rounded: "{rounded.none}"
    padding: "11px 16px"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.maroon}"
    rounded: "{rounded.none}"
    padding: "7px 11px"
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "{spacing.card}"
  stats-band:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white}"
    typography: "{typography.stat}"
    padding: "16px 18px"
  maroon-band:
    backgroundColor: "{colors.maroon}"
    textColor: "{colors.white}"
    padding: "16px 18px"
  chip:
    backgroundColor: "{colors.white}"
    textColor: "{colors.black}"
    typography: "{typography.chip}"
    rounded: "{rounded.none}"
    padding: "6px 12px"
  chip-selected:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white}"
  field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "10px"
  tag-open:
    backgroundColor: "{colors.good-soft}"
    textColor: "{colors.good}"
    typography: "{typography.tag}"
    padding: "3px 7px"
  tag-few:
    backgroundColor: "{colors.warn-soft}"
    textColor: "{colors.warn}"
    padding: "3px 7px"
  tag-full:
    backgroundColor: "{colors.maroon-soft}"
    textColor: "{colors.maroon}"
    padding: "3px 7px"
  tag-blue:
    backgroundColor: "{colors.blue-soft}"
    textColor: "{colors.blue}"
    padding: "3px 7px"
  tag-mute:
    backgroundColor: "{colors.page}"
    textColor: "{colors.muted}"
    padding: "3px 7px"
  progress-bar:
    backgroundColor: "{colors.line}"
    height: "5px"
  app-bar:
    backgroundColor: "{colors.white}"
    padding: "8px 18px 12px"
  role-switch-selected:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    padding: "5px 10px"
  tab-bar:
    backgroundColor: "{colors.white}"
    textColor: "{colors.muted}"
    typography: "{typography.tab}"
    padding: "6px 6px 8px"
  tab-bar-active:
    textColor: "{colors.maroon}"
  bottom-sheet:
    backgroundColor: "{colors.page}"
    rounded: "{rounded.none}"
    padding: "8px 18px 28px"
  toast:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white}"
    typography: "{typography.lead}"
    padding: "12px 14px"
  sms-bubble:
    backgroundColor: "{colors.bubble}"
    textColor: "#111111"
    typography: "{typography.lead}"
    rounded: "{rounded.bubble}"
    padding: "10px 13px"
  more-item:
    backgroundColor: "{colors.white}"
    padding: "14px"
  printer-led:
    backgroundColor: "{colors.good}"
    size: "9px"
  printer-led-idle:
    backgroundColor: "{colors.idle}"
    size: "9px"
---

# Design System: STX Robotics App

## Overview

**Creative North Star: "The Club Website, In Your Pocket"**

The app wears stxrobotics.com's clothes. The user chose the clickable prototype (`prototype/stx-robotics-app.html`) as the binding reference. Where it disagrees with an earlier DESIGN.md or with general craft rules, the prototype wins. The React Native port in `mobile/src` follows its CSS classes 1:1, and this file describes that port.

It reads like a clean, light editorial page shrunk to a phone. The page is light grey, cards are white with a thin border, and the ink is near-black. Maroon is the brand voice and black gives the structure. Every corner is square. Most screen tops follow the website's pattern: an uppercase eyebrow with a short rule before it, a bold heading, then a lead line. Big numbers sit in a full-bleed black band. Small uppercase letter-spaced labels (tags, chips, tab labels, section titles) do the sorting work.

Information is dense but legible. Atkinson Hyperlegible is the only typeface, in two weights plus a bold italic for the logo.

**Key Characteristics:**
- Atkinson Hyperlegible throughout, with bold headings and tight leading.
- Square corners on every control and container. The only rounded shapes are the SMS bubble, the printer LED, the tab badge and the desktop phone frame.
- White cards with 1px #e5e9f0 borders on a #f7fafc page, with no shadows inside the app.
- Maroon solid buttons, 1.5px black outline buttons, and black-filled selected states.
- Eyebrow, then heading, then lead at the top of screens. A black stats band carries the big numbers.
- An 18px gutter, 14px card padding, 10px stack gaps and 20px section tops.

## Colors

The palette is high contrast: grey paper, near-black ink, one maroon voice, black for structure, and soft tinted status pairs.

### Primary
- **STX Maroon** (`maroon`): solid buttons, the X in the logo, the active tab and its top bar, the tab badge, links, eyebrows on team cards, the community label on camp cards, the more-item icons, the bottom-sheet top edge, progress bar fill and the donate band.
- **Pressed Maroon** (`maroon-dark`): the pressed state of solid buttons only.
- **Maroon Wash** (`maroon-soft`): the background of the "full" tag.

### Secondary
- **Band Black** (`black`): the stats band, the toast, outline-button and chip strokes, selected chips and the selected role, print lane header rules, black progress bars and the logo's "ST".
- **Site Blue** (`blue`, `blue-soft`): used sparingly, only for the informational tag (for example the SMS audience tag).

### Neutral
- **Paper Grey** (`page`): the page ground and bottom-sheet surface. It also fills the "mute" tag and the pressed more-item.
- **Card White** (`white`): cards, the app bar, the tab bar, the hello block, fields and chips.
- **Ink** (`ink`): body text. **Heading Ink** (`head`): headings, section titles and field labels.
- **Slate Muted** (`muted`): meta text, eyebrows, inactive tabs, the more-item chevron and the unchecked checkbox stroke.
- **Hairline** (`line`): card borders, app bar and tab bar dividers, progress bar track, and the desktop backdrop.
- **Field Stroke** (`field`): input borders, the sheet grabber and the fine-print rule in the info panel.
- **Idle Light** (`idle`): an idle printer LED.
- **Bubble Grey** (`bubble`): the SMS preview bubble, with #111 text.

### Status tones
Each tag pairs a strong foreground with its soft wash: **good / good-soft** (open), **warn / warn-soft** (few seats left), **maroon / maroon-soft** (full or waitlist), **blue / blue-soft** (info), **muted / page** (neutral). `good` also lights an active printer LED and marks match wins. Maroon marks losses.

### Named Rules
**The Maroon Speaks, Black Holds Rule.** Maroon is for brand and action: the primary button, the active state and links. Black is for structure and selection: bands, outlines, chips and the role switch. Do not swap them.

**The Muted On Grey Rule.** `muted` on `page` just meets 4.5:1, but on the darker `line` backdrop it does not. Text on the desktop backdrop uses the darker step #4c5d84.

## Typography

**Display Font:** Atkinson Hyperlegible (the site self-hosts it as "Atkinson"), falling back to system-ui
**Body Font:** Atkinson Hyperlegible 400
**Logo:** Atkinson Hyperlegible 700 Italic

**Character:** A single humanist sans built for legibility. Bold weight and uppercase tracking do the hierarchy work, so no second face is needed.

### Hierarchy
- **Logo** (700 italic, 22/24, -0.88px): "ST" in black and "X" in maroon, used in the app bar only.
- **Display** (700, 38/41, -0.38px): the desktop info panel heading only.
- **Headline** (700, 26/29, -0.26px, 8px above and 4px below): the screen title (H2).
- **Stat** (700, 24/26, tabular figures): numbers in the stats band.
- **Title** (700, 16/23): card titles (H3). More-item rows use 15px.
- **Body** (400, 15/22): running text.
- **Lead** (400, 14/20, 4px above): the line under a headline. Toast text, button labels (700) and SMS bubble text also use 14px.
- **Meta** (400, 13/19, muted): secondary facts such as dates, venues and counts. Small buttons, links and checkbox sentences are also 13px.
- **Section title** (700, 13px, 1.56px tracking, uppercase, head): the header of each section, with an optional link on the right.
- **Field label** (700, 12px, 0.72px, uppercase, head). **Chip** (700, 12px, 0.96px, uppercase).
- **Eyebrow** (700, 11px, 1.54px, uppercase, muted, or maroon on team cards). **Label** (700, 11px, 1.32px, uppercase): role switch (1.1px), print lane headers, camp community and info-panel keys.
- **Tag** (700, 10.5px, 0.84px, uppercase). **Tab** (700, 10.5px, 0.63px, uppercase). **Band label** (400, 10.5/14, 1.05px, uppercase, white at 75%).
- **Job id** (400, 11px, muted, tabular). **Badge** (700, 9.5px).

### Named Rules
**The Tracked Caps Rule.** Uppercase text is always 10.5 to 13px, bold (band labels are the one regular-weight case), and tracked at roughly 0.06 to 0.14em. Headings and body text are never uppercase.

**The Tabular Numbers Rule.** Stats, scores, seat counts and job ids use tabular figures.

## Layout

The layout is a single phone column: a white app bar, scrolling content (20px bottom padding) and a white tab bar. The bottom sheet and toast draw over everything.

- **Gutter** (`spacing.gutter`): every horizontal page edge, including the app bar, sections, bands and the sheet.
- **Sections** start 20px down (`spacing.section-top`). A section header row sits 10px above its content.
- **Stacks** of cards are 10px apart (`spacing.stack`). **Rows** use a 12px gap. **Chips** sit 6px apart in a horizontal row that runs from gutter to gutter.
- **Hello block:** white with an 18px pad and a bottom hairline. It holds the eyebrow, headline and lead at the top of Home.
- **Full-bleed bands:** the black stats band and the maroon donate band are 16px tall and 18px wide, with equal flex columns 8px apart.
- **Print lanes** scroll sideways. Each lane is 78% of the width (up to 366) with a 10px gap and snapping, so the next stage peeks in.
- **Forms** stack fields 11px apart. A field label sits 4px above its input.

**Desktop web** (wider than 820px): the app renders inside a 390×812 phone frame (the height shrinks to fit the window) on the `line` backdrop. From 960px wide, the info panel sits to its left with a 56px gap and 32px page padding. Native apps and narrow browsers render the app full screen with no frame.

## Elevation & Depth

Inside the app everything is flat. Depth comes from tone: white cards on the grey page, hairline borders, and solid black or maroon bands. Overlays add one layer: the sheet backdrop is black at 45% and the toast is solid black. The only shadow is the layered drop shadow on the desktop phone frame.

### Shadow Vocabulary
- **Phone frame** (`box-shadow: 0 2px 6px rgba(96,115,159,.25), 0 8px 24px rgba(96,115,159,.33), 0 30px 60px rgba(34,41,57,.3)`): the desktop phone frame only.

### Named Rules
**The Flat Phone Rule.** No component inside the screen casts a shadow. Separation comes from borders, tone and bands.

## Shapes

All corners are 0px: buttons, cards, chips, tags, fields, the role switch, bands, the sheet and the toast. Borders come in three weights. 1px hairlines are for containers and fields. 1.5px black is for interactive outlines (outline button, chip, role switch, checkbox, eyebrow rule). The heavy edges are the 2px black lane header rule, the 3px maroon active-tab bar and the 4px maroon sheet top edge. Rounded shapes appear in only four places. The SMS bubble is 18px with a 4px bottom-left tail. The LED is a 9px circle. The tab badge is a 16px pill. The phone frame has 54px corners outside and 42px inside, with a 110×30 island.

## Components

### Eyebrow
A small uppercase label with a short line before it, taken from the website. It is a 22×1.5px rule in the label color, then a 10px gap, then 11px bold text with 1.54px tracking in muted (maroon on team cards for the team number). Use it above a screen's headline. It is part of the brand, not decoration.

### Headings, Lead and Meta
H2 is the screen title, H3 is the card title, Lead goes under H2 and Meta is muted secondary text. The section title is the uppercase 13px header of a section, with an optional maroon link (13px bold) on the right.

### Cards / Containers
- **Corner Style:** square (0)
- **Background:** white
- **Border:** 1px `line`
- **Shadow Strategy:** none (see Elevation)
- **Internal Padding:** 14px. Content is usually a Row: the main block grows, and a tag or small button sits on the right.

### Row
A horizontal, center-aligned row with a 12px gap. The main block flexes and stays min-width 0.

### Tags
A square tag with a 1px border in its own foreground color on a soft wash, padded 3×7, uppercase 10.5px and kept to one line. Variants: open, few, full, blue, mute.

### Buttons
- **Shape:** square (0)
- **Primary (solid):** maroon with white text, 14px bold, padded 11×16. Pressed turns `maroon-dark`.
- **Outline:** transparent with a 1.5px black border and black text. Pressed drops to 70% opacity.
- **White:** white with maroon text, used on the maroon band.
- **Small (sm):** 13px text padded 7×11. It keeps that visual size but the hit area extends to at least 44pt (8pt above and below, 4pt to the sides).
- **Block:** stretches to full width. Sheet actions stack a block solid button over a block outline button.
- **Focus:** the prototype uses a 2px maroon outline offset 2px.

### Progress Bar
A 5px `line` track with a maroon fill (black for the alternate series), capped at 100%. It shows seats filled and notebook progress.

### Bands
- **Stats band:** full-bleed black with equal columns 8px apart, each a 24px bold tabular number over a 10.5px uppercase white-at-75% label (5px gap). Use it for headline numbers.
- **Maroon band:** full-bleed maroon with 14px bold white text that grows, and a small white button on the right. It is the donate prompt.

### Chips
- **Style:** 1.5px black border, white background, 12px bold uppercase text, padded 6×12.
- **State:** selected is black with white text. Chips filter by community in a horizontal row.
- **Choice:** a field label over a wrapping row of chips that picks one value. It replaces a select (React Native has no native select).

### Inputs / Fields
- **Style:** an uppercase 12px label 4px above the input. The input has a 1px `field` border, white background, 10px padding and 15px body text. Placeholder text is muted. Multiline fields are at least 90px tall.
- **Focus:** the border turns maroon and the selection color is maroon.
- **Check:** an 18px square box with a 1.5px border (muted, or maroon when ticked) and a white check, next to a 13px sentence. Opt-ins start unticked.

### Printer LED
A 9px circle: `good` when printing, `idle` when idle.

### Icons
Stroke icons on a 24 grid with a 1.8 stroke and round caps and joins, drawn as SVG: home, camps, teams, prints, more, msg, clock, heart and doc. They are 23px in the tab bar and 22px in maroon on more-items. They are decorative and hidden from accessibility.

### Navigation
- **App bar:** white with a bottom hairline, padded 8/18/12. The italic STX logo sits on the left. On the right is the role switch: a 1.5px black box holding PARENT and STAFF segments (11px bold uppercase, padded 5×10). The selected segment is black with white text. It is a radio group with a 10pt vertical hit slop.
- **Tab bar:** white with a top hairline and five equal tabs, padded 6px with 8px or the safe area at the bottom. Each tab is an icon over a 10.5px uppercase label in muted. The active tab turns maroon with a 3px maroon bar 7px above the tab, inset 28% on each side. The staff More tab carries a maroon 16px pill badge (9.5px white count) showing pending mentor approvals.
- **Back link:** a maroon "More" link at the top of sub-pages.

### Bottom Sheet
The backdrop is black at 45% and tapping it closes the sheet. The sheet is the page grey with a 4px maroon top edge and square corners, at most 88% tall. It is padded 8/18/28 plus the safe area. A 40×4 grabber in `field` sits centered with 4px above and 12px below. It slides up over 260ms (instantly with reduce motion) and is modal for accessibility.

### Toast
Solid black and square with 14px white text, padded 12×14, inset 16px each side, 12px above the tab bar. It fades and rises 10px over 250ms, stays 2.4s and is announced to screen readers.

### SMS Bubble
`bubble` grey with #111 14/20 text. Corners are 18px except a 4px bottom-left tail. It is padded 10×13, at most 92% wide and aligned left, inside a card titled "Phone preview" with a blue audience tag. The message always ends with "Reply STOP to opt out."

### Print Lanes
Queued, Printing, Ready and Done lanes scroll sideways and snap. Each lane header is the 11px label in head color with the lane name and count at either end, over a 2px black rule. Job cards are spaced 6px inside and show the job id and hours (11px muted tabular), the item (14px bold head), and meta.

### More Items
Full-width rows with a white background, 1px `line` border and 14px padding (12px gap). Each has a 22px maroon icon, then a 15px title over meta, then a muted 18px chevron. Pressed turns page grey.

### Section Chips (staff event page)
A row of the same filter chips doubles as in-page navigation on long staff pages: Overview, Staff, Schedule, Kids, Supplies, Notes. One section shows at a time under the page heading; the selected chip is filled black.

### Warning Banners
Full-width boxes inside a section, square, 1px border in the tone colour on its soft wash: warn (`#8a5a00` on `#fbf1dc`) for safety problems such as too few adults for the number of kids; maroon (`#7b1f1f` on `#f6e9e9`) for staffing gaps. Bold 14 title, regular 13 explanation that names the rule being applied.

### Roster and Checklist Rows
Lists inside one card, separated by `#e5e9f0` hairlines: name in bold 14 with the age in muted 13, a status tag on the right (Waiver signed / Waiver missing), and a bold 12 warn-coloured "Medical: …" line when a child has a flag. Supply checklists use the Check component, with a black progress bar for how much is packed.

### Confirm Sheet
Destructive actions (removing someone from an event) open the bottom sheet with the question as the H2, one sentence on what happens, a solid button that names the action, and an outline button to keep things as they are. Never a system alert, so it works the same on web.

### Desktop Phone Frame and Info Panel
- **Frame:** a black 390px-wide bezel with 12px padding and 54px corners. The screen inside has 42px corners. A 110×30 black island sits 22px from the top, and a fake status bar shows the live time and signal in 14px bold black. The frame has the layered shadow above. Safe-area insets are faked at 50px top and 20px bottom.
- **Info panel:** 340px wide. It holds an eyebrow, a 38px display heading, 15px body paragraphs, an "In this demo" list (72px maroon uppercase 11px keys over 14px values, 8px apart), and a 12px fine-print note above a 1px `field` rule. Muted text here uses #4c5d84 for contrast on the backdrop.

## Do's and Don'ts

### Do:
- **Do** open screens with eyebrow, H2 and lead, as stxrobotics.com does.
- **Do** put headline numbers in the black stats band with 24px bold tabular figures.
- **Do** group content in white cards (1px `line`, 14px padding) stacked 10px apart.
- **Do** use the 18px gutter, 20px section top and 10px stack gap on every screen.
- **Do** keep every corner square (0) except the SMS bubble, LED, badge and phone frame.
- **Do** use small 13px buttons inside cards and bands, and keep their hit area at least 44pt.
- **Do** use a solid maroon button for the main action and a 1.5px black outline for the secondary one.
- **Do** mark state with the tag pairs: open, few, full, blue, mute.
- **Do** start SMS opt-ins unticked and end every text with the STOP line.

### Don't:
- **Don't** add shadows inside the phone screen. The only shadow is the desktop frame.
- **Don't** round buttons, cards, chips, fields or sheets.
- **Don't** introduce a second typeface. Use Atkinson Hyperlegible 400/700 only, with italic for the logo.
- **Don't** use site blue for actions or large areas. It is only for the info tag.
- **Don't** set muted #60739f text on the `line` backdrop. Use #4c5d84 there.
- **Don't** use maroon for structure or black for the primary action.
