import React from "react";
import { View, StyleSheet, Linking, Text } from "react-native";
import { Paragraph, Button } from "react-native-paper";

import DefaultText from "../../components/UI/DefaultText";
import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

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
          Linking.openURL("https://www.grandpabecksgames.com/rules-skull-king");
        }}
        uppercase={false}
        style={styles.url}
        compact={true}
        labelStyle={styles.url}
      >
        Rules - Skull King
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  paragraph: { marginBottom: 10, fontSize: 16 },
  url: {
    color: Colors.urlText,
    textDecorationLine: "underline",
  },
});

export default ScoringSystemHelpText;
