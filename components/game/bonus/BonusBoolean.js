import React, { useState } from "react";
import { View, StyleSheet, Switch } from "react-native";

import Defaults from "../../../constants/defaults";
import BonusName from "../../game/bonus/BonusName";
import BonusControl from "../../game/bonus/BonusControl";
import BonusValue from "../../game/bonus/BonusValue";
import Colors from "../../../constants/colors";

const BonusBoolean = (props) => {
  const [boolean, setBoolean] = useState(false);
  const toggleBoolean = () => setBoolean((previousState) => !previousState);

  return (
    <View style={styles.row}>
      <BonusName>{props.bonusName}</BonusName>
      <BonusControl>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={boolean ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleBoolean}
          value={boolean}
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
