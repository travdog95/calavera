import React, { useEffect } from "react";
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";

import { GameNavigator } from "./GameStackNavigator";
import { AudioNavigator } from "./AudioStackNavigator";
import { SettingsNavigator } from "./SettingsStackNavigator";
// import FriendsScreen from "../screens/HomeTabNavigator/FriendsScreen";
// import StandingsScreen from "../screens/HomeTabNavigator/StandingsScreen";
// import ProfileScreen from "../screens/HomeTabNavigator/ProfileScreen";
import { loadSettings } from "../store/actions/settings-actions";

import { MENUITEMS, MESSAGES } from "../data/mockData";

import Colors from "../constants/colors";
import Defaults from "../constants/defaults";

const Tab = createBottomTabNavigator();

export const AppTabNavigator = (props) => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.game.games);
  const countGames = Object.keys(games).length;
  const countAudioFiles = 0;

  useEffect(() => {
    dispatch(loadSettings());
  }, [dispatch]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          let iconComponentName = "";

          MENUITEMS.forEach((menuItem) => {
            //Selected menu item
            if (route.name === menuItem.name) {
              iconName = focused ? menuItem.focusIcon : menuItem.icon;
              iconComponentName = menuItem.iconComponentName;
            }
          });
          if (iconComponentName === "Ionicons")
            return <Ionicons name={iconName} size={size} color={color} />;

          if (iconComponentName === "MaterialIcons")
            return <MaterialIcons name={iconName} size={size} color={color} />;
          if (iconComponentName === "MaterialCommunityIcons")
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.theme.dark1,
        inactiveTintColor: Colors.theme.grey5,
        labelStyle: { fontFamily: Defaults.fontFamily.regular },
      }}
    >
      <Tab.Screen
        name="Games"
        component={GameNavigator}
        // options={
        //   countGames > 0
        //     ? {
        //         tabBarBadge: countGames,
        //         tabBarBadgeStyle: { backgroundColor: Colors.theme.grey2 },
        //       }
        //     : null
        // }
      />
      <Tab.Screen
        name="Audio"
        component={AudioNavigator}
        // options={
        //   countAudioFiles > 0
        //     ? {
        //         tabBarBadge: countAudioFiles,
        //         tabBarBadgeStyle: { backgroundColor: Colors.theme.grey2 },
        //       }
        //     : null
        // }
      />
      <Tab.Screen name="Settings" component={SettingsNavigator} />
    </Tab.Navigator>
  );
};
