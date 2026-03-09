import { useMemo } from 'react';

import { useAccessibility } from '@/src/presentation/contexts/accessibility-context';
import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

const FONT_SCALE = {
  small: 0.9,
  medium: 1,
  large: 1.1,
  xlarge: 1.25,
} as const;

const SPACING_SCALE = {
  compact: 0.85,
  comfortable: 1,
  spacious: 1.2,
} as const;

export function useAccessibilityUI() {
  const { settings } = useAccessibility();

  return useMemo(() => {
    const fontScale = FONT_SCALE[settings.fontSize];
    const spacingScale = SPACING_SCALE[settings.spacing];
    const highContrast = settings.contrast === 'high';

    return {
      settings,
      highContrast,
      simplified: settings.simplifiedView,
      summaryMode: settings.detailLevel === 'summary',
      font: (size: number) => Math.round(size * fontScale),
      space: (value: number) => Math.round(value * spacingScale),
      textColor: highContrast ? '#102026' : mindeaseTheme.color.foreground,
      mutedTextColor: highContrast ? '#2f4a53' : mindeaseTheme.color.mutedForeground,
      backgroundColor: highContrast ? '#ffffff' : mindeaseTheme.color.background,
      cardBorderColor: highContrast ? '#8ea3aa' : mindeaseTheme.color.border,
    };
  }, [settings]);
}
