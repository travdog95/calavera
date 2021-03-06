import React from "react";
import { View, SafeAreaView, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import { AppTabNavigator } from "./TabNavigator";
import { SettingsNavigator } from "./GameStackNavigator";
import Colors from "../constants/colors";

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export const DrawNavigator = () => {
  return (
    // <Drawer.Navigator
    //   drawerContent={(props) => {
    //     return (
    //       <View style={{ flex: 1, paddingTop: 20 }}>
    //         <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
    //           <DrawerItemList {...props} />
    //           {/* <Button title="Logout" color={Colors.theme.dark4} onPress={() => {}} /> */}
    //         </SafeAreaView>
    //       </View>
    //     );
    //   }}
    //   drawerContentOptions={{
    //     activeTintColor: Colors.theme.dark4,
    //   }}
    // >
    //   <Drawer.Screen
    //     name="Home"
    //     component={AppTabNavigator}
    //     options={{
    //       drawerIcon: (props) => <Ionicons name={"skull"} size={23} color={props.color} />,
    //     }}
    //   />
    //   <Drawer.Screen
    //     name="Settings"
    //     component={SettingsNavigator}
    //     options={{
    //       drawerIcon: (props) => <Ionicons name={"settings"} size={23} color={props.color} />,
    //     }}
    //   />
    // </Drawer.Navigator>

    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={AppTabNavigator} />
      <Drawer.Screen name="Settings" component={SettingsNavigator} />
    </Drawer.Navigator>
  );
};
