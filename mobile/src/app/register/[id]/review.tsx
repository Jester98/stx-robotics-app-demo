import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { formatPhone, isFull, register, seatsLeft, useStore } from '@/lib/store';
import { Btn, Check, ErrorLine, FormScreen, Notice, Placeholder, StepStrip, T } from '@/ui/kit';
import { c, space } from '@/ui/theme';

export default function ReviewStep() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { s, set } = useStore();
  const router = useRouter();
  const camp = s.camps.find((x) => x.id === id)!;
  const { child, guardian, notes } = s.draft;
  const [agree, setAgree] = useState(false);
  const [sms, setSms] = useState(false);
  const [tried, setTried] = useState(false);
  const [waiver, setWaiver] = useState(false);
  const [startedFull] = useState(isFull(camp));
  const full = isFull(camp);

  // Demo: on the camp with one seat left, another family takes it while you review.
  useEffect(() => {
    if (seatsLeft(camp) !== 1 || s.stolen.includes(camp.id)) return;
    const t = setTimeout(
      () =>
        set((p) => ({
          ...p,
          stolen: [...p.stolen, camp.id],
          camps: p.camps.map((x) => (x.id === camp.id ? { ...x, filled: x.filled + 1 } : x)),
        })),
      2500,
    );
    return () => clearTimeout(t);
  }, []);

  const submit = () => {
    setTried(true);
    if (!agree) return;
    const [next] = register(s, camp.id, sms);
    set(() => next);
    router.replace({ pathname: '/register/[id]/done', params: { id: camp.id, r: String(next.regs.length - 1) } });
  };

  // No draft (e.g. returned here after submitting): start over from the camp.
  if (!child) return <Redirect href={`/camp/${id}`} />;

  const rows: [string, string, (() => void)?][] = [
    ['Child', `${child?.name}, age ${child?.age}`, () => router.dismissTo(`/register/${id}/child`)],
    ['Guardian', guardian ?? '', () => router.dismissTo(`/register/${id}/details`)],
    ['Mobile', formatPhone(s.phone ?? '')],
    ['Notes', notes || 'None', () => router.dismissTo(`/register/${id}/details`)],
  ];

  return (
    <FormScreen
      top={<StepStrip camp={camp} step={4} />}
      footer={
        <>
          {tried && !agree && <ErrorLine>Agree to the participation waiver to continue.</ErrorLine>}
          <Btn onPress={submit}>{full ? 'Join waitlist' : 'Complete registration'}</Btn>
        </>
      }
    >
      <T v="title" accessibilityRole="header">
        Check and agree
      </T>

      {full && !startedFull && (
        <Notice tone="warn" title="The last seat was just taken">
          <T style={{ color: c.warn }}>
            Another family registered a moment ago. You can join the waitlist instead. Everything you entered is kept.
          </T>
        </Notice>
      )}

      <View style={{ borderTopWidth: 1, borderColor: c.line }}>
        {rows.map(([k, v, edit]) => (
          <View key={k} style={{ flexDirection: 'row', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderColor: c.line, alignItems: 'center' }}>
            <T v="small" style={{ width: 76 }}>
              {k}
            </T>
            <T v="label" style={{ flex: 1 }}>
              {v}
            </T>
            {edit && (
              <Pressable accessibilityRole="button" accessibilityLabel={`Edit ${k.toLowerCase()}`} onPress={edit} hitSlop={8} style={{ minHeight: 44, justifyContent: 'center' }}>
                <T v="label" style={{ color: c.maroon }}>
                  Edit
                </T>
              </Pressable>
            )}
          </View>
        ))}
      </View>

      <Placeholder title="Placeholder · payment">Payment step goes here, if some camps cost money.</Placeholder>

      <View style={{ gap: 10 }}>
        <Btn kind="outline" icon="file-text" onPress={() => setWaiver(true)}>
          Read the participation waiver
        </Btn>
        <Check on={agree} onChange={setAgree}>
          <T>I have read and agree to the participation waiver for {child?.name.split(/\s+/)[0]}.</T>
        </Check>
      </View>

      <Check on={sms} onChange={setSms}>
        <T>Text me program reminders, event reminders, schedule changes and safety notifications.</T>
        <T v="small">Optional. Reply STOP to unsubscribe.</T>
      </Check>

      <WaiverSheet open={waiver} onClose={() => setWaiver(false)} onAgree={() => (setAgree(true), setWaiver(false))} />
    </FormScreen>
  );
}

function WaiverSheet({ open, onClose, onAgree }: { open: boolean; onClose: () => void; onAgree: () => void }) {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={open} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: c.bg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: space, paddingTop: space + (insets.top > 30 ? 0 : 4), borderBottomWidth: 1, borderColor: c.line, backgroundColor: c.white }}>
          <T v="h3" accessibilityRole="header" style={{ flex: 1 }}>
            Participation waiver
          </T>
          <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={onClose} hitSlop={8} style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
            <Feather name="x" size={24} color={c.black} />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={{ padding: space, gap: 16 }}>
          <Placeholder title="Placeholder · waiver">Waiver text goes here.</Placeholder>
          <Placeholder title="Placeholder · signature">
            How parents sign (checkbox or typed name) is still to be decided.
          </Placeholder>
        </ScrollView>
        <View style={{ padding: space, paddingBottom: Math.max(insets.bottom, space), borderTopWidth: 1, borderColor: c.line, gap: 10 }}>
          <Btn onPress={onAgree}>I agree</Btn>
          <Btn kind="outline" onPress={onClose}>
            Close
          </Btn>
        </View>
      </View>
    </Modal>
  );
}

