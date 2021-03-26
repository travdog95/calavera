import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import IncDecButton from "../../UI/IncDecButton";
import DefaultText from "../../UI/DefaultText";
import Defaults from "../../../constants/defaults";
import BonusName from "../../game/bonus/BonusName";
import BonusControl from "../../game/bonus/BonusControl";
import BonusValue from "../../game/bonus/BonusValue";
import Colors from "../../../constants/colors";

const BonusMultiple = (props) => {
  const incOrDecValueHandler = (direction) => {
    console.log(direction);
  };

  return (
    <View style={styles.row}>
      <BonusName>{props.bonusName}</BonusName>
      <BonusControl>
        <IncDecButton
          incOrDec={"inc"}
          onPress={incOrDecValueHandler.bind(this, "lower")}
        />
        <View style={styles.valueContainer}>
          <DefaultText style={styles.value}>
            {props.bonusItem.controlValue}
          </DefaultText>
        </View>
        <IncDecButton
          incOrDec={"dec"}
          onPress={incOrDecValueHandler.bind(this, "higher")}
        />
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
  valueContainer: {
    width: Defaults.isSmallScreen ? 35 : 45,
    height: Defaults.isSmallScreen ? 30 : 35,
    borderTopWidth: 1,
    borderColor: Colors.theme.grey4,
    borderBottomWidth: 1,
    paddingTop: Platform.OS === "android" ? 0 : 7,
  },
  value: {
    width: "100%",
    height: "100%",
    fontSize: Defaults.fontSize,
    textAlign: "center",
    textAlignVertical: "center",
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

export default BonusMultiple;
