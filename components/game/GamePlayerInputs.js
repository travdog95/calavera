import React from "react";
import { View, StyleSheet } from "react-native";

import GamePlayer from "./GamePlayerInput";

const GamePlayerInputs = (props) => {
  return (
    <View style={styles.playerNamesContainer}>
      {props.playerNames.map((playerName, index) => {
        return (
          <GamePlayer
            key={index}
            playerNameIndex={index}
            playerNames={props.playerNames}
            setPlayerNames={props.updatePlayerNamesState}
          />
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  playerNamesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default GamePlayerInputs;
