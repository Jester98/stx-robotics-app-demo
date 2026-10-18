import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useApp, type Camp } from '@/lib/state';
import {
  ADULT_RATIO,
  INFO,
  PEOPLE,
  ROLES,
  THIS_WEEK,
  adults,
  adultsNeeded,
  person,
  roster,
  type Assignment,
  type Kind,
  type Role,
} from '@/lib/events';
import { BackLink, Bar, Body, Btn, Card, Check, Chip, Choice, Empty, Eyebrow, Field, H2, H3, Lead, Link, Meta, Pad, Row, Sec, Stack, Tag } from '@/ui/kit';
import { c, f, gutter } from '@/ui/theme';

// Staff side of Camps: running events. Same components as the rest of the prototype.

const FILTERS = ['All', 'Needs staff', 'This week', 'Portland', 'Robstown', 'Del Rio', 'Alice'];

const short = (camp: Camp, a: Assignment[]) => Math.max(0, INFO[camp.id].need - a.length);
const lead = (a: Assignment[]) => a.find((x) => x.role === 'Lead instructor');

export function StaffCamps() {
  const { s, set } = useApp();
  const list = s.camps.filter((x) => {
    const a = s.assign[x.id] ?? [];
    if (s.staffFilter === 'All') return true;
    if (s.staffFilter === 'Needs staff') return short(x, a) > 0;
    if (s.staffFilter === 'This week') return THIS_WEEK.includes(x.id);
    return x.loc === s.staffFilter;
  });
  const open = (id: number) => set((p) => ({ ...p, eventId: id, tab: 'event' }));

  return (
    <>
      <Pad style={{ paddingBottom: 12 }}>
        <Eyebrow>Staff · Events</Eyebrow>
        <H2>Run a camp</H2>
        <Lead>Staffing, rosters, supplies and notes for every event.</Lead>
      </Pad>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingHorizontal: gutter, paddingBottom: 4 }}>
        {FILTERS.map((l) => (
          <Chip key={l} on={s.staffFilter === l} onPress={() => set((p) => ({ ...p, staffFilter: l }))}>
            {l}
          </Chip>
        ))}
      </ScrollView>
      <Sec style={{ paddingTop: 12 }}>
        <Stack>
          {list.length === 0 && <Empty>{s.staffFilter === 'Needs staff' ? 'Every event is fully staffed.' : 'No events match this filter.'}</Empty>}
          {list.map((x) => {
            const a = s.assign[x.id] ?? [];
            const need = INFO[x.id].need;
            const gap = short(x, a);
            return (
              <Pressable key={x.id} accessibilityRole="button" accessibilityHint="Opens the event" onPress={() => open(x.id)}>
                {({ pressed }) => (
                  <Card style={{ opacity: pressed ? 0.7 : 1 }}>
                    <Row>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: f.bold, fontSize: 11, letterSpacing: 1.32, textTransform: 'uppercase', color: c.maroon }}>
                          {x.loc}
                          {THIS_WEEK.includes(x.id) ? ' · This week' : ''}
                        </Text>
                        <H3>{x.name}</H3>
                      </View>
                      {gap > 0 ? <Tag kind="full">Short {gap} staff</Tag> : <Tag kind="open">Staffed</Tag>}
                    </Row>
                    <Meta style={{ marginTop: 6 }}>
                      {x.dates} · {x.time}
                      {'\n'}
                      {x.venue}
                    </Meta>
                    <View style={{ flexDirection: 'row', gap: 14, marginTop: 10 }}>
                      <View style={{ flex: 1, gap: 5 }}>
                        <Count label="Seats" n={x.filled} of={x.cap} />
                        <Bar pct={(x.filled / x.cap) * 100} />
                      </View>
                      <View style={{ flex: 1, gap: 5 }}>
                        <Count label="Staff" n={a.length} of={need} warn={gap > 0} />
                        <Bar pct={(a.length / need) * 100} black />
                      </View>
                    </View>
                  </Card>
                )}
              </Pressable>
            );
          })}
        </Stack>
      </Sec>
    </>
  );
}

