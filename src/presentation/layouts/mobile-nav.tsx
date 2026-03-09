import { Brain } from 'lucide-react-native/icons';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { type Href, useRouter } from 'expo-router';

import { useAuth } from '@/src/presentation/hooks/use-auth';
import { mobileNavStyles as styles } from '@/src/presentation/layouts/mobile-nav.styles';
import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

export function MobileNav() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.replace('/login' as Href);
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.headerContent}>
        <Pressable style={styles.brandLink} onPress={() => router.replace('/(tabs)/dashboard')}>
          <View style={styles.brandIconWrapper}>
            <Brain size={18} color={mindeaseTheme.color.primaryForeground} strokeWidth={2} />
          </View>
          <Text style={styles.brandText}>MindEase</Text>
        </Pressable>
        {isAuthenticated ? (
          <Pressable style={styles.logoutButton} onPress={() => void handleLogout()}>
            <Text style={styles.logoutText}>Sair</Text>
          </Pressable>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
