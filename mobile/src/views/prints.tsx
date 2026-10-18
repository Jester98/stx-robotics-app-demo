import { useState } from 'react';
import { ScrollView, Text, View, useWindowDimensions } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useApp, type Lane } from '@/lib/state';
import { Btn, Card, Choice, Empty, Eyebrow, Field, H2, Lead, Led, Meta, Pad, Row, Sec, Stack } from '@/ui/kit';
import { c, f, gutter } from '@/ui/theme';

const LANES: Lane[] = ['Queued', 'Printing', 'Ready', 'Done'];
const NEXT: Partial<Record<Lane, Lane>> = { Queued: 'Printing', Printing: 'Ready', Ready: 'Done' };
const ACTION: Partial<Record<Lane, string>> = { Queued: 'Start print', Printing: 'Mark ready', Ready: 'Picked up' };

export function Prints() {
  const { s, set, sheet, toast } = useApp();
  const { width } = useWindowDimensions();
  // Lanes are 78% of the screen wide and snap, so the next stage peeks in (prototype `.lane`).
  const laneW = Math.min(width, 366) * 0.78;
  const prusa3 = s.jobs.some((j) => j.printer === 'Prusa #3' && j.lane === 'Printing');

  const advance = (id: string) => {
    const j = s.jobs.find((x) => x.id === id)!;
    const lane = NEXT[j.lane]!;
    set((p) => ({
      ...p,
      jobs: p.jobs.map((x) => (x.id !== id ? x : { ...x, lane, printer: lane === 'Printing' ? 'Prusa #3' : x.printer })),
    }));
    toast(`${id} moved to ${lane}`);
  };

  return (
    <>
      <Pad style={{ paddingBottom: 12 }}>
        <Eyebrow>Print shop</Eyebrow>
        <H2>3D print queue</H2>
        <Lead>Take-home camp projects and competition parts. Swipe across the stages.</Lead>
      </Pad>
      <Sec style={{ paddingTop: 0 }}>
        <Card>
          <Stack>
            {[
              ['Bambu #1', true, 'P-117 · 1h 10m left'],
              ['Prusa #2', true, 'P-116 · 2h 40m left'],
              ['Prusa #3', prusa3, prusa3 ? 'Printing' : 'Idle'],
            ].map(([name, on, meta]) => (
              <Row key={name as string}>
                <Led on={on as boolean} />
                <Text style={{ flex: 1, fontFamily: f.bold, fontSize: 15, color: c.ink }}>
                  {name as string} <Text style={{ fontFamily: f.regular, fontSize: 13, color: c.muted }}>· {meta as string}</Text>
                </Text>
              </Row>
            ))}
          </Stack>
        </Card>
      </Sec>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={laneW + 10}
        decelerationRate="fast"
        contentContainerStyle={{ gap: 10, paddingHorizontal: gutter, paddingBottom: 6, marginTop: 16 }}
      >
        {LANES.map((l) => {
          const js = s.jobs.filter((j) => j.lane === l);
          return (
            <View key={l} style={{ width: laneW, gap: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 2, borderColor: c.black, paddingBottom: 6 }}>
                {[l, String(js.length)].map((t) => (
                  <Text key={t} style={{ fontFamily: f.bold, fontSize: 11, letterSpacing: 1.32, textTransform: 'uppercase', color: c.head }}>
                    {t}
                  </Text>
                ))}
              </View>
              {js.length ? (
                js.map((j) => (
                  <Card key={j.id} style={{ gap: 6 }}>
                    <Text style={{ fontFamily: f.regular, fontSize: 11, color: c.muted, fontVariant: ['tabular-nums'] }}>
                      {j.id} · {j.hrs.toFixed(1)} h
                    </Text>
                    <Text style={{ fontFamily: f.bold, fontSize: 14, color: c.head }}>{j.what}</Text>
                    <Meta>
                      {j.who}
                      {j.printer && l === 'Printing' ? ` · ${j.printer}` : ''}
                      {j.file ? ` · ${j.file}` : ''}
                    </Meta>
                    {ACTION[l] && (
                      <Btn sm kind="out" onPress={() => advance(j.id)}>
                        {ACTION[l]!}
                      </Btn>
                    )}
                  </Card>
                ))
              ) : (
                <Empty>Nothing here</Empty>
              )}
            </View>
          );
        })}
      </ScrollView>
      <Sec>
        <Btn block onPress={() => sheet(<PrintSheet />)}>
          + Request a print
        </Btn>
      </Sec>
    </>
  );
}

const WHO = ['Team 2A', 'Team 2B', 'Team 2C', 'Portland camp', 'Robstown camp'];

function PrintSheet() {
  const { s, set, sheet, toast } = useApp();
  const [what, setWhat] = useState('Claw bracket ×2');
  const [who, setWho] = useState(WHO[0]);
  const [hrs, setHrs] = useState('1.5');
  const [file, setFile] = useState<string>();

  const pick = async () => {
    const r = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false });
    if (!r.canceled) setFile(r.assets[0].name);
  };
  const add = () => {
    if (!what.trim()) return;
    const id = `P-${113 + s.jobs.length}`;
    set((p) => ({ ...p, jobs: [...p.jobs, { id, what: what.trim(), who, hrs: Number(hrs) || 1, lane: 'Queued', file }] }));
    sheet(null);
    toast(`${id} added to the queue`);
  };

  return (
    <>
      <Eyebrow>Print shop</Eyebrow>
      <H2 style={{ fontSize: 22, lineHeight: 25 }}>Request a print</H2>
      <Stack gap={11} style={{ marginTop: 12 }}>
        <Field label="What to print" value={what} onChangeText={setWhat} />
        <Choice label="For" options={WHO} value={who} onChange={setWho} />
        <Field label="Estimated hours" value={hrs} onChangeText={setHrs} keyboardType="decimal-pad" />
        <View style={{ gap: 4 }}>
          <Text style={{ fontFamily: f.bold, fontSize: 12, letterSpacing: 0.72, textTransform: 'uppercase', color: c.head }}>STL file</Text>
          <Row>
            <Btn sm kind="out" onPress={pick}>
              Choose file
            </Btn>
            <Meta style={{ flex: 1 }}>{file ?? 'No file chosen (.stl or .3mf)'}</Meta>
          </Row>
        </View>
        <Btn block onPress={add}>
          Add to queue
        </Btn>
        <Btn block kind="out" onPress={() => sheet(null)}>
          Cancel
        </Btn>
      </Stack>
    </>
  );
}
