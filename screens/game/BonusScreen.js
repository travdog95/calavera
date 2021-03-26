import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import BonusAlliance from "../../components/game/bonus/BonusAlliance";
import BonusWager from "../../components/game/bonus/BonusWager";
import { updatePlayerData } from "../../store/actions/game-actions";
import DefaultText from "../../components/UI/DefaultText";
import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";
import BonusMultiple from "../../components/game/bonus/BonusMultiple";
import BonusBoolean from "../../components/game/bonus/BonusBoolean";

const BonusScreen = (props) => {
  const currentGame = useSelector((state) => state.game.currentGame);
  const currentPlayerId = props.route.params.player.id;
  const currentPlayer = currentGame.players.filter(
    (player) => player.id === currentPlayerId
  )[0];
  const currentRound = currentGame.currentRound;

  const dispatch = useDispatch();

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

  const incOrDecValueHandler = (direction) => {
    console.log(direction);
  };

  const calcTotalScore = () => {
    return 0;
  };

  const getBonusItem = (bonusItem, bonusScore) => {
    let newBonusItem = {};
    switch (bonusItem) {
      case "alliance1":
        newBonusItem = {
          isAvailable: true,
          numAvailable: 0,
          controlValue: "",
          score: 0,
        };
        break;
      case "alliance2":
        newBonusItem = {
          isAvailable: true,
          numAvailable: 0,
          controlValue: "p3",
          score: bonusScore,
        };
        break;
      case "wager":
        newBonusItem = {
          isAvailable: true,
          numAvailable: 0,
          controlValue: 20,
          score: bonusScore[2],
        };
        break;
      case "pirates":
        newBonusItem = {
          isAvailable: true,
          numAvailable: 4,
          controlValue: 1,
          score: 30,
        };
        break;
      case "normal14s":
        newBonusItem = {
          isAvailable: true,
          numAvailable: 3,
          controlValue: 1,
          score: 10,
        };
        break;
      case "skullKing":
        newBonusItem = {
          isAvailable: true,
          numAvailable: 0,
          controlValue: false,
          score: 0,
        };
        break;
      case "black14":
        newBonusItem = {
          isAvailable: true,
          numAvailable: 0,
          controlValue: true,
          score: 20,
        };
        break;
      default:
        return newBonusItem;
    }
    return newBonusItem;
  };
  const updateBonusScoresState = () => {
    const newBonusScores = {};

    for (const bonusItem in Defaults.game.bonusScoreDefaults) {
      if (
        Object.hasOwnProperty.call(Defaults.game.bonusScoreDefaults, bonusItem)
      ) {
        const bonusValue = Defaults.game.bonusScoreDefaults[bonusItem];
        newBonusScores[bonusItem] = getBonusItem(bonusItem, bonusValue);
      }
    }

    return newBonusScores;
  };

  const [totalScore, setTotalScore] = useState(calcTotalScore);
  const [bonusScores, setBonusScores] = useState(updateBonusScoresState);

  return (
    <View style={styles.screen}>
      <View style={styles.totalRow}>
        <DefaultText style={styles.totalRowText}>
          Total Bonus Points: <DefaultText>{totalScore}</DefaultText>
        </DefaultText>
      </View>
      <View style={styles.bonusRow}>
        <BonusAlliance
          currentPlayer={currentPlayer}
          bonusItem={bonusScores.alliance1}
        />
      </View>
      <View style={styles.bonusRow}>
        <BonusAlliance
          currentPlayer={currentPlayer}
          bonusItem={bonusScores.alliance2}
        />
      </View>
      <View style={styles.bonusRow}>
        <BonusWager bonusItem={bonusScores.wager} />
      </View>
      <View style={styles.bonusRow}>
        <BonusMultiple bonusItem={bonusScores.pirates} bonusName={"Pirates"} />
      </View>
      <View style={styles.bonusRow}>
        <BonusMultiple bonusItem={bonusScores.normal14s} bonusName={"14's"} />
      </View>
      <View style={styles.bonusRow}>
        <BonusBoolean bonusItem={bonusScores.black14} bonusName={"Black 14"} />
      </View>
      <View style={styles.bonusRow}>
        <BonusBoolean
          bonusItem={bonusScores.skullKing}
          bonusName={"skullKing"}
        />
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  const playerName = navData.route.params.player.name;

  return {
    headerTitle: "Bonus for " + playerName,
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  bonusRow: {
    width: "100%",
    backgroundColor: Colors.theme.grey3,
  },
  totalRow: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Defaults.bonusScreen.rowVerticalPadding,
    backgroundColor: Colors.theme.grey3,
  },
  totalRowText: {
    fontSize: Defaults.extraLargeFontSize,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: Defaults.button.cancel,
  },
});

export default BonusScreen;
