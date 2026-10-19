import { useMemo, useState } from 'react';
import { PanResponder, Pressable, ScrollView, Text, View } from 'react-native';
import { useApp, type Camp, type State } from '@/lib/state';
import {
  INFO,
  TOWNS,
  TYPES,
  addressFor,
  initials,
  person,
  planFor,
  runsOn,
  shortBy,
  suppliesFor,
  type Assignment,
  type EvType,
  type Role,
} from '@/lib/events';
import { addDays, dayLong, dayNum, dayShort, monday, monthDay, range, today, weekDays } from '@/lib/dates';
import { Btn, Card, Chip, Choice, Empty, Eyebrow, Field, H2, H3, Lead, Link, Meta, Pad, Row, Sec, Stack, Tag } from '@/ui/kit';
import { c, f, gutter } from '@/ui/theme';
import { TypeTag } from './events';

// Staff Schedule: a week strip, open shifts, and the selected day's events.

const FILTERS = ['All', 'My shifts', 'Camps', 'Competitions', ...TOWNS];

function matches(x: Camp, a: Assignment[], filter: string, me: string) {
  if (filter === 'All') return true;
  if (filter === 'My shifts') return a.some((y) => y.person === me);
  if (filter === 'Camps') return x.type === 'Camp';
  if (filter === 'Competitions') return x.type === 'Competition';
  return x.loc === filter;
}

/** Give `me` a shift on an event: Lead instructor if it has none, otherwise Assistant. */
function takeShift(s: State, id: number, day: string): State {
  const x = s.camps.find((y) => y.id === id)!;
  const a = s.assign[id] ?? [];
  if (a.some((y) => y.person === s.me)) return s;
  const role: Role = a.some((y) => y.role === 'Lead instructor') ? 'Assistant' : 'Lead instructor';
  const days = x.start === x.end ? `${dayShort(day)} ${monthDay(day)}` : `${dayShort(x.start!)}–${dayShort(x.end!)}`;
  return { ...s, assign: { ...s.assign, [id]: [...a, { person: s.me, role, days, hours: x.time }] } };
}

