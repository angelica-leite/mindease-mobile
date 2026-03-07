export const mindeaseTheme = {
  color: {
    background: '#f8fcfc',
    foreground: '#26424a',
    card: '#f6fbfb',
    border: '#d4e4e7',
    muted: '#ecf2f3',
    mutedForeground: '#627d85',
    primary: '#36a58f',
    primaryForeground: '#ffffff',
    accent: '#f9e9d8',
    success: '#40ad68',
    focus: '#4e88d1',
    warning: '#e8a53d',
    danger: '#d65b5b',
  },
  radius: {
    xl: 16,
    xxl: 24,
  },
  shadow: {
    card: {
      shadowColor: '#0f252b',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 16,
      elevation: 3,
    },
  },
  icon: {
    sm: 18,
    md: 20,
    avatar: 32,
    stroke: 2,
  },
} as const;
