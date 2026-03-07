import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type AccessibilitySettings = {
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  contrast: 'normal' | 'high';
  spacing: 'compact' | 'comfortable' | 'spacious';
  complexityLevel: 'low' | 'medium' | 'high';
  detailLevel: 'summary' | 'detailed';
  reducedMotion: boolean;
  simplifiedView: boolean;
};

type AccessibilityContextValue = {
  settings: AccessibilitySettings;
  isReady: boolean;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
};

const STORAGE_KEY = 'mindease:accessibility';

const defaultSettings: AccessibilitySettings = {
  fontSize: 'medium',
  contrast: 'normal',
  spacing: 'comfortable',
  complexityLevel: 'medium',
  detailLevel: 'detailed',
  reducedMotion: false,
  simplifiedView: false,
};

const AccessibilityContext = createContext<AccessibilityContextValue | undefined>(undefined);

export function AccessibilityProvider({ children }: { readonly children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw) as Partial<AccessibilitySettings>;
        if (!cancelled) {
          setSettings((current) => ({ ...current, ...parsed }));
        }
      } catch {
        // Keeps defaults when storage fails.
      } finally {
        if (!cancelled) {
          setIsReady(true);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...newSettings };
      void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const value = useMemo(
    () => ({
      settings,
      isReady,
      updateSettings,
    }),
    [settings, isReady],
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
