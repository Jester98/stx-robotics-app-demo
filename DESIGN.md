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
  bubble: "#e9e9eb"
  track: "#eef1f5"
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
  tag: "4px"
  btn: "8px"
  field: "8px"
  card: "16px"
  bar: "20px"
  pill: "9999px"
  bubble: "18px"
  phone: "54px"
spacing:
  gutter: "18px"
  card: "16px"
  stack: "10px"
  section-top: "20px"
  row: "12px"
  chip-gap: "6px"
components:
  button-primary:
    backgroundColor: "{colors.maroon}"
    textColor: "{colors.white}"
    typography: "{typography.lead}"
    rounded: "{rounded.btn}"
    padding: "11px 16px"
  button-primary-pressed:
    backgroundColor: "{colors.maroon-dark}"
  button-primary-sm:
    backgroundColor: "{colors.maroon}"
    textColor: "{colors.white}"
    rounded: "{rounded.btn}"
    padding: "7px 11px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.black}"
    rounded: "{rounded.btn}"
    padding: "11px 16px"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.maroon}"
    rounded: "{rounded.btn}"
    padding: "7px 11px"
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "{spacing.card}"
  stats-row:
    textColor: "{colors.head}"
    typography: "{typography.stat}"
    padding: "14px 0"
  maroon-band:
    backgroundColor: "{colors.maroon}"
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "16px"
  chip:
    backgroundColor: "{colors.white}"
    textColor: "{colors.black}"
    typography: "{typography.chip}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  chip-selected:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white}"
  field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
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
    rounded: "{rounded.card}"
    padding: "10px 10px 10px 16px"
  role-switch:
    backgroundColor: "{colors.track}"
    rounded: "{rounded.pill}"
    padding: "3px"
  role-switch-selected:
    backgroundColor: "{colors.white}"
    textColor: "{colors.head}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 13px"
  tab-bar:
    backgroundColor: "{colors.white}"
    textColor: "{colors.muted}"
    typography: "{typography.tab}"
    rounded: "{rounded.bar}"
    padding: "4px"
  tab-bar-active:
    textColor: "{colors.maroon}"
  bottom-sheet:
    backgroundColor: "{colors.page}"
    rounded: "{rounded.bar}"
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
---

# Design System: STX Robotics App

## Overview

**Creative North Star: "The Club Website, In Your Pocket"**

The app wears stxrobotics.com's clothes. The user chose the clickable prototype (`prototype/stx-robotics-app.html`) as the binding reference. Where it disagrees with an earlier DESIGN.md or with general craft rules, the prototype wins. The React Native port in `mobile/src` follows its CSS classes 1:1, and this file describes that port.

It reads like a clean, light editorial page shrunk to a phone. The page is light grey, and everything that holds content floats on it: white cards with 16px corners and a soft shadow, a floating top bar and a floating tab bar. The ink is near-black and maroon is the brand voice. Most screen tops follow the website's pattern: an uppercase eyebrow with a short rule before it, a bold heading, then a lead line. Big numbers sit in a light stats row split by thin vertical lines. Small uppercase letter-spaced labels (tags, chips, tab labels, section titles) do the sorting work.

Information is dense but legible. Atkinson Hyperlegible is the only typeface, in two weights.

**Key Characteristics:**
- Atkinson Hyperlegible throughout, with bold headings and tight leading.
- Soft rounded corners: 16px cards, 20px floating bars and sheet, 8px buttons and fields, 4px tags and checkboxes, pill chips and role switch.
- White cards with no border and a soft two-layer shadow on a #f7fafc page.
- Maroon solid buttons, 1.5px black outline buttons, black-filled selected chips, and a grey pill in the app bar naming the current role.
- Eyebrow, then heading, then lead at the top of screens. A stats row with hairlines above, below and between carries the big numbers.
- An 18px gutter, 14px card padding, 10px stack gaps and 20px section tops.

## Colors

