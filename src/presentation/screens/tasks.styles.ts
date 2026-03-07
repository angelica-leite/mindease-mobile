import { StyleSheet } from 'react-native';

import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

export const tasksStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: mindeaseTheme.color.background },
  content: { padding: 16, paddingBottom: 30, gap: 12 },
  title: { fontSize: 30, fontWeight: '800', color: mindeaseTheme.color.foreground },
  subtitle: { marginTop: 2, color: mindeaseTheme.color.mutedForeground },
  errorText: { color: '#b34848' },
  loadingText: { color: mindeaseTheme.color.mutedForeground },
  retryButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: mindeaseTheme.color.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  retryText: { color: mindeaseTheme.color.foreground, fontWeight: '700' },
});
