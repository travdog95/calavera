import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MessagesScreen from "../screens/HomeTabNavigator/MessagesScreen";
import { GameNavigator } from "./GameStackNavigator";
import FriendsScreen from "../screens/HomeTabNavigator/FriendsScreen";
import StandingsScreen from "../screens/HomeTabNavigator/StandingsScreen";
import ProfileScreen from "../screens/HomeTabNavigator/ProfileScreen";

import { MENUITEMS, PLAYERS, MESSAGES } from "../data/mockData";

import Colors from "../constants/colors";

const Tab = createBottomTabNavigator();

export const AppTabNavigator = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          MENUITEMS.forEach((menuItem) => {
            //Selected menu item
            if (route.name === menuItem.name) {
              iconName = focused ? menuItem.focusIcon : menuItem.icon;
            }
          });
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.theme.main3,
        inactiveTintColor: Colors.theme.grey6,
      }}
    >
      <Tab.Screen name="Games" component={GameNavigator} />
      <Tab.Screen name="Friends" component={FriendsScreen} initialParams={{ players: PLAYERS }} />
      {/* <Tab.Screen name="Standings" component={StandingsScreen} /> */}
      {/* <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={MESSAGES.length > 0 ? { tabBarBadge: MESSAGES.length } : null}
      /> */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
