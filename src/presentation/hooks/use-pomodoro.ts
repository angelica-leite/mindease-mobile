import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type PomodoroPhase = 'work' | 'shortBreak' | 'longBreak' | 'idle';

type PomodoroSettings = {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  cyclesBeforeLongBreak: number;
};

const defaultSettings: PomodoroSettings = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  cyclesBeforeLongBreak: 4,
};

type IntervalId = ReturnType<typeof setInterval>;

export function usePomodoro(settings: Partial<PomodoroSettings> = {}) {
  const config = useMemo(() => ({ ...defaultSettings, ...settings }), [settings]);

  const [phase, setPhase] = useState<PomodoroPhase>('idle');
  const [timeLeft, setTimeLeft] = useState(() => config.workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);

  const intervalRef = useRef<IntervalId | null>(null);

  const getPhaseTime = useCallback(
    (currentPhase: PomodoroPhase) => {
      switch (currentPhase) {
        case 'work':
          return config.workMinutes * 60;
        case 'shortBreak':
          return config.shortBreakMinutes * 60;
        case 'longBreak':
          return config.longBreakMinutes * 60;
        case 'idle':
        default:
          return config.workMinutes * 60;
      }
    },
    [config.longBreakMinutes, config.shortBreakMinutes, config.workMinutes],
  );

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startWork = useCallback(() => {
    clearTimer();
    setPhase('work');
    setTimeLeft(config.workMinutes * 60);
    setIsRunning(true);
  }, [clearTimer, config.workMinutes]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    setIsRunning((current) => (phase === 'idle' ? current : true));
  }, [phase]);

  const reset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setPhase('idle');
    setTimeLeft(config.workMinutes * 60);
    setCompletedCycles(0);
  }, [clearTimer, config.workMinutes]);

  const skip = useCallback(() => {
    clearTimer();
    setIsRunning(false);

    setPhase((currentPhase) => {
      if (currentPhase === 'work') {
        setCompletedCycles((currentCycles) => {
          const nextCycles = currentCycles + 1;
          const isLongBreak = nextCycles % config.cyclesBeforeLongBreak === 0;
          setPhase(isLongBreak ? 'longBreak' : 'shortBreak');
          setTimeLeft((isLongBreak ? config.longBreakMinutes : config.shortBreakMinutes) * 60);
          return nextCycles;
        });
        return currentPhase;
      }

      setPhase('work');
      setTimeLeft(config.workMinutes * 60);
      return 'work';
    });
  }, [
    clearTimer,
    config.cyclesBeforeLongBreak,
    config.longBreakMinutes,
    config.shortBreakMinutes,
    config.workMinutes,
  ]);

  useEffect(() => {
    if (!isRunning || phase === 'idle') {
      clearTimer();
      return;
    }

    clearTimer();

    intervalRef.current = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          clearTimer();
          queueMicrotask(() => skip());
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return clearTimer;
  }, [clearTimer, isRunning, phase, skip]);

  const formattedTime = useMemo(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, [timeLeft]);

  const progress = useMemo(() => {
    if (phase === 'idle') return 0;
    const total = getPhaseTime(phase);
    if (!total) return 0;
    return ((total - timeLeft) / total) * 100;
  }, [getPhaseTime, phase, timeLeft]);

  return {
    phase,
    timeLeft,
    formattedTime,
    isRunning,
    completedCycles,
    progress,
    startWork,
    pause,
    resume,
    reset,
    skip,
  };
}
