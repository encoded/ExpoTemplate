import React from 'react';
import { View } from 'react-native';
import ButtonBase from '@components/base/ButtonBase';
import { createStackNavigator } from '@react-navigation/stack';

import MenuScreen from '@src/screens/MenuScreen';
import GameScreen from '@src/screens/GameScreen';

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
      <ButtonBase
        text={"Back"}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const MenuStack = () => {
  return (
    <Stack.Navigator initialRouteName={NAVIGATION.SCREENS.MENU}>
      <Stack.Screen 
        name={NAVIGATION.SCREENS.MENU}
        component={MenuScreen} 
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name={NAVIGATION.SCREENS.GAME}
        component={GameScreen} 
        options={({ navigation }) => ({
          header: () => <Header navigation={navigation} />,  // Custom header component
        })}
      />
    </Stack.Navigator>
)};

export default MenuStack;