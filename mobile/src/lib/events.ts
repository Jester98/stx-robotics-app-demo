// Staff-side sample data for running events. All names, addresses, phone numbers,
// schedules and notes are made up for the client demo. Fall events are placed
// relative to the current week, so "this week" always has something in it.
import type { Camp, Reg } from './state';
import { addDays, dayShort, isWeekday, monday, monthDay, range, today } from './dates';

export type Kind = 'Staff' | 'Volunteer' | 'Student mentor';
export type Role = 'Lead instructor' | 'Assistant' | 'Student mentor' | 'Volunteer';
export type EvType = 'Camp' | 'Workshop' | 'Competition' | 'Practice' | 'Speaker Series';
export type Person = { id: string; name: string; kind: Kind; town: string; phone: string };
export type Assignment = { person: string; role: Role; days: string; hours: string };
export type Note = { by: string; when: string; text: string };
export type Supply = { item: string; need: string };
export type Info = { need: number; address: string; schedule: [string, string][]; supplies: Supply[] };

export const ROLES: Role[] = ['Lead instructor', 'Assistant', 'Student mentor', 'Volunteer'];
export const TYPES: EvType[] = ['Camp', 'Workshop', 'Competition', 'Practice', 'Speaker Series'];
export const TOWNS = ['Portland', 'Robstown', 'Del Rio', 'Alice'];
export const ADULT_RATIO = 8; // sample rule: at least 1 adult per 8 kids

/** The signed-in staff member in the demo. */
export const ME = 'p12';

export const PEOPLE: Person[] = [
  { id: 'p12', name: 'Coach Alex', kind: 'Staff', town: 'Portland', phone: '(361) 555-0112' },
  { id: 'p1', name: 'Laura R.', kind: 'Staff', town: 'Robstown', phone: '(361) 555-0101' },
  { id: 'p2', name: 'Marcus J.', kind: 'Staff', town: 'Portland', phone: '(361) 555-0102' },
  { id: 'p3', name: 'Elena V.', kind: 'Staff', town: 'Del Rio', phone: '(830) 555-0103' },
  { id: 'p4', name: 'Daniel K.', kind: 'Staff', town: 'Alice', phone: '(361) 555-0104' },
  { id: 'p5', name: 'Tom B.', kind: 'Volunteer', town: 'Portland', phone: '(361) 555-0105' },
  { id: 'p6', name: 'Grace H.', kind: 'Volunteer', town: 'Robstown', phone: '(361) 555-0106' },
  { id: 'p7', name: 'Ruth A.', kind: 'Volunteer', town: 'Alice', phone: '(361) 555-0107' },
  { id: 'p8', name: 'Isabella M.', kind: 'Student mentor', town: 'Portland', phone: '(361) 555-0108' },
  { id: 'p9', name: 'Diego T.', kind: 'Student mentor', town: 'Robstown', phone: '(361) 555-0109' },
  { id: 'p10', name: 'Sofia L.', kind: 'Student mentor', town: 'Alice', phone: '(361) 555-0110' },
  { id: 'p11', name: 'Noah P.', kind: 'Student mentor', town: 'Portland', phone: '(361) 555-0111' },
];
export const person = (id: string) => PEOPLE.find((p) => p.id === id)!;
export const isAdult = (id: string) => person(id).kind !== 'Student mentor';
export const initials = (name: string) =>
  name
    .replace('.', '')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const ADDRESS: Record<string, string> = {
  Portland: '300 Sample Rd, Portland, TX',
  Robstown: '100 Sample St, Robstown, TX',
  'Del Rio': '200 Sample Ave, Del Rio, TX',
  Alice: '400 Sample St, Alice, TX',
};
export const addressFor = (town: string) => ADDRESS[town] ?? `${town}, TX`;

