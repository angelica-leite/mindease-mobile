import { PropsWithChildren, ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = PropsWithChildren<{
  onPress?: () => void;
  leftIcon?: ReactNode;
}>;

export function MindEasePrimaryButton({ children, onPress, leftIcon }: Props) {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={['#36a58f', '#3bb6bc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 16,
          paddingVertical: 12,
          paddingHorizontal: 18,
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {leftIcon}
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>{children}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}
