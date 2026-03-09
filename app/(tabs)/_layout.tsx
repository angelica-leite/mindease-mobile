import Ionicons from '@expo/vector-icons/Ionicons';
import { Settings, SquareCheck, Timer, User } from 'lucide-react-native/icons';
import { Redirect, Tabs, usePathname } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { MobileNav } from '@/src/presentation/layouts/mobile-nav';
import { useAuth } from '@/src/presentation/hooks/use-auth';
import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

export default function TabsLayout() {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={mindeaseTheme.color.primary} />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href={{ pathname: '/login', params: { next: pathname } } as any} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <MobileNav />
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: mindeaseTheme.color.primary,
            tabBarInactiveTintColor: mindeaseTheme.color.mutedForeground,
            tabBarStyle: {
              borderTopColor: mindeaseTheme.color.border,
              backgroundColor: mindeaseTheme.color.card,
            },
          }}
        >
          <Tabs.Screen
            name="dashboard"
            options={{
              title: 'Dashboard',
              tabBarLabel: 'Inicio',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="tasks"
            options={{
              title: 'Tarefas',
              tabBarLabel: 'Tarefas',
              tabBarIcon: ({ color, size }) => <SquareCheck color={color} size={size} strokeWidth={2} />,
            }}
          />
          <Tabs.Screen
            name="pomodoro"
            options={{
              title: 'Pomodoro',
              tabBarLabel: 'Pomodoro',
              tabBarIcon: ({ color, size }) => <Timer color={color} size={size} strokeWidth={2} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Perfil',
              tabBarLabel: 'Perfil',
              tabBarIcon: ({ color, size }) => <User color={color} size={size} strokeWidth={2} />,
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Configuracoes',
              tabBarLabel: 'Config',
              tabBarIcon: ({ color, size }) => (
                <Settings color={color} size={size} strokeWidth={2} />
              ),
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}
