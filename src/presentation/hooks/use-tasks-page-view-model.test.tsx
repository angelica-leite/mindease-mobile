import { act, renderHook } from '@testing-library/react-native';

import { useAccessibility } from '@/src/presentation/contexts/accessibility-context';
import { useTasks } from '@/src/presentation/hooks/use-tasks';
import { useTasksPageViewModel } from '@/src/presentation/hooks/use-tasks-page-view-model';

jest.mock('@/src/presentation/hooks/use-tasks', () => ({
  useTasks: jest.fn(),
}));

jest.mock('@/src/presentation/contexts/accessibility-context', () => ({
  useAccessibility: jest.fn(),
}));

const mockedUseTasks = useTasks as jest.MockedFunction<typeof useTasks>;
const mockedUseAccessibility = useAccessibility as jest.MockedFunction<typeof useAccessibility>;

describe('useTasksPageViewModel', () => {
  it('limits tasks by complexity level and toggles modal state', () => {
    mockedUseTasks.mockReturnValue({
      tasks: [],
      loading: false,
      error: null,
      stats: { total: 0, todo: 0, inProgress: 0, done: 0 },
      addTask: jest.fn(),
      moveTask: jest.fn(),
      toggleChecklistItem: jest.fn(),
      getTasksByStatus: jest.fn((status) =>
        status === 'todo'
          ? Array.from({ length: 10 }).map((_, i) => ({
              id: String(i),
              title: `T${i}`,
              status: 'todo',
              priority: 'medium',
              createdAt: new Date().toISOString(),
            }))
          : [],
      ),
      reload: jest.fn(),
    });

    mockedUseAccessibility.mockReturnValue({
      settings: {
        fontSize: 'medium',
        spacing: 'comfortable',
        contrast: 'normal',
        complexityLevel: 'low',
        detailLevel: 'detailed',
        reducedMotion: false,
        simplifiedView: false,
      },
      isReady: true,
      updateSettings: jest.fn(),
    });

    const { result } = renderHook(() => useTasksPageViewModel());

    const todoColumn = result.current.columns.find((c) => c.status === 'todo');
    expect(todoColumn?.tasks).toHaveLength(3);
    expect(result.current.isAddModalOpen).toBe(false);

    act(() => {
      result.current.setIsAddModalOpen(true);
    });

    expect(result.current.isAddModalOpen).toBe(true);
  });
});
