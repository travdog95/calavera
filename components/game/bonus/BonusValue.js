import React from "react";
import { View, StyleSheet } from "react-native";

import DefaultText from "../../UI/DefaultText";
import Defaults from "../../../constants/defaults";

const BonusValue = (props) => {
  return (
    <View style={styles.bonusValueContainer}>
      <DefaultText style={styles.bonusValue}>{props.children}</DefaultText>
    </View>
  );
};

const styles = StyleSheet.create({
  bonusValueContainer: {
    width: "12%",
    paddingRight: 8,
  },
  bonusValue: {
    fontSize: Defaults.largeFontSize,
    textAlign: "right",
  },
});

export default BonusValue;