The palette is high contrast: grey paper, near-black ink, one maroon voice, black for structure, and soft tinted status pairs.

### Primary
- **STX Maroon** (`maroon`): solid buttons, the X in the logo, the active tab, the tab badge, links, eyebrows on team cards, the community label on camp cards, the more-item icons, progress bar fill and the donate band.
- **Pressed Maroon** (`maroon-dark`): the pressed state of solid buttons only.
- **Maroon Wash** (`maroon-soft`): the background of the "full" tag.

### Secondary
- **Band Black** (`black`): the toast, outline-button and chip strokes, selected chips, black progress bars and the logo's "ST".
- **Site Blue** (`blue`, `blue-soft`): used sparingly, only for the informational tag (for example the SMS audience tag).

### Neutral
- **Paper Grey** (`page`): the page ground and bottom-sheet surface. It also fills the "mute" tag and the pressed more-item.
- **Card White** (`white`): cards, the floating app bar and tab bar, the selected role pill, fields and chips.
- **Ink** (`ink`): body text. **Heading Ink** (`head`): headings, section titles and field labels.
- **Slate Muted** (`muted`): meta text, eyebrows, inactive tabs, the more-item chevron and the unchecked checkbox stroke.
- **Hairline** (`line`): stats-row rules and dividers, list dividers inside cards, progress bar track, and the desktop backdrop. Track (`#eef1f5`) is the role-switch background.
- **Field Stroke** (`field`): input borders, the sheet grabber and the fine-print rule in the info panel.
- **Bubble Grey** (`bubble`): the SMS preview bubble, with #111 text.

### Status tones
Each tag pairs a strong foreground with its soft wash: **good / good-soft** (open), **warn / warn-soft** (few seats left), **maroon / maroon-soft** (full or waitlist), **blue / blue-soft** (info), **muted / page** (neutral). `good` also marks match wins and your own shifts' "on this shift" note. Maroon marks losses.

### Named Rules
**The Maroon Speaks, Black Holds Rule.** Maroon is for brand and action: the primary button, the active state and links. Black is for structure and selection: outlines, selected chips and the toast. Do not swap them.

**The Muted On Grey Rule.** `muted` on `page` just meets 4.5:1, but on the darker `line` backdrop it does not. Text on the desktop backdrop uses the darker step #4c5d84.

## Typography

**Display Font:** Atkinson Hyperlegible (the site self-hosts it as "Atkinson"), falling back to system-ui
**Body Font:** Atkinson Hyperlegible 400
**Logo:** Atkinson Hyperlegible 700

**Character:** A single humanist sans built for legibility. Bold weight and uppercase tracking do the hierarchy work, so no second face is needed.

### Hierarchy
- **Logo** (700, 22/26, -0.6px, upright): "ST" in black and "X" in maroon, used in the app bar only.
- **Display** (700, 38/41, -0.38px): the desktop info panel heading only.
- **Headline** (700, 26/29, -0.26px, 8px above and 4px below): the screen title (H2).
- **Stat** (700, 24/26, tabular figures): numbers in the stats row.
- **Title** (700, 16/23): card titles (H3). More-item rows use 15px.
- **Body** (400, 15/22): running text.
- **Lead** (400, 14/20, 4px above): the line under a headline. Toast text, button labels (700) and SMS bubble text also use 14px.
- **Meta** (400, 13/19, muted): secondary facts such as dates, venues and counts. Small buttons, links and checkbox sentences are also 13px.
- **Section title** (700, 13px, 1.56px tracking, uppercase, head): the header of each section, with an optional link on the right.
- **Field label** (700, 12px, 0.72px, uppercase, head). **Chip** (700, 12px, 0.96px, uppercase).
- **Eyebrow** (700, 11px, 1.54px, uppercase, muted, or maroon on team cards). **Label** (700, 11px, 1.32px, uppercase): role switch (1.1px), camp community and info-panel keys.
- **Tag** (700, 10.5px, 0.84px, uppercase). **Tab** (700, 10.5px, 0.63px, uppercase). **Stat label** (400, 10.5/14, 1.05px, uppercase, muted).
- **Job id** (400, 11px, muted, tabular). **Badge** (700, 9.5px).

