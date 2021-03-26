import React from "react";
import { View, StyleSheet } from "react-native";

const BonusControl = (props) => {
  return <View style={styles.bonusControlContainer}>{props.children}</View>;
};

const styles = StyleSheet.create({
  bonusControlContainer: {
    flexDirection: "row",
    width: "53%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BonusControl;
