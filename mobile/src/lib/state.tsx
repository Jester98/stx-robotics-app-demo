import { createContext, useContext } from 'react';

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
};
export type Reg = { kid: string; age: number; camp: number; status: 'Confirmed' | 'Waitlisted' };
export type Mentor = { name: string; school: string; hours: number; pending: { date: string; task: string; h: number } | null };
export type Lane = 'Queued' | 'Printing' | 'Ready' | 'Done';
export type Job = { id: string; what: string; who: string; hrs: number; lane: Lane; printer?: string; file?: string };
export type Sent = { to: string; text: string; when: string };
export type Tab = 'home' | 'camps' | 'teams' | 'msgs' | 'prints' | 'more' | 'mentors' | 'about';

export type State = {
  role: 'parent' | 'staff';
  tab: Tab;
  loc: string;
  camps: Camp[];
  regs: Reg[];
  mentors: Mentor[];
  jobs: Job[];
  sent: Sent[];
  rsvp: Record<'tue' | 'thu' | 'sat', boolean>;
  waiverSigned: boolean;
};

export const INITIAL: State = {
  role: 'parent',
  tab: 'home',
  loc: 'All',
  camps: [
    { id: 1, name: 'Intro to Robotics', loc: 'Robstown', ages: '8–11', dates: 'Jun 7–11, 2027', time: '9:00–12:00', venue: 'Robstown Public Library', cap: 16, filled: 16, wait: 3 },
    { id: 2, name: 'Drone Flight Lab', loc: 'Del Rio', ages: '11–14', dates: 'Jun 14–18, 2027', time: '1:00–4:00', venue: 'Val Verde County Library', cap: 14, filled: 11, wait: 0 },
    { id: 3, name: 'VEX V5 Bootcamp', loc: 'Portland', ages: '12–17', dates: 'Jun 21–25, 2027', time: '9:00–3:00', venue: 'Bell Whittington Library', cap: 20, filled: 9, wait: 0 },
    { id: 4, name: '3D Design & Print', loc: 'Alice', ages: '9–13', dates: 'Jun 28–Jul 2, 2027', time: '9:00–12:00', venue: 'Alice Public Library', cap: 16, filled: 14, wait: 0 },
    { id: 5, name: 'First Circuits', loc: 'Robstown', ages: '6–8', dates: 'Jul 12–16, 2027', time: '9:00–11:30', venue: 'Robstown Public Library', cap: 12, filled: 5, wait: 0 },
    { id: 6, name: 'Coding with Robots', loc: 'Portland', ages: '9–12', dates: 'Jul 19–23, 2027', time: '1:00–4:00', venue: 'Bell Whittington Library', cap: 16, filled: 16, wait: 1 },
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
  jobs: [
    { id: 'P-118', what: 'Keychain robot ×24', who: 'Alice camp', hrs: 6.5, lane: 'Queued' },
    { id: 'P-119', what: 'Drive gear spacers', who: 'Team 2A', hrs: 1.2, lane: 'Queued' },
    { id: 'P-116', what: 'Name plates ×16', who: 'Robstown camp', hrs: 4.0, lane: 'Printing', printer: 'Prusa #2' },
    { id: 'P-117', what: 'Intake roller mount', who: 'Team 2B', hrs: 2.3, lane: 'Printing', printer: 'Bambu #1' },
    { id: 'P-115', what: 'Mini drone frame ×6', who: 'Del Rio camp', hrs: 3.1, lane: 'Ready' },
    { id: 'P-112', what: 'Phone stand ×20', who: 'Keach workshop', hrs: 5.4, lane: 'Done' },
  ],
  sent: [
    { to: 'Robstown · Intro to Robotics', text: 'Reminder: camp starts Monday at 9:00 at Robstown Public Library. Bring a water bottle!', when: 'Oct 16' },
  ],
  rsvp: { tue: false, thu: true, sat: false },
  waiverSigned: false,
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
