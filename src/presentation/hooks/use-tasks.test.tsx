import { act, renderHook, waitFor } from '@testing-library/react-native';

import { Task } from '@/src/domain/entities/task';
import { taskServices } from '@/src/infrastructure/di/tasks';
import { useTasks } from '@/src/presentation/hooks/use-tasks';

jest.mock('@/src/infrastructure/di/tasks', () => ({
  taskServices: {
    add: { execute: jest.fn() },
    list: { execute: jest.fn() },
    move: { execute: jest.fn() },
    toggleChecklist: { execute: jest.fn() },
  },
}));

const mockedTaskServices = taskServices as jest.Mocked<typeof taskServices>;
const listExecute = mockedTaskServices.list.execute as jest.Mock;
const addExecute = mockedTaskServices.add.execute as jest.Mock;

const baseTask: Task = {
  id: '1',
  title: 'Estudar Jest',
  status: 'todo',
  priority: 'medium',
  createdAt: new Date().toISOString(),
};

describe('useTasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads tasks and computes stats', async () => {
    listExecute.mockResolvedValue([
      baseTask,
      { ...baseTask, id: '2', status: 'done' },
      { ...baseTask, id: '3', status: 'in-progress' },
    ]);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.tasks).toHaveLength(3);
    expect(result.current.stats).toEqual({ total: 3, todo: 1, inProgress: 1, done: 1 });
    expect(result.current.error).toBeNull();
  });

  it('updates state when adding a task', async () => {
    listExecute.mockResolvedValue([baseTask]);
    addExecute.mockResolvedValue([
      baseTask,
      { ...baseTask, id: '2', title: 'Nova tarefa' },
    ]);

    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.addTask({
        title: 'Nova tarefa',
        status: 'todo',
        priority: 'low',
      });
    });

    expect(addExecute).toHaveBeenCalledTimes(1);
    expect(result.current.tasks).toHaveLength(2);
    expect(result.current.stats.total).toBe(2);
  });
});
