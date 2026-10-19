// Small date helpers. Days are local "YYYY-MM-DD" strings so comparisons are plain string compares.

const pad = (n: number) => String(n).padStart(2, '0');
export const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const parse = (s: string) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};
export const addDays = (s: string, n: number) => {
  const d = parse(s);
  d.setDate(d.getDate() + n);
  return iso(d);
};
/** Monday of the week containing `s`. */
export const monday = (s: string) => {
  const d = parse(s);
  return addDays(s, -((d.getDay() + 6) % 7));
};
export const today = () => iso(new Date());
export const weekDays = (mon: string) => Array.from({ length: 7 }, (_, i) => addDays(mon, i));
export const isWeekday = (s: string) => {
  const g = parse(s).getDay();
  return g !== 0 && g !== 6;
};

const fmt = (s: string, o: Intl.DateTimeFormatOptions) => parse(s).toLocaleDateString('en-US', o);
export const dayShort = (s: string) => fmt(s, { weekday: 'short' }); // Mon
export const dayNum = (s: string) => parse(s).getDate();
export const dayLong = (s: string) => fmt(s, { weekday: 'long', month: 'short', day: 'numeric' }); // Tuesday, Oct 20
export const monthDay = (s: string) => fmt(s, { month: 'short', day: 'numeric' }); // Oct 20
/** "Oct 19–23, 2026", "Jun 28–Jul 2, 2027" or "Oct 24, 2026". */
export function range(start: string, end: string) {
  const y = parse(end).getFullYear();
  if (start === end) return `${monthDay(start)}, ${y}`;
  const sameMonth = start.slice(0, 7) === end.slice(0, 7);
  return `${monthDay(start)}–${sameMonth ? dayNum(end) : monthDay(end)}, ${y}`;
}
