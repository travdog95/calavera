import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch } from "react-redux";

import CustomActionButton from "../../components/CustomActionButton";
import DefaultText from "../../components/UI/DefaultText";

import Player from "../../models/player";
import Game from "../../models/game";
import RoundPlayerDetail from "../../models/roundPlayerDetail";
import RoundBonusDetail from "../../models/roundBonusDetail";

import { initGame } from "../../store/actions/game-actions";

import TKO from "../../helpers/helperFunctions";
import Defaults from "../../constants/defaults";

const ConfirmNewGameScreen = (props) => {
  const numRounds = props.route.params.numRounds;
  const playerNames = props.route.params.playerNames;

  const dispatch = useDispatch();

  const backButtonHandler = () => {
    props.navigation.navigate("CreateGame");
  };

  const initRoundBonusesDetail = () => {
    const roundBonusesDetail = {};

    let r = 1;
    for (r; r <= numRounds; r++) {
      const key = `r${r}`;
      roundBonusesDetail[key] = new RoundBonusDetail();
    }

    return roundBonusesDetail;
  };

  const confirmGameHandler = () => {
    //Create players
    const players = createPlayersHandler(playerNames);

    //Init game data
    const gameData = initGameData(players, numRounds);

    const roundBonusesDetail = initRoundBonusesDetail();

    //Create game
    const game = new Game({
      id: "g" + Math.floor(Math.random() * 10000000000).toString(),
      players,
      numRounds,
      currentRound: 1,
      gameData,
      date: TKO.getCurrentDate(),
      status: "In progress",
      roundBonusesDetail,
    });

    //Load store with game data
    dispatch(initGame(game));

    props.navigation.navigate("Game");
  };

  const createPlayersHandler = (playerNames) => {
    //Create players
    const players = [];
    let id = 1;

    playerNames.forEach((playerName) => {
      players.push(new Player(`p${id}`, playerName));
      id++;
    });
    return players;
  };

  const initGameData = (players, numRounds) => {
    //Init game detail data
    const gameData = [];
    let r = 1;
    for (r; r <= numRounds; r++) {
      const roundData = [];
      players.forEach((player) => {
        roundData.push(new RoundPlayerDetail(player.id, r));
      });
      gameData.push(roundData);
    }

    return gameData;
  };

  return (
    <View style={styles.screen}>
      <View style={styles.messageContainer}>
        <DefaultText style={styles.message}>
          You are about to embark on a swashbuckling journey with{" "}
          <DefaultText style={styles.emphasis}>{playerNames.length}</DefaultText> brave souls that
          will last <DefaultText style={styles.emphasis}>{numRounds}</DefaultText> rounds...may luck
          favor the foolish!
        </DefaultText>
      </View>
      <ScrollView contentContainerStyle={styles.playerNamesContainer}>
        {playerNames.map((playerName, index) => {
          return (
            <View key={index}>
              <DefaultText style={styles.playerName}>{playerName}</DefaultText>
            </View>
          );
        })}
      </ScrollView>
      {/* <Animatable.View
        style={{ position: "absolute", left: 20, bottom: 20 }}
        animation={"slideInLeft"}
      >
        <CustomActionButton
          style={styles.secondaryButton}
          onPress={backButtonHandler}
        >
          <Text style={styles.primaryButtonText}>Back</Text>
        </CustomActionButton>
      </Animatable.View> */}

      <Animatable.View
        style={{ position: "absolute", right: 20, bottom: 20 }}
        animation={"slideInRight"}
      >
        <CustomActionButton style={styles.primaryButton} onPress={confirmGameHandler}>
          <Text style={styles.primaryButtonText}>Confirm Game</Text>
        </CustomActionButton>
      </Animatable.View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Confirm New Game",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  messageContainer: {
    padding: 10,
  },
  message: {
    textAlign: "center",
    fontSize: Defaults.largeFontSize,
  },
  emphasis: {
    fontFamily: "open-sans-bold",
  },
  playerNamesContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  playerName: {
    fontSize: Defaults.extraLargeFontSize,
  },
  primaryButton: {
    backgroundColor: Defaults.button.primary,
  },
  primaryButtonText: {
    color: "white",
    fontSize: Defaults.fontSize,
  },
  secondaryButton: {
    backgroundColor: Defaults.button.cancel,
  },
});
export default ConfirmNewGameScreen;
