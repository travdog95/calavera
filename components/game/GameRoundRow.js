import React from "react";
import { View, StyleSheet } from "react-native";
import ScoreBox from "../../components/game/ScoreBox";

const GameRoundRow = (props) => {
  return (
    <View style={styles.row}>
      {props.roundRow.map((item) => {
        const key = `r${item.round.toString()}-${item.playerId}`;

        const isRoundLeaderHandler = () => {
          let isLeader = true;
          props.roundRow.forEach((roundPlayerDetail) => {
            if (roundPlayerDetail.totalScore > item.totalScore || item.score === 0) {
              isLeader = false;
            }
          });
          return isLeader;
        };
        const isRoundLeader = isRoundLeaderHandler();
        return (
          <ScoreBox
            key={key}
            item={item}
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
