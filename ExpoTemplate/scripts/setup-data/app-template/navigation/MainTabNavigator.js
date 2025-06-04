// MainNavigator.js

import React from "react";
import { TouchableOpacity, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStackNavigator from "@src/navigation/HomeStackNavigator";
import ContentScreen from '@src/screens/ContentScreen';
import SettingsScreen from '@src/screens/SettingsScreen';

import NAVIGATION from "@config/ConfigNavigation";
import COLORS from "@config/ConfigColors";
import { getMarginBottom } from "@config/ConfigSpacing";

import TextBase from "@src/base/TextBase";

const Tab = createBottomTabNavigator();

const tabHeight = 40;
const tabPaddingVertical = 8;

// Add your icons here
const tabBarIcon = (isFocused, routeName) => {
  switch (routeName) {
    case NAVIGATION.STACKS.HOME:
      return <TextBase style={isFocused && {fontWeight: "bold"}}>HOME</TextBase>;
    case NAVIGATION.SCREENS.CONTENT:
      return <TextBase style={isFocused && {fontWeight: "bold"}}>CONTENT</TextBase>;
    case NAVIGATION.SCREENS.SETTINGS:
      return <TextBase style={isFocused && {fontWeight: "bold"}}>SETTINGS</TextBase>;
    default:
      return null;
  }
};

export default function MainNavigator() {
  return (
    <>
      <Tab.Navigator
        initialRouteName={NAVIGATION.STACKS.HOME}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarButton:
            Platform.OS === "web"
              ? undefined
              : (props) => <TouchableOpacity {...props} activeOpacity={1} />,
          tabBarIcon: ({ focused }) => tabBarIcon(focused, route.name),
          tabBarLabel: () => null,
          tabBarStyle: {
            borderTopWidth: 0,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            elevation: 0,
            backgroundColor: COLORS.secondary,
            paddingVertical: 8,
            minHeight: tabHeight + tabPaddingVertical * 2 + getMarginBottom()
          },
          tabBarItemStyle: {
            width: tabHeight * 2,
            height: tabHeight,
            marginHorizontal: 8,
          },
          tabBarIconStyle: {
            height: "100%",
            width: "100%",
          },
        })}
      >
        <Tab.Screen name={NAVIGATION.STACKS.HOME} component={HomeStackNavigator} />
        <Tab.Screen name={NAVIGATION.SCREENS.SETTINGS} component={SettingsScreen} />
        <Tab.Screen name={NAVIGATION.SCREENS.CONTENT} component={ContentScreen} />
      </Tab.Navigator>
    </>
  );
}
