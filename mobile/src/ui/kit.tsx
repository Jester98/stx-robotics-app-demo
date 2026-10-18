import { useEffect, useState, type ReactNode } from 'react';
import {
  AccessibilityInfo,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type TextProps,
  type TextStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from 'expo-router/react-navigation';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import { Feather } from '@expo/vector-icons';
import { c, f, space } from './theme';
import { seatsLeft, type Camp } from '@/lib/store';

type Variant = 'display' | 'title' | 'h3' | 'body' | 'small' | 'meta' | 'label';
const V: Record<Variant, TextStyle> = {
  display: { fontFamily: f.bold, fontSize: 104, lineHeight: 100, letterSpacing: -4, color: c.white },
  title: { fontFamily: f.bold, fontSize: 30, lineHeight: 34, letterSpacing: -0.4, color: c.head },
  h3: { fontFamily: f.bold, fontSize: 19, lineHeight: 24, color: c.head },
  body: { fontFamily: f.regular, fontSize: 16, lineHeight: 23, color: c.ink },
  small: { fontFamily: f.regular, fontSize: 14, lineHeight: 20, color: c.muted },
  // Community · dates line, as on the site's camp listings
  meta: { fontFamily: f.bold, fontSize: 12, lineHeight: 16, letterSpacing: 1.4, textTransform: 'uppercase', color: c.maroon },
  label: { fontFamily: f.bold, fontSize: 15, lineHeight: 20, color: c.head },
};

export function T({ v = 'body', style, ...p }: TextProps & { v?: Variant }) {
  return <Text {...p} style={[V[v], style]} maxFontSizeMultiplier={v === 'display' ? 1.3 : 2} />;
}

export function Btn({
  children,
  onPress,
  kind = 'solid',
  disabled,
  icon,
}: {
  children: string;
  onPress: () => void;
  kind?: 'solid' | 'outline' | 'white';
  disabled?: boolean;
  icon?: keyof typeof Feather.glyphMap;
}) {
  const fg = kind === 'solid' ? c.white : kind === 'white' ? c.maroon : c.black;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 52,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        opacity: disabled ? 0.45 : 1,
        backgroundColor:
          kind === 'solid' ? (pressed ? c.maroonDark : c.maroon) : kind === 'white' ? c.white : pressed ? c.line : 'transparent',
        borderWidth: kind === 'outline' ? 1.5 : 0,
        borderColor: c.black,
      })}
    >
      {icon && <Feather name={icon} size={18} color={fg} />}
      <Text style={{ fontFamily: f.bold, fontSize: 17, color: fg }}>{children}</Text>
    </Pressable>
  );
}

export function Field({ label, hint, error, ...p }: TextInputProps & { label: string; hint?: string; error?: string }) {
  const [focus, setFocus] = useState(false);
  return (
    <View style={{ gap: 6 }}>
      <T v="label">{label}</T>
      {hint && <T v="small">{hint}</T>}
      <TextInput
        {...p}
        accessibilityLabel={label}
        placeholderTextColor={c.muted}
        selectionColor={c.maroon}
        cursorColor={c.maroon}
        onFocus={(e) => (setFocus(true), p.onFocus?.(e))}
        onBlur={(e) => (setFocus(false), p.onBlur?.(e))}
        style={{
          minHeight: 52,
          paddingHorizontal: 14,
          backgroundColor: c.white,
          borderWidth: focus || error ? 2 : 1.5,
          borderColor: error ? c.maroon : focus ? c.black : c.taken,
          fontFamily: f.regular,
          fontSize: 17,
          color: c.head,
          ...(p.multiline ? { paddingTop: 14, minHeight: 96, textAlignVertical: 'top' } : null),
        }}
      />
      {error && <ErrorLine>{error}</ErrorLine>}
    </View>
  );
}

export function ErrorLine({ children }: { children: string }) {
  return (
    <View style={{ flexDirection: 'row', gap: 6, alignItems: 'flex-start' }} accessibilityLiveRegion="polite">
      <Feather name="alert-circle" size={16} color={c.maroon} style={{ marginTop: 2 }} />
      <T v="small" style={{ color: c.maroon, flex: 1, fontFamily: f.bold }}>
        {children}
      </T>
    </View>
  );
}

