import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import CustomActionButton from "../../CustomActionButton";
import DefaultText from "../../UI/DefaultText";
import Defaults from "../../../constants/defaults";
import BonusName from "../../game/bonus/BonusName";
import BonusControl from "../../game/bonus/BonusControl";
import BonusValue from "../../game/bonus/BonusValue";

const BonusWager = (props) => {
  const [selectedValue, setSelectedValue] = useState(props.bonusItem.controlValue);

  const updateSelectedValueState = (value) => {
    setSelectedValue(value);

    props.setBonusItems(props.bonusItemKey, {
      controlValue: parseInt(value),
      score: parseInt(value),
    });
  };

  return (
    <View style={styles.row}>
      <BonusName>Rascal wager:</BonusName>
      <BonusControl>
        {Defaults.game.bonusScoreDefaults.wager.map((wagerValue) => {
          const backgroundColor =
            parseInt(wagerValue) === parseInt(selectedValue)
              ? Defaults.button.primary
              : Defaults.button.cancel;

          return (
            <CustomActionButton
              key={wagerValue}
              style={{
                ...styles.primaryButton,
                ...{ backgroundColor: backgroundColor },
              }}
              onPress={updateSelectedValueState.bind(this, wagerValue)}
            >
              <DefaultText style={styles.primaryButtonText}>{wagerValue}</DefaultText>
            </CustomActionButton>
          );
        })}
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
