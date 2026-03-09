import { useMemo } from 'react';

import {
  AccessibilitySettings,
  useAccessibility,
} from '@/src/presentation/contexts/accessibility-context';

type Option<T extends string> = {
  value: T;
  label: string;
};

export function useSettingsViewModel() {
  const { settings, updateSettings } = useAccessibility();

  const fontSizes = useMemo<Option<AccessibilitySettings['fontSize']>[]>(
    () => [
      { value: 'small', label: 'P' },
      { value: 'medium', label: 'M' },
      { value: 'large', label: 'G' },
      { value: 'xlarge', label: 'XG' },
    ],
    [],
  );

  const spacings = useMemo<Option<AccessibilitySettings['spacing']>[]>(
    () => [
      { value: 'compact', label: 'Compacto' },
      { value: 'comfortable', label: 'Confortável' },
      { value: 'spacious', label: 'Espaçoso' },
    ],
    [],
  );

  const contrastLevels = useMemo<Option<AccessibilitySettings['contrast']>[]>(
    () => [
      { value: 'normal', label: 'Normal' },
      { value: 'high', label: 'Alto' },
    ],
    [],
  );

  const complexityLevels = useMemo<Option<AccessibilitySettings['complexityLevel']>[]>(
    () => [
      { value: 'low', label: 'Baixa' },
      { value: 'medium', label: 'Média' },
      { value: 'high', label: 'Alta' },
    ],
    [],
  );

  const detailLevels = useMemo<Option<AccessibilitySettings['detailLevel']>[]>(
    () => [
      { value: 'summary', label: 'Resumo' },
      { value: 'detailed', label: 'Detalhado' },
    ],
    [],
  );

  const text = useMemo(
    () => ({
      title: 'Configurações',
      subtitle: 'Personalize sua experiência',
      fontSizeLabel: 'Tamanho da fonte',
      spacingLabel: 'Espaçamento',
      contrastLabel: 'Contraste',
      complexityLabel: 'Complexidade',
      detailLabel: 'Nível de detalhe',
      reducedMotionLabel: 'Reduzir animações',
      simplifiedViewLabel: 'Visual simplificado',
    }),
    [],
  );

  return {
    settings,
    text,
    fontSizes,
    spacings,
    contrastLevels,
    complexityLevels,
    detailLevels,
    setFontSize: (fontSize: (typeof fontSizes)[number]['value']) => updateSettings({ fontSize }),
    setSpacing: (spacing: (typeof spacings)[number]['value']) => updateSettings({ spacing }),
    setContrast: (contrast: (typeof contrastLevels)[number]['value']) =>
      updateSettings({ contrast }),
    setComplexityLevel: (complexityLevel: (typeof complexityLevels)[number]['value']) =>
      updateSettings({ complexityLevel }),
    setDetailLevel: (detailLevel: (typeof detailLevels)[number]['value']) =>
      updateSettings({ detailLevel }),
    setReducedMotion: (reducedMotion: boolean) => updateSettings({ reducedMotion }),
    setSimplifiedView: (simplifiedView: boolean) => updateSettings({ simplifiedView }),
  };
}
