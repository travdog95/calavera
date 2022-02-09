import React from "react";
import { StyleSheet, Image, View, Pressable, Linking } from "react-native";

import DefaultText from "../../components/UI/DefaultText";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";
import Constants from "../../constants/constants";

const AboutScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Image source={require("../../assets/adaptive-icon-512x512.png")} style={styles.image} />
      <View style={styles.row}>
        <DefaultText style={styles.appTitle}>Score King</DefaultText>
      </View>
      <View style={styles.row}>
        <DefaultText style={styles.appVersion}>Version {Constants.appVersion}</DefaultText>
      </View>
      <View style={styles.row}>
        <Pressable
          android_ripple={{ color: Colors.theme.grey5, borderless: false }}
          onPress={() => {
            Linking.openURL(Constants.privacyPolicyUrl);
          }}
        >
          <DefaultText style={styles.link}>Privacy Policy</DefaultText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: Defaults.isSmallScreen ? 275 : 350,
    height: Defaults.isSmallScreen ? 275 : 350,
    marginVertical: Defaults.isSmallScreen ? -50 : -75,
  },
  row: {
    padding: 5,
  },
  appTitle: { fontSize: Defaults.extraLargeFontSize },
  appVersion: { fontSize: Defaults.fontSize },
  link: {
    fontSize: Defaults.fontSize,
    color: Colors.theme.light3,
    padding: 5,
  },
});

export default AboutScreen;
