import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

import HeaderButton from "../../components/UI/HeaderButton";
import GamePlayersHeader from "../../components/game/GamePlayersHeader";
import GameRounds from "../../components/game/GameRounds";
import GameRoundRows from "../../components/game/GameRoundRows";
import CustomActionButton from "../../components/CustomActionButton";
import GameHeaderRight from "../../components/game/GameHeaderRight";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const GameScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [isGameOver, setIsGameOver] = useState(false);
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require("../../assets/kraken.mp3"));
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const game = useSelector((state) => state.game.currentGame);

  const windowWidth = Math.floor(Dimensions.get("window").width);

  //Calculate width of Round Player detail columns
  const calcRoundPlayerDetailWidth = () => {
    let width = 0;

    width = Math.floor((windowWidth - Defaults.game.roundNumWidth) / game.players.length);

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
            navigation={props.navigation}
          />
          <View style={styles.roundsContainer}>
            <GameRounds numRounds={game.numRounds} currentRound={game.currentRound} />
            <GameRoundRows
              roundPlayerDetailWidth={roundPlayerDetailWidth}
              navigation={props.navigation}
            />
          </View>
        </ScrollView>
      </ScrollView>
      <Animatable.View
        style={{ position: "absolute", left: 15, bottom: 15, flexDirection: "row" }}
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

        <CustomActionButton
          style={styles.primaryButton}
          onPress={() => {
            props.navigation.navigate("Scores", {
              round: game.currentRound,
              players: game.players,
              roundPlayersDetail: game.gameData[game.currentRound - 1],
            });
          }}
        >
          <Text style={styles.primaryButtonText}>Scores</Text>
        </CustomActionButton>
      </Animatable.View>

      <Animatable.View
        style={{ position: "absolute", left: 15, bottom: 70 }}
        animation={"slideInRight"}
      >
        <CustomActionButton style={styles.primaryButton} onPress={playSound}>
          <Text style={styles.primaryButtonText}>
            <Ionicons name="skull" size={18} color="white" />
          </Text>
        </CustomActionButton>
      </Animatable.View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Scorecard",
    headerRight: () => <GameHeaderRight navigation={navData.navigation} />,
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  roundsContainer: {
    flexDirection: "row",
  },
  primaryButton: {
    backgroundColor: Defaults.button.primary,
    marginRight: 10,
  },

  primaryButtonText: {
    color: "white",
    fontSize: Defaults.fontSize,
  },
});

export default GameScreen;
