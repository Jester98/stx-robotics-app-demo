import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { alreadyRegistered, useStore } from '@/lib/store';
import { Btn, ErrorLine, Field, FormScreen, Placeholder, StepStrip, T } from '@/ui/kit';
import { c, f } from '@/ui/theme';

export default function ChildStep() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { s, set } = useStore();
  const router = useRouter();
  const camp = s.camps.find((x) => x.id === id)!;
  const [name, setName] = useState(s.draft.child?.name ?? '');
  const [age, setAge] = useState(s.draft.child ? String(s.draft.child.age) : '');
  const [tried, setTried] = useState(false);

  const n = Number(age);
  const [lo, hi] = camp.ages;
  const first = name.trim().split(/\s+/)[0];
  const nameErr = !name.trim() ? 'Enter your child’s name.' : undefined;
  const ageErr = !age ? 'Enter your child’s age.' : n < lo || n > hi ? `${first || 'Your child'} is ${n}. This camp is for ages ${lo}–${hi}.` : undefined;
  const dupErr = name.trim() && alreadyRegistered(s, camp.id, name) ? `${first} is already registered for this camp.` : undefined;

  const next = () => {
    setTried(true);
    if (nameErr || ageErr || dupErr) return;
    set((p) => ({ ...p, draft: { ...p.draft, child: { name: name.trim(), age: n } } }));
    router.push(`/register/${id}/details`);
  };

  return (
    <FormScreen top={<StepStrip camp={camp} step={2} />} footer={<Btn onPress={next}>Continue</Btn>}>
      <View style={{ gap: 8 }}>
        <T v="title" accessibilityRole="header">
          Who’s coming?
        </T>
        <T>One child per registration. You can add a brother or sister right after.</T>
      </View>

      {s.kids.length > 0 && (
        <View style={{ gap: 10 }}>
          <T v="label">Your kids</T>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {s.kids.map((k) => {
              const on = k.name === name.trim();
              return (
                <Pressable
                  key={k.name}
                  accessibilityRole="button"
                  accessibilityState={{ selected: on }}
                  onPress={() => (setName(k.name), setAge(String(k.age)))}
                  style={{
                    minHeight: 48,
                    paddingHorizontal: 16,
                    justifyContent: 'center',
                    borderWidth: 1.5,
                    borderColor: c.black,
                    backgroundColor: on ? c.black : c.white,
                  }}
                >
                  <Text style={{ fontFamily: f.bold, fontSize: 16, color: on ? c.white : c.black }}>
                    {k.name}, {k.age}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}

      <Field
        label="Child’s name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        textContentType="none"
        autoComplete="off"
        returnKeyType="next"
        error={tried ? nameErr : undefined}
      />
      <Field
        label="Age this summer"
        hint={`This camp is for ages ${lo}–${hi}.`}
        value={age}
        onChangeText={(v) => setAge(v.replace(/\D/g, '').slice(0, 2))}
        keyboardType="number-pad"
        maxLength={2}
        onSubmitEditing={next}
        error={tried ? ageErr : undefined}
      />
      {tried && dupErr && <ErrorLine>{dupErr}</ErrorLine>}
      {tried && ageErr && age !== '' && (
        <Btn kind="outline" onPress={() => router.dismissTo('/')}>
          See camps for other ages
        </Btn>
      )}

      <Placeholder title="Placeholder · child details">
        Age or birthdate, and full last name or last initial, are still to be decided.
      </Placeholder>
    </FormScreen>
  );
}
