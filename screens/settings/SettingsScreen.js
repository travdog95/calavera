import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import PressableRow from "../../components/UI/PressableRow";

import Colors from "../../constants/colors";

const SettingsScreen = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        {/* <PressableRow onPress={() => navigation.navigate("GameDefaults")}>
          Game Defaults
        </PressableRow> */}
        <PressableRow onPress={() => navigation.navigate("About")}>About</PressableRow>
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Settings",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.screenBackgroundColor,
  },
  container: {
    flex: 1,
    width: "100%",
  },
});

export default SettingsScreen;
