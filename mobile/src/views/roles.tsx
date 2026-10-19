import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { approvedHours, useApp, type HoursReq, type State, type Status } from '@/lib/state';
import { ROLE_INFO, ROLES_ORDER, canSeeKids, isPending, type AppRole } from '@/lib/roles';
import { INFO, KINDS, PEOPLE, kindOf, person, roster, runsOn, type Kind } from '@/lib/events';
import { addDays, monthDay, today } from '@/lib/dates';
import { BackLink, Band, Btn, Card, Chip, Choice, Empty, Eyebrow, Field, H2, H3, Lead, Meta, Pad, Row, Sec, Stack, Tag } from '@/ui/kit';
import { c, f, gutter, shadow } from '@/ui/theme';

// Start screen, Hours (mentors and volunteers), Approvals and People (admin), Check-in (staff).

export function Start() {
  const { set } = useApp();
  const pick = (role: AppRole) => set((p) => ({ ...p, role, me: ROLE_INFO[role].me, tab: 'home' }));
  return (
    <>
      <Pad style={{ paddingBottom: 6 }}>
        <Eyebrow>Welcome to STX Robotics</Eyebrow>
        <H2>Who are you?</H2>
        <Lead>Pick a role to see the app the way they would.</Lead>
      </Pad>
      <Sec style={{ paddingTop: 12 }}>
        <Stack>
          {ROLES_ORDER.map((r) => (
            <Pressable
              key={r}
              accessibilityRole="button"
              accessibilityLabel={`${ROLE_INFO[r].label}. ${ROLE_INFO[r].desc}`}
              onPress={() => pick(r)}
              style={({ pressed }) => ({ backgroundColor: c.white, borderRadius: 16, boxShadow: shadow.card, padding: 16, opacity: pressed ? 0.7 : 1 })}
            >
              <Row>
                <View style={{ flex: 1 }}>
                  <H3>{ROLE_INFO[r].label}</H3>
                  <Meta>{ROLE_INFO[r].desc}</Meta>
                </View>
                <Text style={{ fontFamily: f.bold, fontSize: 22, color: c.maroon }}>›</Text>
              </Row>
            </Pressable>
          ))}
        </Stack>
        <Meta style={{ marginTop: 16, textAlign: 'center' }}>Demo only. In the real app, the administrator assigns roles.</Meta>
      </Sec>
    </>
  );
}

const STATUS_TAG: Record<Status, 'few' | 'open' | 'full'> = { Pending: 'few', Approved: 'open', Returned: 'full' };

export function PendingBanner() {
  return (
    <View style={{ backgroundColor: c.warnSoft, borderWidth: 1, borderColor: c.warn, borderRadius: 12, padding: 14 }} accessibilityRole="alert">
      <Text style={{ fontFamily: f.bold, fontSize: 14, color: c.warn }}>Pending approval — background check in progress</Text>
      <Text style={{ fontFamily: f.regular, fontSize: 13, lineHeight: 19, color: c.warn, marginTop: 2 }}>
        You can look at the schedule and log training hours. Shifts and kid details open up once an administrator approves you.
      </Text>
    </View>
  );
}

