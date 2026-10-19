import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { AccessibilityInfo, Animated, BackHandler, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppCtx, INITIAL, type App, type State, type Tab } from '@/lib/state';
import { Icon, type IconName } from '@/ui/kit';
import { c, f, gutter, radius, shadow } from '@/ui/theme';
import { Home } from '@/views/home';
import { Camps } from '@/views/camps';
import { Teams } from '@/views/teams';
import { Prints } from '@/views/prints';
import { About, Mentors, Messages, More } from '@/views/staff';
import { EventDetail, StaffCamps, StaffList } from '@/views/events';
import { useApp } from '@/lib/state';

// One screen, like the prototype: top bar, the current tab's content, tab bar,
// plus a bottom sheet and a toast drawn over it.
const TABS: Record<State['role'], [Tab, string, IconName][]> = {
  parent: [
    ['home', 'Home', 'home'],
    ['camps', 'Camps', 'camps'],
    ['teams', 'Teams', 'teams'],
    ['msgs', 'Updates', 'msg'],
    ['more', 'More', 'more'],
  ],
  staff: [
    ['home', 'Home', 'home'],
    ['camps', 'Camps', 'camps'],
    ['teams', 'Teams', 'teams'],
    ['prints', 'Prints', 'prints'],
    ['more', 'More', 'more'],
  ],
};
const VIEWS: Record<Tab, () => ReactNode> = {
  home: Home,
  camps: CampsTab,
  teams: Teams,
  prints: Prints,
  msgs: Messages,
  more: More,
  mentors: Mentors,
  about: About,
  event: EventDetail,
  staffList: StaffList,
};

// Parents get the sign-up list; staff get the event-running view.
function CampsTab() {
  return useApp().s.role === 'staff' ? <StaffCamps /> : <Camps />;
}

// Sub-pages and the tab they belong to.
const PARENT_TAB: Partial<Record<Tab, Tab>> = { mentors: 'more', about: 'more', staffList: 'more', event: 'camps' };

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

  const setRole = (role: State['role']) =>
    setS((p) => ({
      ...p,
      role,
      tab: role === 'parent' && ['prints', 'mentors', 'staffList', 'event'].includes(p.tab) ? (p.tab === 'event' ? 'camps' : 'home') : p.tab,
    }));

  // Android back: close the sheet, then leave sub-pages, then go Home.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (sheetNode) return setSheetNode(null), true;
      const up = s.role === 'staff' && s.tab === 'msgs' ? 'more' : PARENT_TAB[s.tab];
      if (up) return go(up), true;
      if (s.tab !== 'home') return go('home'), true;
      return false;
    });
    return () => sub.remove();
  }, [sheetNode, s.tab, s.role]);

  const active: Tab = s.role === 'staff' && s.tab === 'msgs' ? 'more' : (PARENT_TAB[s.tab] ?? s.tab);
  const pend = s.mentors.filter((m) => m.pending).length;
  const View_ = VIEWS[s.tab];

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
          <View
            style={{ flexDirection: 'row', backgroundColor: c.track, borderRadius: radius.pill, padding: 3 }}
            accessibilityRole="radiogroup"
            accessibilityLabel="View as"
          >
            {(['parent', 'staff'] as const).map((r) => {
              const on = s.role === r;
              return (
                <Pressable
                  key={r}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: on }}
                  onPress={() => setRole(r)}
                  hitSlop={{ top: 10, bottom: 10 }}
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 13,
                    borderRadius: radius.pill,
                    backgroundColor: on ? c.white : 'transparent',
                    boxShadow: on ? shadow.pill : undefined,
                  }}
                >
                  <Text style={{ fontFamily: f.bold, fontSize: 11, letterSpacing: 1.1, textTransform: 'uppercase', color: on ? c.head : c.muted }}>
                    {r === 'parent' ? 'Parent' : 'Staff'}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Content: keyed by tab so each tab opens at the top */}
        <ScrollView key={s.tab} style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }} keyboardShouldPersistTaps="handled">
          <View_ />
        </ScrollView>

        {/* Tab bar */}
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
          {TABS[s.role].map(([key, label, icon]) => {
            const on = active === key;
            const color = on ? c.maroon : c.muted;
            return (
              <Pressable
                key={key}
                accessibilityRole="tab"
                accessibilityState={{ selected: on }}
                accessibilityLabel={key === 'more' && s.role === 'staff' && pend ? `${label}, ${pend} to approve` : label}
                onPress={() => go(key)}
                style={{ flex: 1, alignItems: 'center', gap: 3, paddingVertical: 6 }}
              >
                <Icon name={icon} color={color} />
                <Text style={{ fontFamily: f.bold, fontSize: 10.5, letterSpacing: 0.63, textTransform: 'uppercase', color }}>{label}</Text>
                {key === 'more' && s.role === 'staff' && pend > 0 && (
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
