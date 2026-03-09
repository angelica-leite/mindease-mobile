import { LogOut, User } from 'lucide-react-native/icons';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MindEaseCard } from '@/src/presentation/components/ui/mindease-card';
import { useAccessibilityUI } from '@/src/presentation/hooks/use-accessibility-ui';
import { useAuth } from '@/src/presentation/hooks/use-auth';
import { useProfileViewModel } from '@/src/presentation/hooks/use-profile-view-model';
import { profileStyles as styles } from '@/src/presentation/screens/profile.styles';
import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';
import { Href, router } from 'expo-router';

export default function ProfileScreen() {
  const { stats, profile } = useProfileViewModel();
  const a11y = useAccessibilityUI();

  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.replace('/login' as Href);
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: a11y.backgroundColor }]}
      edges={['bottom']}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { padding: a11y.space(18), gap: a11y.space(14), paddingBottom: a11y.space(24) },
        ]}
      >
        <View>
          <Text
            accessibilityRole="header"
            style={[styles.title, { fontSize: a11y.font(30), color: a11y.textColor }]}
          >
            {profile.title}
          </Text>
          {!a11y.summaryMode ? (
            <Text style={[styles.subtitle, { color: a11y.mutedTextColor }]}>
              {profile.subtitle}
            </Text>
          ) : null}
        </View>

        <MindEaseCard style={[styles.profileCard, { borderColor: a11y.cardBorderColor }]}>
          <View style={styles.avatarWrap}>
            <User
              size={mindeaseTheme.icon.avatar}
              color={mindeaseTheme.color.primary}
              strokeWidth={mindeaseTheme.icon.stroke}
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { fontSize: a11y.font(20), color: a11y.textColor }]}>
              {profile.name}
            </Text>
            {!a11y.summaryMode ? (
              <>
                <Text style={[styles.profileMeta, { color: a11y.mutedTextColor }]}>
                  {profile.email}
                </Text>
                <Text style={[styles.profileMeta, { color: a11y.mutedTextColor }]}>
                  {profile.memberSince}
                </Text>
              </>
            ) : null}
          </View>
        </MindEaseCard>

        <View style={styles.statsRow}>
          <MindEaseCard style={[styles.statCard, { borderColor: a11y.cardBorderColor }]}>
            <Text style={[styles.doneValue, { fontSize: a11y.font(30) }]}>{stats.done}</Text>
            <Text style={[styles.statLabel, { color: a11y.mutedTextColor }]}>Concluídas</Text>
          </MindEaseCard>
          <MindEaseCard style={[styles.statCard, { borderColor: a11y.cardBorderColor }]}>
            <Text style={[styles.focusValue, { fontSize: a11y.font(30) }]}>
              {profile.focusSessions}
            </Text>
            <Text style={[styles.statLabel, { color: a11y.mutedTextColor }]}>Sessões</Text>
          </MindEaseCard>
          <MindEaseCard style={[styles.statCard, { borderColor: a11y.cardBorderColor }]}>
            <Text style={[styles.primaryValue, { fontSize: a11y.font(30) }]}>
              {profile.focusTime}
            </Text>
            <Text style={[styles.statLabel, { color: a11y.mutedTextColor }]}>Foco</Text>
          </MindEaseCard>
        </View>
        <Pressable style={styles.logoutButton} onPress={() => void handleLogout()}>
          <LogOut color={styles.iconLogoutButton.color} />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
