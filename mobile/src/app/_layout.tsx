import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { AtkinsonHyperlegible_400Regular, AtkinsonHyperlegible_700Bold, useFonts } from '@expo-google-fonts/atkinson-hyperlegible';
import { StoreProvider } from '@/lib/store';
import { c, f } from '@/ui/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({ AtkinsonHyperlegible_400Regular, AtkinsonHyperlegible_700Bold });
  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);
  if (!loaded && !error) return null;

  return (
    <StoreProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: c.black },
          headerTintColor: c.white,
          headerShadowVisible: false,
          headerTitleStyle: { fontFamily: f.bold, fontSize: 17 },
          headerBackTitleStyle: { fontFamily: f.regular },
          headerBackButtonDisplayMode: 'minimal',
          contentStyle: { backgroundColor: c.bg },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="(staff)" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="soon" options={{ title: '' }} />
        <Stack.Screen name="camp/[id]" options={{ title: '' }} />
        <Stack.Screen name="register/[id]/phone" options={{ title: 'Register' }} />
        <Stack.Screen name="register/[id]/child" options={{ title: 'Register' }} />
        <Stack.Screen name="register/[id]/details" options={{ title: 'Register' }} />
        <Stack.Screen name="register/[id]/review" options={{ title: 'Register' }} />
        <Stack.Screen
          name="register/[id]/done"
          options={{ headerShown: false, gestureEnabled: false, animation: 'fade' }}
        />
      </Stack>
    </StoreProvider>
  );
}
