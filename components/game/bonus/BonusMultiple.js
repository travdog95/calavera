import React from "react";
import { View, StyleSheet, Alert } from "react-native";

import IncDecButton from "../../UI/IncDecButton";
import DefaultText from "../../UI/DefaultText";
import Defaults from "../../../constants/defaults";
import BonusName from "../../game/bonus/BonusName";
import BonusControl from "../../game/bonus/BonusControl";
import BonusValue from "../../game/bonus/BonusValue";
import Colors from "../../../constants/colors";

const BonusMultiple = (props) => {
  const incOrDecValueHandler = (direction) => {
    const multiplier = direction === "higher" ? 1 : -1;
    const newControlValue = parseInt(props.bonusItem.controlValue) + multiplier;

    if (isNaN(newControlValue) || newControlValue < 0) {
      Alert.alert("Arrrrg!", "Bonus value must be 0 or higher!", [
        { text: "OK", style: "destructive", onPress: resetInputHandler.bind(this, 0, 0) },
      ]);
      return;
    }

    if (newControlValue > props.bonusItem.numAvailable) {
      Alert.alert(
        "Arrrrg!",
        `Only ${props.bonusItem.numAvailable} ${props.bonusName} left to capture!`,
        [
          {
            text: "OK",
            style: "destructive",
            onPress: resetInputHandler.bind(
              this,
              props.bonusItem.numAvailable,
              props.bonusItem.numAvailable * Defaults.game.bonusScoreDefaults[props.bonusItemKey]
            ),
          },
        ]
      );
      return;
    }

    const newScore =
      props.bonusItem.score + Defaults.game.bonusScoreDefaults[props.bonusItemKey] * multiplier;
    props.setBonusItems(props.bonusItemKey, {
      controlValue: newControlValue,
      score: newScore,
    });
  };

  const resetInputHandler = (controlValue, score) => {
    props.setBonusItems(props.bonusItemKey, {
      controlValue,
      score,
    });
  };

  return (
    <View style={styles.row}>
      <BonusName>{props.bonusName}</BonusName>
      <BonusControl>
        <IncDecButton
          style={styles.primaryButton}
          incOrDec={"dec"}
          onPress={incOrDecValueHandler.bind(this, "lower")}
        />
        <View style={styles.valueContainer}>
          <DefaultText style={styles.value}>{props.bonusItem.controlValue}</DefaultText>
        </View>
        <IncDecButton
          style={styles.primaryButton}
          incOrDec={"inc"}
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
    width: Defaults.isSmallScreen ? 30 : 35,
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
  },
});

export default BonusMultiple;
