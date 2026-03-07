import { useMemo } from 'react';

import { usePomodoro } from '@/src/presentation/hooks/use-pomodoro';

type TipIcon = 'sun' | 'bellOff' | 'droplets';

export type PomodoroTip = {
  icon: TipIcon;
  title: string;
  description: string;
};

const PHASE_LABEL: Record<ReturnType<typeof usePomodoro>['phase'], string> = {
  idle: 'Pronto para focar?',
  work: 'Tempo de foco',
  shortBreak: 'Pausa curta',
  longBreak: 'Pausa longa',
};

export function usePomodoroPageViewModel() {
  const controller = usePomodoro();
  const showFocusedMode = controller.phase === 'work' && controller.isRunning;
  const pauseOrResume = controller.isRunning ? controller.pause : controller.resume;

  const tips = useMemo<PomodoroTip[]>(
    () => [
      { icon: 'sun', title: 'Ambiente', description: 'Use luz suave e sem distrações visuais.' },
      { icon: 'bellOff', title: 'Silêncio', description: 'Ative modo foco e reduza notificações.' },
      {
        icon: 'droplets',
        title: 'Pausa',
        description: 'Hidrate-se entre ciclos para manter energia.',
      },
    ],
    [],
  );

  const cycleIndicators = useMemo(
    () =>
      Array.from({ length: 4 }, (_, index) => ({
        index,
        done: index < controller.completedCycles % 4,
      })),
    [controller.completedCycles],
  );

  return {
    controller,
    showFocusedMode,
    pauseOrResume,
    cycleIndicators,
    phaseLabel: PHASE_LABEL[controller.phase],
    cyclesUntilLongBreak: 4 - (controller.completedCycles % 4),
    heading: {
      title: 'Timer de foco',
      subtitle: 'Use a técnica Pomodoro para manter o foco',
    },
    tips,
  };
}
