import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";

import AudioScreen, {
  screenOptions as audioScreenOptions,
} from "../screens/HomeTabNavigator/AudioScreen";

import Colors from "../constants/colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.theme.dark4 : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.theme.dark4,
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
