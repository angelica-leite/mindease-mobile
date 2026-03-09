import { renderHook } from '@testing-library/react-native';

import { Task } from '@/src/domain/entities/task';
import { useTaskCardViewModel } from '@/src/presentation/hooks/use-task-card-view-model';

describe('useTaskCardViewModel', () => {
  const baseTask: Task = {
    id: '1',
    title: 'Task',
    status: 'todo',
    priority: 'medium',
    createdAt: new Date().toISOString(),
  };

  it('maps status to action', () => {
    const { result } = renderHook(() => useTaskCardViewModel(baseTask));
    expect(result.current.action).toEqual({ next: 'in-progress', label: 'Iniciar' });
  });

  it('computes checklist data and progress', () => {
    const task: Task = {
      ...baseTask,
      checklist: [
        { id: '1', text: 'a', completed: true },
        { id: '2', text: 'b', completed: false },
        { id: '3', text: 'c', completed: false },
        { id: '4', text: 'd', completed: true },
      ],
    };

    const { result } = renderHook(() => useTaskCardViewModel(task));
    expect(result.current.hasChecklist).toBe(true);
    expect(result.current.visibleChecklistItems).toHaveLength(3);
    expect(result.current.hiddenChecklistCount).toBe(1);
    expect(result.current.checklistProgress).toBe(0.5);
  });

  it('shows estimated minutes label when present', () => {
    const { result } = renderHook(() =>
      useTaskCardViewModel({ ...baseTask, estimatedMinutes: 25 }),
    );
    expect(result.current.estimatedMinutesLabel).toBe('25 min');
  });
});
