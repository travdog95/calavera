import React, { useState } from "react";
import { View, Text, ScrollView, Button, ActivityIndicator, StyleSheet, Alert } from "react-native";
import * as Animatable from "react-native-animatable";
import { useSelector } from "react-redux";
import { HeaderButtons } from "react-navigation-header-buttons";
import { useNavigation } from "@react-navigation/core";

import GamePlayersHeader from "../../components/game/GamePlayersHeader";
import GameRounds from "../../components/game/GameRounds";
import GameRoundRows from "../../components/game/GameRoundRows";
import HeaderButtonLeaderboard from "../../components/game/HeaderButtonLeaderboard";
import HeaderButtonBids from "../../components/game/HeaderButtonBids";
import HeaderButtonScores from "../../components/game/HeaderButtonScores";
import HeaderButton from "../../components/UI/HeaderButton";
import DefaultText from "../../components/UI/DefaultText";
import CustomActionButton from "../../components/CustomActionButton";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const GameScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [isGameOver, setIsGameOver] = useState(false);

  const game = useSelector((state) => state.game.currentGame);
  const navigation = useNavigation();

  //Calculate width of Round Player detail columns
  const calcRoundPlayerDetailWidth = () => {
    let width = 0;

    width = Math.floor((Defaults.windowWidth - Defaults.game.roundNumWidth) / game.players.length);

    return width < Defaults.game.playerMinWidth ? Defaults.game.playerMinWidth : width;
  };

  const roundPlayerDetailWidth = calcRoundPlayerDetailWidth();

  const confirmCompleteGame = () => {
    Alert.alert("Arrrrg!", "Complete game and declare the winner?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", style: "default", onPress: completeGame },
    ]);
    return;
  };

  const completeGame = () => {
    navigation.navigate("Winner");
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title="Try again" onPress={loadProducts} color={Colors.theme.main3} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.theme.main3} />
      </View>
    );
  }

  let showCompleteGameButton = false;

  if (parseInt(game.scoringRound) === parseInt(game.numRounds)) {
    showCompleteGameButton = true;
    //check to see if final round has scores
    game.players.forEach((player) => {
      const playerDetail = game.roundData[`r${game.numRounds}`][player.id];
      if (parseInt(playerDetail.baseScore) + parseInt(playerDetail.bonusScore) === 0) {
        showCompleteGameButton = false;
      }
    });
  }

  return (
    <View style={styles.screen}>
      <ScrollView horizontal>
        <ScrollView nestedScrollEnabled>
          <GamePlayersHeader
            players={game.players}
            roundPlayerDetailWidth={roundPlayerDetailWidth}
          />
          <View style={styles.roundsContainer}>
            <GameRounds />
            <GameRoundRows roundPlayerDetailWidth={roundPlayerDetailWidth} />
          </View>
        </ScrollView>
      </ScrollView>
      {showCompleteGameButton ? (
        <CustomActionButton style={styles.primaryButton} onPress={confirmCompleteGame}>
          <DefaultText style={styles.primaryButtonText}>Complete Game</DefaultText>
        </CustomActionButton>
      ) : null}
    </View>
  );
};

export const screenOptions = () => {
  return {
    title: "Scorecard",
    headerLeft: () => {
      return null;
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <HeaderButtonBids screen={"GameScreen"} />
        <HeaderButtonScores />
        <HeaderButtonLeaderboard />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.screenBackgroundColor },
  roundsContainer: {
    flexDirection: "row",
  },
  primaryButton: {
    backgroundColor: Defaults.button.primary,
    margin: 5,
  },

  primaryButtonText: {
    color: "white",
    fontSize: Defaults.fontSize,
    fontWeight: "bold",
  },
});

export default GameScreen;
