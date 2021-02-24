import React from "react";
import { Platform, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const GameRounds = (props) => {
  //convert numRounds to array
  let rounds = [];
  for (let r = 1; r <= props.numRounds; r++) {
    rounds.push(r);
  }

  return (
    <View style={styles.row}>
      {rounds.map((round) => {
        const content = props.currentRound === round ? `<${round}>` : round;
        return (
          <View key={round.toString()} style={styles.roundContainer}>
            <Text style={styles.round}>{content}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {},
  roundContainer: {
    backgroundColor: Colors.theme.light1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "black",
    width: Defaults.game.roundNumWidth,
    height: Defaults.game.rowHeight,
  },
  round: {
    fontFamily: "open-sans-bold",
  },
});

export default GameRounds;
