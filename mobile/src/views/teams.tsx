import { Text, View } from 'react-native';
import { useApp } from '@/lib/state';
import { Bar, Btn, Card, Eyebrow, H2, H3, Meta, Pad, Row, Score, Sec, Stack, Tag } from '@/ui/kit';
import { c, f } from '@/ui/theme';

const TEAMS: [string, string, number, number, number][] = [
  ['STX 2A', 'Ironclads', 7, 112, 78],
  ['STX 2B', 'Gear Hawks', 6, 94, 64],
  ['STX 2C', 'Rookies', 5, 51, 40],
];
const PRACTICE: ['tue' | 'thu' | 'sat', string, string][] = [
  ['tue', 'Tue · Drivetrain tuning', '5:30–7:30 · 2A & 2B'],
  ['thu', 'Thu · Autonomous routines', '5:30–7:30 · All teams'],
  ['sat', 'Sat · Mock qualifier', '10:00–2:00 · Bring notebooks'],
];
const EVENTS: [string, string, 'few' | 'open' | 'mute', string][] = [
  ['Nov 14', 'Coastal Bend VEX Qualifier', 'few', 'Reg. due Oct 31'],
  ['Dec 12', 'Laredo Border Showdown', 'open', 'Registered'],
  ['Jan 23', 'RGV Signature Event', 'mute', 'Planned'],
  ['Mar 6', 'Region 4 Championship', 'mute', 'Qualify first'],
];
const MATCHES: [string, 'w' | 'l', string][] = [
  ['Q4', 'w', '124–98'],
  ['Q11', 'w', '140–131'],
  ['Q19', 'l', '88–102'],
  ['Q26', 'w', '117–64'],
  ['QF2', 'w', '131–120'],
];

export function Teams() {
  const { s, set, toast } = useApp();
  return (
    <>
      <Pad style={{ paddingBottom: 0 }}>
        <Eyebrow>VEX V5 · 2026–27</Eyebrow>
        <H2>Competition teams</H2>
      </Pad>
      <Sec>
        <Stack>
          {TEAMS.map(([num, name, kids, skills, nb]) => (
            <Card key={num}>
              <Row>
                <View style={{ flex: 1 }}>
                  <Eyebrow color={c.maroon}>{num}</Eyebrow>
                  <H3 style={{ marginTop: 3 }}>{name}</H3>
                </View>
                <Tag kind="mute">{kids} students</Tag>
              </Row>
              <Meta style={{ marginTop: 8, marginBottom: 5 }}>
                Best skills {skills} · Notebook {nb}%
              </Meta>
              <Bar pct={nb} black />
            </Card>
          ))}
        </Stack>
      </Sec>
      <Sec title="This week's practice">
        <Stack>
          {PRACTICE.map(([k, title, meta]) => {
            const going = s.rsvp[k];
            return (
              <Card key={k}>
                <Row>
                  <View style={{ flex: 1 }}>
                    <H3 style={{ fontSize: 14 }}>{title}</H3>
                    <Meta>{meta}</Meta>
                  </View>
                  <Btn
                    sm
                    kind={going ? 'solid' : 'out'}
                    onPress={() => {
                      set((p) => ({ ...p, rsvp: { ...p.rsvp, [k]: !going } }));
                      toast(!going ? 'You’re on the list' : 'RSVP removed');
                    }}
                  >
                    {going ? 'Going ✓' : 'RSVP'}
                  </Btn>
                </Row>
              </Card>
            );
          })}
        </Stack>
      </Sec>
      <Sec title="Tournaments">
        <Card>
          <Stack>
            {EVENTS.map(([d, name, kind, label]) => (
              <Row key={name}>
                <Score style={{ width: 52, fontSize: 13 }}>{d}</Score>
                <Text style={{ flex: 1, fontFamily: f.regular, fontSize: 14, color: c.ink }}>{name}</Text>
                <Tag kind={kind}>{label}</Tag>
              </Row>
            ))}
          </Stack>
        </Card>
      </Sec>
      <Sec title="Last event · STX 2A" right={<Tag kind="blue">4–1 · Rank 3</Tag>}>
        <Card>
          {MATCHES.map(([q, r, score], i) => (
            <View
              key={q}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                paddingVertical: 9,
                paddingTop: i ? 9 : 0,
                borderTopWidth: i ? 1 : 0,
                borderColor: c.line,
              }}
            >
              <Score style={{ width: 38, fontSize: 13 }}>{q}</Score>
              <Meta style={{ flex: 1 }}>{q === 'QF2' ? 'Quarterfinal' : 'Qualification'}</Meta>
              <Score style={{ fontSize: 13, color: r === 'w' ? c.good : c.maroon }}>
                {r.toUpperCase()} {score}
              </Score>
            </View>
          ))}
        </Card>
      </Sec>
    </>
  );
}
