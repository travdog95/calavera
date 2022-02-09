import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";

import { setCurrentGame, deleteGame } from "../../store/actions/game-actions";

import DefaultText from "../../components/UI/DefaultText";
import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";
import Constants from "../../constants/constants";
import TKO from "../../helpers/helperFunctions";

const GameRow = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const game = props.game;

  const gameDate = TKO.formatDate(game.date, "shortMonth");
  const gameTime = TKO.formatTime(game.date);

  let winnerText = "";
  if (game.isActive === false) {
    winnerText = "Winner: ";
    game.winner.forEach((winner, index) => {
      if (game.winner.length > 1 && index !== 0) {
        winnerText += `, `;
      }

      // winnerText += `${winner.player.name} (${winner.totalScore})`;
      winnerText += `${winner.player.name}`;
    });
  }

  const status = game.isActive ? "In progress" : winnerText;

  const confirmDeleteGame = () => {
    Alert.alert("Arrrrg!", "Are you sure you want to delete this game?", [
      { text: "Cancel", style: "cancel", onPress: cancelDeleteGameHandler },
      { text: "Yes", style: "default", onPress: deleteGameHandler },
    ]);
    return;
  };

  const deleteGameHandler = () => {
    dispatch(deleteGame(game.id));
  };

  const cancelDeleteGameHandler = () => {};

  const rightSwipeActions = () => {
    return (
      <RectButton style={styles.swipeLeftAction} onPress={confirmDeleteGame}>
        <MaterialCommunityIcons name="delete-forever-outline" size={24} color="black" />
      </RectButton>
    );
  };

  const rowPressHandler = () => {
    //Load store with game data
    dispatch(setCurrentGame(props.game));
    navigation.navigate("Game");
  };

  return (
    <Swipeable renderRightActions={rightSwipeActions} style={styles.gameContainer}>
      <RectButton onPress={rowPressHandler}>
        <View style={styles.gameContainer}>
          <View style={styles.row}>
            <Ionicons name={"skull"} size={16} color={"black"} />
            <View style={styles.description}>
              <DefaultText style={styles.scoringTypeText}>
                {Constants.scoringTypes[game.scoringType]}
              </DefaultText>
              {/* <DefaultText style={styles.metaData}>
                ID: {game.id} Round {game.scoringRound}
              </DefaultText> */}
              <DefaultText style={styles.metaData}>
                {gameDate} @ {gameTime}
              </DefaultText>
            </View>
            <DefaultText style={styles.players}>{game.players.length}</DefaultText>
            <DefaultText style={styles.status}>{status}</DefaultText>
          </View>
        </View>
      </RectButton>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    padding: 5,
    borderColor: Colors.theme.grey2,
    borderBottomWidth: 1,
    borderRightWidth: 8,
    borderRightColor: Colors.theme.grey3,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  description: {
    flex: 1,
    flexDirection: "column",
    width: Defaults.myGamesScreen.widths.description,
    paddingHorizontal: 5,
  },
  scoringTypeText: {
    fontSize: Defaults.fontSize,
  },
  metaData: {
    fontSize: Defaults.smallFontSize,
  },
  players: {
    fontSize: Defaults.fontSize,
    width: Defaults.myGamesScreen.widths.players,
    textAlign: "center",
  },
  status: {
    fontSize: Defaults.fontSize,
    fontStyle: "italic",
    width: Defaults.myGamesScreen.widths.status,
    textAlign: "right",
  },
  swipeLeftAction: {
    backgroundColor: Colors.theme.light3,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
});

export default GameRow;
