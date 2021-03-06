import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";

import { updatePlayerData } from "../../store/actions/game-actions";
import CustomActionButton from "../../components/CustomActionButton";
import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const AddBonusScreen = (props) => {
  const currentGame = useSelector((state) => state.game.currentGame);
  const currentPlayerId = props.route.params.playerId;
  const currentPlayer = currentGame.players.filter((player) => player.id === currentPlayerId)[0];
  const players = currentGame.players.filter((player) => player.id !== currentPlayerId);
  const selectedRound = props.route.params.round;

  const bonusOptions = Defaults.game.bonusOptions;

  const dispatch = useDispatch();

  const [selectedBonus, setSelectedBonus] = useState(bonusOptions[0]);
  const [selectedPlayer, setSelectedPlayer] = useState(players[0].id);

  const setSelectedBonusHandler = (selectedOption) => {
    setSelectedBonus(selectedOption);
  };

  const setSelectedPlayerHandler = (selectedOption) => {
    setSelectedPlayer(selectedOption);
  };

  const updateBonusHandler = () => {
    // const playerData = [];
    // currentGame.game.players.map((player, index) => {
    //   playerData.push({ playerId: player.id, bid: bids[index] });
    // });
    // dispatch(updatePlayerData(currentGame.currentRound, playerData));
    // props.navigation.navigate("Game");
  };

  const backButtonHandler = () => {
    props.navigation.navigate("Game");
  };

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
      {selectedBonus.id === "alliance" ? (
        <ScrollView contentContainerStyle={styles.playersContainer}>
          {players.map((player, index) => {
            const buttonColor =
              selectedPlayer === player.id ? Colors.theme.main1 : Colors.theme.grey5;

            return (
              <Button
                key={index}
                color={buttonColor}
                title={player.name}
                onPress={setSelectedPlayerHandler.bind(this, player.id)}
              />
            );
          })}
        </ScrollView>
      ) : (
        <View>
          <Text>
            {currentPlayer.name} will wager {selectedBonus.value} points in round {selectedRound}.
          </Text>
        </View>
      )}
      <Animatable.View
        style={{ position: "absolute", left: 20, bottom: 20 }}
        animation={"slideInLeft"}
      >
        <CustomActionButton style={styles.backButton} onPress={backButtonHandler}>
          <Text style={styles.buttonText}>Back</Text>
        </CustomActionButton>
      </Animatable.View>

      <Animatable.View
        style={{ position: "absolute", right: 20, bottom: 20 }}
        animation={"slideInRight"}
      >
        <CustomActionButton style={styles.primaryButton} onPress={updateBonusHandler}>
          <Text style={styles.buttonText}>Save bonus</Text>
        </CustomActionButton>
      </Animatable.View>
    </View>
  );
};

export const screenOptions = (navData) => {
  const currentPlayerId = navData.route.params.playerId;
  // const currentPlayer = currentGame.players.filter((player) => player.id === currentPlayerId)[0];

  return {
    headerTitle: "Add Bonus for " + currentPlayerId,
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
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