// ---- Summer camps (fixed dates, from the prototype) ----
type Summer = { id: number; start: string; end: string; need: number; schedule: [string, string][]; supplies: Supply[] };
const kits = (c: number) => `${c} robot kits`;
const SUMMER: Summer[] = [
  {
    id: 1, start: '2027-06-07', end: '2027-06-11', need: 4,
    schedule: [
      ['Intro and first build', 'Meet the kit, safety talk, build a driving base.'],
      ['Sensors', 'Add a touch sensor; robots that stop at walls.'],
      ['Coding', 'Block coding: drive a square, follow a line.'],
      ['Challenge day', 'Teams run the obstacle course.'],
      ['Showcase', 'Families visit at 11:00; take-home prints.'],
    ],
    supplies: [{ item: kits(16), need: '16' }, { item: 'Laptops', need: '8' }, { item: 'Take-home 3D prints (name plates)', need: '16' }, { item: 'Name badges', need: '20' }, { item: 'First-aid kit', need: '1' }],
  },
  {
    id: 2, start: '2027-06-14', end: '2027-06-18', need: 3,
    schedule: [
      ['Intro and safety', 'Flight rules, propeller safety, first hover.'],
      ['Controls', 'Takeoff, hover and landing drills.'],
      ['Coding', 'Program a flight path.'],
      ['Obstacle course', 'Fly through hoops in teams.'],
      ['Showcase', 'Demo flights for families; take-home frames.'],
    ],
    supplies: [{ item: '14 drone kits', need: '14' }, { item: 'Laptops', need: '7' }, { item: 'Take-home 3D prints (drone frames)', need: '14' }, { item: 'Spare propellers', need: '30' }, { item: 'First-aid kit', need: '1' }],
  },
  {
    id: 3, start: '2027-06-21', end: '2027-06-25', need: 4,
    schedule: [
      ['Intro and first build', 'VEX V5 parts, build a clawbot.'],
      ['Drivetrains', 'Tune gears and drive control.'],
      ['Coding', 'Autonomous routines in VEXcode.'],
      ['Scrimmage', 'Practice matches in alliances.'],
      ['Mini tournament', 'Bracket play; families welcome at 2:00.'],
    ],
    supplies: [{ item: '10 VEX V5 kits', need: '10' }, { item: 'Laptops', need: '10' }, { item: 'Field tiles and game elements', need: '1 set' }, { item: 'Batteries (charged)', need: '20' }, { item: 'First-aid kit', need: '1' }],
  },
  {
    id: 4, start: '2027-06-28', end: '2027-07-02', need: 3,
    schedule: [
      ['Intro to 3D design', 'Shapes and measuring in Tinkercad.'],
      ['Design a keychain', 'Personal keychain models.'],
      ['Printing', 'Slice and start prints; how printers work.'],
      ['Design challenge', 'Design a phone stand.'],
      ['Showcase', 'Take-home prints and families visit.'],
    ],
    supplies: [{ item: 'Laptops', need: '16' }, { item: 'Take-home 3D prints (keychains)', need: '16' }, { item: 'Calipers', need: '8' }, { item: 'Filament spools', need: '4' }, { item: 'First-aid kit', need: '1' }],
  },
  {
    id: 5, start: '2027-07-12', end: '2027-07-16', need: 2,
    schedule: [
      ['What is electricity?', 'Batteries, bulbs and safe circuits.'],
      ['Switches', 'Build a light with a switch.'],
      ['Buzzers and motors', 'Make things move and beep.'],
      ['Build a nightlight', 'Combine parts into a project.'],
      ['Showcase', 'Families visit; take-home circuit cards.'],
    ],
    supplies: [{ item: '12 circuit kits', need: '12' }, { item: 'AA batteries', need: '48' }, { item: 'Take-home 3D prints (circuit cases)', need: '12' }, { item: 'Name badges', need: '15' }, { item: 'First-aid kit', need: '1' }],
  },
  {
    id: 6, start: '2027-07-19', end: '2027-07-23', need: 4,
    schedule: [
      ['Intro and first program', 'Meet the robots; first commands.'],
      ['Loops', 'Patterns and dances with loops.'],
      ['Sensors and if/then', 'Robots that react.'],
      ['Maze challenge', 'Program through a maze.'],
      ['Showcase', 'Families visit at 3:00.'],
    ],
    supplies: [{ item: kits(16), need: '16' }, { item: 'Laptops', need: '8' }, { item: 'Maze boards', need: '4' }, { item: 'Name badges', need: '20' }, { item: 'First-aid kit', need: '1' }],
  },
];
/** Fields the schedule needs on the prototype's summer camps. */
export const SUMMER_EXTRA: Record<number, Pick<Camp, 'type' | 'start' | 'end'>> = Object.fromEntries(
  SUMMER.map((x) => [x.id, { type: 'Camp' as const, start: x.start, end: x.end }]),
);

