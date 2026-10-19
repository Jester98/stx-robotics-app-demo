// Who the demo user is, which tabs they get, and what they're allowed to do.
// In the real app an administrator assigns roles; here the start screen picks one.
import type { State, Tab } from './state';
import type { Kind } from './events';

export type AppRole = 'parent' | 'mentor' | 'volunteer' | 'staff' | 'admin';

export const ROLE_INFO: Record<AppRole, { label: string; desc: string; me: string; tabs: Tab[] }> = {
  parent: { label: 'Parent', desc: 'Register your kids for camps, sign waivers and get updates.', me: 'parent', tabs: ['home', 'camps', 'msgs', 'more'] },
  mentor: { label: 'Student mentor', desc: 'See your shifts, take open ones and log service hours.', me: 'p8', tabs: ['home', 'sched', 'hours', 'more'] },
  volunteer: { label: 'Volunteer', desc: 'Help at events, take shifts and log your hours.', me: 'p13', tabs: ['home', 'sched', 'hours', 'more'] },
  staff: { label: 'Staff', desc: 'Run events, check kids in and out, and text families.', me: 'p12', tabs: ['home', 'camps', 'sched', 'checkin', 'more'] },
  admin: { label: 'Administrator', desc: 'Everything staff can do, plus approvals and roles.', me: 'p14', tabs: ['home', 'camps', 'sched', 'approvals', 'more'] },
};
export const ROLES_ORDER: AppRole[] = ['parent', 'mentor', 'volunteer', 'staff', 'admin'];

export type Action =
  | 'takeShift'
  | 'requestDrop'
  | 'addPeople'
  | 'removePeople'
  | 'approve'
  | 'textFamilies'
  | 'checkIn'
  | 'manageEvent' // supplies checklist and staff notes
  | 'logHours';

const ALLOWED: Record<AppRole, Action[]> = {
  parent: [],
  mentor: ['takeShift', 'requestDrop', 'logHours'],
  volunteer: ['takeShift', 'requestDrop', 'logHours'],
  staff: ['takeShift', 'requestDrop', 'addPeople', 'textFamilies', 'checkIn', 'manageEvent'],
  admin: ['takeShift', 'addPeople', 'removePeople', 'approve', 'textFamilies', 'checkIn', 'manageEvent'],
};

/** A volunteer still waiting on approval (background check). */
export const isPending = (s: State, id = s.me) => s.pending.includes(id);

export function can(s: State, action: Action) {
  if (!s.role) return false;
  // Pending volunteers can look at the schedule and log hours, nothing else.
  if (isPending(s) && action !== 'logHours') return false;
  return ALLOWED[s.role].includes(action);
}

/** Full kid details: admins see everyone; mentors, volunteers and staff only for events they work. */
export function canSeeKids(s: State, eventId: number) {
  if (!s.role || s.role === 'parent' || isPending(s)) return false;
  if (s.role === 'admin') return true;
  return (s.assign[eventId] ?? []).some((a) => a.person === s.me);
}

/** The shift role someone gets when they take an open shift. */
export const shiftRoleFor = (kind: Kind) => (kind === 'Student mentor' ? 'Student mentor' : kind === 'Volunteer' ? 'Volunteer' : 'Assistant');

/** Ask an administrator to take `s.me` off an event. */
export function requestDrop(s: State, event: number): State {
  if (s.drops.some((d) => d.event === event && d.person === s.me && d.status === 'Pending')) return s;
  return { ...s, drops: [...s.drops, { id: s.drops.length + 1, event, person: s.me, status: 'Pending' }] };
}
export const dropPending = (s: State, event: number, id = s.me) => s.drops.some((d) => d.event === event && d.person === id && d.status === 'Pending');

/** Items waiting on an administrator. */
export const approvalsCount = (s: State) =>
  s.hours.filter((r) => r.status === 'Pending').length + s.drops.filter((d) => d.status === 'Pending').length + s.pending.length;
