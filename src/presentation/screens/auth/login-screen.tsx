import { type Href, Link, Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MindEaseCard } from '@/src/presentation/components/ui/mindease-card';
import { MindEasePrimaryButton } from '@/src/presentation/components/ui/mindease-primary-button';
import { useAuth } from '@/src/presentation/hooks/use-auth';
import { authStyles as styles } from '@/src/presentation/screens/auth/auth.styles';
import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

function resolveRedirectPath(next: string | string[] | undefined) {
  if (typeof next !== 'string') {
    return '/(tabs)/dashboard';
  }

  if (!next.startsWith('/')) {
    return '/(tabs)/dashboard';
  }

  return next;
}

export function LoginScreen() {
  const router = useRouter();
  const searchParams = useLocalSearchParams<{ next?: string | string[] }>();
  const { login, isLoading, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextPath = useMemo(() => resolveRedirectPath(searchParams.next), [searchParams.next]);

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color={mindeaseTheme.color.primary} />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href={nextPath as Href} />;
  }

  async function handleSubmit() {
    setError(null);
    setIsSubmitting(true);

    const result = await login({ email, password });
    if (!result.ok) {
      setError(result.error ?? 'Nao foi possivel entrar.');
      setIsSubmitting(false);
      return;
    }

    router.replace(nextPath as Href);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <MindEaseCard style={styles.card}>
            <Text style={styles.brand}>MindEase</Text>
            <Text style={styles.title}>Entrar</Text>
            <Text style={styles.subtitle}>Organize sua rotina com foco e leveza.</Text>

            <View style={styles.form}>
              <View style={styles.field}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="voce@email.com"
                  placeholderTextColor={mindeaseTheme.color.mutedForeground}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Senha</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Sua senha"
                  placeholderTextColor={mindeaseTheme.color.mutedForeground}
                  secureTextEntry
                  textContentType="password"
                />
              </View>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <MindEasePrimaryButton
                onPress={() => void handleSubmit()}
                disabled={isSubmitting}
                accessibilityLabel="Entrar"
              >
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </MindEasePrimaryButton>
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Nao tem conta?</Text>
              <Link href={'/cadastro' as Href} style={styles.footerLink}>
                Criar cadastro
              </Link>
            </View>
          </MindEaseCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
