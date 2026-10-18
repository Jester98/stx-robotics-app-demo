import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { AccessibilityInfo, Animated, BackHandler, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppCtx, INITIAL, type App, type State, type Tab } from '@/lib/state';
import { Icon, type IconName } from '@/ui/kit';
import { c, f, gutter } from '@/ui/theme';
import { Home } from '@/views/home';
import { Camps } from '@/views/camps';
import { Teams } from '@/views/teams';
import { Prints } from '@/views/prints';
import { About, Mentors, Messages, More } from '@/views/staff';

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
  camps: Camps,
  teams: Teams,
  prints: Prints,
  msgs: Messages,
  more: More,
  mentors: Mentors,
  about: About,
};

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
    setS((p) => ({ ...p, role, tab: role === 'parent' && (p.tab === 'prints' || p.tab === 'mentors') ? 'home' : p.tab }));

  // Android back: close the sheet, then leave sub-pages, then go Home.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (sheetNode) return setSheetNode(null), true;
      if (s.tab === 'mentors' || s.tab === 'about' || (s.role === 'staff' && s.tab === 'msgs')) return go('more'), true;
      if (s.tab !== 'home') return go('home'), true;
      return false;
    });
    return () => sub.remove();
  }, [sheetNode, s.tab, s.role]);

  const active: Tab = s.tab === 'mentors' || s.tab === 'about' || (s.role === 'staff' && s.tab === 'msgs') ? 'more' : s.tab;
  const pend = s.mentors.filter((m) => m.pending).length;
  const View_ = VIEWS[s.tab];

  return (
    <AppCtx.Provider value={app}>
      <View style={{ flex: 1, backgroundColor: c.bg }}>
        <StatusBar style="dark" />
        <View style={{ height: insets.top, backgroundColor: c.white }} />

        {/* App bar */}
        <View
          style={{
            backgroundColor: c.white,
            borderBottomWidth: 1,
            borderColor: c.line,
            paddingTop: 8,
            paddingBottom: 12,
            paddingHorizontal: gutter,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          <Text accessibilityRole="header" accessibilityLabel="STX Robotics" style={{ fontFamily: f.boldItalic, fontSize: 22, lineHeight: 24, letterSpacing: -0.88, color: c.black }}>
            ST<Text style={{ color: c.maroon }}>X</Text>
          </Text>
          <View style={{ flexDirection: 'row', borderWidth: 1.5, borderColor: c.black }} accessibilityRole="radiogroup" accessibilityLabel="View as">
            {(['parent', 'staff'] as const).map((r) => {
              const on = s.role === r;
              return (
                <Pressable
                  key={r}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: on }}
                  onPress={() => setRole(r)}
                  hitSlop={{ top: 10, bottom: 10 }}
                  style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: on ? c.black : 'transparent' }}
                >
                  <Text style={{ fontFamily: f.bold, fontSize: 11, letterSpacing: 1.1, textTransform: 'uppercase', color: on ? c.white : c.black }}>
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
            borderTopWidth: 1,
            borderColor: c.line,
            flexDirection: 'row',
            paddingTop: 6,
            paddingHorizontal: 6,
            paddingBottom: Math.max(8, insets.bottom),
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
                {on && <View style={{ position: 'absolute', top: -7, left: '28%', right: '28%', height: 3, backgroundColor: c.maroon }} />}
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
            bottom: tabH + 12,
            backgroundColor: c.black,
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
            borderTopWidth: 4,
            borderColor: c.maroon,
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