### Named Rules
**The Tracked Caps Rule.** Uppercase text is always 10.5 to 13px, bold (stat labels are the one regular-weight case), and tracked at roughly 0.06 to 0.14em. Headings and body text are never uppercase.

**The Tabular Numbers Rule.** Stats, scores, seat counts and job ids use tabular figures.

## Layout

The layout is a single phone column: a floating app bar inset 12px, scrolling content (20px bottom padding) and a floating tab bar inset 12px above the home indicator. The bottom sheet and toast draw over everything.

- **Gutter** (`spacing.gutter`): every horizontal page edge, including the app bar, sections, bands and the sheet.
- **Sections** start 20px down (`spacing.section-top`). A section header row sits 10px above its content.
- **Stacks** of cards are 10px apart (`spacing.stack`). **Rows** use a 12px gap. **Chips** sit 6px apart in a horizontal row that runs from gutter to gutter.
- **Hello block:** on the page grey (no box), padded 14px top, 16px bottom and 18px sides. It holds the eyebrow, headline and lead at the top of Home.
- **Stats row and donate card:** the stats row sits inside the gutter with 1px hairlines above and below, equal columns and 1px dividers with 12px left padding. The donate prompt is a maroon card with 16px corners and 16px padding.
- **Open shifts** scroll sideways as 236px cards with a 10px gap, bleeding to the screen edges.
- **Forms** stack fields 11px apart. A field label sits 4px above its input.

**Desktop web** (wider than 820px): the app renders inside a 390×812 phone frame (the height shrinks to fit the window) on the `line` backdrop. From 960px wide, the info panel sits to its left with a 56px gap and 32px page padding. Native apps and narrow browsers render the app full screen with no frame.

## Elevation & Depth

Depth is soft and shallow. Cards, the floating app bar, the floating tab bar and the selected role pill lift off the grey page with small, diffuse shadows; nothing has a hard border except outline buttons and fields. Overlays add one layer: the sheet backdrop is black at 45% and the toast is solid black. The only shadow is the layered drop shadow on the desktop phone frame.

### Shadow Vocabulary
- **Card** (`0 1px 2px rgba(17,24,39,.04), 0 4px 14px rgba(17,24,39,.07)`): cards, more items, the donate card, the add-staff picker.
- **Float** (`0 2px 6px rgba(17,24,39,.06), 0 8px 24px rgba(17,24,39,.10)`): the floating app bar and tab bar.
- **Pill** (`0 1px 3px rgba(17,24,39,.12)`): the selected Parent / Staff pill.
- **Phone frame** (`box-shadow: 0 2px 6px rgba(96,115,159,.25), 0 8px 24px rgba(96,115,159,.33), 0 30px 60px rgba(34,41,57,.3)`): the desktop phone frame.

### Named Rules
**The Soft Lift Rule.** Containers lift with the card or float shadow instead of borders. Keep shadows diffuse and low-contrast; never a hard offset shadow or a dark halo.

## Shapes

Corners are soft and consistent: 16px for cards and the app bar, 20px for the tab bar and the top of the bottom sheet, 12px for warning banners and the toast, 8px for buttons and fields, 4px for tags and checkboxes, and full pills for chips and the role switch. Borders: 1px for fields and tags, 1.5px black for outline buttons and checkboxes, 1px hairlines for the stats row and list dividers. The SMS bubble is 18px with a 4px bottom-left tail, staff initials are 26px circles with a 2px white ring, the tab badge is a 16px pill, and the phone frame has 54px corners outside and 42px inside with a 110×30 island.

## Components

### Eyebrow
A small uppercase label with a short line before it, taken from the website. It is a 22×1.5px rule in the label color, then a 10px gap, then 11px bold text with 1.54px tracking in muted (maroon on team cards for the team number). Use it above a screen's headline. It is part of the brand, not decoration.