export function Hours() {
  const { s, set, toast } = useApp();
  const mine = s.hours.filter((r) => r.person === s.me).sort((a, b) => (a.date < b.date ? 1 : -1));
  const myEvents = s.camps.filter((x) => (s.assign[x.id] ?? []).some((a) => a.person === s.me));
  const OTHER = 'Other / training';
  const [event, setEvent] = useState(myEvents[0]?.name ?? OTHER);
  const [date, setDate] = useState(today());
  const [h, setH] = useState('');
  const [task, setTask] = useState('');
  const submit = () => {
    const n = Number(h);
    if (!(n > 0 && n <= 12)) return toast('Enter hours between 0.5 and 12');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return toast('Enter the date as YYYY-MM-DD');
    if (!task.trim()) return toast('Say what you did');
    const req: HoursReq = { id: s.hours.length + 1, person: s.me, event: myEvents.find((x) => x.name === event)?.id, date, h: n, task: task.trim(), status: 'Pending' };
    set((p) => ({ ...p, hours: [...p.hours, req] }));
    setH('');
    setTask('');
    toast('Hours sent for approval (demo only)');
  };
  return (
    <>
      <Pad style={{ paddingBottom: 12 }}>
        <Eyebrow>{ROLE_INFO[s.role!].label} · Hours</Eyebrow>
        <H2>Your hours</H2>
        <Lead>An administrator approves each request.</Lead>
      </Pad>
      <Band
        items={[
          [String(approvedHours(s, s.me)), 'Approved hours'],
          [String(mine.filter((r) => r.status === 'Pending').length), 'Pending'],
          [String(mine.filter((r) => r.status === 'Returned').length), 'Returned'],
        ]}
      />
      <Sec title="Log hours">
        <Card>
          <Stack gap={12}>
            <Choice label="Event" options={[...myEvents.map((x) => x.name), OTHER]} value={event} onChange={setEvent} />
            <Row style={{ gap: 10 }}>
              <Field label="Date" value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" style={{ flex: 1 }} />
              <Field label="Hours" value={h} onChangeText={setH} keyboardType="decimal-pad" placeholder="2" style={{ width: 90 }} />
            </Row>
            <Field label="What you did" value={task} onChangeText={setTask} multiline maxLength={200} placeholder="Helped kids wire their first circuit" />
            <Btn block onPress={submit}>
              Send for approval
            </Btn>
          </Stack>
        </Card>
      </Sec>
      <Sec title="Your requests">
        <Stack>
          {mine.length === 0 && <Empty>No requests yet.</Empty>}
          {mine.map((r) => (
            <Card key={r.id}>
              <Row>
                <View style={{ flex: 1 }}>
                  <H3>
                    {r.h} {r.h === 1 ? 'hour' : 'hours'} · {monthDay(r.date)}
                  </H3>
                  <Meta>
                    {r.event ? `${s.camps.find((x) => x.id === r.event)?.name} · ` : ''}
                    {r.task}
                  </Meta>
                </View>
                <Tag kind={STATUS_TAG[r.status]}>{r.status}</Tag>
              </Row>
            </Card>
          ))}
        </Stack>
      </Sec>
    </>
  );
}

function Decide({ onApprove, onReturn }: { onApprove: () => void; onReturn: () => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
      <Btn sm onPress={onApprove}>
        Approve
      </Btn>
      <Btn sm kind="out" onPress={onReturn}>
        Return
      </Btn>
    </View>
  );
}

export function Approvals() {
  const { s, set, toast } = useApp();
  const hours = s.hours.filter((r) => r.status === 'Pending');
  const drops = s.drops.filter((d) => d.status === 'Pending');
  const event = (id?: number) => s.camps.find((x) => x.id === id);
  const decideHours = (id: number, status: Status) => {
    set((p) => ({ ...p, hours: p.hours.map((r) => (r.id === id ? { ...r, status } : r)) }));
    toast(status === 'Approved' ? 'Hours approved' : 'Hours returned');
  };
  const decideDrop = (id: number, status: Status) => {
    set((p) => {
      const d = p.drops.find((x) => x.id === id)!;
      const assign = status === 'Approved' ? { ...p.assign, [d.event]: (p.assign[d.event] ?? []).filter((a) => a.person !== d.person) } : p.assign;
      return { ...p, assign, drops: p.drops.map((x) => (x.id === id ? { ...x, status } : x)) };
    });
    toast(status === 'Approved' ? 'Drop approved; shift is open again' : 'Drop request returned');
  };
  return (
    <>
      <Pad style={{ paddingBottom: 4 }}>
        <Eyebrow>Administrator</Eyebrow>
        <H2>Approvals</H2>
        <Lead>Hours, dropped shifts and new volunteers waiting on you.</Lead>
      </Pad>
      <Sec title={`Hours requests · ${hours.length}`}>
        <Stack>
          {hours.length === 0 && <Empty>Nothing to approve.</Empty>}
          {hours.map((r) => (
            <Card key={r.id}>
              <Row>
                <View style={{ flex: 1 }}>
                  <H3>
                    {person(r.person).name} · {r.h} {r.h === 1 ? 'hour' : 'hours'}
                  </H3>
                  <Meta>
                    {monthDay(r.date)}
                    {event(r.event) ? ` · ${event(r.event)!.name}` : ''}
                    {'\n'}
                    {r.task}
                  </Meta>
                </View>
                <Tag kind="mute">{kindOf(r.person, s.kinds)}</Tag>
              </Row>
              <Decide onApprove={() => decideHours(r.id, 'Approved')} onReturn={() => decideHours(r.id, 'Returned')} />
            </Card>
          ))}
        </Stack>
      </Sec>
      <Sec title={`Drop requests · ${drops.length}`}>
        <Stack>
          {drops.length === 0 && <Empty>No one wants to drop a shift.</Empty>}
          {drops.map((d) => {
            const x = event(d.event)!;
            return (
              <Card key={d.id}>
                <H3>{person(d.person).name} wants to drop a shift</H3>
                <Meta>
                  {x.name} · {x.dates} · {x.time}
                </Meta>
                <Decide onApprove={() => decideDrop(d.id, 'Approved')} onReturn={() => decideDrop(d.id, 'Returned')} />
              </Card>
            );
          })}
        </Stack>
      </Sec>
      <Sec title={`New volunteers · ${s.pending.length}`}>
        <Stack>
          {s.pending.length === 0 && <Empty>No one waiting on approval.</Empty>}
          {s.pending.map((id) => (
            <VolunteerCard key={id} id={id} />
          ))}
        </Stack>
      </Sec>
    </>
  );
}

