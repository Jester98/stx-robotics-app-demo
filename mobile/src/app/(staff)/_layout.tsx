import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { c, f } from '@/ui/theme';

export default function StaffTabs() {
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
        name="today"
        options={{ title: 'Today', tabBarIcon: ({ color, size }) => <Feather name="grid" color={color as string} size={size} /> }}
      />
      <Tabs.Screen
        name="camps"
        options={{ title: 'Camps', tabBarIcon: ({ color, size }) => <Feather name="calendar" color={color as string} size={size} /> }}
      />
      <Tabs.Screen
        name="more"
        options={{ title: 'More', tabBarIcon: ({ color, size }) => <Feather name="menu" color={color as string} size={size} /> }}
      />
    </Tabs>
  );
}
