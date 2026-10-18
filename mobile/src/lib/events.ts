// Staff-side sample data for running camps. All names, addresses, phone numbers,
// schedules and notes are made up for the client demo.
import type { Camp, Reg } from './state';

export type Kind = 'Staff' | 'Volunteer' | 'Student mentor';
export type Role = 'Lead instructor' | 'Assistant' | 'Student mentor' | 'Volunteer';
export type Person = { id: string; name: string; kind: Kind; town: string; phone: string };
export type Assignment = { person: string; role: Role; days: string; hours: string };
export type Note = { by: string; when: string; text: string };
export type Supply = { item: string; need: string };

export const ROLES: Role[] = ['Lead instructor', 'Assistant', 'Student mentor', 'Volunteer'];
export const ADULT_RATIO = 8; // sample rule: at least 1 adult per 8 kids

export const PEOPLE: Person[] = [
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

// A staff-only event so "This week" has something in it (the summer camps are next year).
export const WORKSHOP: Camp = {
  id: 7,
  name: 'Fall Library Workshop',
  loc: 'Portland',
  ages: '8–12',
  dates: 'Oct 19–23, 2026',
  time: '4:00–6:00',
  venue: 'Bell Whittington Library',
  cap: 12,
  filled: 10,
  wait: 0,
  staffOnly: true,
};
export const THIS_WEEK = [7];

type Info = { need: number; address: string; schedule: [string, string][]; supplies: Supply[] };
const kits = (c: number) => `${c} robot kits`;
export const INFO: Record<number, Info> = {
  1: {
    need: 4,
    address: '100 Sample St, Robstown, TX',
    schedule: [
      ['Intro and first build', 'Meet the kit, safety talk, build a driving base.'],
      ['Sensors', 'Add a touch sensor; robots that stop at walls.'],
      ['Coding', 'Block coding: drive a square, follow a line.'],
      ['Challenge day', 'Teams run the obstacle course.'],
      ['Showcase', 'Families visit at 11:00; take-home prints.'],
    ],
    supplies: [
      { item: kits(16), need: '16' },
      { item: 'Laptops', need: '8' },
      { item: 'Take-home 3D prints (name plates)', need: '16' },
      { item: 'Name badges', need: '20' },
      { item: 'First-aid kit', need: '1' },
    ],
  },
  2: {
    need: 3,
    address: '200 Sample Ave, Del Rio, TX',
    schedule: [
      ['Intro and safety', 'Flight rules, propeller safety, first hover.'],
      ['Controls', 'Takeoff, hover and landing drills.'],
      ['Coding', 'Program a flight path.'],
      ['Obstacle course', 'Fly through hoops in teams.'],
      ['Showcase', 'Demo flights for families; take-home frames.'],
    ],
    supplies: [
      { item: '14 drone kits', need: '14' },
      { item: 'Laptops', need: '7' },
      { item: 'Take-home 3D prints (drone frames)', need: '14' },
      { item: 'Spare propellers', need: '30' },
      { item: 'First-aid kit', need: '1' },
    ],
  },
  3: {
    need: 4,
    address: '300 Sample Rd, Portland, TX',
    schedule: [
      ['Intro and first build', 'VEX V5 parts, build a clawbot.'],
      ['Drivetrains', 'Tune gears and drive control.'],
      ['Coding', 'Autonomous routines in VEXcode.'],
      ['Scrimmage', 'Practice matches in alliances.'],
      ['Mini tournament', 'Bracket play; families welcome at 2:00.'],
    ],
    supplies: [
      { item: '10 VEX V5 kits', need: '10' },
      { item: 'Laptops', need: '10' },
      { item: 'Field tiles and game elements', need: '1 set' },
      { item: 'Batteries (charged)', need: '20' },
      { item: 'First-aid kit', need: '1' },
    ],
  },
  4: {
    need: 3,
    address: '400 Sample St, Alice, TX',
    schedule: [
      ['Intro to 3D design', 'Shapes and measuring in Tinkercad.'],
      ['Design a keychain', 'Personal keychain models.'],
      ['Printing', 'Slice and start prints; how printers work.'],
      ['Design challenge', 'Design a phone stand.'],
      ['Showcase', 'Take-home prints and families visit.'],
    ],
    supplies: [
      { item: 'Laptops', need: '16' },
      { item: 'Take-home 3D prints (keychains)', need: '16' },
      { item: 'Calipers', need: '8' },
      { item: 'Filament spools', need: '4' },
      { item: 'First-aid kit', need: '1' },
    ],
  },
  5: {
    need: 2,
    address: '100 Sample St, Robstown, TX',
    schedule: [
      ['What is electricity?', 'Batteries, bulbs and safe circuits.'],
      ['Switches', 'Build a light with a switch.'],
      ['Buzzers and motors', 'Make things move and beep.'],
      ['Build a nightlight', 'Combine parts into a project.'],
      ['Showcase', 'Families visit; take-home circuit cards.'],
    ],
    supplies: [
      { item: '12 circuit kits', need: '12' },
      { item: 'AA batteries', need: '48' },
      { item: 'Take-home 3D prints (circuit cases)', need: '12' },
      { item: 'Name badges', need: '15' },
      { item: 'First-aid kit', need: '1' },
    ],
  },
  6: {
    need: 4,
    address: '300 Sample Rd, Portland, TX',
    schedule: [
      ['Intro and first program', 'Meet the robots; first commands.'],
      ['Loops', 'Patterns and dances with loops.'],
      ['Sensors and if/then', 'Robots that react.'],
      ['Maze challenge', 'Program through a maze.'],
      ['Showcase', 'Families visit at 3:00.'],
    ],
    supplies: [
      { item: kits(16), need: '16' },
      { item: 'Laptops', need: '8' },
      { item: 'Maze boards', need: '4' },
      { item: 'Name badges', need: '20' },
      { item: 'First-aid kit', need: '1' },
    ],
  },
  7: {
    need: 2,
    address: '300 Sample Rd, Portland, TX',
    schedule: [
      ['Mon · Build', 'Build a simple robot.'],
      ['Tue · Code', 'Make it drive.'],
      ['Wed · Sensors', 'Add a sensor.'],
      ['Thu · Challenge', 'Team challenge.'],
      ['Fri · Share', 'Show families.'],
    ],
    supplies: [
      { item: kits(12), need: '12' },
      { item: 'Laptops', need: '6' },
      { item: 'Name badges', need: '12' },
      { item: 'First-aid kit', need: '1' },
    ],
  },
};

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
  7: [{ person: 'p2', role: 'Lead instructor', days: FULL_WEEK, hours: '3:30–6:30' }],
};

export const INITIAL_NOTES: Record<number, Note[]> = Object.fromEntries(
  Object.keys(INFO).map((id) => [
    Number(id),
    [
      { by: 'Laura R.', when: 'Oct 14', text: 'Library room is booked; the side door opens at 8:15. Park behind the building.' },
      { by: 'Marcus J.', when: 'Oct 16', text: 'Two kids need early pickup on Friday. Check the sign-out sheet before anyone leaves.' },
    ],
  ]),
);

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

export const staffCount = (a: Assignment[]) => a.length;
export const adults = (a: Assignment[]) => a.filter((x) => isAdult(x.person)).length;
export const adultsNeeded = (kids: number) => Math.ceil(kids / ADULT_RATIO);
