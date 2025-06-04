import React from 'react';
import { View } from 'react-native';
import TextButton from '@src/base/TextButton';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '@src/screens/HomeScreen';

import NAVIGATION from '@config/ConfigNavigation';
import SPACING, { getMarginTop } from '@config/ConfigSpacing';

const Stack = createStackNavigator();

// Header with button
const Header = ({ navigation }) => {
  return (
    <View style={{
      position: "absolute",
      alignItems: 'flex-start',
      height: SPACING.sizeHeader,
      paddingLeft: SPACING.paddingHorizontal,
      marginTop: getMarginTop()
    }}>
      <TextButton
        text={"Back"}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={NAVIGATION.SCREENS.HOME}>
      <Stack.Screen 
        name={NAVIGATION.SCREENS.HOME}
        component={HomeScreen} 
        options={{
          headerShown: false
        }}
      />
      {/* 
      ANOTHER SCREEN
      <Stack.Screen 
        name={NAVIGATION.SCREENS.GAME}
        component={GameScreen} 
        options={({ navigation }) => ({
          header: () => <Header navigation={navigation} />,  // Custom header component
        })}
      /> 
      */}
    </Stack.Navigator>
)};

export default HomeStackNavigator;