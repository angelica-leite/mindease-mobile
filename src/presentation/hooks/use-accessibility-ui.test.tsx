import { renderHook } from '@testing-library/react-native';

import { useAccessibility } from '@/src/presentation/contexts/accessibility-context';
import { useAccessibilityUI } from '@/src/presentation/hooks/use-accessibility-ui';

jest.mock('@/src/presentation/contexts/accessibility-context', () => ({
  useAccessibility: jest.fn(),
}));

const mockedUseAccessibility = useAccessibility as jest.MockedFunction<typeof useAccessibility>;

describe('useAccessibilityUI', () => {
  it('maps high contrast settings and scales', () => {
    mockedUseAccessibility.mockReturnValue({
      settings: {
        fontSize: 'large',
        spacing: 'spacious',
        contrast: 'high',
        complexityLevel: 'medium',
        detailLevel: 'summary',
        reducedMotion: false,
        simplifiedView: true,
      },
      isReady: true,
      updateSettings: jest.fn(),
    });

    const { result } = renderHook(() => useAccessibilityUI());

    expect(result.current.highContrast).toBe(true);
    expect(result.current.summaryMode).toBe(true);
    expect(result.current.simplified).toBe(true);
    expect(result.current.font(20)).toBe(22);
    expect(result.current.space(10)).toBe(12);
    expect(result.current.textColor).toBe('#102026');
  });
});
