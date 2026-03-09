import { useMemo } from 'react';

import { useAuth } from '@/src/presentation/hooks/use-auth';
import { useTasks } from '@/src/presentation/hooks/use-tasks';

export function useProfileViewModel() {
  const { stats } = useTasks();
  const { profile } = useAuth();

  const profileUi = useMemo(
    () => ({
      title: 'Meu perfil',
      subtitle: 'Suas informacoes e progresso',
      name: profile?.name ?? 'Usuario MindEase',
      email: profile?.email ?? 'usuario@example.com',
      memberSince: profile?.createdAt
        ? `Membro desde ${new Date(profile.createdAt).toLocaleDateString('pt-BR', {
            month: 'long',
            year: 'numeric',
          })}`
        : 'Membro desde Janeiro 2026',
      focusSessions: '12',
      focusTime: '5h',
    }),
    [profile?.createdAt, profile?.email, profile?.name],
  );

  return { stats, profile: profileUi };
}
