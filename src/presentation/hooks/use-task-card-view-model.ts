import { useMemo } from 'react';

import { Task, TaskStatus } from '@/src/domain/entities/task';

const statusAction: Record<TaskStatus, { next: TaskStatus; label: string }> = {
  todo: { next: 'in-progress', label: 'Iniciar' },
  'in-progress': { next: 'done', label: 'Concluir' },
  done: { next: 'todo', label: 'Reabrir' },
};

export function useTaskCardViewModel(task: Task) {
  return useMemo(() => {
    const checklist = task.checklist ?? [];
    const checklistDone = checklist.filter((item) => item.completed).length;
    const progress = checklist.length ? checklistDone / checklist.length : 0;

    return {
      action: statusAction[task.status],
      isDone: task.status === 'done',
      hasChecklist: checklist.length > 0,
      visibleChecklistItems: checklist.slice(0, 3),
      hiddenChecklistCount: Math.max(checklist.length - 3, 0),
      checklistProgress: progress,
      estimatedMinutesLabel: task.estimatedMinutes ? `${task.estimatedMinutes} min` : null,
    };
  }, [task]);
}
