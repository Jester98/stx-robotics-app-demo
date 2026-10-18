import { Pressable, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { RoleSwitch, T, Wordmark } from '@/ui/kit';
import { c, space } from '@/ui/theme';

const TOOLS: [string, string, keyof typeof Feather.glyphMap][] = [
  ['Competition teams', 'Team cards, practice RSVPs, tournaments and match results', 'award'],
  ['Print queue', 'Queued, printing, ready and done, with print requests', 'printer'],
  ['Mentor hours', 'Every log, season totals and history', 'clock'],
  ['Family texts', 'Text a camp, a team or all families, with the STOP footer', 'message-square'],
];

export default function More() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={{ backgroundColor: c.bg }} contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: 32 }}>
      <View style={{ paddingHorizontal: space, paddingBottom: 20, gap: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <Wordmark />
          <RoleSwitch />
        </View>
        <T v="title" accessibilityRole="header" style={{ marginTop: 14 }}>
          Staff tools
        </T>
      </View>
      <View style={{ backgroundColor: c.white, borderTopWidth: 1, borderBottomWidth: 1, borderColor: c.line }}>
        {TOOLS.map(([title, sub, icon], i) => (
          <Pressable
            key={title}
            accessibilityRole="button"
            onPress={() => router.push({ pathname: '/soon', params: { title } })}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: 14,
              padding: space,
              paddingVertical: 18,
              backgroundColor: pressed ? c.bg : c.white,
              borderTopWidth: i ? 1 : 0,
              borderColor: c.line,
            })}
          >
            <Feather name={icon} size={22} color={c.head} />
            <View style={{ flex: 1, gap: 2 }}>
              <T v="h3">{title}</T>
              <T v="small">{sub}</T>
            </View>
            <Feather name="chevron-right" size={22} color={c.muted} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
