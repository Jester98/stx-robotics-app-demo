import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useApp } from '@/lib/state';
import { BackLink, Band, Bar, Body, Btn, Card, Choice, Empty, Eyebrow, Field, H2, H3, Icon, Lead, Meta, Pad, Row, Score, Sec, Stack, Tag } from '@/ui/kit';
import { c, f } from '@/ui/theme';

export function Mentors() {
  const { s, set, go, toast } = useApp();
  const pend = s.mentors.filter((m) => m.pending);
  const max = Math.max(...s.mentors.map((m) => m.hours));
  const resolve = (name: string, approve: boolean) => {
    const m = s.mentors.find((x) => x.name === name)!;
    const h = m.pending!.h;
    set((p) => ({ ...p, mentors: p.mentors.map((x) => (x.name !== name ? x : { ...x, hours: approve ? x.hours + h : x.hours, pending: null })) }));
    toast(approve ? `Approved ${h} h for ${name}` : `Sent back to ${name} for edits`);
  };
  return (
    <>
      <Pad style={{ paddingBottom: 0 }}>
        <BackLink onPress={() => go('more')} />
        <Eyebrow style={{ marginTop: 10 }}>Student mentors</Eyebrow>
        <H2>Mentor hours</H2>
        <Lead>Approved hours count toward service-hour letters.</Lead>
      </Pad>
      <Sec title="To approve" right={<Meta style={{ fontSize: 12 }}>{pend.length}</Meta>}>
        <Stack>
          {pend.length ? (
            pend.map((m) => (
              <Card key={m.name}>
                <Row>
                  <View style={{ flex: 1 }}>
                    <H3>{m.name}</H3>
                    <Meta>
                      {m.pending!.date} · {m.pending!.task}
                    </Meta>
                  </View>
                  <Score>{m.pending!.h} h</Score>
                </Row>
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Btn sm block onPress={() => resolve(m.name, true)}>
                      Approve
                    </Btn>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Btn sm block kind="out" onPress={() => resolve(m.name, false)}>
                      Return
                    </Btn>
                  </View>
                </View>
              </Card>
            ))
          ) : (
            <Empty>All caught up. New logs show up here.</Empty>
          )}
        </Stack>
      </Sec>
      <Sec title="Season totals" right={<Meta style={{ fontSize: 12 }}>{s.mentors.reduce((a, m) => a + m.hours, 0)} h</Meta>}>
        <Card>
          <Stack>
            {s.mentors
              .slice()
              .sort((a, b) => b.hours - a.hours)
              .map((m) => (
                <View key={m.name}>
                  <Row style={{ marginBottom: 5 }}>
                    <Text style={{ flex: 1, fontFamily: f.bold, fontSize: 14, color: c.ink }}>
                      {m.name} <Text style={{ fontFamily: f.regular, fontSize: 13, color: c.muted }}>· {m.school}</Text>
                    </Text>
                    <Score>{m.hours} h</Score>
                  </Row>
                  <Bar pct={(m.hours / max) * 100} black />
                </View>
              ))}
          </Stack>
        </Card>
      </Sec>
    </>
  );
}

const GROUPS: Record<string, number> = {
  'All families': 212,
  'Robstown · Intro to Robotics': 16,
  'Del Rio · Drone Flight Lab': 11,
  'Portland · VEX V5 Bootcamp': 9,
  'Alice · 3D Design & Print': 14,
  'Competition team parents': 18,
};
const TYPES = ['Reminder', 'Schedule change', 'Safety notice', 'Announcement'];

export function Messages() {
  const { s } = useApp();
  return s.role === 'parent' ? <ParentUpdates /> : <FamilyTexts />;
}

function SentList() {
  const { s } = useApp();
  return (
    <Stack>
      {s.sent
        .slice()
        .reverse()
        .map((m, i) => (
          <Card key={i}>
            <Meta>
              {m.when} · {m.to}
            </Meta>
            <Body style={{ marginTop: 6, fontSize: 14, lineHeight: 20 }}>{m.text}</Body>
          </Card>
        ))}
    </Stack>
  );
}

function ParentUpdates() {
  return (
    <>
      <Pad style={{ paddingBottom: 0 }}>
        <Eyebrow>From STX Robotics</Eyebrow>
        <H2>Updates</H2>
        <Lead>Texts also go to the phone you registered with.</Lead>
      </Pad>
      <Sec>
        <SentList />
      </Sec>
    </>
  );
}

