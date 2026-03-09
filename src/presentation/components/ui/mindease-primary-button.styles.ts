import { StyleSheet } from 'react-native';

import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

export const mindeasePrimaryButtonStyles = StyleSheet.create({
  pressable: {
    borderRadius: mindeaseTheme.radius.xl,
  },
  gradient: {
    borderRadius: mindeaseTheme.radius.xl,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: mindeaseTheme.color.primaryForeground,
    fontSize: 15,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.65,
  },
});
