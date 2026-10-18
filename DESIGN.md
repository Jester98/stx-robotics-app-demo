---
name: STX Robotics App
description: The seat is the interface. stxrobotics.com's light editorial world, on a phone, with black bands and a ledger of square seats.
colors:
  maroon: "#7b1f1f"
  maroon-dark: "#5a1515"
  maroon-soft: "#f6e9e9"
  placeholder-blue: "#2337ff"
  placeholder-blue-soft: "#eef0ff"
  band-black: "#000000"
  page: "#f7fafc"
  surface: "#ffffff"
  hairline: "#e5e9f0"
  ink: "#222939"
  heading: "#111827"
  muted: "#60739f"
  seat-taken: "#7d8aa3"
  band-muted: "#a9b3c9"
  band-taken: "#6b7489"
  good: "#1d6b3a"
  good-soft: "#e3f1e8"
  warn: "#8a5a00"
  warn-soft: "#fbf1dc"
typography:
  display:
    fontFamily: "Atkinson Hyperlegible"
    fontSize: "104px"
    fontWeight: 700
    lineHeight: "100px"
    letterSpacing: "-4px"
  title:
    fontFamily: "Atkinson Hyperlegible"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: "34px"
    letterSpacing: "-0.4px"
  h3:
    fontFamily: "Atkinson Hyperlegible"
    fontSize: "19px"
    fontWeight: 700
    lineHeight: "24px"
  body:
    fontFamily: "Atkinson Hyperlegible"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "23px"
  small:
    fontFamily: "Atkinson Hyperlegible"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  meta:
    fontFamily: "Atkinson Hyperlegible"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: "16px"
    letterSpacing: "1.4px"
  label:
    fontFamily: "Atkinson Hyperlegible"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: "20px"
  button:
    fontFamily: "Atkinson Hyperlegible"
    fontSize: "17px"
    fontWeight: 700
rounded:
  none: "0px"
spacing:
  gutter: "16px"
  frame: "14px"
  row: "18px"
  form-gap: "22px"
  section: "24px"
components:
  button-primary:
    backgroundColor: "{colors.maroon}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "52px"
  button-primary-pressed:
    backgroundColor: "{colors.maroon-dark}"
    textColor: "{colors.surface}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.band-black}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "52px"
  button-outline-pressed:
    backgroundColor: "{colors.hairline}"
  button-white:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.maroon}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "52px"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.heading}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "52px"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.band-black}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "44px"
  filter-chip-selected:
    backgroundColor: "{colors.band-black}"
    textColor: "{colors.surface}"
  placeholder-frame:
    backgroundColor: "{colors.placeholder-blue-soft}"
    textColor: "{colors.placeholder-blue}"
    rounded: "{rounded.none}"
    padding: "{spacing.frame}"
  status-tag-open:
    backgroundColor: "{colors.good-soft}"
    textColor: "{colors.good}"
    rounded: "{rounded.none}"
    padding: "3px 8px"
  status-tag-few:
    backgroundColor: "{colors.warn-soft}"
    textColor: "{colors.warn}"
    rounded: "{rounded.none}"
    padding: "3px 8px"
  status-tag-full:
    backgroundColor: "{colors.maroon-soft}"
    textColor: "{colors.maroon}"
    rounded: "{rounded.none}"
    padding: "3px 8px"
  step-strip:
    backgroundColor: "{colors.band-black}"
    textColor: "{colors.surface}"
    padding: "4px 16px 16px"
---

# Design System: STX Robotics App

## Overview

**Creative North Star: "The Seat Ledger"**

