import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { formatPhone, useStore } from '@/lib/store';
import { Btn, Field, FormScreen, Notice, StepStrip, T } from '@/ui/kit';

const digits = (v: string) => v.replace(/\D/g, '').slice(0, 10);

export default function Phone() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { s, set } = useStore();
  const router = useRouter();
  const camp = s.camps.find((x) => x.id === id)!;
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState('');
  const [tried, setTried] = useState(false);
  const [wait, setWait] = useState(0);

  useEffect(() => {
    if (!wait) return;
    const t = setTimeout(() => setWait(wait - 1), 1000);
    return () => clearTimeout(t);
  }, [wait]);

  const send = () => {
    setTried(true);
    if (phone.length !== 10) return;
    setSent(true);
    setTried(false);
    setWait(30);
  };
  const verify = () => {
    setTried(true);
    if (code.length !== 6) return;
    // Demo: any 6-digit code is accepted. No text is sent.
    set((p) => ({ ...p, phone }));
    router.replace(`/register/${id}/child`);
  };

  return (
    <FormScreen
      top={<StepStrip camp={camp} step={1} />}
      footer={sent ? <Btn onPress={verify}>Verify and continue</Btn> : <Btn onPress={send}>Text me a code</Btn>}
    >
      <View style={{ gap: 8 }}>
        <T v="title" accessibilityRole="header">
          {sent ? 'Enter the code' : 'Your mobile number'}
        </T>
        <T>
          {sent
            ? `We sent a 6-digit code to ${formatPhone(phone)}.`
            : 'We’ll text a code to confirm it’s you. This keeps your registrations together, with no password to remember.'}
        </T>
      </View>

      {!sent ? (
        <Field
          label="Mobile phone"
          value={formatPhone(phone)}
          onChangeText={(v) => setPhone(digits(v))}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          autoComplete="tel"
          placeholder="(361) 555-0100"
          returnKeyType="send"
          onSubmitEditing={send}
          error={tried && phone.length !== 10 ? 'Enter a 10-digit US mobile number.' : undefined}
        />
      ) : (
        <View style={{ gap: 14 }}>
          <Field
            autoFocus
            label="6-digit code"
            value={code}
            onChangeText={(v) => setCode(v.replace(/\D/g, '').slice(0, 6))}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            maxLength={6}
            onSubmitEditing={verify}
            style={{ letterSpacing: 8 }}
            error={tried && code.length !== 6 ? 'The code has 6 digits.' : undefined}
          />
          {wait > 0 ? (
            <T v="small">You can ask for a new code in {wait}s.</T>
          ) : (
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Btn kind="outline" onPress={() => setWait(30)}>
                  Send a new code
                </Btn>
              </View>
              <View style={{ flex: 1 }}>
                <Btn kind="outline" onPress={() => (setSent(false), setCode(''))}>
                  Change number
                </Btn>
              </View>
            </View>
          )}
          <Notice tone="info" title="Demo">
            <T v="small">Any 6 digits will work. No text is actually sent.</T>
          </Notice>
        </View>
      )}
    </FormScreen>
  );
}
