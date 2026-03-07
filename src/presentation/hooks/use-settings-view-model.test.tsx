import { renderHook } from '@testing-library/react-native';

import { useAccessibility } from '@/src/presentation/contexts/accessibility-context';
import { useSettingsViewModel } from '@/src/presentation/hooks/use-settings-view-model';

jest.mock('@/src/presentation/contexts/accessibility-context', () => ({
  useAccessibility: jest.fn(),
}));

const mockedUseAccessibility = useAccessibility as jest.MockedFunction<typeof useAccessibility>;

describe('useSettingsViewModel', () => {
  it('exposes options and calls update setters', () => {
    const updateSettings = jest.fn();
    mockedUseAccessibility.mockReturnValue({
      settings: {
        fontSize: 'medium',
        spacing: 'comfortable',
        contrast: 'normal',
        complexityLevel: 'medium',
        detailLevel: 'detailed',
        reducedMotion: false,
        simplifiedView: false,
      },
      isReady: true,
      updateSettings,
    });

    const { result } = renderHook(() => useSettingsViewModel());
    result.current.setFontSize('large');
    result.current.setReducedMotion(true);

    expect(result.current.fontSizes).toHaveLength(4);
    expect(result.current.spacings).toHaveLength(3);
    expect(updateSettings).toHaveBeenCalledWith({ fontSize: 'large' });
    expect(updateSettings).toHaveBeenCalledWith({ reducedMotion: true });
  });
});
