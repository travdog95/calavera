import React from "react";
import { View, SafeAreaView, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";

import { AppTabNavigator } from "./TabNavigator";
import { SettingsNavigator } from "./GameStackNavigator";
import Colors from "../constants/colors";

const AppDrawerNavigator = createDrawerNavigator();

export const DrawNavigator = () => {
  return (
    <AppDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              {/* <Button title="Logout" color={Colors.theme.dark4} onPress={() => {}} /> */}
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.theme.dark4,
      }}
    >
      <AppDrawerNavigator.Screen
        name="Home"
        component={AppTabNavigator}
        options={{
          drawerIcon: (props) => <Ionicons name={"skull"} size={23} color={props.color} />,
        }}
      />
      <AppDrawerNavigator.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          drawerIcon: (props) => <Ionicons name={"settings"} size={23} color={props.color} />,
        }}
      />
    </AppDrawerNavigator.Navigator>
  );
};