export function Check({ on, onChange, children }: { on: boolean; onChange: (v: boolean) => void; children: ReactNode }) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: on }}
      onPress={() => onChange(!on)}
      style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start', minHeight: 48, paddingVertical: 4 }}
    >
      <View
        style={{
          width: 26,
          height: 26,
          borderWidth: 1.5,
          borderColor: c.black,
          backgroundColor: on ? c.black : c.white,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 1,
        }}
      >
        {on && <Feather name="check" size={18} color={c.white} />}
      </View>
      <View style={{ flex: 1 }}>{children}</View>
    </Pressable>
  );
}

// Client-pending content. Never filled with invented answers.
export function Placeholder({ children, title = 'Placeholder' }: { children: string; title?: string }) {
  return (
    <View
      style={{ borderWidth: 1.5, borderStyle: 'dashed', borderColor: c.blue, backgroundColor: c.blueSoft, padding: 14, gap: 4 }}
      accessibilityLabel={`${title}: ${children}`}
    >
      <Text style={{ fontFamily: f.bold, fontSize: 12, letterSpacing: 1.2, textTransform: 'uppercase', color: c.blue }}>{title}</Text>
      <T style={{ color: c.blue }}>{children}</T>
    </View>
  );
}

export function Tag({ camp }: { camp: Camp }) {
  const left = seatsLeft(camp);
  const [txt, fg, bg] =
    left === 0
      ? [camp.wait ? `Full · ${camp.wait} waiting` : 'Full', c.maroon, c.maroonSoft]
      : left <= 3
        ? [`${left} left`, c.warn, c.warnSoft]
        : ['Open', c.good, c.goodSoft];
  return (
    <View style={{ borderWidth: 1, borderColor: fg, backgroundColor: bg, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start' }}>
      <Text style={{ fontFamily: f.bold, fontSize: 12, letterSpacing: 0.8, textTransform: 'uppercase', color: fg }}>{txt}</Text>
    </View>
  );
}

// The seat ledger: one square per seat.
export function Ledger({
  camp,
  tone = 'dark',
  mine,
  size = 'lg',
  perRow,
  label,
  celebrate,
}: {
  camp: Camp;
  tone?: 'dark' | 'light';
  mine?: number;
  size?: 'lg' | 'sm';
  perRow?: number;
  label?: string;
  celebrate?: boolean; // success haptic when the seat fills
}) {
  const reduce = useReduceMotion();
  const [fill] = useState(() => new Animated.Value(mine === undefined ? 1 : 0));
  useEffect(() => {
    if (mine === undefined) return;
    Animated.timing(fill, { toValue: 1, duration: reduce ? 300 : 700, delay: 350, useNativeDriver: true }).start(
      ({ finished }) => finished && celebrate && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {}),
    );
  }, [mine, reduce]);

  const taken = tone === 'dark' ? c.bandTaken : c.taken;
  const open = tone === 'dark' ? c.bandMuted : c.muted;
  const gap = size === 'lg' ? 5 : 3;
  const n = perRow ?? camp.cap;
  const rows = Array.from({ length: Math.ceil(camp.cap / n) }, (_, r) =>
    Array.from({ length: Math.min(n, camp.cap - r * n) }, (_, j) => r * n + j),
  );
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={label ?? `${camp.filled} of ${camp.cap} seats taken, ${seatsLeft(camp)} left${mine !== undefined ? '. One is yours.' : ''}`}
      style={{ gap, maxWidth: perRow ? undefined : size === 'lg' ? camp.cap * 22 : camp.cap * 12 }}
    >
      {rows.map((row, r) => (
      <View key={r} style={{ flexDirection: 'row', gap, width: perRow ? `${(row.length / n) * 100}%` : undefined }}>
      {row.map((i) => {
        const isMine = i === mine;
        const isTaken = i < camp.filled && !isMine;
        return (
          <View
            key={i}
            style={{
              flex: 1,
              aspectRatio: 1,
              backgroundColor: isTaken ? taken : 'transparent',
              borderWidth: isTaken ? 0 : 1.5,
              borderColor: isMine ? c.maroon : open,
            }}
          >
            {isMine && (
              <Animated.View
                style={{
                  flex: 1,
                  backgroundColor: c.maroon,
                  opacity: fill,
                  // Reduce Motion: opacity crossfade only
                  transform: [{ scale: reduce ? 1 : fill.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] }) }],
                }}
              />
            )}
          </View>
        );
      })}
      </View>
      ))}
    </View>
  );
}

