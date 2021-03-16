import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import GameRoundRow from "./GameRoundRow";

const GameRoundRows = (props) => {
  const gameData = useSelector((state) => state.game.currentGame.gameData);

  return (
    <View style={styles.roundRow}>
      {gameData.map((roundRow, index) => {
        return (
          <GameRoundRow
            key={index}
            roundRow={roundRow}
            roundPlayerDetailWidth={props.roundPlayerDetailWidth}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  roundRow: {},
});

export default GameRoundRows;
