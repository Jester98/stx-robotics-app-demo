import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useStore } from '@/lib/store';
import { c, f } from '@/ui/theme';

export default function TabsLayout() {
  const { s } = useStore();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: c.maroon,
        tabBarInactiveTintColor: c.muted,
        tabBarLabelStyle: { fontFamily: f.bold, fontSize: 12 },
        tabBarStyle: { backgroundColor: c.white, borderTopColor: c.line },
        sceneStyle: { backgroundColor: c.bg },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Camps', tabBarIcon: ({ color, size }) => <Feather name="calendar" color={color as string} size={size} /> }}
      />
      <Tabs.Screen
        name="kids"
        options={{
          title: 'My kids',
          tabBarBadge: s.regs.length || undefined,
          tabBarBadgeStyle: { backgroundColor: c.maroon, fontFamily: f.bold },
          tabBarIcon: ({ color, size }) => <Feather name="users" color={color as string} size={size} />,
        }}
      />
    </Tabs>
  );
}
