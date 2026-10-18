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
  { id: '1', name: 'Intro to Robotics', loc: 'Robstown', ages: [8, 11], dates: 'Jun 7–11, 2027', time: '9:00–12:00', venue: 'Robstown partner library', cap: 16, filled: 16, wait: 3 },
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

type Store = {
  camps: Camp[];
  regs: Registration[];
  phone?: string; // set once verified
  guardian?: string;
  kids: Child[];
  draft: Draft;
  filter: Community | 'All';
  stolen: string[]; // camps where the demo already took the last seat
};

const Ctx = createContext<{ s: Store; set: (fn: (s: Store) => Store) => void } | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<Store>({ camps: CAMPS, regs: [], kids: [], draft: {}, filter: 'All', stolen: [] });
  return <Ctx.Provider value={{ s, set: setS }}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useStore outside StoreProvider');
  return v;
}

export const seatsLeft = (c: Camp) => Math.max(0, c.cap - c.filled);
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
