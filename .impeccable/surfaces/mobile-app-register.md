---
version: 1
slug: "mobile-app-register"
primary_target: "mobile/app/register"
related_targets: ["mobile/app/camp","mobile/app/(tabs)"]
---

# Parent camp registration

Mode: **Operate**. Client demo: sample data, no backend, nothing sends. Any 6-digit code verifies. Open decisions render as visible placeholders, never invented answers.

## Job and audience
A parent or guardian on their phone, often mid-errand, registering one child for one camp. May be first-time.

## Outcome
Child ends **Confirmed** or **Waitlisted (#n)** in one sitting. Phone code verifies the number and quietly creates the family record; live seats turn a full session into a waitlist without restarting; returning parents get saved kids and a pre-filled guardian.

## Flow
Camps tab (community filter, remembered) → camp detail → Register / Join waitlist → 1 Phone + code (skipped when verified) → 2 Child (name, age, checked against range; saved kids) → 3 Guardian and safety (guardian name, optional allergy/medical notes, "Only camp staff see this") → 4 Review and agree (summary, full waiver sheet, agree checkbox, SMS opt-in **unchecked**, payment slot placeholder) → Confirmation (status, what to bring, add to calendar, My kids; donate prompt last and quiet).

## Scope
One child per pass. Out: payment design, waiver management, staff screens. Anti-goals: password wall, pre-checked consent, pre-confirmation upsell, "Free" until confirmed, fake data shown as real.

## States
Open, few left, full → waitlist; seat taken mid-flow (warned before submit, entries kept); age out of range; already registered; code entry with resend timer; no SMS consent; empty filter. Ranges: names to ~40 chars, 0–20+ seats, waitlists 0–15, 4 communities.

## Open decisions (placeholders)
Waiver text and signature method; emergency contact / pickup fields; age vs birthdate, last name vs initial; email; cost, payment, scholarships; Spanish (leave ~30% copy room); retention of notes on minors.

## Direction contract
THESIS: The seat is the interface. Every screen carries the session's seat ledger, a row of square seat ticks, so the parent always knows what they are holding. Refuses the category default: a card grid opening a modal form.
OWN-WORLD: stxrobotics.com. Atkinson Hyperlegible 400/700, page #f7fafc, white fields, #e5e9f0 hairlines, ink #111827, muted #60739f, maroon #7b1f1f primary, black bands. Square corners everywhere; maroon solid primary, 1.5px black outline secondary. Hairline-ruled lists, not card stacks. Client-pending content in dashed #2337ff placeholder frames labelled as such.
STORY: Parent sees seats left, picks a camp, moves through four short steps without losing work, leaves with a held seat or a waitlist number.
FIRST VIEWPORT: Camp detail opens on a black band: huge seats-left numeral, the tick ledger beneath, camp name and community/dates line over it; details list on light ground; maroon Register pinned at the bottom safe area.
FORM: Stepped native stack under a persistent black ledger strip with 4-square step marker. Signature: on confirm the parent's own tick fills maroon in the ledger (one authored motion, crossfade under Reduce Motion). seed: none (no roll; brand-pinned world, precisely specified surface).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
