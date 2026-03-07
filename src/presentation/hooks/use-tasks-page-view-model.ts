import { useMemo, useState } from 'react';

import { TaskStatus } from '@/src/domain/entities/task';
import { useAccessibility } from '@/src/presentation/contexts/accessibility-context';
import { useTasks } from '@/src/presentation/hooks/use-tasks';

const orderedStatuses: TaskStatus[] = ['todo', 'in-progress', 'done'];

export function useTasksPageViewModel() {
  const { addTask, moveTask, toggleChecklistItem, getTasksByStatus, loading, error, reload } =
    useTasks();
  const { settings } = useAccessibility();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const visibleByComplexity = useMemo(
    () =>
      ({
        low: 3,
        medium: 6,
        high: Number.MAX_SAFE_INTEGER,
      })[settings.complexityLevel],
    [settings.complexityLevel],
  );

  const columns = useMemo(
    () =>
      orderedStatuses.map((status) => ({
        status,
        tasks: getTasksByStatus(status).slice(0, visibleByComplexity),
      })),
    [getTasksByStatus, visibleByComplexity],
  );

  return {
    columns,
    isAddModalOpen,
    setIsAddModalOpen,
    loading,
    error,
    reload,
    addTask,
    moveTask,
    toggleChecklistItem,
  };
}
