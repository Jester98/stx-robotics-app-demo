import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { COMMUNITIES, useStore } from '@/lib/store';
import { Btn, Ledger, T, Tag } from '@/ui/kit';
import { c, f, space } from '@/ui/theme';

export default function Camps() {
  const { s, set } = useStore();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const list = s.camps.filter((x) => s.filter === 'All' || x.loc === s.filter);

  return (
    <ScrollView style={{ backgroundColor: c.bg }} contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: 32 }}>
      <View style={{ paddingHorizontal: space, gap: 10 }}>
        <Text
          accessibilityRole="header"
          style={{ fontFamily: f.bold, fontSize: 22, letterSpacing: -0.6, color: c.black }}
        >
          STX <Text style={{ color: c.maroon }}>Robotics</Text>
        </Text>
        <T v="title" accessibilityRole="header" style={{ marginTop: 14 }}>
          Find a camp
        </T>
        <T>Summer 2027. Week-long camps at partner libraries in four South Texas communities.</T>
        <T v="small">Demo with sample camps. Nothing is saved or sent.</T>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingHorizontal: space, paddingVertical: 20 }}
      >
        {(['All', ...COMMUNITIES] as const).map((l) => {
          const on = s.filter === l;
          return (
            <Pressable
              key={l}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              onPress={() => set((p) => ({ ...p, filter: l }))}
              hitSlop={{ top: 4, bottom: 4 }}
              style={{
                minHeight: 44,
                paddingHorizontal: 16,
                justifyContent: 'center',
                borderWidth: 1.5,
                borderColor: c.black,
                backgroundColor: on ? c.black : 'transparent',
              }}
            >
              <Text style={{ fontFamily: f.bold, fontSize: 15, color: on ? c.white : c.black }}>{l}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {list.length === 0 ? (
        <View style={{ padding: space, gap: 12 }}>
          <T v="h3">No camps in {s.filter} yet</T>
          <T>New sessions are added through the spring. Other communities may have openings now.</T>
          <Btn kind="outline" onPress={() => set((p) => ({ ...p, filter: 'All' }))}>
            Show all communities
          </Btn>
        </View>
      ) : (
        <View style={{ backgroundColor: c.white, borderTopWidth: 1, borderBottomWidth: 1, borderColor: c.line }}>
          {list.map((camp, i) => (
            <Pressable
              key={camp.id}
              accessibilityRole="button"
              accessibilityHint="Opens camp details"
              onPress={() => router.push(`/camp/${camp.id}`)}
              style={({ pressed }) => ({
                padding: space,
                paddingVertical: 18,
                gap: 8,
                backgroundColor: pressed ? c.bg : c.white,
                borderTopWidth: i ? 1 : 0,
                borderTopColor: c.line,
              })}
            >
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ flex: 1, gap: 4 }}>
                  <T v="h3">{camp.name}</T>
                  <T v="meta">
                    {camp.loc} · {camp.dates}
                  </T>
                  <T v="small">
                    Ages {camp.ages[0]}–{camp.ages[1]} · {camp.time} · {camp.venue}
                  </T>
                </View>
                <Feather name="chevron-right" size={22} color={c.muted} style={{ alignSelf: 'center' }} />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 4 }}>
                <View style={{ flex: 1 }}>
                  <Ledger camp={camp} tone="light" size="sm" />
                </View>
                <Tag camp={camp} />
              </View>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
