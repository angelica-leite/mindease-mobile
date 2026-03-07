import { StyleSheet } from 'react-native';

import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

export const mobileNavStyles = StyleSheet.create({
  safeArea: {
    backgroundColor: mindeaseTheme.color.card,
    borderBottomWidth: 1,
    borderBottomColor: mindeaseTheme.color.border,
  },
  headerContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandLink: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: mindeaseTheme.color.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: { color: mindeaseTheme.color.foreground, fontWeight: '700', fontSize: 18 },
});
