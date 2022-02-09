import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";

import AudioScreen, {
  screenOptions as audioScreenOptions,
} from "../screens/HomeTabNavigator/AudioScreen";

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

const AudioStackNavigator = createStackNavigator();

export const AudioNavigator = (props) => {
  return (
    <AudioStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AudioStackNavigator.Screen
        name="Audio"
        component={AudioScreen}
        options={audioScreenOptions}
      />
    </AudioStackNavigator.Navigator>
  );
};
