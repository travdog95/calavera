import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useDispatch } from "react-redux";

import ScreenPrimaryButton from "../../components/UI/ScreenPrimaryButton";
import DefaultText from "../../components/UI/DefaultText";

import Player from "../../models/player";
// import RoundPlayerDetail from "../../models/roundPlayerDetail";
import PlayerDetail from "../../models/playerDetail";
import RoundBonusDetail from "../../models/roundBonusDetail";
import PlayerBonusDetail from "../../models/playerBonusDetail";

import { createGame } from "../../store/actions/game-actions";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";
import Constants from "../../constants/constants";

const ConfirmNewGameScreen = (props) => {
  const numRounds = props.route.params.numRounds;
  const playerNames = props.route.params.playerNames;
  const scoringType = props.route.params.scoringType;

  const dispatch = useDispatch();

  const initRoundBonusesDetail = (players) => {
    const roundBonusesDetail = {};

    let r = 1;
    for (r; r <= numRounds; r++) {
      const key = `r${r}`;

      const playersBonusDetail = initPlayersBonusDetail(players);

      roundBonusesDetail[key] = new RoundBonusDetail(r, playersBonusDetail);
    }

    return roundBonusesDetail;
  };

  const initPlayersBonusDetail = (players) => {
    const playersBonusDetail = {};

    players.forEach((player) => {
      playersBonusDetail[player.id] = new PlayerBonusDetail();
    });

    return playersBonusDetail;
  };

  const initNumCardsByRound = (numRounds) => {
    const numCards = [];

    for (let r = 1; r <= parseInt(numRounds); r++) {
      numCards.push(r);
    }
    return numCards;
  };

  const confirmGameHandler = () => {
    //Create players
    const players = createPlayersHandler(playerNames);

    //Init game data
    const roundData = initRoundData(players, numRounds);

    const numCardsByRound = initNumCardsByRound(numRounds);

    // const roundBonusesDetail = initRoundBonusesDetail(players);

    //Load store with game data
    dispatch(
      createGame(
        players,
        numRounds,
        1,
        1,
        roundData,
        new Date(),
        true,
        "SkullKing",
        scoringType,
        false,
        numCardsByRound
      )
    ).then(() => props.navigation.navigate("Game"));
  };

  const createPlayersHandler = (playerNames) => {
    //Create players
    const players = [];

    playerNames.forEach((playerName, index) => {
      const newPlayerName = playerName === "" ? `Player ${index + 1}` : playerName;
      players.push(new Player(`p${index + 1}`, newPlayerName));
    });
    return players;
  };

  // const initGameData = (players, numRounds) => {
  //   //Init game detail data
  //   const gameData = [];
  //   let r = 1;
  //   for (r; r <= numRounds; r++) {
  //     const roundData = [];
  //     players.forEach((player) => {
  //       roundData.push(new RoundPlayerDetail(player.id, r));
  //     });
  //     gameData.push(roundData);
  //   }

  //   return gameData;
  // };

  const initPlayerData = (players) => {
    const playerData = {};

    players.forEach((player) => {
      const key = player.id;

      playerData[key] = new PlayerDetail();

      //Default to cannonType to cannonball for Rascal enhanced scoringType
      if (scoringType === Constants.scoringType.rascalEnhanced) {
        playerData[key].cannonType = 1;
      }
    });

    return playerData;
  };

  const initRoundData = (players, numRounds) => {
    //Init round data
    const roundData = {};
    let r = 1;
    for (r; r <= numRounds; r++) {
      const key = `r${r}`;

      const playerData = initPlayerData(players);

      roundData[key] = playerData;
    }

    return roundData;
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <DefaultText style={styles.headerText}>
          {Constants.scoringTypes[scoringType]} Scoring
        </DefaultText>
      </View>
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
          if (playerName === "") playerName = `Player ${index + 1}`;
          return (
            <View key={index}>
              <DefaultText style={styles.playerName}>{playerName}</DefaultText>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <ScreenPrimaryButton onPress={confirmGameHandler} buttonText={"Let's Play!"} />
      </View>
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
    backgroundColor: Colors.screenBackgroundColor,
  },
  header: {
    paddingTop: 20,
  },
  headerText: {
    fontSize: Defaults.extraLargeFontSize,
    textAlign: "center",
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
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
});

export default ConfirmNewGameScreen;