const Count = ({ label, n, of, warn }: { label: string; n: number; of: number; warn?: boolean }) => (
  <Text style={{ fontFamily: f.regular, fontSize: 12, color: warn ? c.maroon : c.muted, fontVariant: ['tabular-nums'] }}>
    {n} of {of} {label.toLowerCase()}
  </Text>
);

const SECTIONS = ['Overview', 'Staff', 'Schedule', 'Kids', 'Supplies', 'Notes'] as const;
type Section = (typeof SECTIONS)[number];

export function EventDetail() {
  const { s, go } = useApp();
  const [sec, setSec] = useState<Section>('Overview');
  const x = s.camps.find((y) => y.id === s.eventId)!;
  const a = s.assign[x.id] ?? [];
  const need = INFO[x.id].need;
  return (
    <>
      <Pad style={{ paddingBottom: 12 }}>
        <BackLink to="Camps" onPress={() => go('camps')} />
        <Eyebrow style={{ marginTop: 10 }}>
          {x.loc} · {x.dates}
        </Eyebrow>
        <H2>{x.name}</H2>
        <Lead>
          {x.filled} of {x.cap} seats · {a.length} of {need} staff
          {x.wait ? ` · ${x.wait} waiting` : ''}
        </Lead>
      </Pad>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingHorizontal: gutter, paddingBottom: 4 }}>
        {SECTIONS.map((n) => (
          <Chip key={n} on={sec === n} onPress={() => setSec(n)}>
            {n}
          </Chip>
        ))}
      </ScrollView>
      {sec === 'Overview' && <Overview camp={x} />}
      {sec === 'Staff' && <StaffSection camp={x} />}
      {sec === 'Schedule' && <Schedule camp={x} />}
      {sec === 'Kids' && <Kids camp={x} />}
      {sec === 'Supplies' && <Supplies camp={x} />}
      {sec === 'Notes' && <Notes camp={x} />}
    </>
  );
}

function Overview({ camp }: { camp: Camp }) {
  const { s } = useApp();
  const l = lead(s.assign[camp.id] ?? []);
  const rows: [string, string][] = [
    ['Dates', camp.dates],
    ['Times', camp.time],
    ['Venue', camp.venue],
    ['Address', INFO[camp.id].address],
    ['Lead', l ? `${person(l.person).name} · ${person(l.person).phone}` : 'Not assigned yet'],
    ['Ages', camp.ages],
  ];
  return (
    <Sec title="Overview">
      <Card style={{ gap: 6 }}>
        {rows.map(([k, v]) => (
          <View key={k} style={{ flexDirection: 'row', gap: 12 }}>
            <Meta style={{ width: 62 }}>{k}</Meta>
            <Text style={{ flex: 1, fontFamily: f.regular, fontSize: 14, lineHeight: 20, color: k === 'Lead' && !l ? c.maroon : c.ink }}>{v}</Text>
          </View>
        ))}
      </Card>
    </Sec>
  );
}

function StaffSection({ camp }: { camp: Camp }) {
  const { s, sheet, toast } = useApp();
  const a = s.assign[camp.id] ?? [];
  const grown = adults(a);
  const needAdults = adultsNeeded(camp.filled);
  const gap = short(camp, a);
  return (
    <Sec title="Staff" right={<Link onPress={() => sheet(<AddStaffSheet campId={camp.id} />)}>+ Add staff</Link>}>
      <Stack>
        {grown < needAdults && (
          <View style={{ backgroundColor: c.warnSoft, borderWidth: 1, borderColor: c.warn, padding: 14 }} accessibilityRole="alert">
            <Text style={{ fontFamily: f.bold, fontSize: 14, color: c.warn }}>Too few adults for {camp.filled} kids</Text>
            <Text style={{ fontFamily: f.regular, fontSize: 13, lineHeight: 19, color: c.warn, marginTop: 2 }}>
              {grown} {grown === 1 ? 'adult' : 'adults'} assigned, {needAdults} needed (sample rule: 1 adult per {ADULT_RATIO} kids). Student mentors
              don’t count.
            </Text>
          </View>
        )}
        {gap > 0 && (
          <View style={{ backgroundColor: c.maroonSoft, borderWidth: 1, borderColor: c.maroon, padding: 14 }}>
            <Text style={{ fontFamily: f.bold, fontSize: 14, color: c.maroon }}>
              Short {gap} {gap === 1 ? 'person' : 'people'}: {a.length} of {INFO[camp.id].need} staff
            </Text>
          </View>
        )}
        {a.length === 0 && <Empty>No one assigned yet.</Empty>}
        {a.map((x) => {
          const p = person(x.person);
          return (
            <Card key={x.person}>
              <Row>
                <View style={{ flex: 1 }}>
                  <H3>{p.name}</H3>
                  <Meta>
                    {x.days} · {x.hours}
                  </Meta>
                </View>
                <Tag kind={x.role === 'Lead instructor' ? 'blue' : x.role === 'Student mentor' ? 'mute' : 'open'}>{x.role}</Tag>
              </Row>
              <View style={{ flexDirection: 'row', gap: 10, marginTop: 10, alignItems: 'center' }}>
                <Btn sm kind="out" onPress={() => toast(`Demo: would call ${p.name} at ${p.phone}`)}>
                  Contact
                </Btn>
                <View style={{ flex: 1 }} />
                <Link onPress={() => sheet(<RemoveSheet campId={camp.id} personId={x.person} />)}>Remove</Link>
              </View>
            </Card>
          );
        })}
        <Btn block kind="out" onPress={() => sheet(<AddStaffSheet campId={camp.id} />)}>
          + Add staff
        </Btn>
      </Stack>
    </Sec>
  );
}

