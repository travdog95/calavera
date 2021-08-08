import React from "react";
import { View, StyleSheet } from "react-native";

import DefaultText from "../UI/DefaultText";
import Defaults from "../../constants/defaults";
import Constants from "../../constants/constants";
import Colors from "../../constants/colors";

const BidsHeader = (props) => {
  const isRascalEnhancedScoring =
    props.scoringType === Constants.scoringType.rascalEnhanced ? true : false;
  return (
    <View style={styles.headerContainer}>
      <DefaultText
        style={{ ...styles.playerLabel, width: isRascalEnhancedScoring ? "40%" : "70%" }}
      >
        Player
      </DefaultText>
      <DefaultText style={styles.bidLabel}>Bid</DefaultText>
      {isRascalEnhancedScoring ? (
        <DefaultText style={styles.accuracyLabel}>Cannon Load</DefaultText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    borderColor: Colors.theme.grey9,
    borderBottomWidth: 1,
  },
  playerLabel: {
    fontSize: Defaults.fontSize,
    fontFamily: "open-sans-bold",
  },
  bidLabel: {
    fontSize: Defaults.fontSize,
    width: "30%",
    fontFamily: "open-sans-bold",
    textAlign: "center",
  },
  accuracyLabel: {
    fontSize: Defaults.fontSize,
    width: "30%",
    textAlign: "right",
    fontFamily: "open-sans-bold",
  },
});

export default BidsHeader;