// ---- One-day plans and supplies by type (used for fall events and added events) ----
export function planFor(type: EvType, time: string): [string, string][] {
  const t = time.split('–')[0];
  const plans: Record<EvType, [string, string][]> = {
    Camp: [['Build', 'Build and test the day’s robot.'], ['Code', 'Program it to finish a task.'], ['Share', 'Show the group what works.']],
    Workshop: [[`${t} · Welcome`, 'Sign-in, name badges, safety talk.'], ['Hands-on build', 'Small groups with one helper each.'], ['Wrap-up', 'Show and tell; clean up kits.']],
    Competition: [[`${t} · Check-in`, 'Robot inspection and pit setup.'], ['Qualification matches', 'Rotate drivers; notebook ready for judges.'], ['Alliance selection and finals', 'Awards at the end of the day.']],
    Practice: [[`${t} · Warm-up`, 'Charge batteries, check robots.'], ['Drills', 'Driver skills and autonomous runs.'], ['Notebook', 'Log changes and plan next steps.']],
    'Speaker Series': [[`${t} · Doors open`, 'Seat families; sign-in table.'], ['Talk', 'Guest speaker, about 40 minutes.'], ['Q&A and demos', 'Students show their robots.']],
  };
  return plans[type];
}
export function suppliesFor(type: EvType): Supply[] {
  const base: Record<EvType, Supply[]> = {
    Camp: [{ item: kits(12), need: '12' }, { item: 'Laptops', need: '6' }, { item: 'Name badges', need: '15' }, { item: 'First-aid kit', need: '1' }],
    Workshop: [{ item: kits(10), need: '10' }, { item: 'Sign-in sheet and badges', need: '1' }, { item: 'Extension cords', need: '2' }, { item: 'First-aid kit', need: '1' }],
    Competition: [{ item: 'Competition robots', need: '3' }, { item: 'Charged batteries', need: '12' }, { item: 'Engineering notebooks', need: '3' }, { item: 'Pit toolbox', need: '1' }, { item: 'First-aid kit', need: '1' }],
    Practice: [{ item: 'Charged batteries', need: '8' }, { item: 'Field tiles', need: '1 set' }, { item: 'Laptops', need: '3' }],
    'Speaker Series': [{ item: 'Projector and clicker', need: '1' }, { item: 'Chairs set out', need: '40' }, { item: 'Demo robots', need: '2' }, { item: 'Sign-in sheet', need: '1' }],
  };
  return base[type];
}