### Headings, Lead and Meta
H2 is the screen title, H3 is the card title, Lead goes under H2 and Meta is muted secondary text. The section title is the uppercase 13px header of a section, with an optional maroon link (13px bold) on the right.

### Cards / Containers
- **Corner Style:** 16px (cards)
- **Background:** white
- **Border:** 1px `line`
- **Shadow Strategy:** soft card shadow (see Elevation)
- **Internal Padding:** 14px. Content is usually a Row: the main block grows, and a tag or small button sits on the right.

### Row
A horizontal, center-aligned row with a 12px gap. The main block flexes and stays min-width 0.

### Tags
A small tag with 4px corners, a 1px border in its own foreground color on a soft wash, padded 3×7, uppercase 10.5px and kept to one line. Variants: open, few, full, blue, mute.

### Buttons
- **Shape:** 8px corners
- **Primary (solid):** maroon with white text, 14px bold, padded 11×16. Pressed turns `maroon-dark`.
- **Outline:** transparent with a 1.5px black border and black text. Pressed drops to 70% opacity.
- **White:** white with maroon text, used on the maroon donate card.
- **Small (sm):** 13px text padded 7×11. It keeps that visual size but the hit area extends to at least 44pt (8pt above and below, 4pt to the sides).
- **Block:** stretches to full width. Sheet actions stack a block solid button over a block outline button.
- **Focus:** the prototype uses a 2px maroon outline offset 2px.

### Progress Bar
A 5px `line` track with a maroon fill (black for the alternate series), capped at 100%. It shows seats filled and notebook progress.

### Stats Row and Donate Card
- **Stats row:** inside the gutter, a 1px hairline above and below, equal columns split by 1px vertical hairlines (12px left padding after the first). Each column is a 24px bold tabular number in head ink over a 10.5px uppercase muted label (4px gap). Use it for headline numbers.
- **Donate card:** a maroon card with 16px corners, the card shadow and 16px padding, holding 14px bold white text that grows and a small white button on the right.

### Chips
- **Style:** a pill with a 1px `field` border on white, 12px bold uppercase text, padded 6×13. Selected: black fill and border with white text.
- **State:** selected is black with white text. Chips filter by community in a horizontal row.
- **Choice:** a field label over a wrapping row of chips that picks one value. It replaces a select (React Native has no native select).

### Inputs / Fields
- **Style:** an uppercase 12px label 4px above the input. The input has a 1px `field` border, white background, 10px padding and 15px body text. Placeholder text is muted. Multiline fields are at least 90px tall.
- **Focus:** the border turns maroon and the selection color is maroon.
- **Check:** an 18px box with 4px corners with a 1.5px border (muted, or maroon when ticked) and a white check, next to a 13px sentence. Opt-ins start unticked.

### Icons
Stroke icons on a 24 grid with a 1.8 stroke and round caps and joins, drawn as SVG: home, camps, teams, sched (calendar with dots), more, msg, clock, heart, doc and people. They are 23px in the tab bar and 22px in maroon on more-items. They are decorative and hidden from accessibility.

### Navigation
- **App bar:** a floating white card with 16px corners and the float shadow, inset 12px from the screen edges, padded 10/10/10/16. The upright STX logo (maroon X) sits on the left. On the right is the role label: a grey pill (`#eef1f5`, padded 6×13) with the current role in 11px bold uppercase head ink. Roles are chosen on the "Who are you?" start screen (five white option cards with a one-line description each) and changed from More › Switch role; the start screen hides the tab bar.
- **Tab bar:** a floating white card with 20px corners and the float shadow, inset 12px from the sides and sitting above the home indicator (10px minimum). Five equal tabs, each an icon over a 10.5px uppercase label in muted; the active tab is maroon. The staff More tab carries a maroon 16px pill badge (9.5px white count) showing pending mentor approvals.
- **Back link:** a maroon "More" link at the top of sub-pages.

