import React, { useState } from "react";
import { View, Text, ScrollView, Button, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons } from "react-navigation-header-buttons";
import { useNavigation } from "@react-navigation/core";
import { useKeepAwake } from "expo-keep-awake";

import GamePlayersHeader from "../../components/game/GamePlayersHeader";
import GameRounds from "../../components/game/GameRounds";
import GameRoundRows from "../../components/game/GameRoundRows";
import HeaderButtonLeaderboard from "../../components/game/header-buttons/HeaderButtonLeaderboard";
import HelpButton from "../../components/UI/HelpButton";
import HeaderButtonBids from "../../components/game/header-buttons/HeaderButtonBids";
import HeaderButtonScores from "../../components/game/header-buttons/HeaderButtonScores";
import HeaderButton from "../../components/UI/HeaderButton";
import ScreenPrimaryButton from "../../components/UI/ScreenPrimaryButton";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";
import TKO from "../../helpers/helperFunctions";

const GameScreen = (props) => {
  useKeepAwake();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const currentGameId = useSelector((state) => state.game.currentGameId);
  const game = useSelector((state) => state.game.games[currentGameId]);
  const navigation = useNavigation();

  const roundPlayerDetailWidth = TKO.calcRoundPlayerDetailWidth(game.players.length);

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
      <View>
        <Text>An error occurred!</Text>
        <Button title="Try again" onPress={loadProducts} color={Colors.theme.main3} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View>
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
            gameIsActive={game.isActive}
          />
          <View style={styles.roundsContainer}>
            <GameRounds />
            <GameRoundRows roundPlayerDetailWidth={roundPlayerDetailWidth} />
          </View>
        </ScrollView>
      </ScrollView>
      {game.isLastRoundScored && game.isActive ? (
        <View style={styles.buttonContainer}>
          <ScreenPrimaryButton onPress={confirmCompleteGame} buttonText={"Complete Game"} />
        </View>
      ) : null}

      {game.isActive === false ? (
        <View style={styles.buttonContainer}>
          <ScreenPrimaryButton
            onPress={() => {
              navigation.navigate("Winner");
            }}
            buttonText={"Winner Screen"}
          />
        </View>
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
        <HelpButton helpKey="scorecard" isInHeader={true} />
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
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
});

export default GameScreen;
