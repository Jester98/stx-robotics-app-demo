import { createContext, useContext, useState, type ReactNode } from 'react';

// Sample data for the client demo. Camps, dates, seats and venues are not real.
export type Camp = {
  id: string;
  name: string;
  loc: Community;
  ages: [number, number];
  dates: string;
  time: string;
  venue: string;
  cap: number;
  filled: number;
  wait: number;
};

export const COMMUNITIES = ['Portland', 'Robstown', 'Del Rio', 'Alice'] as const;
export type Community = (typeof COMMUNITIES)[number];

const CAMPS: Camp[] = [
  // A family cancelled: 1 seat is open but held for the 3-family waitlist (staff "Offer seat" demo).
  { id: '1', name: 'Intro to Robotics', loc: 'Robstown', ages: [8, 11], dates: 'Jun 7–11, 2027', time: '9:00–12:00', venue: 'Robstown partner library', cap: 16, filled: 15, wait: 3 },
  // 1 seat left: the demo's "seat taken mid-flow" case runs on this camp.
  { id: '2', name: 'Drone Flight Lab', loc: 'Del Rio', ages: [11, 14], dates: 'Jun 14–18, 2027', time: '1:00–4:00', venue: 'Del Rio partner library', cap: 14, filled: 13, wait: 0 },
  { id: '3', name: 'VEX V5 Bootcamp', loc: 'Portland', ages: [12, 17], dates: 'Jun 21–25, 2027', time: '9:00–3:00', venue: 'Portland partner library', cap: 20, filled: 9, wait: 0 },
  { id: '4', name: '3D Design & Print', loc: 'Alice', ages: [9, 13], dates: 'Jun 28–Jul 2, 2027', time: '9:00–12:00', venue: 'Alice partner library', cap: 16, filled: 14, wait: 0 },
  { id: '5', name: 'First Circuits', loc: 'Robstown', ages: [6, 8], dates: 'Jul 12–16, 2027', time: '9:00–11:30', venue: 'Robstown partner library', cap: 12, filled: 5, wait: 0 },
  { id: '6', name: 'Coding with Robots', loc: 'Portland', ages: [9, 12], dates: 'Jul 19–23, 2027', time: '1:00–4:00', venue: 'Portland partner library', cap: 16, filled: 16, wait: 1 },
];

export type Child = { name: string; age: number };
export type Registration = {
  campId: string;
  child: Child;
  status: 'Confirmed' | 'Waitlisted';
  position?: number; // waitlist position
  seat?: number; // index of the family's tick in the ledger
  sms: boolean;
};
export type Draft = { child?: Child; guardian?: string; notes?: string };

export type Mentor = {
  id: string;
  name: string; // first name + initial only
  loc: Community;
  hours: number; // approved this season
  log?: { date: string; task: string; h: number; state: 'pending' | 'approved' | 'returned'; reason?: string };
};
const MENTORS: Mentor[] = [
  { id: 'm1', name: 'Isabella M.', loc: 'Portland', hours: 42, log: { date: 'Oct 15', task: 'Led build session, Team 2A', h: 3, state: 'pending' } },
  { id: 'm2', name: 'Diego T.', loc: 'Robstown', hours: 36, log: { date: 'Oct 14', task: 'Notebook review with rookies', h: 2, state: 'pending' } },
  { id: 'm3', name: 'Sofia L.', loc: 'Alice', hours: 28 },
  { id: 'm4', name: 'Noah P.', loc: 'Portland', hours: 19, log: { date: 'Oct 12', task: 'Library STEM workshop helper', h: 4, state: 'pending' } },
];

export type Print = { id: string; what: string; who: string; lane: 'Queued' | 'Printing' | 'Ready' | 'Done'; printer?: string };
const PRINTS: Print[] = [
  { id: 'P-118', what: 'Keychain robot ×24', who: 'Alice camp', lane: 'Queued' },
  { id: 'P-119', what: 'Drive gear spacers', who: 'Team 2A', lane: 'Queued' },
  { id: 'P-116', what: 'Name plates ×16', who: 'Robstown camp', lane: 'Printing', printer: 'Prusa #2' },
  { id: 'P-117', what: 'Intake roller mount', who: 'Team 2B', lane: 'Printing', printer: 'Bambu #1' },
  { id: 'P-115', what: 'Mini drone frames ×6', who: 'Del Rio camp', lane: 'Ready' },
];
export const PRINTERS = ['Prusa #2', 'Bambu #1'];

