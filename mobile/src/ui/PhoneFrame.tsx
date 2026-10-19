import { useEffect, useState, type ReactNode } from 'react';
import { Platform, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaFrameContext, SafeAreaInsetsContext, useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { c, f } from './theme';

// Web demo only: show the app in a phone frame on wide screens, like the prototype,
// with the info panel beside it when there's room.
// Native and narrow browsers (real phones) render the app untouched.
const W = 390;
const H = 812;
const BEZEL = 12;
const INSETS = { top: 50, bottom: 20, left: 0, right: 0 }; // status bar and home indicator
const FRAME_MIN = 820; // same breakpoint as the prototype
const PANEL_MIN = 960; // frame + gap + panel + page padding

export function PhoneFrame({ children }: { children: ReactNode }) {
  // Native apps never get the frame; Platform.OS can't change at runtime.
  if (Platform.OS !== 'web') return <>{children}</>;
  return <WebFrame>{children}</WebFrame>;
}

// The tree stays the same at every width (only styles change), so resizing the
// browser across the breakpoint keeps the app's state and current screen.
function WebFrame({ children }: { children: ReactNode }) {
  const win = useWindowDimensions();
  const realInsets = useSafeAreaInsets();
  const realFrame = useSafeAreaFrame();
  const framed = win.width > FRAME_MIN;

  // Phones overlay their scroll indicators; hide the desktop scrollbars inside the frame.
  useEffect(() => {
    if (!framed) return;
    const style = document.createElement('style');
    style.textContent = '*{scrollbar-width:none}*::-webkit-scrollbar{display:none}';
    document.head.appendChild(style);
    return () => style.remove();
  }, [framed]);

  const height = Math.min(H, win.height - 64);
  const screen = { x: 0, y: 0, width: W - BEZEL * 2, height: height - BEZEL * 2 };
  return (
    <View
      style={
        framed
          ? { flex: 1, backgroundColor: c.line, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 56, padding: 32 }
          : { flex: 1 }
      }
    >
      {framed && win.width >= PANEL_MIN && <InfoPanel />}
      <View
        style={
          framed
            ? {
                width: W,
                height,
                padding: BEZEL,
                borderRadius: 54,
                backgroundColor: c.black,
                // same layered shadow as the prototype
                boxShadow:
                  '0 2px 6px rgba(96,115,159,.25), 0 8px 24px rgba(96,115,159,.33), 0 30px 60px rgba(34,41,57,.3)',
              }
            : { flex: 1 }
        }
      >
        <View style={framed ? { flex: 1, borderRadius: 42, overflow: 'hidden', backgroundColor: c.bg } : { flex: 1 }}>
          <SafeAreaFrameContext.Provider value={framed ? screen : realFrame}>
            <SafeAreaInsetsContext.Provider value={framed ? INSETS : realInsets}>
              {children}
            </SafeAreaInsetsContext.Provider>
          </SafeAreaFrameContext.Provider>
        </View>
        {framed && <FakeStatusBar />}
        {/* Dynamic Island */}
        {framed && (
          <View
            pointerEvents="none"
            style={{ position: 'absolute', top: 22, alignSelf: 'center', width: 110, height: 30, borderRadius: 20, backgroundColor: c.black }}
          />
        )}
      </View>
    </View>
  );
}

// The prototype's fake status bar: live time on the left, signal on the right.
function FakeStatusBar() {
  const now = () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).replace(/\s?[AP]M/i, '');
  const [time, setTime] = useState(now);
  useEffect(() => {
    const t = setInterval(() => setTime(now()), 30000);
    return () => clearInterval(t);
  }, []);
  const style = { fontFamily: f.bold, fontSize: 14, color: c.black } as const;
  return (
    <View
      pointerEvents="none"
      aria-hidden
      style={{ position: 'absolute', top: BEZEL, left: BEZEL, right: BEZEL, height: INSETS.top, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 30, paddingBottom: 6 }}
    >
      <Text style={style}>{time}</Text>
      <Text style={style}>5G ▮▮▮</Text>
    </View>
  );
}

// Same pitch as the prototype's left column.
const IN_DEMO: [string, string][] = [
  ['Camps', 'Register by community, with automatic waitlists'],
  ['Teams', 'VEX V5 tournaments, matches and practice RSVPs'],
  ['Schedule', 'Week view, open shifts and staffing for every event'],
  ['Mentors', 'Log and approve student mentor hours'],
  ['Texts', 'Reminders to families who opted in'],
];

// c.muted is under 4.5:1 on the grey page; this darker step of it passes.
const MUTED = '#4c5d84';
const p = { fontFamily: f.regular, fontSize: 15, lineHeight: 22, color: c.ink } as const;

function InfoPanel() {
  return (
    <View style={{ width: 340 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <View style={{ width: 22, height: 1.5, backgroundColor: MUTED }} />
        <Text style={{ fontFamily: f.bold, fontSize: 11, letterSpacing: 1.54, textTransform: 'uppercase', color: MUTED }}>
          App concept · South Texas Robotics
        </Text>
      </View>
      <Text
        role="heading"
        aria-level={1}
        style={{ fontFamily: f.bold, fontSize: 38, lineHeight: 41, letterSpacing: -0.38, color: c.head, marginBottom: 14 }}
      >
        The STX Robotics app.
      </Text>
      <Text style={[p, { marginBottom: 12 }]}>
        One app for families, students, mentors and staff. It’s built in the same look as stxrobotics.com, so it feels like part of the brand.
      </Text>
      <Text style={[p, { marginBottom: 12 }]}>
        <Text style={{ fontFamily: f.bold, color: c.maroon }}>Try it: </Text>
        tap through a camp sign-up on the phone. <Text style={{ fontFamily: f.bold }}>Intro to Robotics</Text> is full, so it shows the
        waitlist moment. Use the <Text style={{ fontFamily: f.bold }}>Parent / Staff</Text> switch at the top to see each side.
      </Text>

      <Text style={{ fontFamily: f.bold, fontSize: 15, color: c.head, marginTop: 6, marginBottom: 8 }}>In this demo</Text>
      <View style={{ gap: 8 }}>
        {IN_DEMO.map(([k, v]) => (
          <View key={k} style={{ flexDirection: 'row', gap: 10 }}>
            <Text
              style={{ fontFamily: f.bold, fontSize: 11, letterSpacing: 1.32, textTransform: 'uppercase', color: c.maroon, width: 72, paddingTop: 2 }}
            >
              {k}
            </Text>
            <Text style={{ fontFamily: f.regular, fontSize: 14, lineHeight: 20, color: c.ink, flex: 1 }}>{v}</Text>
          </View>
        ))}
      </View>

      <Text
        style={{
          fontFamily: f.regular,
          fontSize: 12,
          lineHeight: 17,
          color: MUTED,
          marginTop: 22,
          paddingTop: 12,
          borderTopWidth: 1,
          borderColor: c.field,
        }}
      >
        Concept demo. Everything except the Summer 2026 totals from stxrobotics.com is sample data: names, dates, team numbers and events. Nothing
        is saved or sent.
      </Text>
    </View>
  );
}
