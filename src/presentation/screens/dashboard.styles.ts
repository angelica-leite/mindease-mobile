import { StyleSheet } from 'react-native';

import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

export const dashboardStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: mindeaseTheme.color.background },
  content: { padding: 18, gap: 14, paddingBottom: 28 },
  hero: { flexDirection: 'column', justifyContent: 'flex-start' },
  title: { color: mindeaseTheme.color.foreground, fontSize: 30, fontWeight: '800' },
  subtitle: { color: mindeaseTheme.color.mutedForeground, marginTop: 2 },
  focusButtonWrap: {
    marginTop: 30,
    width: '100%',
    maxWidth: 180,
    alignSelf: 'center',
  },
  focusButtonIcon: { marginRight: 8 },
  alertCard: {
    backgroundColor: '#e9f7f2',
    borderColor: '#c8ebdf',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  alertText: { color: mindeaseTheme.color.foreground, flex: 1 },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 26, fontWeight: '800', color: mindeaseTheme.color.foreground },
  statLabel: { color: mindeaseTheme.color.mutedForeground },
});
