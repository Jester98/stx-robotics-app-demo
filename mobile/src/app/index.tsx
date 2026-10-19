import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccessibilityInfo, Animated, BackHandler, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppCtx, INITIAL, type App, type State, type Tab } from '@/lib/state';
import { Icon, type IconName } from '@/ui/kit';
import { c, f, gutter, radius, shadow } from '@/ui/theme';
import { Home } from '@/views/home';
import { Camps } from '@/views/camps';
import { Teams } from '@/views/teams';
import { Schedule } from '@/views/schedule';
import { About, Messages, More } from '@/views/staff';
import { Approvals, CheckIn, Hours, People, Start } from '@/views/roles';
import { ROLE_INFO, approvalsCount, type AppRole } from '@/lib/roles';
import { EventDetail, StaffCamps, StaffList } from '@/views/events';
import { useApp } from '@/lib/state';

// One screen, like the prototype: top bar, the current tab's content, tab bar,
// plus a bottom sheet and a toast drawn over it.
// Tabs a role can get; which ones it gets comes from ROLE_INFO. (Teams is hidden for now.)
const TAB_META: Partial<Record<Tab, [string, IconName]>> = {
  home: ['Home', 'home'],
  camps: ['Camps', 'camps'],
  msgs: ['Updates', 'msg'],
  sched: ['Schedule', 'sched'],
  hours: ['Hours', 'clock'],
  checkin: ['Check-in', 'checkin'],
  approvals: ['Approvals', 'approve'],
  more: ['More', 'more'],
};
const ROLE_KEY = 'stx-demo-role';
const VIEWS: Record<Tab, () => ReactNode> = {
  home: Home,
  camps: CampsTab,
  teams: Teams,
  sched: Schedule,
  msgs: Messages,
  more: More,
  hours: Hours,
  checkin: CheckIn,
  approvals: Approvals,
  people: People,
  about: About,
  event: EventDetail,
  staffList: StaffList,
};

// Parents get the sign-up list; staff get the event-running view.
function CampsTab() {
  return useApp().s.role === 'parent' ? <Camps /> : <StaffCamps />;
}

// Sub-pages and the tab they belong to.
const PARENT_TAB: Partial<Record<Tab, Tab>> = { about: 'more', staffList: 'more', people: 'more' };
const parentOf = (s: State): Tab | undefined =>
  s.tab === 'event' ? s.eventFrom : s.tab === 'msgs' && s.role !== 'parent' ? 'more' : PARENT_TAB[s.tab];