type Store = {
  camps: Camp[];
  regs: Registration[];
  phone?: string; // set once verified
  guardian?: string;
  kids: Child[];
  draft: Draft;
  filter: Community | 'All';
  stolen: string[]; // camps where the demo already took the last seat
  role: 'parent' | 'staff'; // demo switch; the real app gates staff behind sign-in
  mentors: Mentor[];
  prints: Print[];
};

const Ctx = createContext<{ s: Store; set: (fn: (s: Store) => Store) => void } | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<Store>({
    camps: CAMPS,
    regs: [],
    kids: [],
    draft: {},
    filter: 'All',
    stolen: [],
    role: 'parent',
    mentors: MENTORS,
    prints: PRINTS,
  });
  return <Ctx.Provider value={{ s, set: setS }}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useStore outside StoreProvider');
  return v;
}

// Open seats go to the waitlist first, so a camp with a line has none for new families.
export const seatsLeft = (c: Camp) => (c.wait > 0 ? 0 : Math.max(0, c.cap - c.filled));
export const seatToOffer = (c: Camp) => c.wait > 0 && c.filled < c.cap;

// Staff: give the open seat to waitlist #1. A parent-flow child at #1 becomes Confirmed.
export function offerSeat(s: Store, campId: string): Store {
  const camp = s.camps.find((c) => c.id === campId)!;
  if (!seatToOffer(camp)) return s;
  const regs = s.regs.map((r) =>
    r.campId !== campId || r.status !== 'Waitlisted'
      ? r
      : r.position === 1
        ? { ...r, status: 'Confirmed' as const, position: undefined, seat: camp.filled }
        : { ...r, position: r.position! - 1 },
  );
  const camps = s.camps.map((c) => (c.id === campId ? { ...c, filled: c.filled + 1, wait: c.wait - 1 } : c));
  return { ...s, camps, regs };
}

export function resolveLog(s: Store, id: string, state: 'approved' | 'returned', reason?: string): Store {
  return {
    ...s,
    mentors: s.mentors.map((m) =>
      m.id !== id || !m.log ? m : { ...m, hours: state === 'approved' ? m.hours + m.log.h : m.hours, log: { ...m.log, state, reason } },
    ),
  };
}

export const pickedUp = (s: Store, id: string): Store => ({
  ...s,
  prints: s.prints.map((p) => (p.id === id ? { ...p, lane: 'Done' } : p)),
});
export const isFull = (c: Camp) => seatsLeft(c) === 0;

// Returns the new registration. Seats are re-checked here, at submit time.
export function register(s: Store, campId: string, sms: boolean): [Store, Registration] {
  const camp = s.camps.find((c) => c.id === campId)!;
  const child = s.draft.child!;
  const full = isFull(camp);
  const reg: Registration = full
    ? { campId, child, sms, status: 'Waitlisted', position: camp.wait + 1 }
    : { campId, child, sms, status: 'Confirmed', seat: camp.filled };
  const camps = s.camps.map((c) => (c.id !== campId ? c : full ? { ...c, wait: c.wait + 1 } : { ...c, filled: c.filled + 1 }));
  const kids = s.kids.some((k) => k.name.toLowerCase() === child.name.toLowerCase()) ? s.kids : [...s.kids, child];
  return [{ ...s, camps, regs: [...s.regs, reg], kids, guardian: s.draft.guardian, draft: {} }, reg];
}

export function alreadyRegistered(s: Store, campId: string, name: string) {
  return s.regs.some((r) => r.campId === campId && r.child.name.trim().toLowerCase() === name.trim().toLowerCase());
}

export const formatPhone = (d: string) =>
  d.length < 4 ? d : d.length < 7 ? `(${d.slice(0, 3)}) ${d.slice(3)}` : `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
