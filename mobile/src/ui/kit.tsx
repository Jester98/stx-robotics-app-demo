import { useState, type ReactNode } from 'react';
import { Pressable, Text, TextInput, View, type StyleProp, type TextInputProps, type TextStyle, type ViewStyle } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { c, f, gutter } from './theme';

// Components ported 1:1 from the prototype's CSS classes.

const SLOP = { top: 8, bottom: 8, left: 4, right: 4 }; // small controls keep a 44pt touch area

type TP = { children: ReactNode; style?: StyleProp<TextStyle> };

export const Body = ({ children, style }: TP) => (
  <Text style={[{ fontFamily: f.regular, fontSize: 15, lineHeight: 22, color: c.ink }, style]}>{children}</Text>
);

/** `.eyebrow`: small uppercase label with a short line before it. */
export function Eyebrow({ children, color = c.muted, style }: { children: ReactNode; color?: string; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 10 }, style]}>
      <View style={{ width: 22, height: 1.5, backgroundColor: color }} />
      <Text style={{ fontFamily: f.bold, fontSize: 11, letterSpacing: 1.54, textTransform: 'uppercase', color }}>{children}</Text>
    </View>
  );
}

export const H2 = ({ children, style }: TP) => (
  <Text
    role="heading"
    style={[{ fontFamily: f.bold, fontSize: 26, lineHeight: 29, letterSpacing: -0.26, color: c.head, marginTop: 8, marginBottom: 4 }, style]}
  >
    {children}
  </Text>
);
export const H3 = ({ children, style }: TP) => (
  <Text style={[{ fontFamily: f.bold, fontSize: 16, lineHeight: 23, color: c.head }, style]}>{children}</Text>
);
export const Lead = ({ children, style }: TP) => (
  <Text style={[{ fontFamily: f.regular, fontSize: 14, lineHeight: 20, color: c.ink, marginTop: 4 }, style]}>{children}</Text>
);
export const Meta = ({ children, style }: TP) => (
  <Text style={[{ fontFamily: f.regular, fontSize: 13, lineHeight: 19, color: c.muted }, style]}>{children}</Text>
);
export const Score = ({ children, style }: TP) => (
  <Text style={[{ fontFamily: f.bold, fontSize: 15, color: c.ink, fontVariant: ['tabular-nums'] }, style]}>{children}</Text>
);

/** `.pad`: page heading block. */
export const Pad = ({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) => (
  <View style={[{ padding: gutter }, style]}>{children}</View>
);

/** `.sec` with optional `.sec-h` header. */
export function Sec({ title, right, children, style }: { title?: string; right?: ReactNode; children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[{ paddingTop: 20, paddingHorizontal: gutter }, style]}>
      {title !== undefined && (
        <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
          <Text role="heading" style={{ fontFamily: f.bold, fontSize: 13, letterSpacing: 1.56, textTransform: 'uppercase', color: c.head }}>
            {title}
          </Text>
          {right}
        </View>
      )}
      {children}
    </View>
  );
}

export const Stack = ({ children, gap = 10, style }: { children: ReactNode; gap?: number; style?: StyleProp<ViewStyle> }) => (
  <View style={[{ gap }, style]}>{children}</View>
);

export const Card = ({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) => (
  <View style={[{ backgroundColor: c.white, borderWidth: 1, borderColor: c.line, padding: 14 }, style]}>{children}</View>
);

export const Row = ({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) => (
  <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 12 }, style]}>{children}</View>
);

export function Link({ children, onPress }: { children: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="link" onPress={onPress} hitSlop={SLOP} style={{ alignSelf: 'flex-start' }}>
      <Text style={{ fontFamily: f.bold, fontSize: 13, color: c.maroon }}>{children}</Text>
    </Pressable>
  );
}

type TagKind = 'open' | 'few' | 'full' | 'blue' | 'mute';
const TAGS: Record<TagKind, [string, string]> = {
  open: [c.good, c.goodSoft],
  few: [c.warn, c.warnSoft],
  full: [c.maroon, c.maroonSoft],
  blue: [c.blue, c.blueSoft],
  mute: [c.muted, c.bg],
};
export function Tag({ kind, children }: { kind: TagKind; children: ReactNode }) {
  const [fg, bg] = TAGS[kind];
  return (
    <View style={{ borderWidth: 1, borderColor: fg, backgroundColor: bg, paddingHorizontal: 7, paddingVertical: 3, alignSelf: 'center' }}>
      <Text numberOfLines={1} style={{ fontFamily: f.bold, fontSize: 10.5, letterSpacing: 0.84, textTransform: 'uppercase', color: fg }}>
        {children}
      </Text>
    </View>
  );
}

