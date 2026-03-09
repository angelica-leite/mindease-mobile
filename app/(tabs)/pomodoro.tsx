import { BellOff, Droplets, Pause, Play, Sun } from 'lucide-react-native/icons';
import { AccessibilityInfo, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';

import { MindEaseCard } from '@/src/presentation/components/ui/mindease-card';
import { MindEasePrimaryButton } from '@/src/presentation/components/ui/mindease-primary-button';
import { useAccessibilityUI } from '@/src/presentation/hooks/use-accessibility-ui';
import { useFocusStats } from '@/src/presentation/hooks/use-focus-stats';
import {
  PomodoroTip,
  usePomodoroPageViewModel,
} from '@/src/presentation/hooks/use-pomodoro-page-view-model';
import { dashboardStyles } from '@/src/presentation/screens/dashboard.styles';
import { pomodoroStyles as styles } from '@/src/presentation/screens/pomodoro.styles';
import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

const iconMap = {
  sun: Sun,
  bellOff: BellOff,
  droplets: Droplets,
} as const;

function TipCard({ tip }: { readonly tip: PomodoroTip }) {
  const Icon = iconMap[tip.icon];
  const a11y = useAccessibilityUI();

  return (
    <MindEaseCard style={[styles.tipCard, { borderColor: a11y.cardBorderColor }]}>
      <View style={styles.tipIconWrap}>
        <Icon
          size={mindeaseTheme.icon.md}
          color={mindeaseTheme.color.primary}
          strokeWidth={mindeaseTheme.icon.stroke}
        />
      </View>
      <View style={styles.tipTextWrap}>
        <Text style={[styles.tipTitle, { color: a11y.textColor }]}>{tip.title}</Text>
        {!a11y.summaryMode ? (
          <Text style={[styles.tipDescription, { color: a11y.mutedTextColor }]}>{tip.description}</Text>
        ) : null}
      </View>
    </MindEaseCard>
  );
}

export default function PomodoroScreen() {
  const {
    controller,
    heading,
    tips,
    pauseOrResume,
    phaseLabel,
    cycleIndicators,
    cyclesUntilLongBreak,
  } = usePomodoroPageViewModel();
  const a11y = useAccessibilityUI();
  const { registerCompletedSession } = useFocusStats();
  const { formattedTime, isRunning, phase, startWork, reset, skip, progress, completedCycles } =
    controller;
  const previousCycles = useRef(0);

  useEffect(() => {
    const label =
      phase === 'idle'
        ? 'Pomodoro pronto para iniciar'
        : phase === 'work'
          ? 'Fase de foco iniciada'
          : phase === 'shortBreak'
            ? 'Pausa curta iniciada'
            : 'Pausa longa iniciada';
    void AccessibilityInfo.announceForAccessibility(label);
  }, [phase]);

  useEffect(() => {
    if (completedCycles > previousCycles.current) {
      const diff = completedCycles - previousCycles.current;
      void registerCompletedSession(diff, 25);
    }

    previousCycles.current = completedCycles;
  }, [completedCycles, registerCompletedSession]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: a11y.backgroundColor }]} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { padding: a11y.space(18), gap: a11y.space(14), paddingBottom: a11y.space(24) },
        ]}
      >
        <View style={styles.header}>
          <Text
            accessibilityRole="header"
            style={[styles.title, { fontSize: a11y.font(30), color: a11y.textColor }]}
          >
            {heading.title}
          </Text>
          {!a11y.summaryMode ? (
            <Text style={[styles.subtitle, { color: a11y.mutedTextColor }]}>{heading.subtitle}</Text>
          ) : null}
        </View>

        <MindEaseCard style={[styles.timerCard, { borderColor: a11y.cardBorderColor }]}>
          <Text style={[styles.phaseLabel, { color: a11y.mutedTextColor }]}>{phaseLabel}</Text>
          <Text style={[styles.timerText, { fontSize: a11y.font(64), color: a11y.textColor }]}>
            {formattedTime}
          </Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>

          <View style={styles.controls}>
            {phase === 'idle' ? (
              <MindEasePrimaryButton
                leftIcon={
                  <Play
                    size={16}
                    color={mindeaseTheme.color.primaryForeground}
                    strokeWidth={mindeaseTheme.icon.stroke}
                    style={dashboardStyles.focusButtonIcon}
                  />
                }
                onPress={startWork}
                accessibilityLabel="Iniciar foco"
                accessibilityHint="Inicia o ciclo de foco do pomodoro"
              >
                Iniciar foco
              </MindEasePrimaryButton>
            ) : (
              <>
                <MindEasePrimaryButton
                  onPress={pauseOrResume}
                  accessibilityLabel={isRunning ? 'Pausar timer' : 'Retomar timer'}
                  accessibilityHint="Controla o andamento do timer"
                  leftIcon={
                    isRunning ? (
                      <Pause
                        size={16}
                        color={mindeaseTheme.color.primaryForeground}
                        strokeWidth={mindeaseTheme.icon.stroke}
                        style={dashboardStyles.focusButtonIcon}
                      />
                    ) : (
                      <Play
                        size={16}
                        color={mindeaseTheme.color.primaryForeground}
                        strokeWidth={mindeaseTheme.icon.stroke}
                        style={dashboardStyles.focusButtonIcon}
                      />
                    )
                  }
                >
                  {isRunning ? 'Pausar' : 'Retomar'}
                </MindEasePrimaryButton>
                <View style={styles.controlsRow}>
                  <Pressable
                    style={styles.secondaryButton}
                    onPress={skip}
                    accessibilityRole="button"
                    accessibilityLabel="Pular fase"
                  >
                    <Text style={styles.secondaryButtonText}>Pular</Text>
                  </Pressable>
                  <Pressable
                    style={styles.secondaryButton}
                    onPress={reset}
                    accessibilityRole="button"
                    accessibilityLabel="Resetar timer"
                  >
                    <Text style={styles.secondaryButtonText}>Resetar</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>

          <View style={styles.indicators}>
            {cycleIndicators.map((indicator) => (
              <View
                key={indicator.index}
                style={[
                  styles.indicatorBase,
                  indicator.done ? styles.indicatorDone : styles.indicatorPending,
                ]}
              />
            ))}
          </View>
          {!a11y.summaryMode ? (
            <Text style={[styles.footerText, { color: a11y.mutedTextColor }]}>
              Ciclo {completedCycles + 1} - {cyclesUntilLongBreak} ciclos para pausa longa
            </Text>
          ) : null}
        </MindEaseCard>

        {!a11y.simplified ? (
          <View style={styles.tipsWrap}>
            {tips.map((tip) => (
              <TipCard key={tip.title} tip={tip} />
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