function AddStaffSheet({ campId }: { campId: number }) {
  const { s, set, sheet, toast } = useApp();
  const camp = s.camps.find((y) => y.id === campId)!;
  const taken = new Set((s.assign[campId] ?? []).map((x) => x.person));
  const available = PEOPLE.filter((p) => !taken.has(p.id));
  const [pick, setPick] = useState<string>();
  const [role, setRole] = useState<Role>('Assistant');
  const choose = (id: string) => {
    setPick(id);
    const k = person(id).kind;
    setRole(k === 'Student mentor' ? 'Student mentor' : k === 'Volunteer' ? 'Volunteer' : 'Assistant');
  };
  const add = () => {
    if (!pick) return;
    set((p) => ({
      ...p,
      assign: { ...p.assign, [campId]: [...(p.assign[campId] ?? []), { person: pick, role, days: 'Mon–Fri', hours: camp.time }] },
    }));
    sheet(null);
    toast(`${person(pick).name} added to ${camp.name}`);
  };
  return (
    <>
      <Eyebrow>{camp.name}</Eyebrow>
      <H2 style={{ fontSize: 22, lineHeight: 25 }}>Add staff</H2>
      <Lead style={{ marginBottom: 12 }}>People not already on this event.</Lead>
      <Stack gap={8}>
        {available.length === 0 && <Empty>Everyone is already assigned.</Empty>}
        {available.map((p) => {
          const on = pick === p.id;
          return (
            <Pressable
              key={p.id}
              accessibilityRole="radio"
              accessibilityState={{ checked: on }}
              onPress={() => choose(p.id)}
              style={{ backgroundColor: c.white, borderWidth: on ? 1.5 : 1, borderColor: on ? c.maroon : c.line, padding: 12 }}
            >
              <Row>
                <View style={{ flex: 1 }}>
                  <H3 style={{ fontSize: 15 }}>{p.name}</H3>
                  <Meta>
                    {p.kind} · {p.town}
                  </Meta>
                </View>
                {on && <Tag kind="full">Selected</Tag>}
              </Row>
            </Pressable>
          );
        })}
        {pick && <Choice label="Role" options={ROLES} value={role} onChange={setRole} />}
        <Btn block onPress={add}>
          {pick ? `Add ${person(pick).name}` : 'Pick someone to add'}
        </Btn>
        <Btn block kind="out" onPress={() => sheet(null)}>
          Cancel
        </Btn>
      </Stack>
    </>
  );
}

