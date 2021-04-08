import React from "react";
import { View, StyleSheet } from "react-native";
import DefaultText from "../../components/UI/DefaultText";
import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const RoundHeader = (props) => {
  return (
    <View style={styles.roundContainer}>
      <View>
        <DefaultText style={styles.roundText}>Round {props.round}</DefaultText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  roundContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderColor: "black",
    borderTopWidth: 1,
    backgroundColor: Colors.theme.dark3,
    width: "100%",
  },
  roundText: {
    fontSize: Defaults.extraLargeFontSize,
    color: "white",
    fontWeight: "bold",
  },
});

export default RoundHeader;
