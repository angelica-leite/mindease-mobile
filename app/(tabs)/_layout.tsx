import Ionicons from '@expo/vector-icons/Ionicons';
import { Settings, SquareCheck, Timer, User } from 'lucide-react-native/icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

import { MobileNav } from '@/src/presentation/layouts/mobile-nav';
import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

export default function TabsLayout() {
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
