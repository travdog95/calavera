import React, { useState } from "react";
import { View, StyleSheet, Switch } from "react-native";

import Defaults from "../../../constants/defaults";
import BonusName from "../../game/bonus/BonusName";
import BonusControl from "../../game/bonus/BonusControl";
import BonusValue from "../../game/bonus/BonusValue";
import Colors from "../../../constants/colors";

const BonusBoolean = (props) => {
  const [booleanValue, setBooleanValue] = useState(props.bonusItem.controlValue);
  const toggleBoolean = (newBooleanValue) => {
    setBooleanValue(newBooleanValue);

    props.setBonusItems(props.bonusItemKey, {
      controlValue: newBooleanValue,
      score: newBooleanValue ? Defaults.game.bonusScoreDefaults[props.bonusItemKey] : 0,
    });
  };
  return (
    <View style={styles.row}>
      <BonusName>{props.bonusName}</BonusName>
      <BonusControl>
        <Switch
          trackColor={{ false: Colors.theme.grey5, true: Colors.theme.grey5 }}
          thumbColor={booleanValue ? Defaults.button.primary : Colors.theme.grey6}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleBoolean.bind(this, !booleanValue)}
          value={booleanValue}
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
});

export default BonusBoolean;
