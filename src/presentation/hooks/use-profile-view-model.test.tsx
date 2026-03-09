import { renderHook } from '@testing-library/react-native';

import { useAuth } from '@/src/presentation/hooks/use-auth';
import { useFocusStats } from '@/src/presentation/hooks/use-focus-stats';
import { useTasks } from '@/src/presentation/hooks/use-tasks';
import { useProfileViewModel } from '@/src/presentation/hooks/use-profile-view-model';

jest.mock('@/src/presentation/hooks/use-tasks', () => ({
  useTasks: jest.fn(),
}));
jest.mock('@/src/presentation/hooks/use-auth', () => ({
  useAuth: jest.fn(),
}));
jest.mock('@/src/presentation/hooks/use-focus-stats', () => ({
  useFocusStats: jest.fn(),
}));

const mockedUseTasks = useTasks as jest.MockedFunction<typeof useTasks>;
const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockedUseFocusStats = useFocusStats as jest.MockedFunction<typeof useFocusStats>;

describe('useProfileViewModel', () => {
  it('returns profile copy and stats', () => {
    mockedUseTasks.mockReturnValue({
      tasks: [],
      loading: false,
      error: null,
      stats: { total: 10, todo: 3, inProgress: 2, done: 5 },
      addTask: jest.fn(),
      moveTask: jest.fn(),
      toggleChecklistItem: jest.fn(),
      getTasksByStatus: jest.fn(),
      reload: jest.fn(),
    });
    mockedUseAuth.mockReturnValue({
      profile: null,
      isAuthenticated: false,
      isLoading: false,
      register: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
    });
    mockedUseFocusStats.mockReturnValue({
      isLoading: false,
      focusSessions: 2,
      focusMinutes: 50,
      registerCompletedSession: jest.fn(),
    });

    const { result } = renderHook(() => useProfileViewModel());
    expect(result.current.stats.done).toBe(5);
    expect(result.current.profile.name).toContain('MindEase');
    expect(result.current.profile.focusSessions).toBe('2');
    expect(result.current.profile.focusTime).toBe('50m');
  });
});
