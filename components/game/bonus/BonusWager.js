import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import CustomActionButton from "../../CustomActionButton";
import DefaultText from "../../UI/DefaultText";
import Defaults from "../../../constants/defaults";
import BonusName from "../../game/bonus/BonusName";
import BonusControl from "../../game/bonus/BonusControl";
import BonusValue from "../../game/bonus/BonusValue";

const BonusWager = (props) => {
  return (
    <View style={styles.row}>
      <BonusName>Rascal wager:</BonusName>
      <BonusControl>
        <CustomActionButton style={styles.primaryButton} onPress={() => {}}>
          <DefaultText style={styles.primaryButtonText}>0</DefaultText>
        </CustomActionButton>
        <CustomActionButton style={styles.primaryButton} onPress={() => {}}>
          <DefaultText style={styles.primaryButtonText}>10</DefaultText>
        </CustomActionButton>
        <CustomActionButton style={styles.primaryButton} onPress={() => {}}>
          <DefaultText style={styles.primaryButtonText}>20</DefaultText>
        </CustomActionButton>
      </BonusControl>
      <BonusValue>{props.bonusItem.score}</BonusValue>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Defaults.bonusScreen.rowVerticalPadding,
  },
  primaryButton: {
    backgroundColor: Defaults.button.primary,
    marginHorizontal: 5,
  },
  primaryButtonText: {
    color: "white",
    fontSize: Defaults.fontSize,
  },
});

export default BonusWager;
