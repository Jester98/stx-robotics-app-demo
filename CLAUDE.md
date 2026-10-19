# STX Robotics App

An app for **South Texas Robotics** (https://stxrobotics.com), a 501(c)(3) nonprofit in Corpus Christi, TX that runs hands-on robotics and STEM education for South Texas students.

## Current state

- `prototype/stx-robotics-app.html` is a clickable single-file concept prototype (vanilla HTML/CSS/JS, sample data, nothing persisted). Use it as the **design and feature reference**: screens, flows, copy and styling.
- No real app code exists yet. The next step is to turn the prototype into a real app.

## The organization (from their website)

- Programs:
  - **VEX V5 competition teams** (year-round; regional and state tournaments, engineering notebooks)
  - **Summer camps** (week-long, all ages, beginner friendly, take-home projects)
  - **STEM workshops** (school visits, pop-ups, library partnerships)
  - **STEM Speaker Series**
- Communities: Portland, Robstown, Del Rio, Alice, with programs at partner public libraries.
- Summer 2026 numbers: 300+ kids, 4 communities, 17 STEM classes, 4 library partnerships, 300+ mentor hours awarded to student mentors, 1,037 3D-printer hours of take-home prints.
- Sponsor tiers: STEM Friend $100, Robotics Advocate $250, Engineering Champion $500, Program Sponsor $1,000+. Sponsorships start at $50 and are tax-deductible.
- Their contact form already collects **SMS consent** for program registrations, event reminders, schedule changes and safety notifications ("Reply STOP to unsubscribe").
- Their website is built with Astro.

## Features in the prototype

1. **Camps & registration**: filter by community, seat counts, automatic waitlist when a session is full, parent/guardian info, SMS opt-in, waiver checkbox.
2. **Parent home**: their kids' registrations, outstanding waivers, latest updates, donate prompt.
3. **Staff dashboard**: seats filled, waitlists, open prints, items needing attention.
4. **Competition teams**: team cards (VEX team numbers, notebook progress), practice schedule with RSVP, tournament list, match results.
5. **3D print queue**: Queued → Printing → Ready → Done, printer status, print request form (STL upload).
6. **Hours**: student mentors and volunteers log hours; administrators approve or return them; season totals.
7. **Family texts**: compose an SMS to a group (by camp/team/all), phone preview, automatic STOP footer.

Roles in the app demo: **Parent**, **Student mentor**, **Volunteer**, **Staff**, **Administrator**, picked on a start screen (see `mobile/src/lib/roles.ts`). In the real app an administrator assigns roles.

## Brand / design system (taken from stxrobotics.com's CSS)

- Font: **Atkinson Hyperlegible** (the site self-hosts it as "Atkinson"), 400/700. Headings bold, tight leading.
- Colors:
  - Page background `#f7fafc`, cards `#ffffff`, lines `#e5e9f0`
  - Body text `#222939`, headings `#111827`, muted text `#60739f`
  - Primary: **maroon `#7b1f1f`** (dark `#5a1515`)
  - Black bands and footer `#000000`
  - Site's secondary accent blue `#2337ff` (used sparingly)
- Buttons: square corners (radius 0). Solid maroon is the primary style; a 1.5px black outline is the secondary style.
- Eyebrow labels: small uppercase, letter-spaced, with a short line before them (for example "— NON-PROFIT • CORPUS CHRISTI, TX").
- Stats show in black bands with large numbers.
- Overall feel: clean, light, editorial, high contrast.

## Open decisions (ask the user before committing)

- Platform: an installable PWA (fastest) versus React Native/Expo (the dev machine already has `.expo` and `.android` folders).
- Backend: for example Supabase (auth + Postgres + storage) or Firebase.
- SMS provider: for example Twilio. It must honor the existing consent and STOP handling.
- Whether parent accounts are needed at launch or registration works as a guest.

## Notes

- All names, dates, team numbers and events in the prototype are **sample data**. Don't present them as real.
- Youth program: minimize the data collected on minors, gate staff tools behind auth, and treat waivers and medical/allergy notes as sensitive.
