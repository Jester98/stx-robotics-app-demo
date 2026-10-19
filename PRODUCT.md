# Product

<!-- impeccable:product-schema 1 -->

## Platform

ios, android

One shared custom design language on both, matching stxrobotics.com; not per-OS adaptation (user decision, 2026-10-18). Each OS's hard guarantees still apply: safe areas, system Back and edge-swipe back, touch targets (44 pt iOS, 48 dp Android), Dynamic Type and font scaling, Reduce Motion, VoiceOver and TalkBack.

## Stack

Expo / React Native, shipping to iOS and Android (user decision, 2026-10-18). Backend undecided (Supabase or Firebase are candidates). SMS provider undecided (Twilio is a candidate).

## Users

Two primary audiences, weighted equally at launch:

- **Parents and guardians** of South Texas students: register kids for camps and programs, sign waivers, opt into texts, follow their kids' registrations and team activity, and donate. Usually on a phone, often between other obligations.
- **Staff** of South Texas Robotics: run camps and seat counts, waitlists, competition teams, the staff schedule and shifts, mentor-hour approvals, and family texts. Small team running programs across four communities.

Later roles under consideration: Student and Mentor (student mentors already log hours in the prototype).

## Product Purpose

The operating app for South Texas Robotics (stxrobotics.com), a 501(c)(3) nonprofit in Corpus Christi, TX that runs hands-on robotics and STEM education. It replaces scattered forms, texts and spreadsheets with one place where families sign up and stay informed, and staff run the programs. Success: families register and complete waivers without staff chasing them, and staff see seats, waitlists, shifts and hours at a glance.

## Positioning

Built for one organization's real programs, not a generic camp or club platform: VEX V5 competition teams with engineering notebooks and tournaments, week-long summer camps with take-home 3D prints, a staff schedule with open shifts, student mentor hours, library partnerships, and SMS that honors the consent the org already collects.

## Operating Context

- Programs: VEX V5 competition teams (year-round; regional and state tournaments, engineering notebooks), summer camps (week-long, all ages, beginner friendly, take-home projects), STEM workshops (school visits, pop-ups, library partnerships), STEM Speaker Series.
- Communities: Portland, Robstown, Del Rio, Alice, with programs at partner public libraries.
- Staff schedule: every event (camps, workshops, competitions, practices, Speaker Series) on a week view; staff take open shifts.
- SMS: the website contact form already collects consent for program registrations, event reminders, schedule changes and safety notifications ("Reply STOP to unsubscribe").
- The public website is built with Astro and is separate from this app.

## Capabilities and Constraints

Feature scope, from `prototype/stx-robotics-app.html` (clickable concept, sample data, nothing persisted):

1. Camps and registration: filter by community, seat counts, automatic waitlist when full, parent/guardian info, SMS opt-in, waiver checkbox.
2. Parent home: kids' registrations, outstanding waivers, latest updates, donate prompt.
3. Staff dashboard: seats filled, waitlists, open shifts, items needing attention.
4. Competition teams: team cards (VEX team numbers, notebook progress), practice schedule with RSVP, tournaments, match results.
5. Staff schedule: week view, open shifts with Take shift, My shifts, add event (the 3D print queue was removed, 2026-10-19).
6. Mentor hours: student mentors log hours; staff approve or return them; season totals.
7. Family texts: compose an SMS to a group (camp, team, all), phone preview, automatic STOP footer.

Constraints:

- Youth program: collect the minimum data on minors. Waivers and medical/allergy notes are sensitive.
- Staff tools are gated behind authentication.
- SMS must honor existing consent and STOP handling.

Open decisions:

- Whether families need accounts at launch or can register as guests.
- Backend and SMS provider.

## Brand Commitments

- Name: South Texas Robotics (short form STX Robotics). 501(c)(3), Corpus Christi, TX.
- The existing stxrobotics.com brand is binding for the app (font, palette, button style, eyebrow labels, stat bands); the specifics are recorded in CLAUDE.md.
- The clickable prototype at `prototype/stx-robotics-app.html` is the binding visual and interaction reference for the app (user decision, 2026-10-18). Where it disagrees with DESIGN.md or the Impeccable rules, the prototype wins.
- Sponsor tiers: STEM Friend $100, Robotics Advocate $250, Engineering Champion $500, Program Sponsor $1,000+. Sponsorships start at $50 and are tax-deductible.

## Evidence on Hand

- Summer 2026 numbers from the website: 300+ kids, 4 communities, 17 STEM classes, 4 library partnerships, 300+ mentor hours awarded to student mentors, 1,037 3D-printer hours of take-home prints.
- All names, dates, team numbers and events in the prototype are sample data and must not be presented as real.
- No testimonials, photos, or real team or student records are on hand. Do not fabricate them.

## Product Principles

1. Two first-class sides: a parent's phone flow and a staff member's operating flow get equal care; neither is an afterthought of the other.
2. Fewer steps for families: registration, waivers and opt-ins should finish in one sitting without staff follow-up.
3. Protect kids' data by default: ask only for what a program needs, and keep sensitive fields behind auth.
4. Respect consent: no message goes to a family that hasn't opted in, and STOP always works.
5. Show the real work: teams, events and mentor hours are the organization's story; surface them honestly, never with invented numbers.

## Accessibility & Inclusion

Parents span a wide range of ages, devices and reading levels across rural and small-town South Texas communities; the brand's choice of Atkinson Hyperlegible reflects a legibility-first stance. Target WCAG 2.2 AA, support OS text scaling and screen readers on iOS and Android. Spanish-language support is likely relevant for these communities but has not been confirmed.
