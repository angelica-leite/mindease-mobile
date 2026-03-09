import { renderHook } from '@testing-library/react-native';

import { useAuth } from '@/src/presentation/hooks/use-auth';
import { useTasks } from '@/src/presentation/hooks/use-tasks';
import { useProfileViewModel } from '@/src/presentation/hooks/use-profile-view-model';

jest.mock('@/src/presentation/hooks/use-tasks', () => ({
  useTasks: jest.fn(),
}));
jest.mock('@/src/presentation/hooks/use-auth', () => ({
  useAuth: jest.fn(),
}));

const mockedUseTasks = useTasks as jest.MockedFunction<typeof useTasks>;
const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

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

    const { result } = renderHook(() => useProfileViewModel());
    expect(result.current.stats.done).toBe(5);
    expect(result.current.profile.name).toContain('MindEase');
  });
});
