import React from "react";
import { StyleSheet, View, Linking, Platform } from "react-native";
import { useNavigation } from "@react-navigation/core";

import PressableRow from "../../components/UI/PressableRow";

import Colors from "../../constants/colors";
import Constants from "../../constants/constants";

const SettingsScreen = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        {/* <PressableRow onPress={() => navigation.navigate("GameDefaults")}>
          Game Defaults
        </PressableRow> */}
        {Platform.OS === "android" ? (
          <PressableRow
            onPress={() => {
              Linking.openURL(`market://details?id=${Constants.GOOGLE_PACKAGE_NAME}`);
            }}
          >
            Rate on Google Play Store
          </PressableRow>
        ) : null}
        <PressableRow
          onPress={() => {
            Linking.openURL(
              `mailto:${Constants.SYSTEM_EMAIL_ADDRESS}?subject=${Constants.EMAIL_SUBJECT}`
            );
          }}
        >
          Send Feedback
        </PressableRow>
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
