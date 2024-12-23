import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarIconStyle: {
          marginVertical: 5,
        },
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Equipos',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="cpu.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="workers"
        options={{
          title: 'Trabajadores',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="maintenances"
        options={{
          title: 'Mantenimientos',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="sdcard.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="fixes"
        options={{
          title: 'Reparaciones',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="hammer.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
