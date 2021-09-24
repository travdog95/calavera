import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const GamePlayersHeader = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.row}>
      <View style={styles.spacer}>
        <Text style={styles.roundLabelText}>Round</Text>
      </View>
      {props.players.map((player) => {
        return (
          <View
            style={[styles.playerContainer, { width: props.roundPlayerDetailWidth }]}
            key={player.id.toString()}
          >
            <View style={styles.playerNameContainer}>
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.playerText}>
                {player.name}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <IconButton
                onPress={() => {
                  navigation.navigate("EditPlayerNames", {
                    playerId: player.id,
                    playerName: player.name,
                  });
                }}
                color="white"
                style={styles.editButton}
                icon={"pencil"}
                size={12}
              />
            </View>
          </View>
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
    backgroundColor: Colors.theme.light3,
    width: Defaults.game.roundNumWidth,
    borderRightWidth: 1,
    borderRightColor: "black",
  },
  playerContainer: {
    backgroundColor: Colors.theme.main2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "black",
    minWidth: Defaults.game.playerMinWidth,
  },
  playerNameContainer: {
    width: "80%",
    paddingLeft: 3,
  },
  playerText: {
    fontFamily: "open-sans-bold",
    color: "white",
    width: "100%",
  },
  roundLabelText: {
    fontFamily: "open-sans-bold",
    color: "white",
  },
  buttonContainer: { width: "20%" },
  editButton: { margin: -2 },
});
export default GamePlayersHeader;
