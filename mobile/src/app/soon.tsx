import { ScrollView, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Placeholder, T } from '@/ui/kit';
import { c, space } from '@/ui/theme';

export default function Soon() {
  const { title = 'This screen' } = useLocalSearchParams<{ title?: string }>();
  return (
    <ScrollView style={{ backgroundColor: c.bg }} contentContainerStyle={{ padding: space, paddingTop: 24, gap: 20 }}>
      <Stack.Screen options={{ title }} />
      <StatusBar style="light" />
      <View style={{ gap: 8 }}>
        <T v="title" accessibilityRole="header">
          Not in this demo
        </T>
        <T>{title} is part of the full app. This demo covers camp registration and the staff dashboard.</T>
      </View>
      <Placeholder title="Placeholder · coming later">{`${title} goes here.`}</Placeholder>
    </ScrollView>
  );
}
