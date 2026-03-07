import { useMemo } from 'react';

import { useTasks } from '@/src/presentation/hooks/use-tasks';

export function useDashboardViewModel() {
  const { loading, stats } = useTasks();

  const ui = useMemo(
    () => ({
      title: 'Olá',
      subtitle: 'Vamos organizar suas tarefas com calma',
      alertMessage: 'Lembre-se: respire fundo. Você está fazendo um ótimo trabalho.',
    }),
    [],
  );

  return { loading, stats, ui };
}