export function Schedule() {
  const { s, set, sheet, toast } = useApp();
  const now = today();
  const days = weekDays(s.schedWeek);
  const dated = s.camps.filter((x) => x.start);
  const shown = (x: Camp) => matches(x, s.assign[x.id] ?? [], s.schedFilter, s.me);
  const onDay = (d: string) => dated.filter((x) => runsOn(x, d) && shown(x));
  const list = onDay(s.schedDay).sort((a, b) => startMinutes(a.time) - startMinutes(b.time));

  const goWeek = (n: number) =>
    set((p) => {
      const week = addDays(p.schedWeek, n * 7);
      const sameWeekToday = monday(now) === week;
      return { ...p, schedWeek: week, schedDay: sameWeekToday ? now : addDays(week, weekdayIndex(p.schedDay)) };
    });
  const pickDay = (d: string) => set((p) => ({ ...p, schedDay: d }));
  const backToToday = () => set((p) => ({ ...p, schedWeek: monday(now), schedDay: now }));
  const open = (id: number) => set((p) => ({ ...p, eventId: id, eventFrom: 'sched', tab: 'event' }));

  // Swipe left/right on the week strip to change weeks.
  const pan = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 14 && Math.abs(g.dx) > Math.abs(g.dy) * 1.5,
        onPanResponderRelease: (_, g) => {
          if (g.dx < -40) goWeek(1);
          else if (g.dx > 40) goWeek(-1);
        },
      }),
    // goWeek only reads state through the setter, so the responder can be created once
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const openShifts = dated
    .filter((x) => x.end! >= now && shortBy(x, s.assign[x.id] ?? []) > 0)
    .sort((a, b) => (a.start! < b.start! ? -1 : 1));

  return (
    <>
      <Pad style={{ paddingBottom: 12 }}>
        <Row style={{ alignItems: 'flex-end' }}>
          <View style={{ flex: 1 }}>
            <Eyebrow>Staff · Schedule</Eyebrow>
            <H2>Schedule</H2>
          </View>
          <View style={{ paddingBottom: 6 }}>
            <Link onPress={() => sheet(<AddEventSheet />)}>+ Add event</Link>
          </View>
        </Row>
        <Lead>Signed in as {person(s.me).name}.</Lead>
      </Pad>

      {/* Week strip */}
      <View style={{ paddingHorizontal: gutter }}>
        <Card style={{ paddingHorizontal: 10, paddingVertical: 12 }}>
          <Row style={{ marginBottom: 10, paddingHorizontal: 4 }}>
            <Pressable accessibilityRole="button" accessibilityLabel="Previous week" onPress={() => goWeek(-1)} hitSlop={12}>
              <Text style={{ fontFamily: f.bold, fontSize: 20, color: c.maroon }}>‹</Text>
            </Pressable>
            <Text style={{ flex: 1, textAlign: 'center', fontFamily: f.bold, fontSize: 13, letterSpacing: 1.3, textTransform: 'uppercase', color: c.head }}>
              Week of {monthDay(s.schedWeek)}
            </Text>
            <Pressable accessibilityRole="button" accessibilityLabel="Next week" onPress={() => goWeek(1)} hitSlop={12}>
              <Text style={{ fontFamily: f.bold, fontSize: 20, color: c.maroon }}>›</Text>
            </Pressable>
          </Row>
          <View {...pan.panHandlers} style={{ flexDirection: 'row', gap: 4 }} accessibilityRole="tablist">
            {days.map((d) => {
              const sel = d === s.schedDay;
              const isToday = d === now;
              const has = onDay(d).length > 0;
              return (
                <Pressable
                  key={d}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: sel }}
                  accessibilityLabel={`${dayLong(d)}${isToday ? ', today' : ''}${has ? ', has events' : ''}`}
                  onPress={() => pickDay(d)}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    paddingVertical: 8,
                    borderRadius: 12,
                    backgroundColor: sel ? c.maroon : isToday ? c.maroonSoft : 'transparent',
                  }}
                >
                  <Text style={{ fontFamily: f.bold, fontSize: 10.5, letterSpacing: 0.6, textTransform: 'uppercase', color: sel ? c.white : isToday ? c.maroon : c.muted }}>
                    {dayShort(d)}
                  </Text>
                  <Text style={{ fontFamily: f.bold, fontSize: 17, lineHeight: 22, marginTop: 2, color: sel ? c.white : isToday ? c.maroon : c.head }}>{dayNum(d)}</Text>
                  <View style={{ width: 5, height: 5, borderRadius: 3, marginTop: 3, backgroundColor: has ? (sel ? c.white : c.maroon) : 'transparent' }} />
                </Pressable>
              );
            })}
          </View>
          {monday(now) !== s.schedWeek && (
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <Link onPress={backToToday}>Back to today</Link>
            </View>
          )}
        </Card>
      </View>

      {/* Open shifts */}
      <Sec title="Open shifts" right={<Meta style={{ fontSize: 12 }}>{openShifts.length} need staff</Meta>}>
        {openShifts.length === 0 ? (
          <Empty>Every upcoming event is fully staffed.</Empty>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -gutter }} contentContainerStyle={{ gap: 10, paddingHorizontal: gutter, paddingBottom: 6 }}>
            {openShifts.map((x) => {
              const a = s.assign[x.id] ?? [];
              const mine = a.some((y) => y.person === s.me);
              return (
                <Card key={x.id} style={{ width: 236, gap: 6 }}>
                  <Row style={{ gap: 6 }}>
                    <TypeTag type={x.type!} />
                    <View style={{ flex: 1 }} />
                    <Tag kind="few">Needs {shortBy(x, a)} more</Tag>
                  </Row>
                  <Pressable accessibilityRole="button" onPress={() => open(x.id)}>
                    <H3 style={{ fontSize: 15, lineHeight: 20 }}>{x.name}</H3>
                    <Meta>
                      {span(x)} · {x.time} · {x.loc}
                    </Meta>
                  </Pressable>
                  <View style={{ marginTop: 4 }}>
                    {mine ? (
                      <Text style={{ fontFamily: f.bold, fontSize: 13, color: c.good }}>You’re on this shift</Text>
                    ) : (
                      <Btn
                        sm
                        onPress={() => {
                          set((p) => takeShift(p, x.id, x.start!));
                          toast(`You took a shift: ${x.name}`);
                        }}
                      >
                        Take shift
                      </Btn>
                    )}
                  </View>
                </Card>
              );
            })}
          </ScrollView>
        )}
      </Sec>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingHorizontal: gutter, paddingTop: 20, paddingBottom: 4 }}>
        {FILTERS.map((l) => (
          <Chip key={l} on={s.schedFilter === l} onPress={() => set((p) => ({ ...p, schedFilter: l }))}>
            {l}
          </Chip>
        ))}
      </ScrollView>

      {/* Selected day */}
      <Sec title={s.schedDay === now ? `Today · ${dayLong(s.schedDay)}` : dayLong(s.schedDay)} right={<Meta style={{ fontSize: 12 }}>{list.length} {list.length === 1 ? 'event' : 'events'}</Meta>}>
        <Stack>
          {list.length === 0 && <Empty>{s.schedFilter === 'My shifts' ? 'You have no shifts this day.' : 'Nothing scheduled this day.'}</Empty>}
          {list.map((x) => (
            <EventRow key={x.id} x={x} onPress={() => open(x.id)} />
          ))}
          <Btn block kind="out" onPress={() => sheet(<AddEventSheet />)}>
            + Add event
          </Btn>
        </Stack>
      </Sec>
    </>
  );
}

