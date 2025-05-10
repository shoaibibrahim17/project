import { Tabs } from 'expo-router';
import { Text, View, Platform } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Icons from '@/components/Icons';
import { useEffect } from 'react';

export default function TabLayout() {
  const { themeColors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Platform.OS === 'web' ? 'transparent' : themeColors.cardBg,
          borderTopColor: themeColors.tabInactive,
          borderTopWidth: 0.5,
          position: Platform.OS === 'web' ? 'absolute' : 'relative',
          bottom: 0,
          elevation: 0,
          height: 60,
        },
        tabBarActiveTintColor: themeColors.tabActive,
        tabBarInactiveTintColor: themeColors.tabInactive,
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Weather Mischief',
          tabBarIcon: ({ color, size }) => <Icons.Weather size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="feedback"
        options={{
          title: 'Feedback',
          tabBarIcon: ({ color, size }) => <Icons.Feedback size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}