import { Pressable, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '@/lib/store';
import { Btn, T } from '@/ui/kit';
import { c, f, space } from '@/ui/theme';

export default function Kids() {
  const { s } = useStore();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={{ backgroundColor: c.bg }} contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: 32 }}>
      <View style={{ paddingHorizontal: space, gap: 8, paddingTop: 50, paddingBottom: 20 }}>
        <T v="title" accessibilityRole="header">
          My kids
        </T>
        {s.regs.length === 0 ? (
          <View style={{ gap: 16 }}>
            <T>No registrations yet. When you register a child, their camp and status show up here.</T>
            <Btn onPress={() => router.navigate('/')}>Find a camp</Btn>
          </View>
        ) : (
          <T>Registrations on this phone.</T>
        )}
      </View>

      {s.regs.length > 0 && (
        <View style={{ backgroundColor: c.white, borderTopWidth: 1, borderBottomWidth: 1, borderColor: c.line }}>
          {s.regs.map((r, i) => {
            const camp = s.camps.find((x) => x.id === r.campId)!;
            const ok = r.status === 'Confirmed';
            return (
              <Pressable
                key={i}
                accessibilityRole="button"
                onPress={() => router.push(`/camp/${camp.id}`)}
                style={({ pressed }) => ({
                  padding: space,
                  paddingVertical: 18,
                  gap: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: pressed ? c.bg : c.white,
                  borderTopWidth: i ? 1 : 0,
                  borderColor: c.line,
                })}
              >
                <View style={{ flex: 1, gap: 4 }}>
                  <T v="h3">{r.child.name}</T>
                  <T v="small">
                    {camp.name} · {camp.loc} · {camp.dates}
                  </T>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: ok ? c.good : c.warn,
                    backgroundColor: ok ? c.goodSoft : c.warnSoft,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                  }}
                >
                  <T style={{ fontFamily: f.bold, fontSize: 12, letterSpacing: 0.8, textTransform: 'uppercase', color: ok ? c.good : c.warn }}>
                    {ok ? 'Confirmed' : `Waitlist #${r.position}`}
                  </T>
                </View>
              </Pressable>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}
