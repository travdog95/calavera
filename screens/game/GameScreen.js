import React, { useState } from "react";
import { View, Text, ScrollView, Button, ActivityIndicator, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { useSelector } from "react-redux";
import { HeaderButtons } from "react-navigation-header-buttons";

import GamePlayersHeader from "../../components/game/GamePlayersHeader";
import GameRounds from "../../components/game/GameRounds";
import GameRoundRows from "../../components/game/GameRoundRows";
import HeaderButtonLeaderboard from "../../components/game/HeaderButtonLeaderboard";
import HeaderButtonBids from "../../components/game/HeaderButtonBids";
import HeaderButtonScores from "../../components/game/HeaderButtonScores";
import HeaderButton from "../../components/UI/HeaderButton";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const GameScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [isGameOver, setIsGameOver] = useState(false);

  const game = useSelector((state) => state.game.currentGame);
  //Calculate width of Round Player detail columns
  const calcRoundPlayerDetailWidth = () => {
    let width = 0;

    width = Math.floor((Defaults.windowWidth - Defaults.game.roundNumWidth) / game.players.length);

    return width < Defaults.game.playerMinWidth ? Defaults.game.playerMinWidth : width;
  };

  const roundPlayerDetailWidth = calcRoundPlayerDetailWidth();

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

  return (
    <View style={styles.screen}>
      <ScrollView horizontal>
        <ScrollView nestedScrollEnabled>
          <GamePlayersHeader
            players={game.players}
            roundPlayerDetailWidth={roundPlayerDetailWidth}
          />
          <View style={styles.roundsContainer}>
            <GameRounds numRounds={game.numRounds} currentRound={game.currentRound} />
            <GameRoundRows roundPlayerDetailWidth={roundPlayerDetailWidth} />
          </View>
        </ScrollView>
      </ScrollView>
      {/* <Animatable.View
        style={{
          position: "absolute",
          left: 15,
          bottom: 15,
          flexDirection: "row",
        }}
        animation={"slideInLeft"}
      >
        <CustomActionButton
          style={styles.primaryButton}
          onPress={() => {
            props.navigation.navigate("Bids", {
              round: game.currentRound,
              players: game.players,
              roundPlayersDetail: game.gameData[game.currentRound - 1],
            });
          }}
        >
          <Text style={styles.primaryButtonText}>Bids</Text>
        </CustomActionButton>
      </Animatable.View> */}
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
        <HeaderButtonBids />
        <HeaderButtonScores />
        <HeaderButtonLeaderboard />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  roundsContainer: {
    flexDirection: "row",
  },
});

export default GameScreen;