function RemoveSheet({ campId, personId }: { campId: number; personId: string }) {
  const { s, set, sheet, toast } = useApp();
  const camp = s.camps.find((y) => y.id === campId)!;
  const p = person(personId);
  const remove = () => {
    set((st) => ({ ...st, assign: { ...st.assign, [campId]: (st.assign[campId] ?? []).filter((x) => x.person !== personId) } }));
    sheet(null);
    toast(`${p.name} removed from ${camp.name}`);
  };
  return (
    <>
      <Eyebrow>{camp.name}</Eyebrow>
      <H2 style={{ fontSize: 22, lineHeight: 25 }}>Remove {p.name}?</H2>
      <Lead style={{ marginBottom: 14 }}>They’ll come off this event’s staff list. You can add them back later.</Lead>
      <Stack gap={11}>
        <Btn block onPress={remove}>
          Remove from event
        </Btn>
        <Btn block kind="out" onPress={() => sheet(null)}>
          {`Keep ${p.name}`}
        </Btn>
      </Stack>
    </>
  );
}

function Schedule({ camp }: { camp: Camp }) {
  return (
    <Sec title="Schedule">
      <Stack>
        {INFO[camp.id].schedule.map(([title, detail], i) => (
          <Card key={i}>
            <Text style={{ fontFamily: f.bold, fontSize: 11, letterSpacing: 1.32, textTransform: 'uppercase', color: c.maroon }}>Day {i + 1}</Text>
            <H3>{title}</H3>
            <Meta>{detail}</Meta>
          </Card>
        ))}
      </Stack>
    </Sec>
  );
}

function Kids({ camp }: { camp: Camp }) {
  const { s } = useApp();
  const { kids, waitlist } = roster(camp, s.regs, s.waiverSigned);
  const missing = kids.filter((k) => !k.waiver).length;
  const flagged = kids.filter((k) => k.flag).length;
  return (
    <>
      <Sec title={`Kids · ${kids.length}`} right={<Meta style={{ fontSize: 12 }}>{flagged} flagged · {missing} waivers missing</Meta>}>
        <Card>
          {kids.map((k, i) => (
            <View key={k.name + i} style={{ paddingVertical: 9, paddingTop: i ? 9 : 0, borderTopWidth: i ? 1 : 0, borderColor: c.line, gap: 4 }}>
              <Row>
                <Text style={{ flex: 1, fontFamily: f.bold, fontSize: 14, color: c.head }}>
                  {k.name} <Text style={{ fontFamily: f.regular, fontSize: 13, color: c.muted }}>· {k.age}</Text>
                </Text>
                <Tag kind={k.waiver ? 'open' : 'full'}>{k.waiver ? 'Waiver signed' : 'Waiver missing'}</Tag>
              </Row>
              {k.flag && (
                <Text style={{ fontFamily: f.bold, fontSize: 12, color: c.warn }} accessibilityLabel={`Medical flag: ${k.flag}`}>
                  Medical: {k.flag}
                </Text>
              )}
            </View>
          ))}
        </Card>
      </Sec>
      <Sec title={`Waitlist · ${waitlist.length}`}>
        {waitlist.length ? (
          <Card>
            {waitlist.map((n, i) => (
              <Row key={n + i} style={{ paddingVertical: 8, paddingTop: i ? 8 : 0, borderTopWidth: i ? 1 : 0, borderColor: c.line }}>
                <Text style={{ width: 28, fontFamily: f.bold, fontSize: 13, color: c.muted }}>#{i + 1}</Text>
                <Text style={{ flex: 1, fontFamily: f.regular, fontSize: 14, color: c.ink }}>{n}</Text>
              </Row>
            ))}
          </Card>
        ) : (
          <Empty>No one waiting.</Empty>
        )}
      </Sec>
    </>
  );
}

function Supplies({ camp }: { camp: Camp }) {
  const { s, set } = useApp();
  const items = INFO[camp.id].supplies;
  const packed = s.packed[camp.id] ?? items.map(() => false);
  const done = packed.filter(Boolean).length;
  const toggle = (i: number) =>
    set((p) => {
      const cur = p.packed[camp.id] ?? items.map(() => false);
      return { ...p, packed: { ...p.packed, [camp.id]: cur.map((v, j) => (j === i ? !v : v)) } };
    });
  return (
    <Sec title="Supplies" right={<Meta style={{ fontSize: 12 }}>{done} of {items.length} packed</Meta>}>
      <Card>
        <View style={{ marginBottom: 12 }}>
          <Bar pct={(done / items.length) * 100} black />
        </View>
        <Stack gap={12}>
          {items.map((it, i) => (
            <Check key={it.item} on={!!packed[i]} onChange={() => toggle(i)}>
              {`${it.item} · need ${it.need}${packed[i] ? ' · packed' : ''}`}
            </Check>
          ))}
        </Stack>
      </Card>
    </Sec>
  );
}

