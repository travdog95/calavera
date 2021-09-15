import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { setSelectedRound } from "../../store/actions/game-actions";
import DefaultText from "../../components/UI/DefaultText";
import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const GameRounds = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentGameId = useSelector((state) => state.game.currentGameId);
  const game = useSelector((state) => state.game.games[currentGameId]);

  //convert numRounds to array
  let rounds = [];
  for (let r = 1; r <= game.numRounds; r++) {
    rounds.push(r);
  }

  return (
    <View style={styles.row}>
      {rounds.map((round) => {
        let roundBackgroundColor = "";
        if (round === game.scoringRound) {
          roundBackgroundColor = Colors.theme.light3Shade;
        } else {
          roundBackgroundColor = round % 2 === 0 ? Colors.theme.grey2 : "white";
        }

        let icon = "";
        if (round === game.scoringRound) icon = "play-box";
        if (round < game.scoringRound) icon = "pencil";

        return (
          <View
            key={round}
            style={[styles.roundContainer, { backgroundColor: roundBackgroundColor }]}
          >
            <View style={styles.buttonContainer}>
              {icon ? (
                <IconButton
                  onPress={() => {
                    dispatch(setSelectedRound(round));

                    navigation.navigate("Bids", {
                      round: round,
                    });
                  }}
                  color={Colors.theme.dark1}
                  style={styles.button}
                  icon={icon}
                  size={30}
                />
              ) : null}
            </View>
            <View style={styles.labelContainer}>
              <DefaultText style={styles.round}>{round}</DefaultText>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { backgroundColor: Colors.theme.light2 },
  roundContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "black",
    height: Defaults.game.rowHeight,
    width: Defaults.game.roundNumWidth,
  },
  labelContainer: { width: "50%", alignItems: "center" },
  buttonContainer: { width: "50%", alignItems: "center" },
  round: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  button: {
    padding: 1,
  },
});

export default GameRounds;
