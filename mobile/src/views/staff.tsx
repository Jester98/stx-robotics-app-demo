import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useApp } from '@/lib/state';
import { ROLE_INFO, can } from '@/lib/roles';
import { person } from '@/lib/events';
import { BackLink, Band, Body, Btn, Card, Choice, Eyebrow, Field, H2, H3, Icon, Lead, Meta, Pad, Row, Sec, Stack, Tag, type IconName } from '@/ui/kit';
import { c, f, radius, shadow } from '@/ui/theme';

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
  const { s, set, go } = useApp();
  type Item = [Parameters<typeof go>[0], IconName, string, string];
  const parent: Item[] = [
    ['about', 'heart', 'Donate or sponsor', 'Tax-deductible, 501(c)(3)'],
    ['about', 'doc', 'Waivers & forms', s.waiverSigned ? 'All signed' : '1 waiting to sign'],
    ['about', 'msg', 'Contact STX', '(361) 945-7669 · Corpus Christi'],
  ];
  const helper: Item[] = [
    ['about', 'msg', 'Contact STX', '(361) 945-7669 · Corpus Christi'],
  ];
  const team: Item[] = [
    ['staffList', 'people', 'Staff list', 'Staff, volunteers and mentors by event'],
    ...(can(s, 'textFamilies') ? ([['msgs', 'msg', 'Family texts', 'Send reminders and changes']] as Item[]) : []),
    ['about', 'heart', 'Sponsors & donations', 'Sponsor tiers start at $50'],
    ['about', 'doc', 'Waivers & forms', 'Track what families still owe'],
  ];
  const admin: Item[] = [['people', 'people', 'People', 'Change anyone’s role, approve volunteers']];
  const items: Item[] =
    s.role === 'parent' ? parent : s.role === 'mentor' || s.role === 'volunteer' ? helper : s.role === 'admin' ? [...admin, ...team] : team;
  const me = s.role === 'parent' ? 'Garza family' : person(s.me).name;
  const switchRole = () => set((p) => ({ ...p, role: null, tab: 'home' }));
  return (
    <>
      <Pad>
        <Eyebrow>{`${ROLE_INFO[s.role!].label} · ${me}`}</Eyebrow>
        <H2>More</H2>
      </Pad>
      <Sec style={{ paddingTop: 0 }}>
        <Stack>
          {items.map(([tab, icon, title, meta]) => (
            <MoreItem key={title} icon={icon} title={title} meta={meta} onPress={() => go(tab)} />
          ))}
          <MoreItem icon="switch" title="Switch role" meta="Go back to “Who are you?”" onPress={switchRole} />
        </Stack>
      </Sec>
      <Sec>
        <BandPair />
      </Sec>
    </>
  );
}


function MoreItem({ icon, title, meta, onPress }: { icon: IconName; title: string; meta: string; onPress: () => void }) {
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
        borderRadius: radius.card,
        boxShadow: shadow.card,
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
    inset={false}
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
