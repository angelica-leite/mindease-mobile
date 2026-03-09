import { type Href, Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '@/src/presentation/hooks/use-auth';
import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

export default function IndexPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={mindeaseTheme.color.primary} />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href={'/(tabs)/dashboard' as Href} />;
  }

  return <Redirect href={'/login' as Href} />;
}
