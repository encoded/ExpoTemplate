import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MenuStack from '@src/navigation/MenuStack';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MenuStack/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
