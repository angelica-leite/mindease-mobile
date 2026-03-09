import { StyleSheet } from 'react-native';

import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

export const settingsStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: mindeaseTheme.color.background },
  content: { padding: 18, gap: 14, paddingBottom: 24 },
  title: { fontSize: 30, fontWeight: '800', color: mindeaseTheme.color.foreground },
  subtitle: { color: mindeaseTheme.color.mutedForeground },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: mindeaseTheme.color.foreground },
  card: { gap: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  label: { fontWeight: '700', color: mindeaseTheme.color.foreground },
  optionsRow: { flexDirection: 'row', gap: 8 },
  option: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  optionActive: { backgroundColor: mindeaseTheme.color.primary },
  optionInactive: { backgroundColor: mindeaseTheme.color.muted },
  optionActiveText: { color: mindeaseTheme.color.primaryForeground, fontWeight: '700' },
  optionInactiveText: { color: mindeaseTheme.color.mutedForeground, fontWeight: '700' },
  stackedOptions: { gap: 8 },
  sectionDescription: { color: mindeaseTheme.color.mutedForeground, fontSize: 12 },
  switchCard: { gap: 14 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
