import { PropsWithChildren, ReactNode } from 'react';
import { Pressable, StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { mindeasePrimaryButtonStyles as styles } from '@/src/presentation/components/ui/mindease-primary-button.styles';

type Props = PropsWithChildren<{
  onPress?: () => void;
  leftIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}>;

export function MindEasePrimaryButton({
  children,
  onPress,
  leftIcon,
  style,
  contentStyle,
  textStyle,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.pressable, disabled && styles.disabled, style]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
    >
      <LinearGradient
        colors={['#36a58f', '#3bb6bc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={[styles.content, contentStyle]}>
          {leftIcon}
          <Text style={[styles.text, textStyle]}>{children}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}
