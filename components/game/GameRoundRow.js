import React from "react";
import { Platform, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";
import ScoreBox from "../../components/game/ScoreBox";

const GameRoundRow = (props) => {
  return (
    <View style={styles.row}>
      {props.roundRow.map((item) => {
        const key = `r${item.round.toString()}-${item.playerId}`;
        return (
          <ScoreBox key={key} item={item} roundPlayerDetailWidth={props.roundPlayerDetailWidth} />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
  },
});

export default GameRoundRow;
