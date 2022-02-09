import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";

import SettingsScreen, {
  screenOptions as settingsScreenOptions,
} from "../screens/settings/SettingsScreen";
import GameDefaultsScreen, {
  screenOptions as gameDefaultsScreenOptions,
} from "../screens/settings/GameDefaultsScreen";
import AboutScreen, { screenOptions as aboutScreenOptions } from "../screens/settings/AboutScreen";

import Colors from "../constants/colors";
import Defaults from "../constants/defaults";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.theme.grey9 : "",
  },
  headerTitleStyle: {
    fontFamily: Defaults.fontFamily.bold,
  },
  headerBackTitleStyle: {
    fontFamily: Defaults.fontFamily.regular,
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.theme.grey9,
};

const SettingsStackNavigator = createStackNavigator();

export const SettingsNavigator = (props) => {
  return (
    <SettingsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <SettingsStackNavigator.Screen
        name="Settings"
        component={SettingsScreen}
        options={settingsScreenOptions}
      />
      <SettingsStackNavigator.Screen
        name="GameDefaults"
        component={GameDefaultsScreen}
        options={gameDefaultsScreenOptions}
      />
      <SettingsStackNavigator.Screen
        name="About"
        component={AboutScreen}
        options={aboutScreenOptions}
      />
    </SettingsStackNavigator.Navigator>
  );
};
