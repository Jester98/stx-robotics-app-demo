---
name: STX Robotics App
description: The seat is the interface. stxrobotics.com's light editorial world, on a phone, with black bands and a ledger of square seats.
colors:
  maroon: "#7b1f1f"
  maroon-dark: "#5a1515"
  maroon-soft: "#f6e9e9"
  maroon-on-dark: "#e29a9a"
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
  button-primary-sm:
    backgroundColor: "{colors.maroon}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "44px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.band-black}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "52px"
  button-outline-pressed:
    backgroundColor: "{colors.hairline}"
  button-outline-sm:
    backgroundColor: "transparent"
    textColor: "{colors.band-black}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "44px"
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
  role-switch:
    backgroundColor: "transparent"
    textColor: "{colors.band-black}"
    rounded: "{rounded.none}"
    padding: "0 10px"
    height: "36px"
  role-switch-selected:
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
  seat-board:
    backgroundColor: "{colors.band-black}"
    textColor: "{colors.surface}"
    padding: "14px 16px 0"
  attention-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.heading}"
    padding: "16px"
  undo-bar:
    backgroundColor: "{colors.band-black}"
    textColor: "{colors.surface}"
    rounded: "{rounded.none}"
    padding: "0 0 0 16px"
    height: "56px"
---

# Design System: STX Robotics App

## Overview

**Creative North Star: "The Seat Ledger"**