const approveVolunteer = (p: State, id: string): State => ({ ...p, pending: p.pending.filter((x) => x !== id) });

function VolunteerCard({ id }: { id: string }) {
  const { set, toast } = useApp();
  const p = person(id);
  return (
    <Card>
      <Row>
        <View style={{ flex: 1 }}>
          <H3>{p.name}</H3>
          <Meta>
            {p.town} · {p.phone}
            {'\n'}Background check in progress
          </Meta>
        </View>
        <Tag kind="few">Pending</Tag>
      </Row>
      <Decide
        onApprove={() => (set((st) => approveVolunteer(st, id)), toast(`${p.name} approved`))}
        onReturn={() => toast(`Demo: would ask ${p.name} for missing paperwork`)}
      />
    </Card>
  );
}

const KIND_TAG: Record<Kind, 'blue' | 'open' | 'mute' | 'dark'> = { Staff: 'blue', Volunteer: 'open', 'Student mentor': 'mute', Administrator: 'dark' };
export const KindTag = ({ kind }: { kind: Kind }) => <Tag kind={KIND_TAG[kind]}>{kind}</Tag>;

export function People() {
  const { s, set, go, toast } = useApp();
  const [open, setOpen] = useState<string>();
  const change = (id: string, kind: Kind) => {
    set((p) => ({ ...p, kinds: { ...p.kinds, [id]: kind } }));
    toast(`${person(id).name} is now ${kind === 'Administrator' ? 'an' : 'a'} ${kind}`);
  };
  return (
    <>
      <Pad style={{ paddingBottom: 4 }}>
        <BackLink onPress={() => go('more')} />
        <Eyebrow style={{ marginTop: 10 }}>Administrator</Eyebrow>
        <H2>People</H2>
        <Lead>Tap someone to change their role.</Lead>
      </Pad>
      <Sec style={{ paddingTop: 12 }}>
        <Stack>
          {PEOPLE.filter((p) => p.id !== s.me).map((p) => {
            const kind = kindOf(p.id, s.kinds);
            const pend = isPending(s, p.id);
            return (
              <Card key={p.id}>
                <Pressable accessibilityRole="button" accessibilityState={{ expanded: open === p.id }} onPress={() => setOpen(open === p.id ? undefined : p.id)}>
                  <Row>
                    <View style={{ flex: 1 }}>
                      <H3>{p.name}</H3>
                      <Meta>
                        {p.town}
                        {pend ? ' · Pending approval' : ''}
                      </Meta>
                    </View>
                    <KindTag kind={kind} />
                  </Row>
                </Pressable>
                {open === p.id && (
                  <View style={{ marginTop: 12, gap: 10 }}>
                    <Choice label="Role" options={KINDS} value={kind} onChange={(k) => change(p.id, k)} />
                    {pend && (
                      <Btn sm onPress={() => (set((st) => approveVolunteer(st, p.id)), toast(`${p.name} approved`))}>
                        Approve volunteer
                      </Btn>
                    )}
                  </View>
                )}
              </Card>
            );
          })}
        </Stack>
      </Sec>
    </>
  );
}

