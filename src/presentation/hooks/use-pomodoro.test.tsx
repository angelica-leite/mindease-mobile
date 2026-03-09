import { act, renderHook } from '@testing-library/react-native';

import { usePomodoro } from '@/src/presentation/hooks/use-pomodoro';

describe('usePomodoro', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts work phase and counts down time', () => {
    const { result } = renderHook(() => usePomodoro({ workMinutes: 1 }));

    act(() => {
      result.current.startWork();
    });

    expect(result.current.phase).toBe('work');
    expect(result.current.isRunning).toBe(true);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.timeLeft).toBe(59);
  });

  it('skip from work moves to short break and increments cycles', () => {
    const { result } = renderHook(() =>
      usePomodoro({ workMinutes: 1, shortBreakMinutes: 1, cyclesBeforeLongBreak: 4 }),
    );

    act(() => {
      result.current.startWork();
      result.current.skip();
    });

    expect(result.current.phase).toBe('shortBreak');
    expect(result.current.completedCycles).toBe(1);
  });

  it('reset returns to idle state', () => {
    const { result } = renderHook(() => usePomodoro({ workMinutes: 1 }));

    act(() => {
      result.current.startWork();
      result.current.reset();
    });

    expect(result.current.phase).toBe('idle');
    expect(result.current.isRunning).toBe(false);
    expect(result.current.completedCycles).toBe(0);
  });
});
