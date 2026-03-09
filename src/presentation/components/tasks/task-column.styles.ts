import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

export const styles = StyleSheet.create({
  columnCard: { gap: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titleWrap: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  accentDot: { width: 10, height: 10, borderRadius: 999 },
  title: { color: mindeaseTheme.color.foreground, fontWeight: '700', fontSize: 16 },
  count: { color: mindeaseTheme.color.mutedForeground, fontSize: 13 },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#bde8dd',
    backgroundColor: '#eaf8f4',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  addButtonText: { color: mindeaseTheme.color.primary, fontWeight: '700', fontSize: 12 },
  stack: { gap: 8 },
  empty: {
    textAlign: 'center',
    color: mindeaseTheme.color.mutedForeground,
    paddingVertical: 10,
  },
});

export function getAccentDotStyle(color: string): StyleProp<ViewStyle> {
  return [styles.accentDot, { backgroundColor: color }];
}
