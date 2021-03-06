import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const GamePlayersHeader = (props) => {
  return (
    <View style={styles.row}>
      <View style={styles.spacer}>
        <Text>{""}</Text>
      </View>
      {props.players.map((player) => {
        return (
          <Pressable
            key={player.id.toString()}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? Colors.theme.main1 : Colors.theme.main2,
              },
              { ...styles.playerContainer, ...{ width: props.roundPlayerDetailWidth } },
            ]}
            onPress={() => {
              props.navigation.navigate("EditPlayerNames", {
                playerId: player.id,
                playerName: player.name,
              });
            }}
          >
            <View>
              <Text style={styles.player}>{player.name}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    height: Defaults.game.playerRowHeight,
  },
  playerContainer: {
    // backgroundColor: Colors.theme.light3,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "black",
    minWidth: Defaults.game.playerMinWidth,
  },
  player: {
    fontFamily: "open-sans-bold",
    color: "white",
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