export function useReduceMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setR);
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setR);
    return () => sub.remove();
  }, []);
  return r;
}

const STEPS = ['Phone', 'Child', 'Details', 'Review'];

// Black strip under the header: which camp, how many seats, which step.
export function StepStrip({ camp, step }: { camp: Camp; step: 1 | 2 | 3 | 4 }) {
  const left = seatsLeft(camp);
  return (
    <View style={{ backgroundColor: c.black, paddingHorizontal: space, paddingBottom: 16, paddingTop: 4, gap: 12 }}>
      <StatusBar style="light" />
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <T v="h3" style={{ color: c.white }}>
            {camp.name}
          </T>
          <T v="small" style={{ color: c.bandMuted }}>
            {camp.loc} · {camp.dates}
          </T>
        </View>
        <T v="label" style={{ color: c.white }}>
          {left === 0 ? (camp.wait ? `Full · ${camp.wait} waiting` : 'Full') : `${left} ${left === 1 ? 'seat' : 'seats'} left`}
        </T>
      </View>
      <Ledger camp={camp} size="sm" />
      <View
        style={{ flexDirection: 'row', gap: 10, alignItems: 'center', borderTopWidth: 1, borderColor: c.bandTaken, paddingTop: 12 }}
        accessible
        accessibilityLabel={`Step ${step} of 4, ${STEPS[step - 1]}`}
      >
        <View style={{ flexDirection: 'row', gap: 3 }}>
          {STEPS.map((s, i) => (
            <View key={s} style={{ width: 8, height: 8, backgroundColor: i < step ? c.white : c.bandTaken }} />
          ))}
        </View>
        <T v="small" style={{ color: c.bandMuted }}>
          Step {step} of 4 · <Text style={{ color: c.white, fontFamily: f.bold }}>{STEPS[step - 1]}</Text>
        </T>
      </View>
    </View>
  );
}

// Scrolling form body with the primary action pinned above the keyboard.
export function FormScreen({ top, children, footer }: { top?: ReactNode; children: ReactNode; footer: ReactNode }) {
  const insets = useSafeAreaInsets();
  const header = useHeaderHeight();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: c.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={header}
    >
      {top}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: space, paddingTop: 24, gap: 22, paddingBottom: 32 }}
      >
        {children}
      </ScrollView>
      <View
        style={{
          paddingHorizontal: space,
          paddingTop: 12,
          paddingBottom: Math.max(insets.bottom, 12),
          backgroundColor: c.bg,
          borderTopWidth: 1,
          borderTopColor: c.line,
          gap: 10,
        }}
      >
        {footer}
      </View>
    </KeyboardAvoidingView>
  );
}

export function Notice({ tone, title, children }: { tone: 'warn' | 'info'; title: string; children: ReactNode }) {
  const fg = tone === 'warn' ? c.warn : c.ink;
  return (
    <View
      accessibilityLiveRegion="assertive"
      style={{ backgroundColor: tone === 'warn' ? c.warnSoft : c.white, borderWidth: 1, borderColor: tone === 'warn' ? c.warn : c.line, padding: 14, gap: 6 }}
    >
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Feather name={tone === 'warn' ? 'alert-triangle' : 'info'} size={18} color={fg} />
        <T v="label" style={{ color: fg, flex: 1 }}>
          {title}
        </T>
      </View>
      {children}
    </View>
  );
}
