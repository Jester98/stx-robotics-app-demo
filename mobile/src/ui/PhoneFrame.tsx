import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
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

// Lets a screen show an overlay inside the phone screen (web's Modal would cover the whole page).
const OverlayCtx = createContext<((node: ReactNode) => void) | null>(null);
export const useFrameOverlay = () => useContext(OverlayCtx);

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
  const [overlay, setOverlay] = useState<ReactNode>(null);

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
              <OverlayCtx.Provider value={framed ? setOverlay : null}>{children}</OverlayCtx.Provider>
              {framed && overlay && <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>{overlay}</View>}
            </SafeAreaInsetsContext.Provider>
          </SafeAreaFrameContext.Provider>
        </View>
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

const IN_DEMO: [string, string][] = [
  ['Camps', 'Filter by community, with live seat counts'],
  ['Sign-up', 'Phone code, child, guardian, waiver and text opt-in'],
  ['Waitlist', 'Automatic when a camp is full, with your place in line'],
  ['My kids', 'Every registration made on this phone'],
  ['Staff', 'Seat board, mentor hours, seat offers and print pickups'],
];

// c.muted is under 4.5:1 on the grey page; this darker step of it passes.
const MUTED = '#4c5d84';
const p = { fontFamily: f.regular, fontSize: 16, lineHeight: 24, color: c.ink } as const;

function InfoPanel() {
  return (
    <View style={{ width: 340 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <View style={{ width: 22, height: 1.5, backgroundColor: MUTED }} />
        <Text style={{ fontFamily: f.bold, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: MUTED }}>
          App concept · South Texas Robotics
        </Text>
      </View>
      <Text
        role="heading"
        aria-level={1}
        style={{ fontFamily: f.bold, fontSize: 38, lineHeight: 41, letterSpacing: -0.4, color: c.head, marginBottom: 14 }}
      >
        The STX Robotics app.
      </Text>
      <Text style={[p, { marginBottom: 12 }]}>
        One app for South Texas Robotics families and staff, in the same look as stxrobotics.com. Parents find a camp,
        register a child and follow their status. Staff see every camp’s seats and clear the day’s to-dos.
      </Text>
      <Text style={p}>
        <Text style={{ fontFamily: f.bold, color: c.maroon }}>Try it: </Text>
        tap through a camp sign-up on the phone. Pick <Text style={{ fontFamily: f.bold }}>Drone Flight Lab</Text> to see the
        waitlist moment: its last seat gets taken while you review. The <Text style={{ fontFamily: f.bold }}>Parent / Staff</Text>{' '}
        switch shows the staff side.
      </Text>

      <Text style={{ fontFamily: f.bold, fontSize: 15, color: c.head, marginTop: 22, marginBottom: 8 }}>In this demo</Text>
      <View style={{ gap: 8 }}>
        {IN_DEMO.map(([k, v]) => (
          <View key={k} style={{ flexDirection: 'row', gap: 10 }}>
            <Text
              style={{ fontFamily: f.bold, fontSize: 11, letterSpacing: 1.3, textTransform: 'uppercase', color: c.maroon, width: 72, paddingTop: 3 }}
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
          borderColor: '#cfd6e2',
        }}
      >
        Concept demo. Camps, names, dates and seat counts are sample data. Nothing is saved or sent.
      </Text>
    </View>
  );
}
