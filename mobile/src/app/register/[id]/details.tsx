import { useState } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useStore } from '@/lib/store';
import { Btn, Field, FormScreen, Placeholder, StepStrip, T } from '@/ui/kit';

export default function DetailsStep() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { s, set } = useStore();
  const router = useRouter();
  const camp = s.camps.find((x) => x.id === id)!;
  const [guardian, setGuardian] = useState(s.draft.guardian ?? s.guardian ?? '');
  const [notes, setNotes] = useState(s.draft.notes ?? '');
  const [tried, setTried] = useState(false);
  const child = s.draft.child?.name.split(/\s+/)[0] ?? 'your child';

  const next = () => {
    setTried(true);
    if (!guardian.trim()) return;
    set((p) => ({ ...p, draft: { ...p.draft, guardian: guardian.trim(), notes: notes.trim() } }));
    router.push(`/register/${id}/review`);
  };

  return (
    <FormScreen top={<StepStrip camp={camp} step={3} />} footer={<Btn onPress={next}>Continue</Btn>}>
      <View style={{ gap: 8 }}>
        <T v="title" accessibilityRole="header">
          Guardian and safety
        </T>
        <T>So camp staff know who to call and how to keep {child} safe.</T>
      </View>

      <Field
        label="Parent or guardian name"
        value={guardian}
        onChangeText={setGuardian}
        autoCapitalize="words"
        textContentType="name"
        autoComplete="name"
        error={tried && !guardian.trim() ? 'Enter a parent or guardian name.' : undefined}
      />
      <Field
        label="Allergies or medical notes (optional)"
        hint="Only camp staff see this."
        value={notes}
        onChangeText={setNotes}
        multiline
        maxLength={500}
      />

      <Placeholder title="Placeholder · more fields">
        Emergency contact and pickup authorization go here, if the program needs them.
      </Placeholder>
      <Placeholder title="Placeholder · email">Email address goes here, if it will be collected.</Placeholder>
    </FormScreen>
  );
}