const now = () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

export function CheckIn() {
  const { s, set, toast } = useApp();
  const t = today();
  // Today's events, or the next week's if nothing runs today.
  const todays = s.camps.filter((x) => x.start && runsOn(x, t));
  const soon = s.camps.filter((x) => x.start && x.end! >= t && x.start <= addDays(t, 7)).sort((a, b) => (a.start! < b.start! ? -1 : 1));
  const list = todays.length ? todays : soon;
  const [id, setId] = useState(list[0]?.id);
  const x = list.find((y) => y.id === id);
  const kids = x ? roster(x, s.regs, s.waiverSigned).kids : [];
  const marks = (x && s.checkins[x.id]) || {};
  const details = x ? canSeeKids(s, x.id) : false;
  const mark = (kid: string, key: 'in' | 'out') => {
    set((p) => ({ ...p, checkins: { ...p.checkins, [x!.id]: { ...p.checkins[x!.id], [kid]: { ...p.checkins[x!.id]?.[kid], [key]: now() } } } }));
    toast(`${kid} checked ${key}`);
  };
  const here = kids.filter((k) => marks[k.name]?.in && !marks[k.name]?.out).length;
  return (
    <>
      <Pad style={{ paddingBottom: 12 }}>
        <Eyebrow>Staff · Check-in</Eyebrow>
        <H2>Check-in</H2>
        <Lead>{todays.length ? 'Events running today.' : 'Nothing runs today; showing the next 7 days.'}</Lead>
      </Pad>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingHorizontal: gutter, paddingBottom: 4 }}>
        {list.map((y) => (
          <Chip key={y.id} on={y.id === id} onPress={() => setId(y.id)}>
            {`${monthDay(y.start! > t ? y.start! : t)} · ${y.name}`}
          </Chip>
        ))}
      </ScrollView>
      {!x ? (
        <Sec>
          <Empty>No events coming up.</Empty>
        </Sec>
      ) : (
        <>
          <Band
            items={[
              [String(kids.length), 'Registered'],
              [String(here), 'Here now'],
              [String(kids.filter((k) => marks[k.name]?.out).length), 'Picked up'],
            ]}
          />
          <Sec title={x.name} right={<Meta style={{ fontSize: 12 }}>{x.time}</Meta>}>
            <Stack>
              <Meta>
                {INFO[x.id].address}
                {details ? '' : '\nYou’re not on this event, so medical notes and pickup lists are hidden.'}
              </Meta>
              <Card>
                {kids.map((k, i) => {
                  const m = marks[k.name] ?? {};
                  return (
                    <View key={k.name + i} style={{ paddingVertical: 10, paddingTop: i ? 10 : 0, borderTopWidth: i ? 1 : 0, borderColor: c.line, gap: 4 }}>
                      <Row>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontFamily: f.bold, fontSize: 14, color: c.head }}>{k.name}</Text>
                          <Meta>{m.out ? `In ${m.in} · out ${m.out}` : m.in ? `In at ${m.in}` : 'Not here yet'}</Meta>
                        </View>
                        {m.out ? (
                          <Tag kind="mute">Picked up</Tag>
                        ) : m.in ? (
                          <Btn sm kind="out" onPress={() => mark(k.name, 'out')}>
                            Check out
                          </Btn>
                        ) : (
                          <Btn sm onPress={() => mark(k.name, 'in')}>
                            Check in
                          </Btn>
                        )}
                      </Row>
                      {details && k.flag && <Text style={{ fontFamily: f.bold, fontSize: 12, color: c.warn }}>Medical: {k.flag}</Text>}
                      {details && m.in && !m.out && <Meta>Pickup: {k.pickup.join(', ')}</Meta>}
                    </View>
                  );
                })}
              </Card>
            </Stack>
          </Sec>
        </>
      )}
    </>
  );
}
