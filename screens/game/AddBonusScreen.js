import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Button } from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";

import { updatePlayerData } from "../../store/actions/game-actions";
import CustomActionButton from "../../components/CustomActionButton";
import DefaultText from "../../components/UI/DefaultText";
import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const AddBonusScreen = (props) => {
  // const currentGame = useSelector((state) => state.game.currentGame);
  const currentGameId = useSelector((state) => state.game.currentGameId);
  const currentGame = useSelector((state) => state.game.games[currentGameId]);

  const currentPlayerId = props.route.params.playerId;
  const currentPlayer = currentGame.players.filter((player) => player.id === currentPlayerId)[0];
  const eligiblePlayers = currentGame.players.filter((player) => player.id !== currentPlayerId);
  const selectedRound = props.route.params.round;

  const bonusOptions = Defaults.game.bonusOptions;

  const dispatch = useDispatch();

  const [selectedBonus, setSelectedBonus] = useState(bonusOptions[0]);
  const [selectedPlayer, setSelectedPlayer] = useState(eligiblePlayers[0]);

  const setSelectedBonusHandler = (selectedOption) => {
    setSelectedBonus(selectedOption);
  };

  const setSelectedPlayerHandler = (selectedOption) => {
    setSelectedPlayer(selectedOption);
  };

  const updateBonusHandler = () => {
    const playerData = [];
    currentGame.players.map((player, index) => {
      switch (selectedBonus.id) {
        case "alliance1":
          if (player.id === currentPlayerId || player.id === selectedPlayer.id) {
            playerData.push({
              playerId: player.id,
              isAligned1: player.id === currentPlayerId ? selectedPlayer.id : currentPlayerId,
            });
          } else {
            playerData.push({ playerId: player.id, isAligned1: "" });
          }
          break;
        case "alliance2":
          if (player.id === currentPlayerId || player.id === selectedPlayer.id) {
            playerData.push({
              playerId: player.id,
              isAligned2: player.id === currentPlayerId ? selectedPlayer.id : currentPlayerId,
            });
          } else {
            playerData.push({ playerId: player.id, isAligned2: "" });
          }
          break;
        case "wager10":
          if (player.id === currentPlayerId) {
            playerData.push({ playerId: player.id, pointsWagered: 10 });
          } else {
            playerData.push({ playerId: player.id, pointsWagered: 0 });
          }
          break;
        case "wager20":
          if (player.id === currentPlayerId) {
            playerData.push({ playerId: player.id, pointsWagered: 20 });
          } else {
            playerData.push({ playerId: player.id, pointsWagered: 0 });
          }
          break;
      }
    });

    dispatch(updatePlayerData(selectedRound, playerData, "bonuses"));

    props.navigation.navigate("Game");
  };

  const backButtonHandler = () => {
    props.navigation.navigate("Game");
  };

  const allianceOrdinal = selectedBonus.id === "alliance1" ? "first" : "second";

  return (
    <View style={styles.screen}>
      <View style={styles.bonusOptionsContainer}>
        {bonusOptions.map((option, index) => {
          const buttonColor =
            selectedBonus.id === option.id ? Colors.theme.main1 : Colors.theme.grey5;
          return (
            <Button
              key={index}
              color={buttonColor}
              title={option.name}
              onPress={setSelectedBonusHandler.bind(this, option)}
            />
          );
        })}
      </View>
      {selectedBonus.id === "alliance1" || selectedBonus.id === "alliance2" ? (
        <View style={styles.allianceContainer}>
          <View style={styles.bonusStatementContainer}>
            <View>
              <DefaultText style={styles.bonusStatement}>
                <DefaultText style={Defaults.emphasis}>{currentPlayer.name}</DefaultText> and{" "}
                <DefaultText style={Defaults.emphasis}>{selectedPlayer.name}</DefaultText>
              </DefaultText>
            </View>
            <View>
              <DefaultText style={styles.bonusStatement}>
                will share the{" "}
                <DefaultText style={Defaults.emphasis}>{allianceOrdinal}</DefaultText> alliance
              </DefaultText>
            </View>
          </View>
          <ScrollView contentContainerStyle={styles.playersContainer}>
            {eligiblePlayers.map((player, index) => {
              const buttonColor =
                selectedPlayer.id === player.id ? Colors.theme.main1 : Colors.theme.grey5;

              return (
                <Button
                  key={index}
                  color={buttonColor}
                  title={player.name}
                  onPress={setSelectedPlayerHandler.bind(this, player)}
                />
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.bonusStatementContainer}>
          <DefaultText style={styles.bonusStatement}>
            <DefaultText style={Defaults.emphasis}>{currentPlayer.name}</DefaultText> will wager{" "}
            <DefaultText style={Defaults.emphasis}>{selectedBonus.value}</DefaultText> extra points
            in round <DefaultText style={Defaults.emphasis}>{selectedRound}</DefaultText>.
          </DefaultText>
        </View>
      )}
      <Animatable.View
        style={{ position: "absolute", left: 20, bottom: 20 }}
        animation={"slideInLeft"}
      >
        <CustomActionButton style={styles.backButton} onPress={backButtonHandler}>
          <DefaultText style={styles.buttonText}>Back</DefaultText>
        </CustomActionButton>
      </Animatable.View>

      <Animatable.View
        style={{ position: "absolute", right: 20, bottom: 20 }}
        animation={"slideInRight"}
      >
        <CustomActionButton style={styles.primaryButton} onPress={updateBonusHandler}>
          <DefaultText style={styles.buttonText}>Save bonus</DefaultText>
        </CustomActionButton>
      </Animatable.View>
    </View>
  );
};

export const screenOptions = (navData) => {
  const currentPlayerId = navData.route.params.playerId;
  // const currentPlayer = currentGame.players.filter((player) => player.id === currentPlayerId)[0];

  return {
    headerTitle: "Add Bonus",
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.screenBackgroundColor },
  bonusOptionsContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  playersContainer: {
    flex: 1,
    alignItems: "center",
  },
  allianceContainer: {
    flex: 1,
  },
  bonusStatementContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  bonusStatement: {
    fontSize: Defaults.extraLargeFontSize,
    textAlign: "center",
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

export default AddBonusScreen;
