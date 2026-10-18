---
version: 1
slug: "mobile-src-app-staff"
primary_target: "mobile/src/app/(staff)"
related_targets: []
---

# Staff dashboard

Mode: **Operate**. Client demo: sample data, no backend, nothing sends. Inherits the DESIGN.md world unchanged. Open decisions render as placeholders.

## Job and audience
A staff member or coach on their phone between sessions at a camp, library or tournament. A few minutes; wants to know what needs them and clear it.

## Outcome
See how full every camp is and clear today's to-dos without leaving the screen. Success: Needs attention reaches zero.

## Flow
Demo role switch ("Parent / Staff · demo") on the top-level screens. Staff tabs: Today (dashboard), Camps (shared list/detail), More (Teams, Prints, Mentor hours, Family texts → "Not in this demo"). Shared sample state with the parent flow.

## Dashboard
1. Seat board (black band): one row per camp, name + community, taken/open seat ticks, waitlist as trailing outlined ticks; tap opens camp detail.
2. Needs attention (ruled list, inline actions): mentor hours (Approve / Return with optional reason); seat opened (Offer seat to #1, promotes a parent-flow child to Confirmed); print ready (Mark picked up); tournament deadline (opens not-in-demo). Undo bar after each action. Empty: "Nothing needs you right now."
3. Print shop strip: printer status, queued and ready counts.

## Scope
Out: rosters, full print queue, teams, tournaments, composing texts, real sign-in. Anti-goals: stat-tile rows, decorative charts or rings, kickers, real student or school names (first name + initial + community), invented totals shown as real.

## States
0–10 attention items; ~6–17 camps of 12–20 seats; waitlists 0–15. All clear; just-resolved with Undo; return with and without reason; both printers idle; long names; largest text size.

## Open decisions (placeholders)
Who may approve mentor hours; how long a seat offer holds; seat-offer text wording; tournament data source; real staff sign-in.

## Direction contract
THESIS: The season is a seat board. The dashboard leads with every camp's seat ledger stacked in one black band, then a to-do list that clears in place. Refuses the category default: a row of stat tiles over cards linking elsewhere.
OWN-WORLD: DESIGN.md unchanged. Atkinson 400/700, #f7fafc page, black band, maroon actions, square corners, hairline-ruled rows, seat ticks (taken #6b7489 on black, open outlined #a9b3c9), waitlist ticks outlined in a light maroon tint for dark ground. Dashed #2337ff placeholders.
STORY: Staff sees which camps are full or have a line, works down the list approving, offering and marking, and ends at "Nothing needs you right now."
FIRST VIEWPORT: Title "Today" with the date and the role switch; black seat board with 6 ledger rows filling most of the screen; first attention row visible below.
FORM: Single scrolling column: board, attention list, print strip. Signature: resolving a row collapses it in place with an Undo bar (crossfade under Reduce Motion), and offering a seat visibly fills a tick on the board. seed: none (no roll; world pinned by DESIGN.md, surface specified in the confirmed brief).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
