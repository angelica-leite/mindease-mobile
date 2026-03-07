import { Contrast, Eye, Maximize2, Sparkles, Type } from 'lucide-react-native/icons';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MindEaseCard } from '@/src/presentation/components/ui/mindease-card';
import { useAccessibilityUI } from '@/src/presentation/hooks/use-accessibility-ui';
import { useSettingsViewModel } from '@/src/presentation/hooks/use-settings-view-model';
import { settingsStyles as styles } from '@/src/presentation/screens/settings.styles';
import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

type Option = { value: string; label: string };

function OptionSelector({
  title,
  description,
  options,
  selectedValue,
  onSelect,
}: {
  readonly title: string;
  readonly description?: string;
  readonly options: readonly Option[];
  readonly selectedValue: string;
  readonly onSelect: (value: string) => void;
}) {
  return (
    <MindEaseCard style={styles.card}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {description ? <Text style={styles.sectionDescription}>{description}</Text> : null}
      <View style={styles.optionsRow}>
        {options.map((item) => {
          const isActive = selectedValue === item.value;
          return (
            <Pressable
              key={item.value}
              style={[styles.option, isActive ? styles.optionActive : styles.optionInactive]}
              onPress={() => onSelect(item.value)}
            >
              <Text style={isActive ? styles.optionActiveText : styles.optionInactiveText}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </MindEaseCard>
  );
}

export default function SettingsScreen() {
  const a11y = useAccessibilityUI();
  const {
    text,
    settings,
    fontSizes,
    spacings,
    contrastLevels,
    complexityLevels,
    detailLevels,
    setFontSize,
    setSpacing,
    setContrast,
    setComplexityLevel,
    setDetailLevel,
    setReducedMotion,
    setSimplifiedView,
  } = useSettingsViewModel();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: a11y.backgroundColor }]} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { padding: a11y.space(18), gap: a11y.space(14), paddingBottom: a11y.space(24) },
        ]}
      >
        <View>
          <Text style={[styles.title, { fontSize: a11y.font(30), color: a11y.textColor }]}>{text.title}</Text>
          <Text style={[styles.subtitle, { color: a11y.mutedTextColor }]}>{text.subtitle}</Text>
        </View>

        <View style={styles.stackedOptions}>
          <OptionSelector
            title={text.fontSizeLabel}
            options={fontSizes}
            selectedValue={settings.fontSize}
            onSelect={(value) => setFontSize(value as (typeof fontSizes)[number]['value'])}
          />

          <OptionSelector
            title={text.spacingLabel}
            options={spacings}
            selectedValue={settings.spacing}
            onSelect={(value) => setSpacing(value as (typeof spacings)[number]['value'])}
          />

          <OptionSelector
            title={text.contrastLabel}
            options={contrastLevels}
            selectedValue={settings.contrast}
            onSelect={(value) => setContrast(value as (typeof contrastLevels)[number]['value'])}
          />

          <OptionSelector
            title={text.complexityLabel}
            options={complexityLevels}
            selectedValue={settings.complexityLevel}
            onSelect={(value) =>
              setComplexityLevel(value as (typeof complexityLevels)[number]['value'])
            }
          />

          <OptionSelector
            title={text.detailLabel}
            options={detailLevels}
            selectedValue={settings.detailLevel}
            onSelect={(value) => setDetailLevel(value as (typeof detailLevels)[number]['value'])}
          />
        </View>

        <MindEaseCard style={styles.switchCard}>
          <View style={styles.switchRow}>
            <View style={styles.row}>
              <Sparkles
                size={mindeaseTheme.icon.sm}
                color={mindeaseTheme.color.success}
                strokeWidth={mindeaseTheme.icon.stroke}
              />
              <Text style={styles.label}>{text.reducedMotionLabel}</Text>
            </View>
            <Switch value={settings.reducedMotion} onValueChange={setReducedMotion} />
          </View>

          <View style={styles.switchRow}>
            <View style={styles.row}>
              <Eye
                size={mindeaseTheme.icon.sm}
                color={mindeaseTheme.color.focus}
                strokeWidth={mindeaseTheme.icon.stroke}
              />
              <Text style={styles.label}>{text.simplifiedViewLabel}</Text>
            </View>
            <Switch value={settings.simplifiedView} onValueChange={setSimplifiedView} />
          </View>
        </MindEaseCard>

        <MindEaseCard style={styles.card}>
          <View style={styles.row}>
            <Type size={16} color={mindeaseTheme.color.primary} />
            <Maximize2 size={16} color={mindeaseTheme.color.focus} />
            <Contrast size={16} color={mindeaseTheme.color.warning} />
          </View>
          <Text style={styles.sectionDescription}>
            Ajustes salvos automaticamente e usados para personalizar a experiência.
          </Text>
        </MindEaseCard>
      </ScrollView>
    </SafeAreaView>
  );
}
