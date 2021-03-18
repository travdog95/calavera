import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import CheckBox from "@react-native-community/checkbox";

import { updatePlayerData } from "../../store/actions/game-actions";
import CustomActionButton from "../../components/CustomActionButton";
import DefaultText from "../../components/UI/DefaultText";
import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const BonusScreen = (props) => {
  const currentGame = useSelector((state) => state.game.currentGame);
  const currentPlayerId = props.route.params.player.id;
  const currentPlayer = currentGame.players.filter((player) => player.id === currentPlayerId)[0];
  const eligiblePlayers = currentGame.players.filter((player) => player.id !== currentPlayerId);
  const currentRound = currentGame.currentRound;

  const dispatch = useDispatch();
  const [toggleAlliance1, setToggleAlliance1] = useState(false);

  const bonusValue = 999;

  // const [selectedBonus, setSelectedBonus] = useState(bonusOptions[0]);
  // const [selectedPlayer, setSelectedPlayer] = useState(eligiblePlayers[0]);

  // const setSelectedBonusHandler = (selectedOption) => {
  //   setSelectedBonus(selectedOption);
  // };

  // const setSelectedPlayerHandler = (selectedOption) => {
  //   setSelectedPlayer(selectedOption);
  // };

  // const updateBonusHandler = () => {
  //   const playerData = [];
  //   currentGame.players.map((player, index) => {
  //     switch (selectedBonus.id) {
  //       case "alliance1":
  //         if (player.id === currentPlayerId || player.id === selectedPlayer.id) {
  //           playerData.push({
  //             playerId: player.id,
  //             isAligned1: player.id === currentPlayerId ? selectedPlayer.id : currentPlayerId,
  //           });
  //         } else {
  //           playerData.push({ playerId: player.id, isAligned1: "" });
  //         }
  //         break;
  //       case "alliance2":
  //         if (player.id === currentPlayerId || player.id === selectedPlayer.id) {
  //           playerData.push({
  //             playerId: player.id,
  //             isAligned2: player.id === currentPlayerId ? selectedPlayer.id : currentPlayerId,
  //           });
  //         } else {
  //           playerData.push({ playerId: player.id, isAligned2: "" });
  //         }
  //         break;
  //       case "wager10":
  //         if (player.id === currentPlayerId) {
  //           playerData.push({ playerId: player.id, pointsWagered: 10 });
  //         } else {
  //           playerData.push({ playerId: player.id, pointsWagered: 0 });
  //         }
  //         break;
  //       case "wager20":
  //         if (player.id === currentPlayerId) {
  //           playerData.push({ playerId: player.id, pointsWagered: 20 });
  //         } else {
  //           playerData.push({ playerId: player.id, pointsWagered: 0 });
  //         }
  //         break;
  //     }
  //   });

  //   dispatch(updatePlayerData(selectedRound, playerData, "bonuses"));

  //   props.navigation.navigate("Game");
  // };

  const backButtonHandler = () => {
    navigation.navigate("Game");
  };

  // const allianceOrdinal = selectedBonus.id === "alliance1" ? "first" : "second";

  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <View style={styles.bonusNameContainer}>
          <DefaultText style={styles.bonusName}>Alliance 1</DefaultText>
        </View>

        <View style={styles.bonusOptionsContainer}>
          <Text style={styles.bonusOptions}></Text>
        </View>
        <View style={styles.bonusControlContainer}></View>
        <View style={styles.bonusValueContainer}>
          <Text style={styles.bonusValue}>{bonusValue}</Text>
        </View>
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  const playerName = navData.route.params.player.name;

  return {
    headerTitle: "Bonuses for " + playerName,
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  bonusNameContainer: {
    width: "35%",
    borderWidth: 1,
    borderColor: "black",
    paddingLeft: 5,
  },
  bonusName: {
    fontSize: Defaults.largeFontSize,
  },
  bonusOptionsContainer: {
    width: "28%",
    borderWidth: 1,
    borderColor: "black",
  },
  bonusControlContainer: {
    width: "25%",
    borderWidth: 1,
    borderColor: "black",
  },
  bonusValueContainer: {
    width: "12%",
    borderWidth: 1,
    borderColor: "black",
    paddingRight: 5,
  },
  bonusValue: {
    fontSize: Defaults.largeFontSize,
    textAlign: "right",
  },

  primaryButton: {
    backgroundColor: Defaults.button.primary,
  },
  buttonText: {
    color: "white",
    fontSize: Defaults.fontSize,
  },
  backButton: {
    backgroundColor: Defaults.button.cancel,
  },
});

export default BonusScreen;