The app is stxrobotics.com carried onto a phone: a light, cool page (#f7fafc), white fields, cool hairlines, one maroon voice, and black bands that hold the numbers that matter. Its own idea is the seat ledger, a row of square ticks with one per seat. It shows up wherever a session is in play: on the camp list, in the camp detail band, in the strip above every registration step, and on the confirmation, where the parent's own seat fills maroon. The parent should always be able to see what they are holding.

The density is calm and editorial. Lists are ruled with hairlines rather than stacked as cards. Corners are square everywhere. There are no shadows. Typography is Atkinson Hyperlegible alone, using weight and size instead of a second face. One shared custom look runs on iOS and Android. It does not adapt per OS, but it keeps each OS's hard guarantees (see Layout).

Anything the client has not decided is shown, not invented: it sits in a dashed blue placeholder frame that says it is a placeholder.

**Key Characteristics:**
- Square seat ticks as the core information graphic; one tick per seat.
- Black bands for headline numbers and context; light page for detail and forms.
- Maroon is the only action color; blue appears only in placeholder frames.
- Square corners on every surface, control and tick.
- Hairline-ruled lists, flat surfaces, no shadows.
- One family, Atkinson Hyperlegible, at 400 and 700.

## Colors

A cool, near-white editorial palette with one deep maroon, true-black bands, and a quiet set of seat and status tones that are each tuned against their own ground.

### Primary
- **Brick Maroon** (maroon): The one action and ownership color. It's used for primary buttons, the meta line, the active tab, the tab badge, link-style actions ("Edit", donate), error text and focused error borders, and the parent's own seat in the ledger.
- **Deep Maroon** (maroon-dark): The pressed state of the primary button only.
- **Maroon Wash** (maroon-soft): The fill behind the "Full" status tag.

### Secondary
- **Placeholder Blue** (placeholder-blue) on **Placeholder Wash** (placeholder-blue-soft): Reserved for client-pending content frames. This is the site's sparing secondary accent, given exactly one job here.

### Neutral
- **Band Black** (band-black): The camp detail band, the step strip, the stack header, the selected filter chip, the checked checkbox, and the outline-button stroke.
- **Cool Paper** (page): The page ground behind every screen, the pinned footers, and the pressed state of list rows.
- **White** (surface): Fields, list bodies, the tab bar and the waiver sheet header.
- **Hairline** (hairline): Every rule: list separators, footer top borders, the tab bar border, and the info notice border.
- **Heading Ink** (heading): Titles, h3 and labels, plus the text typed into fields.
- **Body Ink** (ink): Running text.
- **Slate Muted** (muted): Small text, key columns in key/value rows, placeholder text, inactive tabs, chevrons, and the open ticks on light ground. It measures about 4.7:1 on white.

### Seat and status tones
- **Seat Taken, light** (seat-taken): Filled ticks on white or the page. It's tuned to stay at or above 3:1 on both (about 3.5:1 on white, 3.3:1 on page), as theme.ts notes.
- **Band Muted** (band-muted): Secondary text on black and open-tick outlines on black.
- **Band Taken** (band-taken): Filled ticks on black, the pending step squares, and the step-strip divider. It's tuned to stay at or above 3:1 on black (about 4.5:1).
- **Good / Good Wash**, **Warn / Warn Wash**: These drive the status tags (Open, few left, Confirmed / Waitlist) and the seat-taken warning notice. The tone is always the text and 1px border, and the wash is always the fill.

### Named Rules
**The One Voice Rule.** Maroon is the only color that asks for action or marks ownership. In the ledger, maroon means "yours" and nothing else.

**The Tuned Ground Rule.** Ledger tones are chosen per ground. On black, use band-taken and band-muted. On light, use seat-taken and muted. Never move a light tick onto black or the reverse. Both taken tones hold at least 3:1 against their own ground.

**The Blue Means Undecided Rule.** #2337ff appears only in placeholder frames. Don't use it for links or emphasis.

## Typography

**Display Font:** Atkinson Hyperlegible 700
**Body Font:** Atkinson Hyperlegible 400
**Label Font:** Atkinson Hyperlegible 700

**Character:** One hyperlegible family, as the site self-hosts it. Hierarchy comes from weight, size and tight negative tracking at the top, never from a second face.

### Hierarchy
- **Display** (700, 104/100, -4 tracking): The single headline numeral. Seats left in the camp detail band (white) and the waitlist position "#n" on the confirmation (maroon). It holds a number, never words.
- **Title** (700, 30/34, -0.4): One per screen, marked as the header. The confirmation sentence enlarges it once to 36/40.
- **H3** (700, 19/24): List-row names, the camp name in the step strip, and sheet headers.
- **Body** (400, 16/23): Running copy.
- **Small** (400, 14/20, muted): Hints, secondary lines, key columns, footnotes.
- **Meta** (700, 12/16, 1.4 tracking, uppercase, maroon): The community · dates line. On black it switches to band-muted.
- **Label** (700, 15/20, heading): Field labels, values in key/value rows, the seats-left count in the step strip, and link actions (in maroon).
- **Button** (700, 17): Button text and the base for the stack header title (17).

### Named Rules
**The Meta Below Rule.** The meta line always sits directly under the heading it qualifies, never above it as a kicker or eyebrow. Test: the first text in any block is the heading.

**The Capped Display Rule.** Every text style follows the OS font size up to 2x. Display is capped at 1.3x so the numeral and its ledger stay on screen.

## Layout

The layout is a single column with a 16pt gutter. Content sits on the page ground, and lists run full-bleed in white with hairlines above and below. Sections are spaced 24pt apart. Form fields are 22pt apart. Framed blocks (placeholders, notices) pad 14pt. List rows pad 18pt vertically.

**The black band pattern.** A screen that introduces a session opens on a black band that runs flush under the black stack header. It holds the title, then the meta line, then the display numeral with a body-size caption on its baseline, then the ledger. Detail continues on light ground below. The registration steps open on the same black as a persistent strip.

**Pinned action.** The primary action sits in a footer pinned at the bottom. The footer uses the page ground, has a hairline top border, 12pt top padding and bottom padding of max(safe-area inset, 12). On forms it rides above the keyboard (KeyboardAvoidingView offset by the header height on iOS).

**OS guarantees honored.** These hold on both platforms:
- Safe-area insets on top (tab screens, confirmation) and bottom (every pinned footer and sheet).
- The native stack: an arrow-only back button (minimal display mode) and the native edge swipe.
- Touch targets from 44pt (filter chips, Edit, sheet close, all with hitSlop) up to 52pt (buttons, fields). The checkbox row is 48.
- Font scaling up to 2x, with Display capped at 1.3x.
- Status bar handling per band: light over the black detail band and step strip, dark on light screens and the confirmation.
- On the confirmation, the Android hardware back button dismisses the whole flow instead of reopening the spent form. iOS swipe-back is disabled there, and the screen fades in.
- Reduce Motion is respected (see Seat Ledger), and VoiceOver and TalkBack get a spoken summary for the ledger and the step marker.

## Elevation & Depth

The system is flat. There are no shadows anywhere, and the stack header's shadow is turned off. Depth comes from ground changes: black band against light page, white list body against cool paper, and hairline rules between them. A pressed row drops from white to the page tone. A pressed primary button darkens to maroon-dark. A pressed outline button fills with hairline.

### Named Rules
**The Flat Ground Rule.** Separate things with a change of ground or a hairline, never with a shadow.

## Shapes

Every corner is square (0 radius): buttons, fields, chips, tags, frames, checkboxes, ledger ticks and step squares. Strokes come in a few fixed weights. 1.5pt is for interactive outlines (outline button, chip, checkbox, field at rest, open ticks, placeholder dash). 2pt is for a field with focus or an error. 1pt is for tags, notices and hairlines. The square is the system's one silhouette, and it appears at four scales: seat tick, step square, checkbox, button.

## Components

### Buttons
Full-width, square and heavy, with one per job.
- **Shape:** square (0), min height 52, 20 horizontal padding, optional 18pt Feather icon with an 8pt gap.
- **Primary (solid):** maroon fill with white 17 bold text, pressed to maroon-dark. Use one per screen, in the pinned footer.
- **Secondary (outline):** 1.5pt black stroke, transparent fill, black text, pressed to a hairline fill.
- **White:** white fill with maroon text. It's defined in the kit for use on black bands and isn't placed on any screen yet, so treat it as provisional.
- **Disabled:** 45% opacity.

### Filter chips
- **Style:** a square 1.5pt black outline, min height 44, label type, scrolling in a horizontal row.
- **State:** selected is black fill with white text, and this is announced as selected.

### Status tags
- **Style:** 1pt border and text in the tone, with the wash fill. 12 bold uppercase text, 0.8 tracking, 3/8 padding.
- **States:** Open (good), "n left" when 3 or fewer seats remain (warn), "Full · n waiting" (maroon). The My kids list reuses the same recipe for Confirmed (good) and Waitlist #n (warn).

### Inputs / Fields
- **Style:** white, square, min height 52, 14 padding, 17 regular text in heading ink, label above and optional small hint between. Multiline grows to 96. The caret and selection are maroon.
- **Focus:** the border goes to 2pt black.
- **Error:** the border goes to 2pt maroon, with an error line below (alert-circle icon plus bold small maroon text, announced politely).

### Checkbox
A 26pt square with a 1.5pt black stroke. When checked it fills black with a white check. The whole row (min 48) is the target. Consent boxes start unchecked.

### Lists
- **Hairline-ruled list:** a full-bleed white body with hairlines top and bottom and between rows. Rows pad 16/18 and press to the page tone. Camp rows read h3, meta, small, with the light ledger and status tag below, and a muted chevron.
- **Key/value rows:** a hairline above the group and under each row. The key is small at a fixed width (64 to 76), the value is label. An optional maroon "Edit" action sits at the end.

### Notices
A framed block with 14 padding, 1pt border, and an 18pt Feather icon beside a label title. Warn uses warn on warn-soft and is announced assertively. Info uses ink on white with a hairline border.

### Placeholder Frame
A 1.5pt dashed blue border on blue wash, 14 padding. Its title is 12 bold uppercase, 1.2 tracking, blue, and reads "Placeholder · topic". The body is body type in blue. It announces itself as a placeholder. Use it for every open client decision (cost, payment, waiver text, signature, what to bring, description). Never fill it with an invented answer.

### Seat Ledger (signature)
One square tick per seat, laid out in a flexible row.
- **Tone:** `dark` on black (taken = band-taken fill; open = 1.5pt band-muted outline) or `light` on paper (taken = seat-taken fill; open = 1.5pt muted outline).
- **Size:** `lg` has a 5pt gap and a max width of 22 per seat. `sm` has a 3pt gap and 12 per seat, and is used in the list and the step strip.
- **perRow:** wraps into rows of n. The last row keeps the same tick size by taking a proportional width. The confirmation uses rows of 10. A waitlist renders as its own ledger.
- **mine:** the parent's own tick gets a maroon outline, and a maroon fill grows into it (scale 0.2 to 1 plus opacity, 700ms after a 350ms delay). With Reduce Motion on, it is an opacity crossfade only (300ms, no scale).
- **Haptic:** one success haptic when the fill finishes, and only for a confirmed seat (`celebrate`). A waitlist position does not trigger it.
- **Accessibility:** one image element that reads "n of N seats taken, k left. One is yours."

### Step Strip
A black band under the stack header, on every registration step. It shows the camp name (h3, white) over a community · dates line (small, band-muted), the seats-left count at the right (label, white), and the small dark ledger. Under a 1pt band-taken divider sit four 8pt step squares with a 3pt gap (done and current in white, pending in band-taken) beside "Step n of 4 · **Name**". The step squares are deliberately smaller, gap-tighter and always solid so they never read as seats. It sets the status bar to light.

### Navigation
- **Stack header:** black, white tint, 17 bold title, no shadow, arrow-only back.
- **Tab bar:** white with a hairline top border. Active is maroon, inactive is muted, labels are 12 bold, icons are Feather outline. The badge is maroon.
- **Sheet:** the waiver opens as a native page sheet with a white header, an h3 title and a 44pt close button.

## Do's and Don'ts

### Do:
- **Do** show the seat ledger wherever a specific session is in play, tuned to its ground (dark tones on black, light tones on paper).
- **Do** give the parent's own seat maroon and nothing else in the ledger maroon.
- **Do** put the meta line (12 bold uppercase, 1.4 tracking) directly below the heading it qualifies.
- **Do** open session screens on a black band with the display numeral and ledger, then continue on the light page.
- **Do** pin the single solid maroon action at the bottom safe area, with outline buttons for secondary actions.
- **Do** rule lists with #e5e9f0 hairlines on a full-bleed white body.
- **Do** frame every undecided client fact in the dashed #2337ff placeholder, labelled "Placeholder · topic".
- **Do** keep targets at 44 to 52pt, honor safe areas, cap Display scaling at 1.3x, and fade instead of scaling under Reduce Motion.
- **Do** set the status bar per band: light over black, dark over paper.

### Don't:
- **Don't** round any corner.
- **Don't** add shadows. Separate with ground or hairlines.
- **Don't** stack content in cards. Use ruled lists and key/value rows.
- **Don't** place a meta line, eyebrow or kicker above a heading.
- **Don't** use #2337ff for anything but placeholder frames.
- **Don't** fill a placeholder with an invented answer or present sample data as real.
- **Don't** make step markers look like seat ticks. Keep them 8pt, solid, and under the divider.
- **Don't** fire a haptic for anything but a confirmed seat.
- **Don't** pre-check consent boxes.