// ---- Fall events, relative to this week ----
type Fall = {
  id: number;
  name: string;
  type: EvType;
  loc: string;
  venue: string;
  week: number; // 0 = this week
  day: number; // 0 = Monday
  days?: number; // weekdays it runs, for camps
  time: string;
  ages: string;
  cap: number;
  filled: number;
  need: number;
  staff: [string, Role][];
};
const FALL: Fall[] = [
  { id: 7, name: 'Fall After-School Camp', type: 'Camp', loc: 'Portland', venue: 'Bell Whittington Library', week: 0, day: 0, days: 5, time: '4:00–6:00', ages: '8–12', cap: 12, filled: 10, need: 2, staff: [['p2', 'Lead instructor']] },
  { id: 8, name: 'Team 2A practice: drivetrain tuning', type: 'Practice', loc: 'Portland', venue: 'STX build room', week: 0, day: 1, time: '5:30–7:30', ages: '13–17', cap: 7, filled: 7, need: 2, staff: [['p12', 'Lead instructor'], ['p8', 'Student mentor']] },
  { id: 9, name: 'Library pop-up: build a bristlebot', type: 'Workshop', loc: 'Robstown', venue: 'Robstown Public Library', week: 0, day: 2, time: '4:00–6:00', ages: '7–11', cap: 16, filled: 14, need: 3, staff: [['p1', 'Lead instructor'], ['p9', 'Student mentor']] },
  { id: 10, name: 'STEM Speaker Series: Engineers at Work', type: 'Speaker Series', loc: 'Alice', venue: 'Alice Public Library', week: 0, day: 3, time: '6:30–8:00', ages: '8–17', cap: 40, filled: 26, need: 2, staff: [['p4', 'Lead instructor']] },
  { id: 11, name: 'Mock qualifier', type: 'Practice', loc: 'Portland', venue: 'STX build room', week: 0, day: 5, time: '10:00–2:00', ages: '12–17', cap: 18, filled: 18, need: 3, staff: [['p2', 'Lead instructor'], ['p12', 'Assistant'], ['p11', 'Student mentor']] },
  { id: 12, name: 'Drone basics workshop', type: 'Workshop', loc: 'Del Rio', venue: 'Val Verde County Library', week: 1, day: 0, time: '4:00–6:00', ages: '10–14', cap: 12, filled: 9, need: 2, staff: [['p3', 'Lead instructor']] },
  { id: 13, name: 'Team 2B practice: autonomous routines', type: 'Practice', loc: 'Portland', venue: 'STX build room', week: 1, day: 1, time: '5:30–7:30', ages: '13–17', cap: 6, filled: 6, need: 2, staff: [['p12', 'Lead instructor'], ['p11', 'Student mentor']] },
  { id: 14, name: '3D design pop-up', type: 'Workshop', loc: 'Alice', venue: 'Alice Public Library', week: 1, day: 2, time: '3:30–5:30', ages: '9–13', cap: 14, filled: 12, need: 2, staff: [['p4', 'Lead instructor'], ['p10', 'Student mentor']] },
  { id: 15, name: 'School visit: robots in class', type: 'Workshop', loc: 'Robstown', venue: 'Robstown Elementary (sample)', week: 1, day: 3, time: '9:00–11:30', ages: '8–10', cap: 24, filled: 24, need: 3, staff: [['p1', 'Lead instructor']] },
  { id: 16, name: 'Coastal Bend VEX Qualifier', type: 'Competition', loc: 'Robstown', venue: 'Robstown High School gym (sample)', week: 1, day: 5, time: '7:00–5:00', ages: '12–17', cap: 18, filled: 18, need: 4, staff: [['p2', 'Lead instructor'], ['p12', 'Assistant'], ['p5', 'Volunteer']] },
  { id: 17, name: 'Thanksgiving Break Robotics Camp', type: 'Camp', loc: 'Robstown', venue: 'Robstown Public Library', week: 2, day: 0, days: 3, time: '9:00–12:00', ages: '8–12', cap: 16, filled: 11, need: 3, staff: [['p1', 'Lead instructor'], ['p6', 'Volunteer']] },
  { id: 18, name: 'STEM Speaker Series: Drones on the Farm', type: 'Speaker Series', loc: 'Del Rio', venue: 'Val Verde County Library', week: 2, day: 1, time: '6:30–8:00', ages: '8–17', cap: 40, filled: 19, need: 2, staff: [['p3', 'Lead instructor'], ['p12', 'Assistant']] },
  { id: 19, name: 'Team 2C rookie practice', type: 'Practice', loc: 'Alice', venue: 'Alice Public Library', week: 2, day: 2, time: '4:30–6:30', ages: '12–15', cap: 5, filled: 5, need: 2, staff: [['p4', 'Lead instructor']] },
  { id: 20, name: 'Border Region VEX Qualifier', type: 'Competition', loc: 'Del Rio', venue: 'Del Rio High School gym (sample)', week: 2, day: 5, time: '7:00–5:00', ages: '12–17', cap: 12, filled: 12, need: 3, staff: [['p3', 'Lead instructor']] },
];

