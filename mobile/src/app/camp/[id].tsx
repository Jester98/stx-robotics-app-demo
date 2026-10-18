import { ScrollView, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { isFull, seatsLeft, useStore } from '@/lib/store';
import { Btn, Ledger, Placeholder, T } from '@/ui/kit';
import { c, space } from '@/ui/theme';

export default function CampDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { s, set } = useStore();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const camp = s.camps.find((x) => x.id === id);
  if (!camp) return <T style={{ padding: space }}>This camp is no longer listed.</T>;

  const left = seatsLeft(camp);
  const full = isFull(camp);
  const mine = s.regs.filter((r) => r.campId === camp.id);
  const start = () => {
    set((p) => ({ ...p, draft: {} }));
    router.push(`/register/${camp.id}/${s.phone ? 'child' : 'phone'}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={{ backgroundColor: c.black, paddingHorizontal: space, paddingBottom: 28, gap: 6 }}>
          <StatusBar style="light" />
          <T v="title" accessibilityRole="header" style={{ color: c.white }}>
            {camp.name}
          </T>
          <T v="meta" style={{ color: c.bandMuted }}>
            {camp.loc} · {camp.dates}
          </T>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 14, marginTop: 18 }}>
            <T v="display">{left}</T>
            <T v="body" style={{ color: c.bandMuted, paddingBottom: 12, flex: 1 }}>
              {full
                ? camp.wait
                  ? `seats left. ${camp.wait} ${camp.wait === 1 ? 'family is' : 'families are'} on the waitlist.`
                  : 'seats left. The waitlist is open.'
                : `of ${camp.cap} seats left`}
            </T>
          </View>
          <View style={{ marginTop: 14 }}>
            <Ledger camp={camp} />
          </View>
        </View>

        <View style={{ padding: space, paddingTop: 24, gap: 24 }}>
          {mine.length > 0 && (
            <View style={{ backgroundColor: c.goodSoft, borderWidth: 1, borderColor: c.good, padding: 14 }}>
              <T style={{ color: c.good }}>
                {mine.map((r) => `${r.child.name}: ${r.status === 'Confirmed' ? 'registered' : `waitlist #${r.position}`}`).join('\n')}
              </T>
            </View>
          )}

          <View style={{ borderTopWidth: 1, borderColor: c.line }}>
            {[
              ['Ages', `${camp.ages[0]}–${camp.ages[1]}`],
              ['Dates', camp.dates],
              ['Time', camp.time],
              ['Where', camp.venue],
            ].map(([k, v]) => (
              <View key={k} style={{ flexDirection: 'row', gap: 16, paddingVertical: 14, borderBottomWidth: 1, borderColor: c.line }}>
                <T v="small" style={{ width: 64 }}>
                  {k}
                </T>
                <T v="label" style={{ flex: 1 }}>
                  {v}
                </T>
              </View>
            ))}
          </View>

          <Placeholder title="Placeholder · cost">Cost goes here. Free or paid has not been decided.</Placeholder>
          <Placeholder title="Placeholder · about this camp">Camp description goes here.</Placeholder>
        </View>
      </ScrollView>

      <View
        style={{
          paddingHorizontal: space,
          paddingTop: 12,
          paddingBottom: Math.max(insets.bottom, 12),
          borderTopWidth: 1,
          borderColor: c.line,
          backgroundColor: c.bg,
          gap: 8,
        }}
      >
        {full && <T v="small">This session is full. Join the waitlist and we’ll hold your place in line.</T>}
        <Btn onPress={start}>{full ? 'Join waitlist' : 'Register'}</Btn>
      </View>
    </View>
  );
}
