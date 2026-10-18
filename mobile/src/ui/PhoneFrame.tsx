import { useEffect, type ReactNode } from 'react';
import { Platform, View, useWindowDimensions } from 'react-native';
import { SafeAreaFrameContext, SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { c } from './theme';

// Web demo only: show the app in a phone frame on wide screens, like the prototype.
// Native and narrow browsers (real phones) render the app untouched.
const W = 390;
const H = 812;
const BEZEL = 12;
const INSETS = { top: 50, bottom: 20, left: 0, right: 0 }; // status bar and home indicator

export function PhoneFrame({ children }: { children: ReactNode }) {
  const win = useWindowDimensions();
  const framed = Platform.OS === 'web' && win.width > 820;

  // Phones overlay their scroll indicators; hide the desktop scrollbars inside the frame.
  useEffect(() => {
    if (!framed) return;
    const style = document.createElement('style');
    style.textContent = '*{scrollbar-width:none}*::-webkit-scrollbar{display:none}';
    document.head.appendChild(style);
    return () => style.remove();
  }, [framed]);

  if (!framed) return <>{children}</>;

  const height = Math.min(H, win.height - 64);
  const screen = { x: 0, y: 0, width: W - BEZEL * 2, height: height - BEZEL * 2 };
  return (
    <View style={{ flex: 1, backgroundColor: c.line, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <View
        style={{
          width: W,
          height,
          padding: BEZEL,
          borderRadius: 54,
          backgroundColor: c.black,
          // same layered shadow as the prototype
          boxShadow:
            '0 2px 6px rgba(96,115,159,.25), 0 8px 24px rgba(96,115,159,.33), 0 30px 60px rgba(34,41,57,.3)',
        }}
      >
        <View style={{ flex: 1, borderRadius: 42, overflow: 'hidden', backgroundColor: c.bg }}>
          <SafeAreaFrameContext.Provider value={screen}>
            <SafeAreaInsetsContext.Provider value={INSETS}>{children}</SafeAreaInsetsContext.Provider>
          </SafeAreaFrameContext.Provider>
        </View>
        {/* Dynamic Island */}
        <View
          pointerEvents="none"
          style={{ position: 'absolute', top: 22, alignSelf: 'center', width: 110, height: 30, borderRadius: 20, backgroundColor: c.black }}
        />
      </View>
    </View>
  );
}
