import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useAuth } from '@/src/presentation/hooks/use-auth';

type FocusStats = {
  sessions: number;
  minutes: number;
};

type FocusStatsMap = Record<string, FocusStats>;

const FOCUS_STATS_STORAGE_KEY = 'mindease-focus-stats';

const defaultStats: FocusStats = {
  sessions: 0,
  minutes: 0,
};

export function useFocusStats() {
  const { profile } = useAuth();
  const profileKey = profile?.id ?? profile?.email ?? null;
  const [allStats, setAllStats] = useState<FocusStatsMap>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const raw = await AsyncStorage.getItem(FOCUS_STATS_STORAGE_KEY);
        if (!raw) {
          if (!cancelled) {
            setAllStats({});
          }
          return;
        }

        const parsed = JSON.parse(raw) as FocusStatsMap;
        if (!cancelled && parsed && typeof parsed === 'object') {
          setAllStats(parsed);
        }
      } catch {
        if (!cancelled) {
          setAllStats({});
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const current = useMemo<FocusStats>(() => {
    if (!profileKey) {
      return defaultStats;
    }

    return allStats[profileKey] ?? defaultStats;
  }, [allStats, profileKey]);

  const registerCompletedSession = useCallback(
    async (sessionCount = 1, minutesPerSession = 25) => {
      if (!profileKey || sessionCount <= 0) {
        return;
      }

      const addedMinutes = sessionCount * minutesPerSession;

      setAllStats((previous) => {
        const existing = previous[profileKey] ?? defaultStats;
        const next: FocusStatsMap = {
          ...previous,
          [profileKey]: {
            sessions: existing.sessions + sessionCount,
            minutes: existing.minutes + addedMinutes,
          },
        };

        void AsyncStorage.setItem(FOCUS_STATS_STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    [profileKey],
  );

  return {
    isLoading,
    focusSessions: current.sessions,
    focusMinutes: current.minutes,
    registerCompletedSession,
  };
}
