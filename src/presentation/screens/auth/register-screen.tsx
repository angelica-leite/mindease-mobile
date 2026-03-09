import { type Href, Link, Redirect, useRouter } from 'expo-router';
import { useState } from 'react';
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
import { Brain } from 'lucide-react-native/icons';
import { mobileNavStyles } from '../../layouts/mobile-nav.styles';

export function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading, isAuthenticated } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color={mindeaseTheme.color.primary} />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/dashboard" />;
  }

  async function handleSubmit() {
    setError(null);
    setIsSubmitting(true);

    const result = await register({ name, email, password });
    if (!result.ok) {
      setError(result.error ?? 'Nao foi possivel criar a conta.');
      setIsSubmitting(false);
      return;
    }

    router.replace('/(tabs)/dashboard');
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <MindEaseCard style={styles.card}>
            <View style={styles.brandRow}>
              <View style={mobileNavStyles.brandIconWrapper}>
                <Brain size={18} color={mindeaseTheme.color.primaryForeground} strokeWidth={2} />
              </View>
              <Text style={styles.brand}>MindEase</Text>
            </View>{' '}
            <Text style={styles.title}>Criar conta</Text>
            <Text style={styles.subtitle}>Monte seu perfil e acompanhe seu progresso.</Text>
            <View style={styles.form}>
              <View style={styles.field}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Seu nome"
                  placeholderTextColor={mindeaseTheme.color.mutedForeground}
                  autoCapitalize="words"
                  autoCorrect={false}
                  textContentType="name"
                />
              </View>

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
                  placeholder="Minimo de 6 caracteres"
                  placeholderTextColor={mindeaseTheme.color.mutedForeground}
                  secureTextEntry
                  textContentType="newPassword"
                />
              </View>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <MindEasePrimaryButton
                onPress={() => void handleSubmit()}
                disabled={isSubmitting}
                accessibilityLabel="Cadastrar"
              >
                {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
              </MindEasePrimaryButton>
            </View>
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Já tem conta?</Text>
              <Link href={'/login' as Href} style={styles.footerLink}>
                Entrar
              </Link>
            </View>
          </MindEaseCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
