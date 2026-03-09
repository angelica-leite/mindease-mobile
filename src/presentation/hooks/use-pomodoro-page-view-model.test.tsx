import { renderHook } from '@testing-library/react-native';

import { usePomodoro } from '@/src/presentation/hooks/use-pomodoro';
import { usePomodoroPageViewModel } from '@/src/presentation/hooks/use-pomodoro-page-view-model';

jest.mock('@/src/presentation/hooks/use-pomodoro', () => ({
  usePomodoro: jest.fn(),
}));

const mockedUsePomodoro = usePomodoro as jest.MockedFunction<typeof usePomodoro>;

describe('usePomodoroPageViewModel', () => {
  it('maps controller state to page vm fields', () => {
    mockedUsePomodoro.mockReturnValue({
      phase: 'work',
      timeLeft: 1200,
      formattedTime: '20:00',
      isRunning: true,
      completedCycles: 1,
      progress: 10,
      startWork: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      reset: jest.fn(),
      skip: jest.fn(),
    });

    const { result } = renderHook(() => usePomodoroPageViewModel());

    expect(result.current.showFocusedMode).toBe(true);
    expect(result.current.phaseLabel).toBe('Tempo de foco');
    expect(result.current.cycleIndicators).toHaveLength(4);
    expect(result.current.cyclesUntilLongBreak).toBe(3);
    expect(result.current.tips).toHaveLength(3);
  });
});
