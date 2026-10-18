import { useCallback } from 'react';
import { Alert, BackHandler, Linking, ScrollView, View } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { formatPhone, useStore } from '@/lib/store';
import { Btn, Ledger, Placeholder, T } from '@/ui/kit';
import { c, space } from '@/ui/theme';

export default function Done() {
  const { id, r } = useLocalSearchParams<{ id: string; r: string }>();
  const { s, set } = useStore();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const camp = s.camps.find((x) => x.id === id)!;
  const reg = s.regs[Number(r)];

  // The form behind this screen is spent: system Back leaves the flow instead of reopening it.
  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => (router.dismissAll(), true));
      return () => sub.remove();
    }, [router]),
  );

  if (!reg) return null;
  const first = reg.child.name.split(/\s+/)[0];
  const ok = reg.status === 'Confirmed';

  const home = () => {
    router.dismissAll();
    router.navigate('/kids');
  };
  const another = () => {
    set((p) => ({ ...p, draft: {} }));
    router.replace(`/register/${id}/child`);
  };

  return (
    <ScrollView
      style={{ backgroundColor: c.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 40, paddingBottom: Math.max(insets.bottom, space) + 8, paddingHorizontal: space, gap: 28 }}
    >
      <StatusBar style="dark" />
      <View style={{ gap: 10 }}>
        <T v="title" accessibilityRole="header" style={{ fontSize: 36, lineHeight: 40 }}>
          {ok ? `${first} has a seat.` : `${first} is on the waitlist.`}
        </T>
        <T>
          {ok
            ? `${camp.name}, ${camp.dates}, ${camp.time} at ${camp.venue}.`
            : `Your place in line for ${camp.name} is saved.`}
        </T>
      </View>

      {ok ? (
        <View style={{ gap: 10 }}>
          <Ledger camp={camp} tone="light" mine={reg.seat} perRow={10} celebrate />
          <T v="small">The maroon square is {first}’s seat.</T>
        </View>
      ) : (
        <View style={{ gap: 18 }}>
          <View style={{ gap: 8 }}>
            <T v="label">All {camp.cap} seats are taken</T>
            <Ledger camp={camp} tone="light" perRow={10} />
          </View>
          <View style={{ gap: 8 }}>
            <T v="label">Waitlist</T>
            <Ledger
              camp={{ ...camp, cap: camp.wait, filled: camp.wait }}
              tone="light"
              mine={(reg.position ?? 1) - 1}
              perRow={10}
              label={`${camp.wait} on the waitlist. ${first} is number ${reg.position}.`}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 12 }}>
            <T v="display" style={{ color: c.maroon }}>
              #{reg.position}
            </T>
            <T v="small" style={{ flex: 1, paddingBottom: 14 }}>
              {first}’s place in line. The maroon square is theirs.
            </T>
          </View>
        </View>
      )}

      <T>
        {reg.sms
          ? `We’ll text updates to ${formatPhone(s.phone ?? '')}. Reply STOP anytime.`
          : 'You chose not to get texts. Updates will show in My kids.'}
      </T>

      {ok && <Placeholder title="Placeholder · what to bring">What to bring goes here.</Placeholder>}

      <View style={{ gap: 10 }}>
        <Btn onPress={home}>See it in My kids</Btn>
        <Btn kind="outline" onPress={another}>
          Register another child
        </Btn>
        {ok && (
          <Btn kind="outline" icon="calendar" onPress={() => Alert.alert('Not in this demo', 'The full app will add camp dates to your calendar.')}>
            Add to calendar
          </Btn>
        )}
      </View>

      <View style={{ borderTopWidth: 1, borderColor: c.line, paddingTop: 20, gap: 6 }}>
        <T v="small">
          South Texas Robotics is a 501(c)(3) nonprofit. Sponsorships start at $50 and are tax-deductible.
        </T>
        <T v="label" style={{ color: c.maroon }} accessibilityRole="link" onPress={() => Linking.openURL('https://stxrobotics.com')}>
          Donate or sponsor at stxrobotics.com
        </T>
      </View>
    </ScrollView>
  );
}
