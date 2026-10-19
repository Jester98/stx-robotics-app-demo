import { createContext, useContext } from 'react';
import { FALL_CAMPS, INITIAL_ASSIGN, INITIAL_NOTES, SUMMER_EXTRA, thisWeekMonday, type Assignment, type EvType, type Kind, type Note } from './events';
import { addDays, today } from './dates';
import type { AppRole } from './roles';

// Sample data from the prototype (prototype/stx-robotics-app.html). Only the
// Summer 2026 totals come from stxrobotics.com; everything else is made up.
export type Camp = {
  id: number;
  name: string;
  loc: string;
  ages: string;
  dates: string;
  time: string;
  venue: string;
  cap: number;
  filled: number;
  wait: number;
  staffOnly?: boolean; // hidden from parents
  scheduleOnly?: boolean; // one-off events: in Schedule, not in the staff Camps list
  type?: EvType;
  start?: string; // YYYY-MM-DD
  end?: string;
};
export type Reg = { kid: string; age: number; camp: number; status: 'Confirmed' | 'Waitlisted' };
export type Sent = { to: string; text: string; when: string };
export type Status = 'Pending' | 'Approved' | 'Returned';
export type HoursReq = { id: number; person: string; event?: number; date: string; h: number; task: string; status: Status };
export type Drop = { id: number; event: number; person: string; status: Status };
export type Tab =
  | 'home'
  | 'camps'
  | 'teams'
  | 'msgs'
  | 'sched'
  | 'hours'
  | 'checkin'
  | 'approvals'
  | 'more'
  | 'about'
  | 'event'
  | 'staffList'
  | 'people';

export type State = {
  role: AppRole | null; // null = start screen
  me: string; // person id for the chosen role ('parent' for the parent)
  tab: Tab;
  loc: string;
  camps: Camp[];
  regs: Reg[];
  sent: Sent[];
  rsvp: Record<'tue' | 'thu' | 'sat', boolean>;
  waiverSigned: boolean;
  // Events
  eventId: number;
  eventFrom: 'camps' | 'sched' | 'home'; // where the event page goes back to
  staffFilter: string;
  schedWeek: string; // Monday of the week shown
  schedDay: string; // selected day
  schedFilter: string;
  assign: Record<number, Assignment[]>;
  packed: Record<number, boolean[]>;
  notes: Record<number, Note[]>;
  // People and approvals
  kinds: Record<string, Kind>; // role changes made on the People page
  pending: string[]; // volunteers waiting on approval
  baseHours: Record<string, number>; // hours approved before this demo's requests
  hours: HoursReq[];
  drops: Drop[];
  checkins: Record<number, Record<string, { in?: string; out?: string }>>;
};

const day = (n: number) => addDays(today(), n);

export const INITIAL: State = {
  role: null,
  me: 'parent',
  tab: 'home',
  loc: 'All',
  camps: [
    { id: 1, name: 'Intro to Robotics', loc: 'Robstown', ages: '8–11', dates: 'Jun 7–11, 2027', time: '9:00–12:00', venue: 'Robstown Public Library', cap: 16, filled: 16, wait: 3, ...SUMMER_EXTRA[1] },
    { id: 2, name: 'Drone Flight Lab', loc: 'Del Rio', ages: '11–14', dates: 'Jun 14–18, 2027', time: '1:00–4:00', venue: 'Val Verde County Library', cap: 14, filled: 11, wait: 0, ...SUMMER_EXTRA[2] },
    { id: 3, name: 'VEX V5 Bootcamp', loc: 'Portland', ages: '12–17', dates: 'Jun 21–25, 2027', time: '9:00–3:00', venue: 'Bell Whittington Library', cap: 20, filled: 9, wait: 0, ...SUMMER_EXTRA[3] },
    { id: 4, name: '3D Design & Print', loc: 'Alice', ages: '9–13', dates: 'Jun 28–Jul 2, 2027', time: '9:00–12:00', venue: 'Alice Public Library', cap: 16, filled: 14, wait: 0, ...SUMMER_EXTRA[4] },
    { id: 5, name: 'First Circuits', loc: 'Robstown', ages: '6–8', dates: 'Jul 12–16, 2027', time: '9:00–11:30', venue: 'Robstown Public Library', cap: 12, filled: 5, wait: 0, ...SUMMER_EXTRA[5] },
    { id: 6, name: 'Coding with Robots', loc: 'Portland', ages: '9–12', dates: 'Jul 19–23, 2027', time: '1:00–4:00', venue: 'Bell Whittington Library', cap: 16, filled: 16, wait: 1, ...SUMMER_EXTRA[6] },
    ...FALL_CAMPS,
  ],
  regs: [
    { kid: 'Mateo G.', age: 10, camp: 1, status: 'Confirmed' },
    { kid: 'Ava G.', age: 13, camp: 2, status: 'Confirmed' },
  ],
  sent: [
    { to: 'Robstown · Intro to Robotics', text: 'Reminder: camp starts Monday at 9:00 at Robstown Public Library. Bring a water bottle!', when: 'Oct 16' },
  ],
  rsvp: { tue: false, thu: true, sat: false },
  waiverSigned: false,
  eventId: 1,
  eventFrom: 'camps',
  staffFilter: 'All',
  schedWeek: thisWeekMonday(),
  schedDay: today() >= thisWeekMonday() ? today() : thisWeekMonday(),
  schedFilter: 'All',
  assign: INITIAL_ASSIGN,
  packed: { 1: [true, true, false, true, false], 2: [true, false, false, true, true], 7: [true, true, true, false], 16: [true, false, true, false, true] },
  notes: INITIAL_NOTES,
  kinds: {},
  pending: ['p13'],
  baseHours: { p8: 36, p9: 34, p10: 28, p11: 15, p5: 12, p6: 9, p7: 14, p13: 0 },
  hours: [
    { id: 1, person: 'p8', event: 8, date: day(-3), h: 3, task: 'Led build session, Team 2A', status: 'Pending' },
    { id: 2, person: 'p9', event: 9, date: day(-4), h: 2, task: 'Notebook review with rookies', status: 'Pending' },
    { id: 3, person: 'p11', event: 11, date: day(-6), h: 4, task: 'Pit crew for the mock qualifier', status: 'Pending' },
    { id: 4, person: 'p8', date: day(-12), h: 4, task: 'Mock qualifier pit crew', status: 'Approved' },
    { id: 5, person: 'p8', date: day(-19), h: 2, task: 'Robot inspection prep', status: 'Approved' },
    { id: 6, person: 'p8', date: day(-9), h: 6, task: 'Weekend build (no adult present)', status: 'Returned' },
    { id: 7, person: 'p13', date: day(-2), h: 2, task: 'Orientation and safety training', status: 'Pending' },
  ],
  drops: [{ id: 1, event: 9, person: 'p9', status: 'Pending' }],
  checkins: {},
};

export type App = {
  s: State;
  set: (fn: (s: State) => State) => void;
  go: (tab: Tab) => void;
  toast: (text: string) => void;
  sheet: (content: React.ReactNode | null) => void;
};

export const AppCtx = createContext<App | null>(null);
export function useApp() {
  const v = useContext(AppCtx);
  if (!v) throw new Error('useApp outside the app');
  return v;
}

/** Approved hours for a person: earlier hours plus approved requests. */
export const approvedHours = (s: State, id: string) =>
  (s.baseHours[id] ?? 0) + s.hours.filter((r) => r.person === id && r.status === 'Approved').reduce((a, r) => a + r.h, 0);
