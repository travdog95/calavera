import React from "react";
import { View, StyleSheet } from "react-native";

import DefaultText from "../../UI/DefaultText";
import Defaults from "../../../constants/defaults";

const BonusName = (props) => {
  return (
    <View style={styles.bonusNameContainer}>
      <DefaultText style={styles.bonusName}>{props.children}</DefaultText>
    </View>
  );
};

const styles = StyleSheet.create({
  bonusNameContainer: {
    width: "35%",
    paddingLeft: 8,
  },
  bonusName: {
    fontSize: Defaults.largeFontSize,
  },
});

export default BonusName;
