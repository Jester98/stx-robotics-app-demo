import { createContext, useContext } from 'react';
import { FALL_CAMPS, INITIAL_ASSIGN, INITIAL_NOTES, ME, SUMMER_EXTRA, thisWeekMonday, type Assignment, type EvType, type Note } from './events';
import { today } from './dates';

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
export type Mentor = { name: string; school: string; hours: number; pending: { date: string; task: string; h: number } | null };
export type Sent = { to: string; text: string; when: string };
export type Tab = 'home' | 'camps' | 'teams' | 'msgs' | 'sched' | 'more' | 'mentors' | 'about' | 'event' | 'staffList';

export type State = {
  role: 'parent' | 'staff';
  tab: Tab;
  loc: string;
  camps: Camp[];
  regs: Reg[];
  mentors: Mentor[];
  sent: Sent[];
  rsvp: Record<'tue' | 'thu' | 'sat', boolean>;
  waiverSigned: boolean;
  // Staff camp management
  eventId: number;
  eventFrom: 'camps' | 'sched'; // where the event page goes back to
  staffFilter: string;
  // Staff schedule
  me: string; // signed-in staff member (demo: Coach Alex)
  schedWeek: string; // Monday of the week shown
  schedDay: string; // selected day
  schedFilter: string;
  assign: Record<number, Assignment[]>;
  packed: Record<number, boolean[]>;
  notes: Record<number, Note[]>;
};

export const INITIAL: State = {
  role: 'parent',
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
  mentors: [
    { name: 'Isabella M.', school: 'Calallen HS', hours: 42, pending: { date: 'Oct 15', task: 'Led build session, Team 2A', h: 3 } },
    { name: 'Diego T.', school: 'Robstown HS', hours: 36, pending: { date: 'Oct 14', task: 'Notebook review with rookies', h: 2 } },
    { name: 'Sofia L.', school: 'Alice HS', hours: 28, pending: null },
    { name: 'Noah P.', school: 'Gregory-Portland HS', hours: 19, pending: { date: 'Oct 12', task: 'Library STEM workshop helper', h: 4 } },
  ],
  sent: [
    { to: 'Robstown · Intro to Robotics', text: 'Reminder: camp starts Monday at 9:00 at Robstown Public Library. Bring a water bottle!', when: 'Oct 16' },
  ],
  rsvp: { tue: false, thu: true, sat: false },
  waiverSigned: false,
  eventId: 1,
  eventFrom: 'camps',
  staffFilter: 'All',
  me: ME,
  schedWeek: thisWeekMonday(),
  schedDay: today() >= thisWeekMonday() ? today() : thisWeekMonday(),
  schedFilter: 'All',
  assign: INITIAL_ASSIGN,
  packed: { 1: [true, true, false, true, false], 2: [true, false, false, true, true], 7: [true, true, true, false], 16: [true, false, true, false, true] },
  notes: INITIAL_NOTES,
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