function FamilyTexts() {
  const { set, go, toast } = useApp();
  const [to, setTo] = useState(Object.keys(GROUPS)[0]);
  const [type, setType] = useState(TYPES[0]);
  const [text, setText] = useState("Heads up: Thursday's session moves to 1:00 because of the library's book sale. Same room, same pickup.");
  const send = () => {
    set((p) => ({ ...p, sent: [...p.sent, { to, text, when: 'Just now' }] }));
    toast('Demo only: no texts were sent');
  };
  return (
    <>
      <Pad style={{ paddingBottom: 0 }}>
        <BackLink onPress={() => go('more')} />
        <Eyebrow style={{ marginTop: 10 }}>Family texts</Eyebrow>
        <H2>Send an update</H2>
        <Lead>Only families who opted in to texts receive these.</Lead>
      </Pad>
      <Sec>
        <Stack gap={11}>
          <Choice label="Send to" options={Object.keys(GROUPS)} value={to} onChange={setTo} />
          <Choice label="Type" options={TYPES} value={type} onChange={setType} />
          <Field label="Message" value={text} onChangeText={setText} multiline maxLength={300} />
          <Card>
            <Row style={{ marginBottom: 8 }}>
              <Meta style={{ flex: 1 }}>Phone preview</Meta>
              <Tag kind="blue">{GROUPS[to]} families</Tag>
            </Row>
            <View style={{ backgroundColor: c.bubble, borderRadius: 18, borderBottomLeftRadius: 4, paddingVertical: 10, paddingHorizontal: 13, maxWidth: '92%', alignSelf: 'flex-start' }}>
              <Text style={{ fontFamily: f.regular, fontSize: 14, lineHeight: 20, color: '#111' }}>
                STX Robotics {type}: {text}
                {'\n'}Reply STOP to opt out.
              </Text>
            </View>
          </Card>
          <Btn block onPress={send}>
            Send update
          </Btn>
        </Stack>
      </Sec>
      <Sec title="Sent">
        <SentList />
      </Sec>
    </>
  );
}

export function More() {
  const { s, go } = useApp();
  const pend = s.mentors.filter((m) => m.pending).length;
  const items: [Parameters<typeof go>[0], 'clock' | 'msg' | 'heart' | 'doc' | 'people', string, string][] =
    s.role === 'staff'
      ? [
          ['staffList', 'people', 'Staff list', 'Staff, volunteers and mentors by event'],
          ['mentors', 'clock', 'Mentor hours', pend ? `${pend} to approve` : 'Up to date'],
          ['msgs', 'msg', 'Family texts', 'Send reminders and changes'],
          ['about', 'heart', 'Sponsors & donations', 'Sponsor tiers start at $50'],
          ['about', 'doc', 'Waivers & forms', 'Track what families still owe'],
        ]
      : [
          ['about', 'heart', 'Donate or sponsor', 'Tax-deductible, 501(c)(3)'],
          ['about', 'doc', 'Waivers & forms', s.waiverSigned ? 'All signed' : '1 waiting to sign'],
          ['about', 'msg', 'Contact STX', '(361) 945-7669 · Corpus Christi'],
        ];
  return (
    <>
      <Pad>
        <Eyebrow>{s.role === 'staff' ? 'Staff tools' : 'Your account'}</Eyebrow>
        <H2>More</H2>
      </Pad>
      <Sec style={{ paddingTop: 0 }}>
        <Stack>
          {items.map(([tab, icon, title, meta]) => (
            <MoreItem key={title} icon={icon} title={title} meta={meta} onPress={() => go(tab)} />
          ))}
        </Stack>
      </Sec>
      <Sec>
        <BandPair />
      </Sec>
    </>
  );
}


function MoreItem({ icon, title, meta, onPress }: { icon: 'clock' | 'msg' | 'heart' | 'doc' | 'people'; title: string; meta: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 14,
        backgroundColor: pressed ? c.bg : c.white,
        borderWidth: 1,
        borderColor: c.line,
      })}
    >
      <Icon name={icon} color={c.maroon} size={22} />
      <View style={{ flex: 1 }}>
        <H3 style={{ fontSize: 15 }}>{title}</H3>
        <Meta>{meta}</Meta>
      </View>
      <Text style={{ fontFamily: f.regular, fontSize: 18, color: c.muted }}>›</Text>
    </Pressable>
  );
}

const BandPair = () => (
  <Band
    items={[
      ['1,037', "3D-printer hours, Summer '26"],
      ['300+', 'Mentor hours awarded'],
    ]}
  />
);

export function About() {
  const { go } = useApp();
  return (
    <Pad>
      <BackLink onPress={() => go('more')} />
      <Eyebrow style={{ marginTop: 10 }}>Coming in the full app</Eyebrow>
      <H2>Not built in this demo</H2>
      <Lead>
        In the real app, this screen would handle donations, sponsor tiers, waivers and contact forms. It would tie into the existing donate page and
        contact form on stxrobotics.com.
      </Lead>
    </Pad>
  );
}
