import { useMemo } from 'react';

import { useAuth } from '@/src/presentation/hooks/use-auth';
import { useFocusStats } from '@/src/presentation/hooks/use-focus-stats';
import { useTasks } from '@/src/presentation/hooks/use-tasks';

function formatFocusTime(minutes: number) {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;
  if (restMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${restMinutes}m`;
}

export function useProfileViewModel() {
  const { stats } = useTasks();
  const { profile } = useAuth();
  const { focusMinutes, focusSessions } = useFocusStats();

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
      focusSessions: String(focusSessions),
      focusTime: formatFocusTime(focusMinutes),
    }),
    [focusMinutes, focusSessions, profile?.createdAt, profile?.email, profile?.name],
  );

  return { stats, profile: profileUi };
}
