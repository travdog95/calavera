import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const GamePlayersHeader = (props) => {
  const navigation = useNavigation();

  const editPlayerName = (player) => {
    navigation.navigate("EditPlayerNames", {
      playerId: player.id,
      playerName: player.name,
    });
  };

  return (
    <View style={styles.row}>
      <View style={styles.spacer}>
        <Text style={styles.labelText}>Round</Text>
      </View>
      {props.players.map((player) => {
        return (
          <TouchableOpacity
            onPress={editPlayerName.bind(this, player)}
            style={[styles.playerContainer, { width: props.roundPlayerDetailWidth }]}
            key={player.id.toString()}
          >
            <View>
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.labelText}>
                {player.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    height: Defaults.game.playerRowHeight,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  spacer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.theme.grey6,
    width: Defaults.game.roundNumWidth,
    borderRightWidth: 1,
    borderRightColor: "black",
  },
  playerContainer: {
    backgroundColor: Colors.theme.dark1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "black",
    minWidth: Defaults.game.playerMinWidth,
  },
  labelText: {
    fontFamily: Defaults.fontFamily.bold,
    color: "white",
  },
});
export default GamePlayersHeader;
