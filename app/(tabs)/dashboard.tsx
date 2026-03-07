import { useRouter } from 'expo-router';
import { Leaf, Sparkles } from 'lucide-react-native/icons';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MindEaseCard } from '@/src/presentation/components/ui/mindease-card';
import { MindEasePrimaryButton } from '@/src/presentation/components/ui/mindease-primary-button';
import { useAccessibilityUI } from '@/src/presentation/hooks/use-accessibility-ui';
import { useDashboardViewModel } from '@/src/presentation/hooks/use-dashboard-view-model';
import { dashboardStyles as styles } from '@/src/presentation/screens/dashboard.styles';
import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

export default function DashboardScreen() {
  const { loading, stats, ui } = useDashboardViewModel();
  const a11y = useAccessibilityUI();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: a11y.backgroundColor }]} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { padding: a11y.space(18), gap: a11y.space(14), paddingBottom: a11y.space(28) },
        ]}
      >
        <View style={styles.hero}>
          <View>
            <Text style={[styles.title, { fontSize: a11y.font(30), color: a11y.textColor }]}>
              {ui.title}
            </Text>
            {!a11y.summaryMode ? (
              <Text style={[styles.subtitle, { color: a11y.mutedTextColor }]}>{ui.subtitle}</Text>
            ) : null}
          </View>
        </View>

        {!a11y.simplified ? (
          <MindEaseCard style={[styles.alertCard, { borderColor: a11y.cardBorderColor }]}>
            <Leaf
              size={mindeaseTheme.icon.sm}
              color={mindeaseTheme.color.primary}
              strokeWidth={mindeaseTheme.icon.stroke}
            />
            <Text style={[styles.alertText, { color: a11y.textColor }]}>{ui.alertMessage}</Text>
          </MindEaseCard>
        ) : null}

        <View style={styles.statsRow}>
          <MindEaseCard style={[styles.statCard, { borderColor: a11y.cardBorderColor }]}>
            <Text style={[styles.statValue, { fontSize: a11y.font(26), color: a11y.textColor }]}>
              {loading ? '...' : stats.total}
            </Text>
            <Text style={[styles.statLabel, { color: a11y.mutedTextColor }]}>Total</Text>
          </MindEaseCard>
          <MindEaseCard style={[styles.statCard, { borderColor: a11y.cardBorderColor }]}>
            <Text style={[styles.statValue, { fontSize: a11y.font(26), color: a11y.textColor }]}>
              {loading ? '...' : stats.done}
            </Text>
            <Text style={[styles.statLabel, { color: a11y.mutedTextColor }]}>Concluidas</Text>
          </MindEaseCard>
        </View>

        <View style={styles.statsRow}>
          <MindEaseCard style={[styles.statCard, { borderColor: a11y.cardBorderColor }]}>
            <Text style={[styles.statValue, { fontSize: a11y.font(26), color: a11y.textColor }]}>
              {loading ? '...' : stats.inProgress}
            </Text>
            <Text style={[styles.statLabel, { color: a11y.mutedTextColor }]}>Em Progresso</Text>
          </MindEaseCard>
          <MindEaseCard style={[styles.statCard, { borderColor: a11y.cardBorderColor }]}>
            <Text style={[styles.statValue, { fontSize: a11y.font(26), color: a11y.textColor }]}>
              {loading ? '...' : stats.todo}
            </Text>
            <Text style={[styles.statLabel, { color: a11y.mutedTextColor }]}>A Fazer</Text>
          </MindEaseCard>
        </View>

        <View style={[styles.focusButtonWrap, { marginTop: a11y.space(30) }]}>
          <MindEasePrimaryButton
            onPress={() => router.push('/(tabs)/pomodoro')}
            leftIcon={
              <Sparkles
                size={16}
                color={mindeaseTheme.color.primaryForeground}
                strokeWidth={mindeaseTheme.icon.stroke}
                style={styles.focusButtonIcon}
              />
            }
          >
            Iniciar Foco
          </MindEasePrimaryButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
