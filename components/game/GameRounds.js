import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { setCurrentRound } from "../../store/actions/game-actions";
import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const GameRounds = (props) => {
  const dispatch = useDispatch();

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
          <Pressable
            key={round.toString()}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? Colors.theme.light2 : Colors.theme.light1,
              },
              styles.roundContainer,
            ]}
            onPress={() => {
              dispatch(setCurrentRound(round));
            }}
          >
            <View>
              <Text style={styles.round}>{content}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {},
  roundContainer: {
    // backgroundColor: Colors.theme.light1,
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