function Notes({ camp }: { camp: Camp }) {
  const { s, set, toast } = useApp();
  const [text, setText] = useState('');
  const notes = s.notes[camp.id] ?? [];
  const add = () => {
    if (!text.trim()) return;
    set((p) => ({ ...p, notes: { ...p.notes, [camp.id]: [...(p.notes[camp.id] ?? []), { by: 'You', when: 'Just now', text: text.trim() }] } }));
    setText('');
    toast('Note added (demo only, not saved)');
  };
  return (
    <Sec title="Notes" right={<Tag kind="mute">Staff only</Tag>}>
      <Stack>
        <Meta>Families never see these.</Meta>
        {notes
          .slice()
          .reverse()
          .map((n, i) => (
            <Card key={i}>
              <Meta>
                {n.when} · {n.by}
              </Meta>
              <Body style={{ marginTop: 6, fontSize: 14, lineHeight: 20 }}>{n.text}</Body>
            </Card>
          ))}
        <Field label="Add a note" value={text} onChangeText={setText} multiline maxLength={500} placeholder="Something the team should know" />
        <Btn block onPress={add}>
          Add note
        </Btn>
      </Stack>
    </Sec>
  );
}

const KINDS: ('All' | Kind)[] = ['All', 'Staff', 'Volunteer', 'Student mentor'];

export function StaffList() {
  const { s, set, go } = useApp();
  const [kind, setKind] = useState<'All' | Kind>('All');
  const list = PEOPLE.filter((p) => kind === 'All' || p.kind === kind);
  const jobs = (id: string) =>
    s.camps.flatMap((x) => (s.assign[x.id] ?? []).filter((a) => a.person === id).map((a) => ({ camp: x, role: a.role })));
  return (
    <>
      <Pad style={{ paddingBottom: 12 }}>
        <BackLink onPress={() => go('more')} />
        <Eyebrow style={{ marginTop: 10 }}>Staff tools</Eyebrow>
        <H2>Staff list</H2>
        <Lead>Everyone who works events, and where they’re assigned.</Lead>
      </Pad>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingHorizontal: gutter, paddingBottom: 4 }}>
        {KINDS.map((k) => (
          <Chip key={k} on={kind === k} onPress={() => setKind(k)}>
            {k === 'All' ? 'All' : k === 'Volunteer' ? 'Volunteers' : k === 'Student mentor' ? 'Student mentors' : 'Staff'}
          </Chip>
        ))}
      </ScrollView>
      <Sec style={{ paddingTop: 12 }}>
        <Stack>
          {list.map((p) => {
            const js = jobs(p.id);
            return (
              <Card key={p.id}>
                <Row>
                  <View style={{ flex: 1 }}>
                    <H3>{p.name}</H3>
                    <Meta>
                      {p.town} · {p.phone}
                    </Meta>
                  </View>
                  <Tag kind={p.kind === 'Staff' ? 'blue' : p.kind === 'Volunteer' ? 'open' : 'mute'}>{p.kind}</Tag>
                </Row>
                <View style={{ marginTop: 10, gap: 4 }}>
                  {js.length ? (
                    js.map(({ camp, role }) => (
                      <Pressable
                        key={camp.id}
                        accessibilityRole="link"
                        onPress={() => set((st) => ({ ...st, eventId: camp.id, tab: 'event' }))}
                        hitSlop={{ top: 6, bottom: 6 }}
                      >
                        <Text style={{ fontFamily: f.regular, fontSize: 13, lineHeight: 19, color: c.ink }}>
                          <Text style={{ fontFamily: f.bold, color: c.maroon }}>{camp.name}</Text> · {role} · {camp.dates}
                        </Text>
                      </Pressable>
                    ))
                  ) : (
                    <Meta>Not assigned to any event</Meta>
                  )}
                </View>
              </Card>
            );
          })}
        </Stack>
      </Sec>
    </>
  );
}
