import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useApp, type Camp } from '@/lib/state';
import { Bar, Btn, Card, Check, Chip, Eyebrow, Field, H2, H3, Lead, Meta, Pad, Row, Sec, Stack, Tag } from '@/ui/kit';
import { c, f, gutter } from '@/ui/theme';

export function campTag(x: Camp) {
  const left = x.cap - x.filled;
  if (left <= 0) return <Tag kind="full">Waitlist {x.wait}</Tag>;
  if (left <= 3) return <Tag kind="few">{left} left</Tag>;
  return <Tag kind="open">Open</Tag>;
}

const LOCS = ['All', 'Portland', 'Robstown', 'Del Rio', 'Alice'];

export function Camps() {
  const { s, set, sheet } = useApp();
  const list = s.camps.filter((x) => !x.staffOnly && (s.loc === 'All' || x.loc === s.loc));
  return (
    <>
      <Pad style={{ paddingBottom: 12 }}>
        <Eyebrow>Summer 2027</Eyebrow>
        <H2>Find a camp</H2>
        <Lead>Free week-long camps at partner libraries, funded by local sponsors.</Lead>
      </Pad>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingHorizontal: gutter, paddingBottom: 4 }}>
        {LOCS.map((l) => (
          <Chip key={l} on={s.loc === l} onPress={() => set((p) => ({ ...p, loc: l }))}>
            {l}
          </Chip>
        ))}
      </ScrollView>
      <Sec style={{ paddingTop: 12 }}>
        <Stack>
          {list.map((x) => (
            <Card key={x.id}>
              <Row>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: f.bold, fontSize: 11, letterSpacing: 1.32, textTransform: 'uppercase', color: c.maroon }}>{x.loc}</Text>
                  <H3>{x.name}</H3>
                </View>
                {campTag(x)}
              </Row>
              <View style={{ marginVertical: 10, gap: 2 }}>
                {[
                  ['Ages', x.ages],
                  ['Dates', x.dates],
                  ['Time', x.time],
                  ['Where', x.venue],
                ].map(([k, v]) => (
                  <View key={k} style={{ flexDirection: 'row', gap: 12 }}>
                    <Meta style={{ width: 42 }}>{k}</Meta>
                    <Text style={{ flex: 1, fontFamily: f.regular, fontSize: 13, lineHeight: 19, color: c.ink }}>{v}</Text>
                  </View>
                ))}
              </View>
              <View style={{ marginBottom: 10 }}>
                <Bar pct={(x.filled / x.cap) * 100} />
              </View>
              <Row>
                <Text style={{ flex: 1, fontFamily: f.regular, fontSize: 12, color: c.muted, fontVariant: ['tabular-nums'] }}>
                  {x.filled} of {x.cap} seats
                </Text>
                <Btn sm onPress={() => sheet(<RegSheet id={x.id} />)}>
                  {x.filled >= x.cap ? 'Join waitlist' : 'Register'}
                </Btn>
              </Row>
            </Card>
          ))}
        </Stack>
      </Sec>
    </>
  );
}

// Registration sheet. Same fields and sample values as the prototype; the text
// opt-in starts unticked (consent must be given, not assumed).
function RegSheet({ id }: { id: number }) {
  const { s, set, sheet, toast } = useApp();
  const x = s.camps.find((y) => y.id === id)!;
  const full = x.filled >= x.cap;
  const [kid, setKid] = useState('Lucas G.');
  const [age, setAge] = useState('9');
  const [parent, setParent] = useState('Maria Garza');
  const [phone, setPhone] = useState('(361) 555-0142');
  const [notes, setNotes] = useState('');
  const [sms, setSms] = useState(false);
  const [waiver, setWaiver] = useState(false);
  const [tried, setTried] = useState(false);
  const missing = !kid.trim() || !age.trim() || !parent.trim() || !waiver;

  const submit = () => {
    setTried(true);
    if (missing) return;
    set((p) => {
      const camp = p.camps.find((y) => y.id === id)!;
      const waitlist = camp.filled >= camp.cap;
      return {
        ...p,
        camps: p.camps.map((y) => (y.id !== id ? y : waitlist ? { ...y, wait: y.wait + 1 } : { ...y, filled: y.filled + 1 })),
        regs: [...p.regs, { kid: kid.trim() || 'Your child', age: Number(age), camp: id, status: waitlist ? 'Waitlisted' : 'Confirmed' }],
      };
    });
    sheet(null);
    toast(full ? `Added to the ${x.name} waitlist` : `Registered for ${x.name}`);
  };

  return (
    <>
      <Eyebrow>
        {x.loc} · {x.dates}
      </Eyebrow>
      <H2 style={{ fontSize: 22, lineHeight: 25 }}>
        {full ? 'Join waitlist:' : 'Register for'} {x.name}
      </H2>
      <Lead style={{ marginBottom: 14 }}>
        {full ? 'This session is full. You’ll get a text if a seat opens.' : `Free, funded by local sponsors. Ages ${x.ages}.`}
      </Lead>
      <Stack gap={11}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Field label="Child's name" value={kid} onChangeText={setKid} style={{ flex: 1 }} autoCapitalize="words" />
          <Field label="Age" value={age} onChangeText={(v) => setAge(v.replace(/\D/g, '').slice(0, 2))} keyboardType="number-pad" style={{ flex: 1 }} />
        </View>
        <Field label="Parent or guardian" value={parent} onChangeText={setParent} autoCapitalize="words" autoComplete="name" />
        <Field label="Mobile phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" autoComplete="tel" />
        <Field label="Allergies or notes" value={notes} onChangeText={setNotes} placeholder="Optional" />
        <Check on={sms} onChange={setSms}>
          Text me reminders, schedule changes and safety notices. Reply STOP anytime.
        </Check>
        <Check on={waiver} onChange={setWaiver}>
          I agree to the participation waiver.
        </Check>
        {tried && missing && (
          <Text accessibilityLiveRegion="polite" style={{ fontFamily: f.bold, fontSize: 13, color: c.maroon }}>
            {!waiver ? 'Agree to the participation waiver to continue.' : 'Fill in the child’s name, age and a parent or guardian.'}
          </Text>
        )}
        <Btn block onPress={submit}>
          {full ? 'Join waitlist' : 'Complete registration'}
        </Btn>
        <Btn block kind="out" onPress={() => sheet(null)}>
          Cancel
        </Btn>
      </Stack>
    </>
  );
}