/** `.btn`: solid maroon; `out` black outline; `white` on maroon bands. */
export function Btn({
  children,
  onPress,
  kind = 'solid',
  sm,
  block,
}: {
  children: string;
  onPress: () => void;
  kind?: 'solid' | 'out' | 'white';
  sm?: boolean;
  block?: boolean;
}) {
  const fg = kind === 'solid' ? c.white : kind === 'white' ? c.maroon : c.black;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      hitSlop={sm ? SLOP : undefined}
      style={({ pressed }) => ({
        backgroundColor: kind === 'solid' ? (pressed ? c.maroonDark : c.maroon) : kind === 'white' ? c.white : 'transparent',
        borderWidth: kind === 'out' ? 1.5 : 0,
        borderColor: c.black,
        paddingVertical: sm ? 7 : 11,
        paddingHorizontal: sm ? 11 : 16,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: block ? 'stretch' : 'auto',
        opacity: pressed && kind !== 'solid' ? 0.7 : 1,
      })}
    >
      <Text style={{ fontFamily: f.bold, fontSize: sm ? 13 : 14, lineHeight: sm ? 17 : 19, color: fg }}>{children}</Text>
    </Pressable>
  );
}

/** `.bar`: thin progress bar, maroon or black. */
export const Bar = ({ pct, black }: { pct: number; black?: boolean }) => (
  <View style={{ height: 5, backgroundColor: c.line }}>
    <View style={{ height: 5, width: `${Math.min(100, pct)}%`, backgroundColor: black ? c.black : c.maroon }} />
  </View>
);

/** `.band`: black stats band. */
export function Band({ items }: { items: [ReactNode, string][] }) {
  return (
    <View style={{ backgroundColor: c.black, paddingVertical: 16, paddingHorizontal: gutter, flexDirection: 'row', gap: 8 }}>
      {items.map(([n, l], i) => (
        <View key={i} style={{ flex: 1 }}>
          <Text style={{ fontFamily: f.bold, fontSize: 24, lineHeight: 26, color: c.white, fontVariant: ['tabular-nums'] }}>{n}</Text>
          <Text style={{ fontFamily: f.regular, fontSize: 10.5, lineHeight: 14, letterSpacing: 1.05, textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginTop: 5 }}>
            {l}
          </Text>
        </View>
      ))}
    </View>
  );
}

export function Chip({ children, on, onPress }: { children: string; on: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: on }}
      onPress={onPress}
      hitSlop={SLOP}
      style={{ borderWidth: 1.5, borderColor: c.black, backgroundColor: on ? c.black : c.white, paddingVertical: 6, paddingHorizontal: 12 }}
    >
      <Text style={{ fontFamily: f.bold, fontSize: 12, letterSpacing: 0.96, textTransform: 'uppercase', color: on ? c.white : c.black }}>
        {children}
      </Text>
    </Pressable>
  );
}

/** Form `label` + `input`. */
export function Field({ label, style, ...p }: TextInputProps & { label: string; style?: StyleProp<ViewStyle> }) {
  const [focus, setFocus] = useState(false);
  return (
    <View style={[{ gap: 4 }, style]}>
      <Text style={{ fontFamily: f.bold, fontSize: 12, letterSpacing: 0.72, textTransform: 'uppercase', color: c.head }}>{label}</Text>
      <TextInput
        {...p}
        accessibilityLabel={label}
        placeholderTextColor={c.muted}
        selectionColor={c.maroon}
        onFocus={(e) => (setFocus(true), p.onFocus?.(e))}
        onBlur={(e) => (setFocus(false), p.onBlur?.(e))}
        style={{
          borderWidth: 1,
          borderColor: focus ? c.maroon : c.field,
          backgroundColor: c.white,
          padding: 10,
          fontFamily: f.regular,
          fontSize: 15,
          color: c.ink,
          ...(p.multiline ? { minHeight: 90, textAlignVertical: 'top' } : null),
        }}
      />
    </View>
  );
}