function EventRow({ x, onPress }: { x: Camp; onPress: () => void }) {
  const { s } = useApp();
  const a = s.assign[x.id] ?? [];
  const gap = shortBy(x, a);
  const mine = a.find((y) => y.person === s.me);
  const [from, to] = x.time.split('–');
  return (
    <Pressable accessibilityRole="button" accessibilityHint="Opens the event" onPress={onPress}>
      {({ pressed }) => (
        <Card style={{ flexDirection: 'row', gap: 14, opacity: pressed ? 0.75 : 1 }}>
          <View style={{ width: 46 }}>
            <Text style={{ fontFamily: f.bold, fontSize: 15, color: c.head, fontVariant: ['tabular-nums'] }}>{from}</Text>
            <Text style={{ fontFamily: f.regular, fontSize: 12, color: c.muted, fontVariant: ['tabular-nums'] }}>{to}</Text>
          </View>
          <View style={{ flex: 1, gap: 6 }}>
            <H3 style={{ fontSize: 15, lineHeight: 20 }}>{x.name}</H3>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              <TypeTag type={x.type!} />
              {gap > 0 && <Tag kind="few">Needs {gap} more</Tag>}
            </View>
            <Meta>
              {x.venue} · {x.loc}
            </Meta>
            {mine && (
              <Text style={{ fontFamily: f.bold, fontSize: 13, color: c.maroon }}>
                Your shift: {mine.role} · {mine.hours}
              </Text>
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }} accessibilityLabel={`Staff: ${a.map((y) => person(y.person).name).join(', ') || 'none yet'}`}>
              {a.slice(0, 5).map((y) => (
                <Initials key={y.person} id={y.person} me={y.person === s.me} />
              ))}
              {a.length > 5 && <Meta style={{ fontSize: 12 }}>+{a.length - 5}</Meta>}
              {a.length === 0 && <Meta style={{ fontSize: 12 }}>No staff yet</Meta>}
            </View>
          </View>
        </Card>
      )}
    </Pressable>
  );
}

