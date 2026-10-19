import { Text, View } from 'react-native';
import { approvedHours, useApp, type Camp, type Reg } from '@/lib/state';
import { Band, Bar, Btn, Card, Eyebrow, H2, H3, Lead, Link, Meta, Row, Sec, Stack, Tag, Body } from '@/ui/kit';
import { c, f, gutter, radius, shadow } from '@/ui/theme';
import { campTag } from './camps';
import { person, shortBy } from '@/lib/events';
import { approvalsCount, can, dropPending, isPending, requestDrop } from '@/lib/roles';
import { PendingBanner } from './roles';
import { today } from '@/lib/dates';

function Hello({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <View style={{ paddingHorizontal: gutter, paddingTop: 14, paddingBottom: 16 }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <H2>{title}</H2>
      <Lead>{lead}</Lead>
    </View>
  );
}

export function RegRow({ r, camp }: { r: Reg; camp: Camp }) {
  return (
    <Card>
      <Row>
        <View style={{ flex: 1 }}>
          <H3>
            {r.kid} · {camp.name}
          </H3>
          <Meta>
            {camp.loc} · {camp.dates}
            {'\n'}
            {camp.time} · {camp.venue}
          </Meta>
        </View>
        <Tag kind={r.status === 'Waitlisted' ? 'few' : 'open'}>{r.status}</Tag>
      </Row>
    </Card>
  );
}

export function Home() {
  const { s } = useApp();
  return s.role === 'parent' ? <ParentHome /> : s.role === 'mentor' || s.role === 'volunteer' ? <HelperHome /> : <StaffHome />;
}

function ParentHome() {
  const { s, set, go, toast } = useApp();
  const last = s.sent[s.sent.length - 1];
  return (
    <>
      <Hello eyebrow="Welcome back" title="Hi, Garza family" lead="Two kids, two camps this summer." />
      <Band
        items={[
          ['300+', "Kids, Summer '26"],
          ['4', 'Communities'],
          ['17', 'STEM classes'],
        ]}
      />
      <Sec title="Your kids" right={<Link onPress={() => go('camps')}>+ Register</Link>}>
        <Stack>
          {s.regs.map((r, i) => (
            <RegRow key={i} r={r} camp={s.camps.find((x) => x.id === r.camp)!} />
          ))}
        </Stack>
      </Sec>
      <Sec title="Before camp">
        <Stack>
          <Card>
            <Row>
              <View style={{ flex: 1 }}>
                <H3>Photo & media waiver</H3>
                <Meta>Needed for Mateo G.</Meta>
              </View>
              {s.waiverSigned ? (
                <Tag kind="open">Signed</Tag>
              ) : (
                <Btn sm onPress={() => (set((p) => ({ ...p, waiverSigned: true })), toast('Waiver signed for Mateo G.'))}>
                  Sign
                </Btn>
              )}
            </Row>
          </Card>
          <Card>
            <Row>
              <View style={{ flex: 1 }}>
                <H3>Text alerts</H3>
                <Meta>Reminders, schedule changes, safety notices</Meta>
              </View>
              <Tag kind="open">On</Tag>
            </Row>
          </Card>
        </Stack>
      </Sec>
      <Sec title="Latest update" right={<Link onPress={() => go('msgs')}>All</Link>}>
        <Card>
          <Meta>
            {last.when} · {last.to}
          </Meta>
          <Body style={{ marginTop: 6 }}>{last.text}</Body>
        </Card>
      </Sec>
      <Sec>
        <View
          style={{
            backgroundColor: c.maroon,
            borderRadius: radius.card,
            boxShadow: shadow.card,
            paddingVertical: 16,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Text style={{ flex: 1, fontFamily: f.bold, fontSize: 14, lineHeight: 20, color: c.white }}>
            $50 puts a robotics kit in a student&apos;s hands.
          </Text>
          <Btn sm kind="white" onPress={() => go('about')}>
            Donate
          </Btn>
        </View>
      </Sec>
    </>
  );
}

function StaffHome() {
  const { s: all, set, go } = useApp();
  // Home keeps the prototype's summer-camp numbers; staff-only events live in Camps.
  const s = { ...all, camps: all.camps.filter((x) => !x.staffOnly) };
  const now = today();
  const openShifts = all.camps.filter((x) => x.end && x.end >= now && shortBy(x, all.assign[x.id] ?? []) > 0);
  const seats = s.camps.reduce((a, x) => a + x.filled, 0);
  const cap = s.camps.reduce((a, x) => a + x.cap, 0);
  const wait = s.camps.reduce((a, x) => a + x.wait, 0);
  const pend = approvalsCount(all);
  const first = person(all.me).name.split(' ')[0];
  const filling = s.camps
    .slice()
    .sort((a, b) => b.filled / b.cap - a.filled / a.cap)
    .slice(0, 4);
  return (
    <>
      <Hello eyebrow={all.role === 'admin' ? 'Administrator dashboard' : 'Staff dashboard'} title={`Hi, ${first}`} lead="Summer 2027 sign-ups, events and staffing." />
      <Band
        items={[
          [
            <Text key="n">
              {seats}
              <Text style={{ fontSize: 13, color: c.muted }}>/{cap}</Text>
            </Text>,
            'Seats filled',
          ],
          [String(wait), 'Waitlisted'],
          [String(openShifts.length), 'Open shifts'],
        ]}
      />
      <Sec title="Needs attention">
        <Stack>
          {all.role === 'admin' && pend > 0 && (
            <Card>
              <Row>
                <View style={{ flex: 1 }}>
                  <H3>{pend} items to approve</H3>
                  <Meta>Hours, dropped shifts and new volunteers</Meta>
                </View>
                <Btn sm onPress={() => go('approvals')}>
                  Review
                </Btn>
              </Row>
            </Card>
          )}
          <Card>
            <Row>
              <View style={{ flex: 1 }}>
                <H3>Coastal Bend VEX Qualifier</H3>
                <Meta>
                  {all.camps.find((x) => x.id === 16)!.dates} · {all.camps.find((x) => x.id === 16)!.loc}
                </Meta>
              </View>
              <Btn sm kind="out" onPress={() => set((p) => ({ ...p, eventId: 16, eventFrom: 'home', tab: 'event' }))}>
                View
              </Btn>
            </Row>
          </Card>
          <Card>
            <Row>
              <View style={{ flex: 1 }}>
                <H3>{openShifts.length} upcoming events need staff</H3>
                <Meta>{openShifts.slice(0, 2).map((x) => x.name).join(', ')}</Meta>
              </View>
              <Btn sm kind="out" onPress={() => go('sched')}>
                Schedule
              </Btn>
            </Row>
          </Card>
        </Stack>
      </Sec>
      <Sec title="Filling up" right={<Link onPress={() => go('camps')}>All camps</Link>}>
        <Card>
          <Stack>
            {filling.map((x) => (
              <View key={x.id}>
                <Row style={{ marginBottom: 6 }}>
                  <View style={{ flex: 1 }}>
                    <H3 style={{ fontSize: 14 }}>{x.name}</H3>
                    <Meta>{x.loc}</Meta>
                  </View>
                  {campTag(x)}
                </Row>
                <Bar pct={(x.filled / x.cap) * 100} />
              </View>
            ))}
          </Stack>
        </Card>
      </Sec>
    </>
  );
}

// Student mentors and volunteers: hours, their shifts, and open shifts to take.
function HelperHome() {
  const { s, set, go, toast } = useApp();
  const now = today();
  const pending = isPending(s);
  const mine = s.camps
    .filter((x) => x.end && x.end >= now && (s.assign[x.id] ?? []).some((a) => a.person === s.me))
    .sort((a, b) => (a.start! < b.start! ? -1 : 1));
  const open = s.camps.filter((x) => x.end && x.end >= now && shortBy(x, s.assign[x.id] ?? []) > 0);
  const first = person(s.me).name.split(' ')[0];
  const openEvent = (id: number) => set((p) => ({ ...p, eventId: id, eventFrom: 'home', tab: 'event' }));
  return (
    <>
      <Hello eyebrow="Welcome back" title={`Hi, ${first}`} lead={pending ? 'Thanks for signing up to help.' : 'Your shifts and service hours.'} />
      {pending && (
        <Sec style={{ paddingTop: 0, paddingBottom: 16 }}>
          <PendingBanner />
        </Sec>
      )}
      <Band
        items={[
          [String(approvedHours(s, s.me)), 'Approved hours'],
          [String(mine.length), 'Upcoming shifts'],
          [String(s.hours.filter((r) => r.person === s.me && r.status === 'Pending').length), 'Hours pending'],
        ]}
      />
      <Sec title="Your shifts" right={<Link onPress={() => go('sched')}>Schedule</Link>}>
        <Stack>
          {mine.length === 0 && <Body>{pending ? 'You can take shifts once you’re approved.' : 'No upcoming shifts. Take an open one below.'}</Body>}
          {mine.map((x) => {
            const a = s.assign[x.id]!.find((y) => y.person === s.me)!;
            const asked = dropPending(s, x.id);
            return (
              <Card key={x.id}>
                <Row>
                  <View style={{ flex: 1 }}>
                    <H3>{x.name}</H3>
                    <Meta>
                      {x.dates} · {a.hours} · {x.loc}
                    </Meta>
                  </View>
                  <Tag kind={asked ? 'few' : 'open'}>{asked ? 'Drop requested' : a.role}</Tag>
                </Row>
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                  <Btn sm kind="out" onPress={() => openEvent(x.id)}>
                    Details
                  </Btn>
                  {can(s, 'requestDrop') && !asked && (
                    <Btn sm kind="out" onPress={() => (set((p) => requestDrop(p, x.id)), toast('Drop request sent to an administrator'))}>
                      Request to drop
                    </Btn>
                  )}
                </View>
              </Card>
            );
          })}
        </Stack>
      </Sec>
      {can(s, 'takeShift') && (
        <Sec title="Open shifts">
          <Card>
            <Row>
              <View style={{ flex: 1 }}>
                <H3>{open.length} upcoming events need help</H3>
                <Meta>{open.slice(0, 2).map((x) => x.name).join(', ')}</Meta>
              </View>
              <Btn sm onPress={() => go('sched')}>
                Take a shift
              </Btn>
            </Row>
          </Card>
        </Sec>
      )}
      <Sec title="Hours">
        <Card>
          <Row>
            <View style={{ flex: 1 }}>
              <H3>Log your hours</H3>
              <Meta>An administrator approves each request.</Meta>
            </View>
            <Btn sm kind="out" onPress={() => go('hours')}>
              Log hours
            </Btn>
          </Row>
        </Card>
      </Sec>
    </>
  );
}
