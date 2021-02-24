import React from "react";
import { Platform, View, Text, StyleSheet } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";
import { setStatusBarBackgroundColor } from "expo-status-bar";

const GamePlayersHeader = (props) => {
  return (
    <View style={styles.row}>
      <View style={styles.spacer}>
        <Text>{""}</Text>
      </View>
      {props.players.map((player) => {
        return (
          <View
            key={player.id.toString()}
            style={{ ...styles.playerContainer, ...{ width: props.roundPlayerDetailWidth } }}
          >
            <Text style={styles.player}>{player.name}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    height: Defaults.game.rowHeight,
  },
  playerContainer: {
    backgroundColor: Colors.theme.light3,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "black",
    minWidth: Defaults.game.playerMinWidth,
  },
  player: {
    fontFamily: "open-sans-bold",
  },
  spacer: {
    backgroundColor: "white",
    width: Defaults.game.roundNumWidth,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "black",
  },
});
export default GamePlayersHeader;
