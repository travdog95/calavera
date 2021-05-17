import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { initGame } from "../../store/actions/game-actions";

import DefaultText from "../../components/UI/DefaultText";
import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const GameRow = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const game = props.game;
  const status = game.isActive ? "In progress" : "Completed";
  const rowBackgroundColor = props.index % 2 === 0 ? Colors.theme.grey3 : "white";

  let secondRow = null;
  if (game.isActive === false) {
    let winnerText = "Winner: ";

    game.winner.forEach((winner, index) => {
      if (game.winner.length > 1 && index !== 0) {
        winnerText += `, `;
      }

      winnerText += `${winner.player.name} (${winner.totalScore})`;
    });

    secondRow = (
      <View style={styles.secondRow}>
        <DefaultText>{winnerText}</DefaultText>
      </View>
    );
  }

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? Colors.theme.light1 : rowBackgroundColor,
        },
        styles.pressedWrapper,
      ]}
      onPress={() => {
        //Load store with game data
        dispatch(initGame(props.game));

        navigation.navigate("Game");
      }}
    >
      <View style={styles.gameContainer}>
        <View style={styles.row}>
          <Ionicons name={"skull"} size={16} color={"black"} />
          <DefaultText style={styles.date}>{props.game.date}</DefaultText>
          <DefaultText style={styles.players}>{props.game.players.length}</DefaultText>
          <DefaultText style={styles.status}>{status}</DefaultText>
        </View>
        {secondRow}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    padding: 3,
  },
  row: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  secondRow: { alignItems: "center", justifyContent: "center" },
  date: {
    fontSize: Defaults.fontSize,
    width: "40%",
  },
  players: {
    fontSize: Defaults.fontSize,
    width: "20%",
    textAlign: "center",
  },
  status: {
    fontSize: Defaults.fontSize,
    fontStyle: "italic",
    width: "30%",
    textAlign: "right",
  },
});

export default GameRow;
