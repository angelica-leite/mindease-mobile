import { StyleSheet } from 'react-native';

import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

export const profileStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: mindeaseTheme.color.background },
  content: { padding: 18, gap: 14, paddingBottom: 24 },
  title: { fontSize: 30, fontWeight: '800', color: mindeaseTheme.color.foreground },
  subtitle: { color: mindeaseTheme.color.mutedForeground },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatarWrap: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: '#dff4ef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: mindeaseTheme.color.border,
    borderRadius: 999,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  iconLogoutButton: {
    color: mindeaseTheme.color.mutedForeground,
  },
  logoutText: {
    color: mindeaseTheme.color.mutedForeground,
    fontWeight: '700',
    fontSize: 13,
  },
  profileInfo: { flex: 1, gap: 3 },
  profileName: { fontSize: 20, fontWeight: '700', color: mindeaseTheme.color.foreground },
  profileMeta: { color: mindeaseTheme.color.mutedForeground },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, alignItems: 'center' },
  doneValue: { fontSize: 30, fontWeight: '800', color: mindeaseTheme.color.success },
  focusValue: { fontSize: 30, fontWeight: '800', color: mindeaseTheme.color.focus },
  primaryValue: { fontSize: 30, fontWeight: '800', color: mindeaseTheme.color.primary },
  statLabel: { color: mindeaseTheme.color.mutedForeground },
});
