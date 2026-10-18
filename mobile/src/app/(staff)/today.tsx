import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AccessibilityInfo, LayoutAnimation, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { PRINTERS, offerSeat, pickedUp, resolveLog, seatToOffer, seatsLeft, useStore, type Camp } from '@/lib/store';
import { Btn, Field, Ledger, Placeholder, RoleSwitch, T, Wordmark, useReduceMotion } from '@/ui/kit';
import { c, f, space } from '@/ui/theme';

type Store = ReturnType<typeof useStore>['s'];

export default function Today() {
  const { s, set } = useStore();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const reduce = useReduceMotion();
  const [undo, setUndo] = useState<{ msg: string; prev: Store } | null>(null);
  const [returning, setReturning] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [handled, setHandled] = useState(false); // tournament reminder
  const [justFilled, setJustFilled] = useState<string | null>(null); // camp whose seat was just offered
  const [screenReader, setScreenReader] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const scroll = useRef<ScrollView>(null);
  const boardY = useRef(0);
  const rowY = useRef<Record<string, number>>({});

  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled().then(setScreenReader);
    const sub = AccessibilityInfo.addEventListener('screenReaderChanged', setScreenReader);
    return () => {
      clearTimeout(timer.current);
      sub.remove();
    };
  }, []);

  // Rows collapse in place; Reduce Motion gets an opacity crossfade instead.
  const animate = () =>
    LayoutAnimation.configureNext(
      reduce
        ? // opacity only: rows below snap into place instead of sliding
          {
            duration: 300,
            create: { type: 'easeInEaseOut', property: 'opacity' },
            delete: { type: 'easeInEaseOut', property: 'opacity' },
          }
        : LayoutAnimation.Presets.easeInEaseOut,
    );

  // Every action keeps a snapshot for Undo. Screen-reader users keep the bar until they act on it.
  const act = (msg: string, fn: (p: Store) => Store) => {
    animate();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    // Android reads the Undo bar's live region; iOS needs an explicit announcement.
    if (Platform.OS === 'ios') AccessibilityInfo.announceForAccessibility(msg);
    setUndo({ msg, prev: s });
    set(fn);
    clearTimeout(timer.current);
    if (!screenReader)
      timer.current = setTimeout(() => {
        setUndo(null);
        setJustFilled(null);
      }, 5000);
  };
  const doUndo = () => {
    if (!undo) return;
    animate();
    const prev = undo.prev;
    if (undo.msg.startsWith('Tournament')) setHandled(false);
    set((p) => ({ ...prev, role: p.role }));
    setUndo(null);
    setJustFilled(null);
  };
  const offer = (camp: Camp) => {
    act(`Seat offered to waitlist #1 in ${camp.name}. The full app would text the family.`, (p) => offerSeat(p, camp.id));
    setJustFilled(camp.id);
    // Bring the board row into view so the seat visibly fills.
    scroll.current?.scrollTo({ y: Math.max(0, boardY.current + (rowY.current[camp.id] ?? 0) - insets.top - 8), animated: !reduce });
  };

  const pendingLogs = s.mentors.filter((m) => m.log?.state === 'pending');
  const openSeats = s.camps.filter(seatToOffer);
  const ready = s.prints.filter((p) => p.lane === 'Ready');
  const items: ReactNode[] = [
    ...openSeats.map((camp) => (
      <Item
        key={`seat-${camp.id}`}
        title={`Seat open in ${camp.name}`}
        meta={`${camp.loc} · a family cancelled · ${camp.wait} waiting`}
      >
        <Btn size="sm" onPress={() => offer(camp)}>
          Offer seat to #1
        </Btn>
      </Item>
    )),
    ...pendingLogs.map((m) => (
      <Item key={m.id} title={`${m.name} · ${m.log!.h} h`} meta={`${m.log!.task} · ${m.log!.date} · ${m.loc} student mentor`}>
        {returning === m.id ? (
          <View style={{ gap: 10, flex: 1 }}>
            <Field label="Reason (optional)" value={reason} onChangeText={setReason} placeholder="What needs fixing?" maxLength={200} />
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
              <Btn
                size="sm"
                onPress={() => {
                  act(`Returned ${m.log!.h} h · ${m.name}`, (p) => resolveLog(p, m.id, 'returned', reason.trim() || undefined));
                  setReturning(null);
                  setReason('');
                }}
              >
                Return hours
              </Btn>
              <Btn size="sm" kind="outline" onPress={() => (setReturning(null), setReason(''))}>
                Cancel
              </Btn>
            </View>
          </View>
        ) : (
          <>
            <Btn size="sm" onPress={() => act(`Approved ${m.log!.h} h · ${m.name}`, (p) => resolveLog(p, m.id, 'approved'))}>
              Approve
            </Btn>
            <Btn size="sm" kind="outline" onPress={() => (setReturning(m.id), setReason(''))}>
              Return
            </Btn>
          </>
        )}
      </Item>
    )),
    ...ready.map((p) => (
      <Item key={p.id} title={`Ready for pickup: ${p.what}`} meta={`${p.who} · ${p.id}`}>
        <Btn size="sm" kind="outline" onPress={() => act(`${p.id} marked picked up.`, (st) => pickedUp(st, p.id))}>
          Mark picked up
        </Btn>
      </Item>
    )),
    ...(handled
      ? []
      : [
          <Item key="tournament" title="Coastal Bend VEX Qualifier" meta="Nov 14 · team registration due Oct 31 · sample event">
            <Btn size="sm" kind="outline" onPress={() => router.push({ pathname: '/soon', params: { title: 'Tournaments' } })}>
              View
            </Btn>
            <Btn size="sm" kind="outline" onPress={() => (act('Tournament reminder marked handled.', (p) => p), setHandled(true))}>
              Mark handled
            </Btn>
          </Item>,
        ]),
  ];

  const filled = s.camps.reduce((a, x) => a + x.filled, 0);
  const cap = s.camps.reduce((a, x) => a + x.cap, 0);
  const waiting = s.camps.reduce((a, x) => a + x.wait, 0);
  const printing = s.prints.filter((p) => p.lane === 'Printing');
  const queued = s.prints.filter((p) => p.lane === 'Queued').length;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <ScrollView
        ref={scroll}
        contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: undo ? 120 : 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ paddingHorizontal: space, gap: 8, paddingBottom: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <Wordmark />
            <RoleSwitch />
          </View>
          <T v="title" accessibilityRole="header" style={{ marginTop: 6 }}>
            Today
          </T>
          <T v="small">{today}</T>
        </View>

        {/* Seat board */}
        <View
          onLayout={(e) => (boardY.current = e.nativeEvent.layout.y)}
          style={{ backgroundColor: c.black, paddingHorizontal: space, paddingTop: 14, paddingBottom: 0 }}
        >
          <T v="h3" accessibilityRole="header" style={{ color: c.white }}>
            Summer 2027 camps
          </T>
          <T v="small" style={{ color: c.bandMuted, marginBottom: 8 }}>
            {filled} of {cap} seats taken · {waiting} on waitlists · sample data
          </T>
          {s.camps.map((camp, i) => (
            <BoardRow
              key={camp.id}
              camp={camp}
              first={i === 0}
              justFilled={justFilled === camp.id}
              onLayout={(y) => (rowY.current[camp.id] = y)}
              onPress={() => router.push(`/camp/${camp.id}`)}
            />
          ))}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 14, rowGap: 6, paddingVertical: 12 }}>
            <Key fill={c.bandTaken}>Taken</Key>
            <Key border={c.bandMuted}>Open</Key>
            <Key border={c.maroonOnDark} dot>
              Held for waitlist
            </Key>
            <Key border={c.maroonOnDark}>Waitlist</Key>
          </View>
        </View>

        {/* Needs attention */}
        <View style={{ paddingHorizontal: space, paddingTop: 24, paddingBottom: 12, flexDirection: 'row', alignItems: 'baseline', gap: 10 }}>
          <T v="h3" accessibilityRole="header">
            Needs attention
          </T>
          {items.length > 0 && <T v="small">{items.length}</T>}
        </View>
        <View style={{ backgroundColor: c.white, borderTopWidth: 1, borderBottomWidth: 1, borderColor: c.line }}>
          {items.length ? (
            items.map((it, i) => (
              <View key={i} style={{ borderTopWidth: i ? 1 : 0, borderColor: c.line }}>
                {it}
              </View>
            ))
          ) : (
            <View style={{ padding: space, paddingVertical: 24, gap: 6 }}>
              <T v="h3">Nothing needs you right now.</T>
              <T v="small">New mentor logs, opened seats and finished prints show up here.</T>
            </View>
          )}
        </View>

        {/* Print shop: the whole block opens the queue */}
        <Pressable
          accessibilityRole="button"
          accessibilityHint="Opens the print queue"
          onPress={() => router.push({ pathname: '/soon', params: { title: 'Print queue' } })}
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        >
        <View style={{ paddingHorizontal: space, paddingTop: 24, paddingBottom: 12, flexDirection: 'row', alignItems: 'baseline', gap: 10 }}>
          <T v="h3" accessibilityRole="header" style={{ flex: 1 }}>
            Print shop
          </T>
          <T v="small">
            {queued} queued · {ready.length} ready
          </T>
          <Feather name="chevron-right" size={20} color={c.muted} style={{ alignSelf: 'center' }} />
        </View>
        <View style={{ backgroundColor: c.white, borderTopWidth: 1, borderBottomWidth: 1, borderColor: c.line }}>
          {PRINTERS.map((name, i) => {
            const job = printing.find((p) => p.printer === name);
            return (
              <View
                key={name}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: space, paddingVertical: 14, borderTopWidth: i ? 1 : 0, borderColor: c.line }}
              >
                <View style={{ width: 10, height: 10, backgroundColor: job ? c.good : 'transparent', borderWidth: 1.5, borderColor: job ? c.good : c.muted }} />
                <View style={{ flex: 1 }}>
                  <T v="label">{name}</T>
                  <T v="small">{job ? `Printing ${job.id} · ${job.what} · ${job.who}` : 'Idle'}</T>
                </View>
              </View>
            );
          })}
        </View>
        </Pressable>

        <View style={{ padding: space, paddingTop: 24 }}>
          <Placeholder title="Placeholder · staff rules">
            Still to be decided: who may approve mentor hours, how long a seat offer is held before it goes to the next family,
            the text families get when offered a seat, where tournament dates come from, and how staff sign in.
          </Placeholder>
        </View>
      </ScrollView>

      {/* Keeps the status bar readable when the black board scrolls under it */}
      <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: insets.top, backgroundColor: c.bg }} />

      {undo && (
        <View
          accessibilityLiveRegion="polite"
          style={{
            position: 'absolute',
            left: space,
            right: space,
            bottom: 12,
            backgroundColor: c.black,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            paddingLeft: 16,
            minHeight: 56,
          }}
        >
          <T style={{ color: c.white, flex: 1, paddingVertical: 10 }}>{undo.msg}</T>
          <Pressable accessibilityRole="button" onPress={doUndo} style={{ minHeight: 48, paddingHorizontal: 16, justifyContent: 'center' }}>
            <Text style={{ fontFamily: f.bold, fontSize: 16, color: c.maroonOnDark }}>Undo</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

function Item({ title, meta, children }: { title: string; meta: string; children: ReactNode }) {
  return (
    <View style={{ padding: space, paddingVertical: 16, gap: 12 }}>
      <View style={{ gap: 3 }}>
        <T v="label">{title}</T>
        <T v="small">{meta}</T>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>{children}</View>
    </View>
  );
}

const TICK = 9;

// One camp on the seat board: taken, open (or held), then the waitlist trailing in maroon.
function BoardRow({
  camp,
  first,
  justFilled,
  onLayout,
  onPress,
}: {
  camp: Camp;
  first: boolean;
  justFilled: boolean;
  onLayout: (y: number) => void;
  onPress: () => void;
}) {
  const left = seatsLeft(camp);
  const status = seatToOffer(camp)
    ? '1 seat to offer'
    : left === 0
      ? camp.wait
        ? `Full · ${camp.wait} waiting`
        : 'Full'
      : `${left} left`;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${camp.name}, ${camp.loc}. ${camp.filled} of ${camp.cap} seats taken. ${camp.wait} on the waitlist. ${status}.`}
      onPress={onPress}
      onLayout={(e) => onLayout(e.nativeEvent.layout.y)}
      style={({ pressed }) => ({
        paddingVertical: 8,
        gap: 6,
        borderTopWidth: first ? 0 : 1,
        borderColor: '#262a33',
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'baseline' }}>
        <T v="label" style={{ color: c.white, flex: 1 }}>
          {camp.name} <Text style={{ fontFamily: f.regular, color: c.bandMuted }}>· {camp.loc}</Text>
        </T>
        <T v="small" style={{ color: seatToOffer(camp) ? c.maroonOnDark : c.bandMuted, fontFamily: f.bold }}>
          {status}
        </T>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 3 }} importantForAccessibility="no-hide-descendants">
        <View style={{ width: camp.cap * 12 }}>
          {/* Remount on a fresh offer so the new seat plays the ledger's fill */}
          <Ledger key={justFilled ? 'filled' : 'idle'} camp={camp} size="sm" mine={justFilled ? camp.filled - 1 : undefined} />
        </View>
        {camp.wait > 0 && <View style={{ width: 6 }} />}
        {Array.from({ length: camp.wait }, (_, i) => (
          <View key={`w${i}`} style={{ width: TICK, height: TICK, borderWidth: 1.5, borderColor: c.maroonOnDark }} />
        ))}
      </View>
    </Pressable>
  );
}

function Key({ fill, border, dot, children }: { fill?: string; border?: string; dot?: boolean; children: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <View
        style={{
          width: TICK + 2,
          height: TICK + 2,
          backgroundColor: fill ?? 'transparent',
          borderWidth: border ? 1.5 : 0,
          borderColor: border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {dot && <View style={{ width: 4, height: 4, backgroundColor: border }} />}
      </View>
      <T v="small" style={{ color: c.bandMuted }}>
        {children}
      </T>
    </View>
  );
}
