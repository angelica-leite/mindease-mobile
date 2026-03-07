import { Brain } from 'lucide-react-native/icons';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { mobileNavStyles as styles } from '@/src/presentation/layouts/mobile-nav.styles';
import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

export function MobileNav() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.headerContent}>
        <Pressable style={styles.brandLink} onPress={() => router.push('/(tabs)/dashboard')}>
          <View style={styles.brandIconWrapper}>
            <Brain size={18} color={mindeaseTheme.color.primaryForeground} strokeWidth={2} />
          </View>
          <Text style={styles.brandText}>MindEase</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
