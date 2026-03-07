import { useMemo } from 'react';

import { TaskStatus } from '@/src/domain/entities/task';

export function useTaskColumnViewModel(status: TaskStatus, taskCount: number) {
  return useMemo(() => {
    const label =
      status === 'todo' ? 'A Fazer' : status === 'in-progress' ? 'Em Progresso' : 'Concluído';

    const accentColor =
      status === 'todo' ? '#627d85' : status === 'in-progress' ? '#4e88d1' : '#40ad68';

    return {
      label,
      taskCountLabel: `(${taskCount})`,
      accentColor,
      showAddButton: status === 'todo',
      emptyText: 'Nenhuma tarefa aqui',
    };
  }, [status, taskCount]);
}
