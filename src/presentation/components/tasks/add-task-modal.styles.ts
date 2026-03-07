import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

export const styles = StyleSheet.create({
  keyboardAvoiding: { flex: 1 },
  backdrop: {
    flexGrow: 1,
    backgroundColor: 'rgba(22,34,38,0.35)',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: { gap: 10 },
  title: { fontSize: 22, fontWeight: '800', color: mindeaseTheme.color.foreground },
  subtitle: { color: mindeaseTheme.color.mutedForeground },
  field: { gap: 6 },
  label: { color: mindeaseTheme.color.foreground, fontWeight: '700' },
  input: {
    borderWidth: 1,
    borderColor: mindeaseTheme.color.border,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  multiline: { minHeight: 78, textAlignVertical: 'top' },
  priorityRow: { flexDirection: 'row', gap: 8 },
  priorityButton: { flex: 1, borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  priorityText: { fontWeight: '700' },
  priorityTextSelected: { color: '#fff' },
  priorityTextDefault: { color: mindeaseTheme.color.mutedForeground },
  footer: { marginTop: 4, flexDirection: 'row', gap: 8 },
  cancelButton: {
    borderWidth: 1,
    borderColor: mindeaseTheme.color.border,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  cancelText: { color: mindeaseTheme.color.foreground, fontWeight: '600' },
  fill: { flex: 1 },
});

export function getPriorityButtonStyle(
  isSelected: boolean,
  selectedColor: string,
): StyleProp<ViewStyle> {
  return [
    styles.priorityButton,
    { backgroundColor: isSelected ? selectedColor : mindeaseTheme.color.muted },
  ];
}

export function getPriorityTextStyle(isSelected: boolean): StyleProp<TextStyle> {
  return [styles.priorityText, isSelected ? styles.priorityTextSelected : styles.priorityTextDefault];
}