### Bottom Sheet
The backdrop is black at 45% and tapping it closes the sheet. The sheet is the page grey with 20px top corners, at most 88% tall. It is padded 8/18/28 plus the safe area. A 40×4 grabber in `field` sits centered with 4px above and 12px below. It slides up over 260ms (instantly with reduce motion) and is modal for accessibility.

### Toast
Solid black with 12px corners and 14px white text, padded 12×14, inset 16px each side, 12px above the floating tab bar. It fades and rises 10px over 250ms, stays 2.4s and is announced to screen readers.

### SMS Bubble
`bubble` grey with #111 14/20 text. Corners are 18px except a 4px bottom-left tail. It is padded 10×13, at most 92% wide and aligned left, inside a card titled "Phone preview" with a blue audience tag. The message always ends with "Reply STOP to opt out."

### Week Strip (staff Schedule)
A white card holding the week label ("Week of Oct 19") between maroon ‹ › arrows, then seven equal day cells (Mon–Sun): an 10.5px uppercase weekday over a 17px bold date and a 5px dot. A day with events gets a maroon dot. The selected day is a maroon 12px-rounded cell with white text and a white dot; today, when not selected, has a maroon-soft fill and maroon text. Swiping the row sideways, or the arrows, changes the week; "Back to today" appears when you leave the current week.

### Event Rows and Open-Shift Cards
Event rows are cards with a 46px time column (start in bold 15, end in muted 12) next to the name (bold 15), a type tag and, when short, an amber "Needs N more" tag, the venue · town in meta, a maroon "Your shift: role · hours" line for the signed-in staff member, and a row of 26px initials circles (track grey; the signed-in person in maroon). Type tags: Camp green, Workshop blue, Competition maroon, Practice muted, Speaker Series ink on white. Open-shift cards are the same parts compressed into a 236px card with a small maroon "Take shift" button, or a green "You're on this shift" note.

### More Items
Full-width rows with a white background, 1px `line` border and 14px padding (12px gap). Each has a 22px maroon icon, then a 15px title over meta, then a muted 18px chevron. Pressed turns page grey.

### Section Chips (staff event page)
A row of the same filter chips doubles as in-page navigation on long staff pages: Overview, Staff, Schedule, Kids, Supplies, Notes. One section shows at a time under the page heading; the selected chip is filled black.

### Warning Banners
Full-width boxes inside a section with 12px corners and a 1px border in the tone colour on its soft wash: warn (`#8a5a00` on `#fbf1dc`) for safety problems such as too few adults for the number of kids; maroon (`#7b1f1f` on `#f6e9e9`) for staffing gaps. Bold 14 title, regular 13 explanation that names the rule being applied.

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
- **Do** put headline numbers in the stats row with 24px bold tabular figures, split by thin vertical lines.
- **Do** group content in white cards (1px `line`, 14px padding) stacked 10px apart.
- **Do** use the 18px gutter, 20px section top and 10px stack gap on every screen.
- **Do** use the corner scale: 16 cards, 20 bars and sheet, 8 buttons and fields, 4 tags, pills for chips and the switch.
- **Do** use small 13px buttons inside cards, and keep their hit area at least 44pt.
- **Do** use a solid maroon button for the main action and a 1.5px black outline for the secondary one.
- **Do** mark state with the tag pairs: open, few, full, blue, mute.
- **Do** start SMS opt-ins unticked and end every text with the STOP line.

### Don't:
- **Don't** put hard borders on cards or bring back the black stats band; containers lift with the soft card shadow.
- **Don't** round buttons, cards, chips, fields or sheets.
- **Don't** introduce a second typeface. Use Atkinson Hyperlegible 400/700 only.
- **Don't** use site blue for actions or large areas. It is only for the info tag.
- **Don't** set muted #60739f text on the `line` backdrop. Use #4c5d84 there.
- **Don't** use maroon for structure or black for the primary action.
