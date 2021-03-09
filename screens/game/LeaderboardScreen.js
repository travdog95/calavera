import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { useSelector } from "react-redux";

import CustomActionButton from "../../components/CustomActionButton";
import DefaultText from "../../components/UI/DefaultText";
import Defaults from "../../constants/defaults";

const LeaderboardScreen = (props) => {
  const currentGame = useSelector((state) => state.game.currentGame);

  let currentRoundPlayersDetail = [];
  let prevRoundPlayersDetail = [];
  let round = 0;
  currentGame.gameData.some((roundPlayersDetail) => {
    if (roundPlayersDetail[0].score === 0) {
      round = roundPlayersDetail[0].round;
      if (round > 1) {
        currentRoundPlayersDetail = prevRoundPlayersDetail;
      } else {
        currentRoundPlayersDetail = roundPlayersDetail;
      }
      return true;
    }
    prevRoundPlayersDetail = roundPlayersDetail;
  });

  //Define leaderboard
  const leaderboardData = currentRoundPlayersDetail.sort(
    (a, b) => parseFloat(b.totalScore) - parseFloat(a.totalScore)
  );

  const backButtonHandler = () => {
    props.navigation.navigate("Game");
  };

  return (
    <View style={styles.screen}>
      <ScrollView>
        {leaderboardData.map((roundPlayerDetail, index) => {
          const player = currentGame.players.filter(
            (player) => player.id === roundPlayerDetail.playerId
          );
          return (
            <View key={index} style={styles.rowContainer}>
              <DefaultText style={styles.playerName}>{player[0].name}</DefaultText>
              <DefaultText style={styles.score}>{roundPlayerDetail.totalScore}</DefaultText>
            </View>
          );
        })}
      </ScrollView>
      <Animatable.View
        style={{ position: "absolute", left: 20, bottom: 20 }}
        animation={"slideInLeft"}
      >
        <CustomActionButton style={styles.backButton} onPress={backButtonHandler}>
          <Text style={styles.buttonText}>Back</Text>
        </CustomActionButton>
      </Animatable.View>
    </View>
  );
};

export const screenOptions = (navData) => {
  const currentRound = navData.route.params.round;

  return {
    headerTitle: "Leaderboard",
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", paddingTop: 30 },
  rowContainer: {
    flexDirection: "row",
  },
  playerName: {
    width: Defaults.isSmallScreen ? 100 : 120,
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: Defaults.extraLargeFontSize,
  },
  score: {
    width: Defaults.isSmallScreen ? 120 : 135,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: Defaults.extraLargeFontSize,
  },
  backButton: {
    backgroundColor: Defaults.button.cancel,
  },
  buttonText: {
    color: "white",
    fontSize: Defaults.fontSize,
  },
});

export default LeaderboardScreen;
