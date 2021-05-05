import React from "react";
import { View, StyleSheet } from "react-native";
import ScoreBox from "../../components/game/ScoreBox";

const GameRoundRow = (props) => {
  const round = props.roundKey.substring(1);
  return (
    <View style={styles.row}>
      {Object.entries(props.roundPlayersDetail).map(([playerId, playerDetail]) => {
        const key = `${props.roundKey}-${playerId}`;

        const isRoundLeaderHandler = () => {
          let isLeader = true;
          Object.entries(props.roundPlayersDetail).map(
            ([isLeaderPlayerId, isLeaderPlayerDetail]) => {
              if (
                isLeaderPlayerDetail.totalScore > playerDetail.totalScore ||
                playerDetail.totalScore === 0
              ) {
                isLeader = false;
              }
            }
          );
          return isLeader;
        };

        const isRoundLeader = isRoundLeaderHandler();
        return (
          <ScoreBox
            key={key}
            roundPlayerDetail={playerDetail}
            roundPlayerDetailWidth={props.roundPlayerDetailWidth}
            isRoundLeader={isRoundLeader}
            round={round}
          />
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
