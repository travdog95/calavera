import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/UI/HeaderButton";

const SettingsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Settings Screen</Text>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Settings",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SettingsScreen;
