import React from "react";
import { View, StyleSheet, Linking } from "react-native";
import { Paragraph, Button } from "react-native-paper";

import Colors from "../../constants/colors";
import Constants from "../../constants/constants";
import Defaults from "../../constants/defaults";

const ScoringSystemHelpText = (props) => {
  return (
    <View>
      <Paragraph style={styles.paragraph}>
        There are three different ways to score Skull King. You are probably familiar with the
        Classic scoring. However, there is a new scoring system is called 'Rascal Scoring', and
        there are two variations. This app can handle all three scoring options!
      </Paragraph>
      <Paragraph style={styles.paragraph}>
        For detailed information on the new scoring systems, tap on the link below.
      </Paragraph>
      <Button
        onPress={() => {
          Linking.openURL(Constants.rulesUrl);
        }}
        uppercase={false}
        style={styles.url}
        compact={true}
        labelStyle={styles.url}
      >
        Skull King Rules
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  paragraph: { marginBottom: 10, fontSize: 16, fontFamily: Defaults.fontFamily.regular },
  url: {
    color: Colors.urlText,
    textDecorationLine: "underline",
    fontFamily: Defaults.fontFamily.bold,
  },
});

export default ScoringSystemHelpText;
