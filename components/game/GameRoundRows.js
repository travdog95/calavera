import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

import GameRoundRow from "./GameRoundRow";

const GameRoundRows = (props) => {
  const gameData = useSelector((state) => state.game.currentGame.gameData);

  return (
    <View>
      {gameData.map((roundPlayersDetail, index) => {
        return (
          <GameRoundRow
            key={index}
            roundPlayersDetail={roundPlayersDetail}
            roundPlayerDetailWidth={props.roundPlayerDetailWidth}
          />
        );
      })}
    </View>
  );
};

export default GameRoundRows;