/** `select` replacement: one choice from a row of chips. */
export function Choice<T extends string>({ label, options, value, onChange }: { label: string; options: T[]; value: T; onChange: (v: T) => void }) {
  return (
    <View style={{ gap: 6 }} accessibilityRole="radiogroup" accessibilityLabel={label}>
      <Text style={{ fontFamily: f.bold, fontSize: 12, letterSpacing: 0.72, textTransform: 'uppercase', color: c.head }}>{label}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
        {options.map((o) => (
          <Chip key={o} on={o === value} onPress={() => onChange(o)}>
            {o}
          </Chip>
        ))}
      </View>
    </View>
  );
}

/** `.check`: checkbox with a sentence label. */
export function Check({ on, onChange, children }: { on: boolean; onChange: (v: boolean) => void; children: string }) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: on }}
      onPress={() => onChange(!on)}
      hitSlop={{ top: 6, bottom: 6 }}
      style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start' }}
    >
      <View
        style={{
          width: 18,
          height: 18,
          marginTop: 1,
          borderWidth: 1.5,
          borderColor: on ? c.maroon : c.muted,
          backgroundColor: on ? c.maroon : c.white,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {on && (
          <Svg width={12} height={12} viewBox="0 0 24 24">
            <Path d="M5 12l5 5 9-10" stroke={c.white} strokeWidth={3} fill="none" />
          </Svg>
        )}
      </View>
      <Text style={{ flex: 1, fontFamily: f.regular, fontSize: 13, lineHeight: 19, color: c.ink }}>{children}</Text>
    </Pressable>
  );
}

export const Empty = ({ children }: { children: string }) => <Meta>{children}</Meta>;

export const Led = ({ on }: { on: boolean }) => (
  <View style={{ width: 9, height: 9, borderRadius: 4.5, backgroundColor: on ? c.good : c.idle }} />
);

/** The prototype's stroke icons. */
export type IconName = 'home' | 'camps' | 'teams' | 'prints' | 'more' | 'msg' | 'clock' | 'heart' | 'doc' | 'people';
export function Icon({ name, color, size = 23 }: { name: IconName; color: string; size?: number }) {
  const s = { stroke: color, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  const shapes: Record<IconName, ReactNode> = {
    home: <><Path d="M3 11l9-7 9 7" {...s} /><Path d="M5 10v10h14V10" {...s} /><Path d="M10 20v-6h4v6" {...s} /></>,
    camps: <><Rect x={3} y={5} width={18} height={16} {...s} /><Path d="M3 10h18M8 3v4M16 3v4" {...s} /></>,
    teams: <><Rect x={5} y={8} width={14} height={10} {...s} /><Path d="M12 4v4M9 13h.01M15 13h.01M3 12v3M21 12v3M9 18v2M15 18v2" {...s} /></>,
    prints: <><Path d="M6 9V3h12v6" {...s} /><Rect x={3} y={9} width={18} height={8} {...s} /><Path d="M7 17v4h10v-4" {...s} /></>,
    more: <><Circle cx={5} cy={12} r={1.3} {...s} /><Circle cx={12} cy={12} r={1.3} {...s} /><Circle cx={19} cy={12} r={1.3} {...s} /></>,
    msg: <Path d="M4 5h16v11H8l-4 4z" {...s} />,
    clock: <><Circle cx={12} cy={12} r={9} {...s} /><Path d="M12 7v5l3 2" {...s} /></>,
    heart: <Path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" {...s} />,
    doc: <><Path d="M6 3h9l3 3v15H6z" {...s} /><Path d="M9 11h6M9 15h6" {...s} /></>,
    people: <><Circle cx={9} cy={8} r={3} {...s} /><Path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" {...s} /><Path d="M16 5a3 3 0 0 1 0 6M21 20c0-2.6-1.6-4.8-4-5.6" {...s} /></>,
  };
  return (
    <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Svg width={size} height={size} viewBox="0 0 24 24">
        {shapes[name]}
      </Svg>
    </View>
  );
}

/** In-screen back link used on sub-pages (`‹ More`). */
export const BackLink = ({ onPress, to = 'More' }: { onPress: () => void; to?: string }) => <Link onPress={onPress}>{`‹ ${to}`}</Link>;
