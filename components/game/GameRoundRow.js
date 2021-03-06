import React from "react";
import { View, StyleSheet } from "react-native";
import ScoreBox from "../../components/game/ScoreBox";

const GameRoundRow = (props) => {
  return (
    <View style={styles.row}>
      {props.roundRow.map((item) => {
        const key = `r${item.round.toString()}-${item.playerId}`;
        return (
          <ScoreBox
            key={key}
            item={item}
            roundPlayerDetailWidth={props.roundPlayerDetailWidth}
            navigation={props.navigation}
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