// On a weekend the current week is almost over, so the sample "this week" is the coming one.
const W0 = monday(addDays(today(), 2));
const startOf = (x: Fall) => addDays(W0, x.week * 7 + x.day);
const endOf = (x: Fall) => addDays(startOf(x), (x.days ?? 1) - 1);
const dayLabel = (x: Fall) => (x.days ? `${dayShort(startOf(x))}–${dayShort(endOf(x))}` : `${dayShort(startOf(x))} ${monthDay(startOf(x))}`);

export const FALL_CAMPS: Camp[] = FALL.map((x) => ({
  id: x.id,
  name: x.name,
  loc: x.loc,
  ages: x.ages,
  dates: range(startOf(x), endOf(x)),
  time: x.time,
  venue: x.venue,
  cap: x.cap,
  filled: x.filled,
  wait: 0,
  staffOnly: true,
  scheduleOnly: x.type !== 'Camp',
  type: x.type,
  start: startOf(x),
  end: endOf(x),
}));

// Mutable on purpose: "+ Add event" registers its details here (demo only).
export const INFO: Record<number, Info> = {
  ...Object.fromEntries(SUMMER.map((x) => [x.id, { need: x.need, address: '', schedule: x.schedule, supplies: x.supplies }])),
  ...Object.fromEntries(
    FALL.map((x) => [
      x.id,
      { need: x.need, address: addressFor(x.loc), schedule: x.days ? planFor('Camp', x.time).slice(0, x.days) : planFor(x.type, x.time), supplies: suppliesFor(x.type) },
    ]),
  ),
};
INFO[1].address = addressFor('Robstown');
INFO[2].address = addressFor('Del Rio');
INFO[3].address = addressFor('Portland');
INFO[4].address = addressFor('Alice');
INFO[5].address = addressFor('Robstown');
INFO[6].address = addressFor('Portland');

const FULL_WEEK = 'Mon–Fri';
export const INITIAL_ASSIGN: Record<number, Assignment[]> = {
  1: [
    { person: 'p1', role: 'Lead instructor', days: FULL_WEEK, hours: '8:30–12:30' },
    { person: 'p9', role: 'Student mentor', days: FULL_WEEK, hours: '9:00–12:00' },
    { person: 'p6', role: 'Volunteer', days: 'Mon, Wed, Fri', hours: '9:00–12:00' },
  ],
  2: [
    { person: 'p3', role: 'Lead instructor', days: FULL_WEEK, hours: '12:30–4:30' },
    { person: 'p11', role: 'Student mentor', days: 'Tue–Thu', hours: '1:00–4:00' },
  ],
  3: [
    { person: 'p2', role: 'Lead instructor', days: FULL_WEEK, hours: '8:30–3:30' },
    { person: 'p5', role: 'Assistant', days: FULL_WEEK, hours: '9:00–3:00' },
    { person: 'p8', role: 'Student mentor', days: FULL_WEEK, hours: '9:00–3:00' },
    { person: 'p11', role: 'Student mentor', days: 'Mon–Wed', hours: '9:00–12:00' },
  ],
  4: [
    { person: 'p4', role: 'Lead instructor', days: FULL_WEEK, hours: '8:30–12:30' },
    { person: 'p10', role: 'Student mentor', days: FULL_WEEK, hours: '9:00–12:00' },
    { person: 'p7', role: 'Volunteer', days: 'Thu–Fri', hours: '9:00–12:00' },
  ],
  5: [
    { person: 'p1', role: 'Lead instructor', days: FULL_WEEK, hours: '8:30–12:00' },
    { person: 'p6', role: 'Assistant', days: FULL_WEEK, hours: '9:00–11:30' },
  ],
  6: [
    { person: 'p2', role: 'Lead instructor', days: FULL_WEEK, hours: '12:30–4:30' },
    { person: 'p8', role: 'Student mentor', days: FULL_WEEK, hours: '1:00–4:00' },
  ],
  ...Object.fromEntries(FALL.map((x) => [x.id, x.staff.map(([p, role]) => ({ person: p, role, days: dayLabel(x), hours: x.time }))])),
};

