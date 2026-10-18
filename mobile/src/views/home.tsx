import { Text, View } from 'react-native';
import { useApp, type Camp, type Reg } from '@/lib/state';
import { Band, Bar, Btn, Card, Eyebrow, H2, H3, Lead, Link, Meta, Row, Sec, Stack, Tag, Body } from '@/ui/kit';
import { c, f, gutter } from '@/ui/theme';
import { campTag } from './camps';

function Hello({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <View style={{ backgroundColor: c.white, padding: gutter, borderBottomWidth: 1, borderColor: c.line }}>
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
  return s.role === 'parent' ? <ParentHome /> : <StaffHome />;
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
        <View style={{ backgroundColor: c.maroon, paddingVertical: 16, paddingHorizontal: gutter, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
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
  const { s, go } = useApp();
  const seats = s.camps.reduce((a, x) => a + x.filled, 0);
  const cap = s.camps.reduce((a, x) => a + x.cap, 0);
  const wait = s.camps.reduce((a, x) => a + x.wait, 0);
  const pend = s.mentors.filter((m) => m.pending);
  const filling = s.camps
    .slice()
    .sort((a, b) => b.filled / b.cap - a.filled / a.cap)
    .slice(0, 4);
  return (
    <>
      <Hello eyebrow="Staff dashboard" title="Good evening, Coach" lead="Summer 2027 sign-ups, teams and the print shop." />
      <Band
        items={[
          [
            <Text key="n">
              {seats}
              <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>/{cap}</Text>
            </Text>,
            'Seats filled',
          ],
          [String(wait), 'Waitlisted'],
          [String(s.jobs.filter((j) => j.lane !== 'Done').length), 'Open prints'],
        ]}
      />
      <Sec title="Needs attention">
        <Stack>
          {pend.length > 0 && (
            <Card>
              <Row>
                <View style={{ flex: 1 }}>
                  <H3>{pend.length} mentor logs to approve</H3>
                  <Meta>{pend.map((m) => m.name).join(', ')}</Meta>
                </View>
                <Btn sm onPress={() => go('mentors')}>
                  Review
                </Btn>
              </Row>
            </Card>
          )}
          <Card>
            <Row>
              <View style={{ flex: 1 }}>
                <H3>Coastal Bend VEX Qualifier</H3>
                <Meta>Nov 14 · registration due Oct 31</Meta>
              </View>
              <Btn sm kind="out" onPress={() => go('teams')}>
                View
              </Btn>
            </Row>
          </Card>
          <Card>
            <Row>
              <View style={{ flex: 1 }}>
                <H3>Pickup ready: drone frames</H3>
                <Meta>Del Rio camp · P-115</Meta>
              </View>
              <Btn sm kind="out" onPress={() => go('prints')}>
                Queue
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
