import React from "react";
import { View, StyleSheet } from "react-native";
import ScoreBox from "../../components/game/ScoreBox";

const GameRoundRow = (props) => {
  return (
    <View style={styles.row}>
      {props.roundPlayersDetail.map((roundPlayerDetail) => {
        const key = `r${roundPlayerDetail.round.toString()}-${roundPlayerDetail.playerId}`;

        const isRoundLeaderHandler = () => {
          let isLeader = true;
          props.roundPlayersDetail.forEach((isLeaderRoundPlayerDetail) => {
            if (isLeaderRoundPlayerDetail.totalScore > roundPlayerDetail.totalScore || roundPlayerDetail.score === 0) {
              isLeader = false;
            }
          });
          return isLeader;
        };
        const isRoundLeader = isRoundLeaderHandler();
        return (
          <ScoreBox
            key={key}
            roundPlayerDetail={roundPlayerDetail}
            roundPlayerDetailWidth={props.roundPlayerDetailWidth}
            isRoundLeader={isRoundLeader}
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
