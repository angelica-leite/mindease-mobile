import { PropsWithChildren } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

type Props = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

export function MindEaseCard({ children, style }: Props) {
  return (
    <View
      style={[
        {
          backgroundColor: mindeaseTheme.color.card,
          borderRadius: mindeaseTheme.radius.xxl,
          borderWidth: 1,
          borderColor: mindeaseTheme.color.border,
          padding: 16,
        },
        mindeaseTheme.shadow.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}
