import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

export const styles = StyleSheet.create({
  card: { gap: 8 },
  title: { fontSize: 16, fontWeight: '700', color: mindeaseTheme.color.foreground },
  titleDone: { textDecorationLine: 'line-through', color: mindeaseTheme.color.mutedForeground },
  description: { color: mindeaseTheme.color.mutedForeground, lineHeight: 20 },
  checklistWrap: { gap: 8 },
  checkItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  checkText: { flex: 1, color: mindeaseTheme.color.foreground, marginRight: 8 },
  checkDone: { textDecorationLine: 'line-through', color: mindeaseTheme.color.mutedForeground },
  hiddenCount: { color: mindeaseTheme.color.mutedForeground, fontSize: 12 },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: mindeaseTheme.color.muted,
    overflow: 'hidden',
  },
  progressFill: { height: 6, borderRadius: 999, backgroundColor: mindeaseTheme.color.primary },
  footer: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  estimateWrap: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  estimateText: { color: mindeaseTheme.color.mutedForeground, fontSize: 12 },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#bde8dd',
    backgroundColor: '#eaf8f4',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  actionText: { color: mindeaseTheme.color.primary, fontWeight: '700', fontSize: 12 },
});

export function getCardStyle(priorityBorderColor: string): StyleProp<ViewStyle> {
  return [styles.card, { borderLeftWidth: 4, borderLeftColor: priorityBorderColor }];
}

export function getProgressFillStyle(progress: number): StyleProp<ViewStyle> {
  return [styles.progressFill, { width: `${progress * 100}%` }];
}
