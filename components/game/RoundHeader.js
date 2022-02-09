import React from "react";
import { View, StyleSheet } from "react-native";
import DefaultText from "../../components/UI/DefaultText";
import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const RoundHeader = (props) => {
  const justifyContentValue = props.showBids ? "space-between" : "center";
  return (
    <View style={[styles.roundContainer, { justifyContent: justifyContentValue }]}>
      <View>
        <DefaultText style={styles.text}>{props.headerText}</DefaultText>
      </View>
      {props.showBids ? (
        <View>
          <DefaultText style={styles.text}>Bids: {props.totalBids}</DefaultText>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  roundContainer: {
    alignItems: "center",
    padding: 5,
    borderColor: "black",
    backgroundColor: Colors.theme.grey3,
    borderBottomWidth: 1,
    width: "100%",
    flexDirection: "row",
  },
  text: {
    fontSize: Defaults.largeFontSize,
    color: "black",
    fontFamily: Defaults.fontFamily.bold,
  },
});

export default RoundHeader;
