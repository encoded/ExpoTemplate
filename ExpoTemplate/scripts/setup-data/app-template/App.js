import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainTabNavigator from '@src/navigation/MainTabNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainTabNavigator/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}