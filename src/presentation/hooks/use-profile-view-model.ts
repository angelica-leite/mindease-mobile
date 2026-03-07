import { useMemo } from 'react';

import { useTasks } from '@/src/presentation/hooks/use-tasks';

export function useProfileViewModel() {
  const { stats } = useTasks();

  const profile = useMemo(
    () => ({
      title: 'Meu perfil',
      subtitle: 'Suas informações e progresso',
      name: 'Usuário MindEase',
      email: 'usuario@example.com',
      memberSince: 'Membro desde Janeiro 2026',
      focusSessions: '12',
      focusTime: '5h',
    }),
    [],
  );

  return { stats, profile };
}
