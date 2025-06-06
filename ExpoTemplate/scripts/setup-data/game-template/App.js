import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MenuStackNavigator from '@src/navigation/MenuStackNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MenuStackNavigator/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
