import { StyleSheet } from 'react-native';

import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mindeaseTheme.color.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    gap: 14,
    borderRadius: mindeaseTheme.radius.xxl,
  },
  brand: {
    fontSize: 26,
    fontWeight: '700',
    color: mindeaseTheme.color.foreground,
    textAlign: 'center',
  },
  brandRow: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: mindeaseTheme.color.foreground,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: mindeaseTheme.color.mutedForeground,
  },
  form: {
    gap: 12,
    marginTop: 8,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: mindeaseTheme.color.foreground,
  },
  input: {
    borderWidth: 1,
    borderColor: mindeaseTheme.color.border,
    backgroundColor: '#ffffff',
    borderRadius: mindeaseTheme.radius.xl,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: mindeaseTheme.color.foreground,
    fontSize: 15,
  },
  error: {
    borderWidth: 1,
    borderColor: '#f0b4b4',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff1f1',
    color: mindeaseTheme.color.danger,
    fontSize: 13,
  },
  hint: {
    color: mindeaseTheme.color.mutedForeground,
    fontSize: 12,
  },
  footerRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    color: mindeaseTheme.color.mutedForeground,
    fontSize: 13,
  },
  footerLink: {
    color: mindeaseTheme.color.primary,
    fontSize: 13,
    fontWeight: '700',
  },
});
