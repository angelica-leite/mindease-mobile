import { renderHook } from '@testing-library/react-native';

import { useTasks } from '@/src/presentation/hooks/use-tasks';
import { useDashboardViewModel } from '@/src/presentation/hooks/use-dashboard-view-model';

jest.mock('@/src/presentation/hooks/use-tasks', () => ({
  useTasks: jest.fn(),
}));

const mockedUseTasks = useTasks as jest.MockedFunction<typeof useTasks>;

describe('useDashboardViewModel', () => {
  it('returns loading, stats and static UI copy', () => {
    mockedUseTasks.mockReturnValue({
      tasks: [],
      loading: false,
      error: null,
      stats: { total: 2, todo: 1, inProgress: 1, done: 0 },
      addTask: jest.fn(),
      moveTask: jest.fn(),
      toggleChecklistItem: jest.fn(),
      getTasksByStatus: jest.fn(),
      reload: jest.fn(),
    });

    const { result } = renderHook(() => useDashboardViewModel());

    expect(result.current.loading).toBe(false);
    expect(result.current.stats.total).toBe(2);
    expect(result.current.ui.title).toBeTruthy();
    expect(result.current.ui.alertMessage).toContain('respire');
  });
});
