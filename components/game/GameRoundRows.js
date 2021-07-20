import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

import GameRoundRow from "./GameRoundRow";

const GameRoundRows = (props) => {
  // const game = useSelector((state) => state.game.currentGame);
  const currentGameId = useSelector((state) => state.game.currentGameId);
  const game = useSelector((state) => state.game.games[currentGameId]);

  return (
    <View>
      {Object.entries(game.roundData).map(([roundKey, playerData]) => {
        return (
          <GameRoundRow
            key={roundKey}
            roundPlayersDetail={playerData}
            roundPlayerDetailWidth={props.roundPlayerDetailWidth}
            roundKey={roundKey}
          />
        );
      })}
    </View>
  );
};

export default GameRoundRows;