export default function AppScreen() {
  const insets = useSafeAreaInsets();
  const [s, setS] = useState<State>(INITIAL);
  const [sheetNode, setSheetNode] = useState<ReactNode>(null);
  const [toastText, setToastText] = useState('');
  const [tabH, setTabH] = useState(80);
  const [toastAnim] = useState(() => new Animated.Value(0));
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const toast = useCallback(
    (text: string) => {
      setToastText(text);
      AccessibilityInfo.announceForAccessibility(text);
      Animated.timing(toastAnim, { toValue: 1, duration: 250, useNativeDriver: true }).start();
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => Animated.timing(toastAnim, { toValue: 0, duration: 250, useNativeDriver: true }).start(), 2400);
    },
    [toastAnim],
  );
  const go = (tab: Tab) => setS((p) => ({ ...p, tab }));
  const app: App = { s, set: setS, go, toast, sheet: setSheetNode };

  // Remember the chosen role between visits; the rest of the demo state starts fresh.
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem(ROLE_KEY)
      .then((r) => {
        if (r && r in ROLE_INFO) setS((p) => ({ ...p, role: r as AppRole, me: ROLE_INFO[r as AppRole].me }));
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);
  useEffect(() => {
    if (!loaded) return;
    (s.role ? AsyncStorage.setItem(ROLE_KEY, s.role) : AsyncStorage.removeItem(ROLE_KEY)).catch(() => {});
  }, [s.role, loaded]);

  // Android back: close the sheet, then leave sub-pages, then go Home.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (sheetNode) return setSheetNode(null), true;
      if (!s.role) return false;
      const up = parentOf(s);
      if (up) return go(up), true;
      if (s.tab !== 'home') return go('home'), true;
      return false;
    });
    return () => sub.remove();
  }, [sheetNode, s]);

  const active: Tab = parentOf(s) ?? s.tab;
  const pend = approvalsCount(s);
  const View_ = s.role ? VIEWS[s.tab] : Start;
  if (!loaded) return <View style={{ flex: 1, backgroundColor: c.bg }} />;

  return (
    <AppCtx.Provider value={app}>
      <View style={{ flex: 1, backgroundColor: c.bg }}>
        <StatusBar style="dark" />
        <View style={{ height: insets.top }} />

        {/* App bar */}
        <View
          style={{
            backgroundColor: c.white,
            borderRadius: radius.card,
            boxShadow: shadow.float,
            marginHorizontal: 12,
            marginTop: 6,
            marginBottom: 4,
            paddingVertical: 10,
            paddingLeft: 16,
            paddingRight: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          <Text accessibilityRole="header" accessibilityLabel="STX Robotics" style={{ fontFamily: f.bold, fontSize: 22, lineHeight: 26, letterSpacing: -0.6, color: c.black }}>
            ST<Text style={{ color: c.maroon }}>X</Text>
          </Text>
          {s.role && (
            <View style={{ backgroundColor: c.track, borderRadius: radius.pill, paddingVertical: 6, paddingHorizontal: 13 }}>
              <Text style={{ fontFamily: f.bold, fontSize: 11, letterSpacing: 1.1, textTransform: 'uppercase', color: c.head }}>{ROLE_INFO[s.role].label}</Text>
            </View>
          )}
        </View>

        {/* Content: keyed by tab so each tab opens at the top */}
        <ScrollView key={s.role ? s.tab : 'start'} style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }} keyboardShouldPersistTaps="handled">
          <View_ />
        </ScrollView>

        {/* Tab bar */}
        {s.role && (
        <View
          onLayout={(e) => setTabH(e.nativeEvent.layout.height)}
          accessibilityRole="tablist"
          style={{
            backgroundColor: c.white,
            borderRadius: radius.bar,
            boxShadow: shadow.float,
            marginHorizontal: 12,
            marginTop: 4,
            marginBottom: Math.max(10, insets.bottom),
            flexDirection: 'row',
            paddingVertical: 4,
            paddingHorizontal: 4,
          }}
        >
          {ROLE_INFO[s.role].tabs.map((key) => {
            const [label, icon] = TAB_META[key]!;
            const on = active === key;
            const color = on ? c.maroon : c.muted;
            return (
              <Pressable
                key={key}
                accessibilityRole="tab"
                accessibilityState={{ selected: on }}
                accessibilityLabel={key === 'approvals' && pend ? `${label}, ${pend} to approve` : label}
                onPress={() => go(key)}
                style={{ flex: 1, alignItems: 'center', gap: 3, paddingVertical: 6 }}
              >
                <Icon name={icon} color={color} />
                <Text style={{ fontFamily: f.bold, fontSize: 10.5, letterSpacing: 0.63, textTransform: 'uppercase', color }}>{label}</Text>
                {key === 'approvals' && pend > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 2,
                      right: '22%',
                      minWidth: 16,
                      height: 16,
                      borderRadius: 8,
                      paddingHorizontal: 4,
                      backgroundColor: c.maroon,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontFamily: f.bold, fontSize: 9.5, color: c.white }}>{pend}</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
        )}

        {/* Toast */}
        <Animated.View
          pointerEvents="none"
          accessibilityLiveRegion="polite"
          style={{
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: tabH + Math.max(10, insets.bottom) + 12,
            backgroundColor: c.black,
            borderRadius: radius.btn + 4,
            paddingVertical: 12,
            paddingHorizontal: 14,
            opacity: toastAnim,
            transform: [{ translateY: toastAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }],
          }}
        >
          <Text style={{ fontFamily: f.regular, fontSize: 14, color: c.white }}>{toastText}</Text>
        </Animated.View>

        {sheetNode && <Sheet onClose={() => setSheetNode(null)}>{sheetNode}</Sheet>}
      </View>
    </AppCtx.Provider>
  );
}

// Bottom sheet: dimmed backdrop, sheet slides up with a maroon top edge and a grabber.
function Sheet({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const [slide] = useState(() => new Animated.Value(0));
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then((reduce) =>
      Animated.timing(slide, { toValue: 1, duration: reduce ? 0 : 260, useNativeDriver: true }).start(),
    );
  }, [slide]);

  return (
    <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
      <Animated.View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.45)', opacity: slide }}>
        <Pressable accessibilityLabel="Close" style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, justifyContent: 'flex-end' }} pointerEvents="box-none">
        <Animated.View
          accessibilityViewIsModal
          style={{
            maxHeight: '88%',
            backgroundColor: c.bg,
            borderTopLeftRadius: radius.bar,
            borderTopRightRadius: radius.bar,
            overflow: 'hidden',
            transform: [{ translateY: slide.interpolate({ inputRange: [0, 1], outputRange: [600, 0] }) }],
          }}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingTop: 8, paddingHorizontal: gutter, paddingBottom: 28 + insets.bottom }}
          >
            <View style={{ width: 40, height: 4, backgroundColor: c.field, alignSelf: 'center', marginTop: 4, marginBottom: 12 }} />
            {children}
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}
