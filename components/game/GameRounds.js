import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { setCurrentRound } from "../../store/actions/game-actions";
import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const GameRounds = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const game = useSelector((state) => state.game.currentGame);

  //convert numRounds to array
  let rounds = [];
  for (let r = 1; r <= props.numRounds; r++) {
    rounds.push(r);
  }

  return (
    <View style={styles.row}>
      {rounds.map((round) => {
        const content = props.currentRound === round ? `[${round}]` : round;
        const roundBackgroundColor =
          props.currentRound === round ? Colors.theme.light3 : Colors.theme.light1;
        const isPressable = round !== game.currentRound ? false : true;

        return (
          <Pressable
            key={round.toString()}
            style={({ pressed }) => [
              {
                backgroundColor:
                  pressed && isPressable ? Colors.theme.light2 : roundBackgroundColor,
              },
              styles.roundContainer,
            ]}
            onPress={() => {
              //dispatch(setCurrentRound(round));

              if (isPressable) {
                navigation.navigate("Scores", {
                  round: round,
                });
              }
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
