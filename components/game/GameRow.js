import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { initGame } from "../../store/actions/game-actions";

import DefaultText from "../../components/UI/DefaultText";
import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const GameRow = (props) => {
  const dispatch = useDispatch();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? Colors.theme.light1 : "white",
        },
        styles.pressedWrapper,
      ]}
      onPress={() => {
        //Load store with game data
        dispatch(initGame(props.game));

        props.navigation.navigate("Game", { game: props.game });
      }}
    >
      <View style={styles.row}>
        <DefaultText style={styles.date}>{props.game.date}</DefaultText>
        <DefaultText style={styles.players}>{props.game.players.length}</DefaultText>
        <DefaultText style={styles.status}>{props.game.status}</DefaultText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    padding: 5,
  },
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
  pressedWrapper: {},
});

export default GameRow;