export const INITIAL_NOTES: Record<number, Note[]> = Object.fromEntries(
  Object.keys(INFO).map((id) => [
    Number(id),
    [
      { by: 'Laura R.', when: monthDay(addDays(today(), -4)), text: 'Room is booked; the side door opens 15 minutes before start. Park behind the building.' },
      { by: 'Marcus J.', when: monthDay(addDays(today(), -2)), text: 'Two kids need early pickup. Check the sign-out sheet before anyone leaves.' },
    ],
  ]),
);

// ---- Calendar helpers ----
/** Does event `x` run on day `d`? Multi-day events skip weekends. */
export const runsOn = (x: Camp, d: string) =>
  !!x.start && !!x.end && x.start <= d && d <= x.end && (x.start === x.end || isWeekday(d));
export const inWeek = (x: Camp, mon: string) => !!x.start && !!x.end && x.start <= addDays(mon, 6) && x.end >= mon;
export const thisWeekMonday = () => W0;

// Sample kid roster. Parent-flow registrations come first, so a child registered
// on the parent side shows up here.
const FIRST = ['Lucas', 'Sofia', 'Mia', 'Diego', 'Emma', 'Liam', 'Camila', 'Noah', 'Valeria', 'Elijah', 'Isabella', 'Mateo', 'Aria', 'Gabriel', 'Lily', 'Adrian', 'Zoe', 'Leo', 'Nora', 'Julian'];
const LAST = 'GMRHTLSVCPBADNEFKOWJ';
const FLAGS = ['Peanut allergy', 'Asthma inhaler', 'Bee sting allergy (EpiPen)', 'Gluten-free'];

export type Kid = { name: string; age: string; flag?: string; waiver: boolean };
export function roster(camp: Camp, regs: Reg[], parentWaiverSigned: boolean): { kids: Kid[]; waitlist: string[] } {
  const mine = regs.filter((r) => r.camp === camp.id);
  const confirmed: Kid[] = mine
    .filter((r) => r.status === 'Confirmed')
    .map((r) => ({ name: r.kid, age: String(r.age), waiver: r.kid !== 'Mateo G.' || parentWaiverSigned }));
  const kids = [...confirmed];
  const [lo, hi] = camp.ages.split('–').map(Number);
  for (let i = 0; kids.length < camp.filled; i++) {
    const n = (i * 7 + camp.id * 3) % FIRST.length;
    kids.push({
      name: `${FIRST[n]} ${LAST[(i + camp.id) % LAST.length]}.`,
      age: String(lo + ((i * 3 + camp.id) % (hi - lo + 1))),
      flag: (i + camp.id) % 5 === 0 ? FLAGS[(i + camp.id) % FLAGS.length] : undefined,
      waiver: (i + camp.id) % 6 !== 2,
    });
  }
  const waitNames = mine.filter((r) => r.status === 'Waitlisted').map((r) => r.kid);
  const waitlist = [...Array.from({ length: camp.wait - waitNames.length }, (_, i) => `${FIRST[(i * 5 + 3) % FIRST.length]} ${LAST[(i + 9) % LAST.length]}.`), ...waitNames];
  return { kids, waitlist };
}

export const adults = (a: Assignment[]) => a.filter((x) => isAdult(x.person)).length;
export const adultsNeeded = (kids: number) => Math.ceil(kids / ADULT_RATIO);
/** How many more people an event needs. */
export const shortBy = (x: Camp, a: Assignment[]) => Math.max(0, (INFO[x.id]?.need ?? 0) - a.length);