function Initials({ id, me }: { id: string; me: boolean }) {
  return (
    <View
      style={{
        width: 26,
        height: 26,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: me ? c.maroon : c.track,
        borderWidth: 2,
        borderColor: c.white,
      }}
    >
      <Text style={{ fontFamily: f.bold, fontSize: 10, color: me ? c.white : c.head }}>{initials(person(id).name)}</Text>
    </View>
  );
}

function AddEventSheet() {
  const { s, set, sheet, toast } = useApp();
  const days = weekDays(s.schedWeek);
  const [name, setName] = useState('');
  const [type, setType] = useState<EvType>('Workshop');
  const [day, setDay] = useState(days.includes(s.schedDay) ? s.schedDay : days[0]);
  const [time, setTime] = useState('4:00–6:00');
  const [town, setTown] = useState(TOWNS[0]);
  const [venue, setVenue] = useState('');
  const [need, setNeed] = useState('2');
  const [tried, setTried] = useState(false);
  const label = (d: string) => `${dayShort(d)} ${dayNum(d)}`;

  const add = () => {
    setTried(true);
    if (!name.trim() || !time.trim()) return;
    const id = Math.max(...s.camps.map((x) => x.id)) + 1;
    // Demo only: registers the event's details so the event page works; nothing is saved.
    INFO[id] = { need: Number(need), address: addressFor(town), schedule: planFor(type, time.trim()), supplies: suppliesFor(type) };
    const ev: Camp = {
      id,
      name: name.trim(),
      loc: town,
      ages: '8–14',
      dates: range(day, day),
      time: time.trim(),
      venue: venue.trim() || `${town} venue`,
      cap: 12,
      filled: 0,
      wait: 0,
      staffOnly: true,
      scheduleOnly: type !== 'Camp',
      type,
      start: day,
      end: day,
    };
    set((p) => ({ ...p, camps: [...p.camps, ev], assign: { ...p.assign, [id]: [] }, notes: { ...p.notes, [id]: [] }, schedDay: day }));
    sheet(null);
    toast(`${ev.name} added (demo only, not saved)`);
  };

  return (
    <>
      <Eyebrow>Schedule</Eyebrow>
      <H2 style={{ fontSize: 22, lineHeight: 25 }}>Add event</H2>
      <Stack gap={11} style={{ marginTop: 12 }}>
        <Field label="Name" value={name} onChangeText={setName} placeholder="e.g. Library robotics night" autoCapitalize="sentences" />
        {tried && !name.trim() && <Text style={{ fontFamily: f.bold, fontSize: 13, color: c.maroon }}>Give the event a name.</Text>}
        <Choice label="Type" options={TYPES} value={type} onChange={setType} />
        <Choice label={`Date · week of ${monthDay(s.schedWeek)}`} options={days.map(label)} value={label(day)} onChange={(v) => setDay(days[days.map(label).indexOf(v)])} />
        <Field label="Time" value={time} onChangeText={setTime} placeholder="4:00–6:00" />
        <Choice label="Location" options={TOWNS} value={town} onChange={setTown} />
        <Field label="Venue (optional)" value={venue} onChangeText={setVenue} placeholder="Library, school or community center" />
        <Choice label="Staff needed" options={['1', '2', '3', '4', '5']} value={need} onChange={setNeed} />
        <Btn block onPress={add}>
          Add event
        </Btn>
        <Btn block kind="out" onPress={() => sheet(null)}>
          Cancel
        </Btn>
      </Stack>
    </>
  );
}

const span = (x: Camp) =>
  x.start === x.end
    ? monthDay(x.start!)
    : x.start!.slice(0, 7) === x.end!.slice(0, 7)
      ? `${monthDay(x.start!)}–${dayNum(x.end!)}`
      : `${monthDay(x.start!)}–${monthDay(x.end!)}`;
const weekdayIndex = (d: string) => (new Date(d + 'T00:00').getDay() + 6) % 7;
function startMinutes(time: string) {
  const [h, m] = time.split('–')[0].split(':').map(Number);
  const hh = h < 7 ? h + 12 : h; // sample times are afternoon when under 7
  return hh * 60 + (m || 0);
}