The app is stxrobotics.com carried onto a phone: a light, cool page (#f7fafc), white fields, cool hairlines, one maroon voice, and black bands that hold the numbers that matter. Its own idea is the seat ledger, a row of square ticks with one per seat. It shows up wherever a session is in play: on the camp list, in the camp detail band, in the strip above every registration step, and on the confirmation, where the parent's own seat fills maroon. The parent should always be able to see what they are holding. On the staff side the same ledger becomes the seat board, every camp stacked in one black band, with the waitlist trailing behind each row.

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
- **Brick Maroon** (maroon): The one action and claim color on light ground. It's used for primary buttons, the meta line, the active tab, the tab badge, link-style actions ("Edit", donate), error text and focused error borders, the parent's own seat and held seats in the light ledger, and "Robotics" in the wordmark.
- **Deep Maroon** (maroon-dark): The pressed state of the primary button only.
- **Maroon Wash** (maroon-soft): The fill behind the "Full" status tag.
- **Maroon on Dark** (maroon-on-dark): Maroon's form on black, about 9:1 against it. It marks claims on the dark ledger and the seat board (held seats, waitlist ticks, a seat just offered), colors the board's "1 seat to offer" status and the legend keys for those marks, and is the "Undo" action in the Undo bar.

### Secondary
- **Placeholder Blue** (placeholder-blue) on **Placeholder Wash** (placeholder-blue-soft): Reserved for client-pending content frames. This is the site's sparing secondary accent, given exactly one job here.

### Neutral
- **Band Black** (band-black): The camp detail band, the step strip, the seat board, the Undo bar, the stack header, the selected filter chip and role-switch segment, the checked checkbox, and the outline-button and role-switch stroke.
- **Cool Paper** (page): The page ground behind every screen, the pinned footers, the status-bar scrim, and the pressed state of list rows.
- **White** (surface): Fields, list bodies, the tab bar and the waiver sheet header.
- **Hairline** (hairline): Every rule: list separators, footer top borders, the tab bar border, and the info notice border.
- **Heading Ink** (heading): Titles, h3 and labels, the text typed into fields, and tool-row icons.
- **Body Ink** (ink): Running text.
- **Slate Muted** (muted): Small text, key columns in key/value rows, placeholder text, inactive tabs, chevrons, the "Demo" label, and the open ticks on light ground. It measures about 4.7:1 on white.

### Seat and status tones
- **Seat Taken, light** (seat-taken): Filled ticks on white or the page. It's tuned to stay at or above 3:1 on both (about 3.5:1 on white, 3.3:1 on page), as theme.ts notes.
- **Band Muted** (band-muted): Secondary text on black, the seat board's status column and legend text, and open-tick outlines on black.
- **Band Taken** (band-taken): Filled ticks on black, the pending step squares, and the step-strip divider. It's tuned to stay at or above 3:1 on black (about 4.5:1).
- **Good / Good Wash**, **Warn / Warn Wash**: These drive the status tags (Open, few left, Confirmed / Waitlist) and the seat-taken warning notice. The tone is always the text and 1px border, and the wash is always the fill.

### Named Rules
**The One Voice Rule.** Maroon is the only color that asks for action or marks a claim on a seat. In the ledger, maroon means a family's claim and nothing else: a filled tick is the parent's own seat or a seat just offered, an outlined tick with a center square is a seat held for the waitlist, and an outlined trailing tick is a place on the waitlist.

**The Maroon on Dark Rule.** On black, every maroon mark or action uses maroon-on-dark. Brick maroon is never drawn on black, and maroon-on-dark is never drawn on light ground.

**The Tuned Ground Rule.** Ledger tones are chosen per ground. On black, use band-taken, band-muted and maroon-on-dark. On light, use seat-taken, muted and maroon. Never move a light tick onto black or the reverse. Both taken tones hold at least 3:1 against their own ground.

**The Blue Means Undecided Rule.** #2337ff appears only in placeholder frames. Don't use it for links or emphasis.

## Typography

**Display Font:** Atkinson Hyperlegible 700
**Body Font:** Atkinson Hyperlegible 400
**Label Font:** Atkinson Hyperlegible 700

**Character:** One hyperlegible family, as the site self-hosts it. Hierarchy comes from weight, size and tight negative tracking at the top, never from a second face.

### Hierarchy
- **Display** (700, 104/100, -4 tracking): The single headline numeral. Seats left in the camp detail band (white) and the waitlist position "#n" on the confirmation (maroon). It holds a number, never words.
- **Title** (700, 30/34, -0.4): One per screen, marked as the header. The confirmation sentence enlarges it once to 36/40.
- **H3** (700, 19/24): List-row names, the camp name in the step strip, sheet headers, section heads on the dashboard ("Needs attention", "Print shop"), the seat board heading and the empty-state line.
- **Body** (400, 16/23): Running copy and the Undo bar message.
- **Small** (400, 14/20, muted): Hints, secondary lines, key columns, footnotes, attention-row meta and section counts. Set bold for the seat board's status column.
- **Meta** (700, 12/16, 1.4 tracking, uppercase, maroon): The community · dates line. On black it switches to band-muted.
- **Label** (700, 15/20, heading): Field labels, values in key/value rows, the seats-left count in the step strip, link actions (in maroon), attention-row titles, camp names on the seat board (white), and small-button text.
- **Button** (700, 17): Button text and the base for the stack header title (17).

### Named Rules
**The Meta Below Rule.** The meta line always sits directly under the heading it qualifies, never above it as a kicker or eyebrow. Test: the first text in any block is the heading.

**The Capped Display Rule.** Every text style follows the OS font size up to 2x. Display is capped at 1.3x so the numeral and its ledger stay on screen. The demo role switch is capped at 1.5x so it stays beside the wordmark.

## Layout

The layout is a single column with a 16pt gutter. Content sits on the page ground, and lists run full-bleed in white with hairlines above and below. Sections are spaced 24pt apart. Form fields are 22pt apart. Framed blocks (placeholders, notices) pad 14pt. List rows pad 18pt vertically.

**The black band pattern.** A screen that introduces a session opens on a black band that runs flush under the black stack header. It holds the title, then the meta line, then the display numeral with a body-size caption on its baseline, then the ledger. Detail continues on light ground below. The registration steps open on the same black as a persistent strip.

**Top-level screens.** Tab screens have no stack header. They start at the top safe-area inset plus 12, with the wordmark at the left and the demo role switch at the right (wrapping under it when space runs out), then the screen title. Section heads on a scrolling dashboard are an h3, optionally followed on its baseline by a small count, padded 24 above and 12 below the ruled list they introduce.

**Pinned action.** The primary action sits in a footer pinned at the bottom. The footer uses the page ground, has a hairline top border, 12pt top padding and bottom padding of max(safe-area inset, 12). On forms it rides above the keyboard (KeyboardAvoidingView offset by the header height on iOS).

**OS guarantees honored.** These hold on both platforms:
- Safe-area insets on top (tab screens, confirmation) and bottom (every pinned footer and sheet).
- The native stack: an arrow-only back button (minimal display mode) and the native edge swipe.
- Touch targets from 44pt (filter chips, small buttons, Edit, sheet close, all with hitSlop) up to 52pt (buttons, fields). The checkbox row is 48, the Undo action is 48, and role-switch segments are 36 with 6pt hitSlop above and below.
- Font scaling up to 2x, with Display capped at 1.3x and the role switch at 1.5x.
- Status bar handling per band: light over the black detail band, step strip and the black stack header of the "Not in this demo" screen; dark on light screens and the confirmation.
- **Status-bar scrim.** On a headerless screen where black content can scroll under the top inset, a non-interactive page-colored bar the height of the inset sits over the content, so the dark status bar always reads against light ground.
- On the confirmation, the Android hardware back button dismisses the whole flow instead of reopening the spent form. iOS swipe-back is disabled there, and the screen fades in.
- Reduce Motion is respected (see Seat Ledger and Attention List), and VoiceOver and TalkBack get a spoken summary for the ledger, each seat board row and the step marker.

## Elevation & Depth

The system is flat. There are no shadows anywhere, and the stack header's shadow is turned off. Depth comes from ground changes: black band against light page, white list body against cool paper, and hairline rules between them. The Undo bar floats over content as a black block, with no shadow. A pressed row drops from white to the page tone; a pressed row on black, which has no lighter ground to drop to, dims to 70% opacity. A pressed primary button darkens to maroon-dark. A pressed outline button fills with hairline.

### Named Rules
**The Flat Ground Rule.** Separate things with a change of ground or a hairline, never with a shadow.

## Shapes

Every corner is square (0 radius): buttons, fields, chips, tags, frames, checkboxes, the role switch, the Undo bar, ledger ticks and step squares. Strokes come in a few fixed weights. 1.5pt is for interactive outlines (outline button, chip, role switch, checkbox, field at rest, open, held and waitlist ticks, placeholder dash). 2pt is for a field with focus or an error. 1pt is for tags, notices and hairlines. The square is the system's one silhouette, and it appears at four scales: seat tick, step square, checkbox, button. A held seat nests a square inside the square.

## Components

### Buttons
Square and heavy, with one per job.
- **Shape:** square (0), min height 52, 20 horizontal padding, optional 18pt Feather icon with an 8pt gap. Full width in pinned footers.
- **Primary (solid):** maroon fill with white 17 bold text, pressed to maroon-dark. Use one per screen, in the pinned footer.
- **Secondary (outline):** 1.5pt black stroke, transparent fill, black text, pressed to a hairline fill.
- **Small (sm):** min height 44, 14 horizontal padding, 15 bold text, in the solid or outline style. For inline actions inside list rows: sized to content, 8pt apart, wrapping. A row has at most one solid small button, its main action; the rest are outline.
- **White:** white fill with maroon text. It's defined in the kit for use on black bands and isn't placed on any screen yet, so treat it as provisional.
- **Disabled:** 45% opacity.

### Filter chips
- **Style:** a square 1.5pt black outline, min height 44, label type, scrolling in a horizontal row.
- **State:** selected is black fill with white text, and this is announced as selected.

### Status tags
- **Style:** 1pt border and text in the tone, with the wash fill. 12 bold uppercase text, 0.8 tracking, 3/8 padding.
- **States:** Open (good), "n left" when 3 or fewer seats remain (warn), "Full · n waiting" (maroon). The My kids list reuses the same recipe for Confirmed (good) and Waitlist #n (warn). A camp with a waitlist has no seats left for new families: any open seat is held for the line, so it reads Full.

### Inputs / Fields
- **Style:** white, square, min height 52, 14 padding, 17 regular text in heading ink, label above and optional small hint between. Multiline grows to 96. The caret and selection are maroon.
- **Focus:** the border goes to 2pt black.
- **Error:** the border goes to 2pt maroon, with an error line below (alert-circle icon plus bold small maroon text, announced politely).

### Checkbox
A 26pt square with a 1.5pt black stroke. When checked it fills black with a white check. The whole row (min 48) is the target. Consent boxes start unchecked.

### Lists
- **Hairline-ruled list:** a full-bleed white body with hairlines top and bottom and between rows. Rows pad 16/18 and press to the page tone. Camp rows read h3, meta, small, with the light ledger and status tag below, and a muted chevron.
- **Tool rows:** the same ruled list with a 22pt Feather outline icon in heading ink, an h3 over a small line, and a muted chevron. 14pt between icon and text.
- **Key/value rows:** a hairline above the group and under each row. The key is small at a fixed width (64 to 76), the value is label. An optional maroon "Edit" action sits at the end.

### Attention List
A ruled list of to-dos that clear in place.
- **Row:** 16 padding, a label title over a small meta line (3pt apart), then the row's small buttons 12pt below. A row may expand in place into a form (an optional field plus its own small buttons) and collapse back.
- **Resolve:** acting on a row removes it with a layout ease-in-out, and the rows below close the gap. Under Reduce Motion it is an opacity crossfade only (300ms), and the rows below snap into place. Every resolve shows the Undo bar.
- **Count:** the section head shows the open count as small text on its baseline, hidden at zero.
- **Empty:** the list body keeps its rules and holds an h3 "Nothing needs you right now." over a small line naming what will show up, padded 24 vertically.

### Undo Bar
A black bar floating 16pt in from each side and 12pt above the bottom of the screen, min height 56. It holds the result in white body text and an "Undo" action (16 bold, maroon-on-dark, min 48 tall, 16 horizontal padding) at the right. It dismisses after 5s; while a screen reader is on it stays until the user undoes or acts again. It is a polite live region on Android and is announced explicitly on iOS. Scroll content gains bottom padding while it shows so nothing hides under it. Undo restores the snapshot taken before the action.

### Notices
A framed block with 14 padding, 1pt border, and an 18pt Feather icon beside a label title. Warn uses warn on warn-soft and is announced assertively. Info uses ink on white with a hairline border.

### Placeholder Frame
A 1.5pt dashed blue border on blue wash, 14 padding. Its title is 12 bold uppercase, 1.2 tracking, blue, and reads "Placeholder · topic". The body is body type in blue. It announces itself as a placeholder. Use it for every open client decision (cost, payment, waiver text, signature, what to bring, description). Never fill it with an invented answer.

### Not in this demo
The stub for any destination the demo does not build. It is a stack screen titled with the destination's name, on the page ground with a light status bar under the black header. It shows the title "Not in this demo", one body line naming the destination and what the demo covers, then a placeholder frame titled "Placeholder · coming later" that reads "[Destination] goes here."

### Seat Ledger (signature)
One square tick per seat, laid out in a flexible row.
- **Tone:** `dark` on black (taken = band-taken fill; open = 1.5pt band-muted outline; accent = maroon-on-dark) or `light` on paper (taken = seat-taken fill; open = 1.5pt muted outline; accent = maroon).
- **Size:** `lg` has a 5pt gap and a max width of 22 per seat. `sm` has a 3pt gap and 12 per seat, and is used in the list, the step strip and the seat board.
- **perRow:** wraps into rows of n. The last row keeps the same tick size by taking a proportional width. The confirmation uses rows of 10. A waitlist renders as its own ledger.
- **held:** when a camp has a waitlist, every open seat is held for it. A held tick is a 1.5pt accent outline with a solid accent square at its center (40% of the tick).
- **mine:** the claimed tick gets an accent outline, and an accent fill grows into it (scale 0.2 to 1 plus opacity, 700ms after a 350ms delay). With Reduce Motion on, it is an opacity crossfade only (300ms, no scale). On the confirmation it is the parent's own seat; on the seat board it is the seat just offered to waitlist #1.
- **Haptic:** one success haptic when the fill finishes, and only for a confirmed seat (`celebrate`). A waitlist position or an offered seat does not trigger it.
- **Accessibility:** one image element that reads "n of N seats taken, k left" (or "k held for the waitlist"), plus "One is yours." when it applies.

### Seat Board
The staff form of the black band: the whole season's seats in one place.
- **Band:** black, 14 top padding, 16 gutter. An h3 heading in white over a small band-muted summary line (seats taken, on waitlists, "sample data").
- **Rows:** one per camp, 8pt vertical padding, divided by a 1pt dark rule. Each row reads the camp name (label, white) with "· community" in regular band-muted on the same line, a status column at the right, and below it the small dark ledger.
- **Status column:** small bold, band-muted: "n left", "Full", "Full · n waiting", or "1 seat to offer" in maroon-on-dark.
- **Waitlist ticks:** after a 6pt break, one 9pt tick per waiting family with a 1.5pt maroon-on-dark outline and no fill, trailing the ledger on the same wrapping line.
- **Legend:** closes the band with 12 vertical padding: 11pt key squares beside small band-muted labels (Taken, Open, Held for waitlist, Waitlist), wrapping with 14 between and 6 between lines.
- **Behavior:** a row opens that camp's detail and dims to 70% while pressed. Each row speaks one summary (name, community, taken of total, waitlist count, status) and hides the ticks from the screen reader. Offering a seat scrolls its row into view and plays the ledger's mine fill on the new seat.

### Step Strip
A black band under the stack header, on every registration step. It shows the camp name (h3, white) over a community · dates line (small, band-muted), the seats-left count at the right (label, white), and the small dark ledger. Under a 1pt band-taken divider sit four 8pt step squares with a 3pt gap (done and current in white, pending in band-taken) beside "Step n of 4 · **Name**". The step squares are deliberately smaller, gap-tighter and always solid so they never read as seats. It sets the status bar to light.

### Navigation
- **Stack header:** black, white tint, 17 bold title, no shadow, arrow-only back.
- **Tab bar:** white with a hairline top border. Active is maroon, inactive is muted, labels are 12 bold, icons are Feather outline. The badge is maroon. Parent and staff each get their own tab set in the same style.
- **Wordmark:** "STX Robotics", 22 bold, -0.6 tracking, "STX" in black and "Robotics" in maroon, marked as the header. It heads every top-level screen.
- **Role switch (demo only):** a small muted "Demo" label beside a segmented control with a 1.5pt black outline and square segments (min 36 tall, min 64 wide, 10 padding, 14 bold). The selected segment is black with white text; the other is black text on no fill. It is a tab list, and each segment reads "Parent view (demo)" or "Staff view (demo)". It stands in for sign-in and never ships as a real control.
- **Sheet:** the waiver opens as a native page sheet with a white header, an h3 title and a 44pt close button.

## Do's and Don'ts

### Do:
- **Do** show the seat ledger wherever a specific session is in play, tuned to its ground (dark tones on black, light tones on paper).
- **Do** reserve maroon in the ledger for a family's claim: an own or offered seat (filled), a held seat (outline plus center square), a waitlist place (outline).
- **Do** use maroon-on-dark (#e29a9a) for every maroon mark or action on black.
- **Do** put the meta line (12 bold uppercase, 1.4 tracking) directly below the heading it qualifies.
- **Do** open session screens on a black band with the display numeral and ledger, then continue on the light page.
- **Do** pin the single solid maroon action at the bottom safe area, with outline buttons for secondary actions.
- **Do** put inline row actions in 44pt small buttons, at most one solid per row.
- **Do** clear to-dos in place and offer Undo for 5s, held while a screen reader is on.
- **Do** rule lists with #e5e9f0 hairlines on a full-bleed white body.
- **Do** frame every undecided client fact in the dashed #2337ff placeholder, labelled "Placeholder · topic".
- **Do** send unbuilt destinations to the "Not in this demo" stub with its placeholder.
- **Do** keep targets at 44 to 52pt, honor safe areas, cap Display scaling at 1.3x, and fade instead of scaling or sliding under Reduce Motion.
- **Do** set the status bar per band: light over black, dark over paper, with a page-colored scrim where black content scrolls under the top inset.

### Don't:
- **Don't** round any corner.
- **Don't** add shadows. Separate with ground or hairlines.
- **Don't** stack content in cards. Use ruled lists and key/value rows.
- **Don't** place a meta line, eyebrow or kicker above a heading.
- **Don't** use #2337ff for anything but placeholder frames.
- **Don't** draw brick maroon on black or maroon-on-dark on paper.
- **Don't** fill a placeholder with an invented answer or present sample data as real.
- **Don't** make step markers look like seat ticks. Keep them 8pt, solid, and under the divider.
- **Don't** fire the success haptic for anything but a confirmed seat. Staff actions in the attention list get one light impact each; nothing else buzzes.
- **Don't** pre-check consent boxes.
- **Don't** show the role switch without its "Demo" label.
