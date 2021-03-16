import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { useSelector } from "react-redux";

import CustomActionButton from "../../components/CustomActionButton";
import DefaultText from "../../components/UI/DefaultText";
import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

const LeaderboardScreen = (props) => {
  const currentGame = useSelector((state) => state.game.currentGame);

  let round = currentGame.numRounds;
  currentGame.gameData.some((roundPlayersDetail) => {
    if (roundPlayersDetail[0].score === 0) {
      round = roundPlayersDetail[0].round === 1 ? 1 : roundPlayersDetail[0].round - 1;
      return true;
    }
  });

  const unSortedLeaderboardData = [];
  currentGame.players.forEach((player) => {
    let playerTotalScore = 0;

    currentGame.gameData.forEach((roundPlayersDetail) => {
      roundPlayersDetail.forEach((roundPlayerDetail) => {
        if (roundPlayerDetail.playerId === player.id) {
          playerTotalScore += roundPlayerDetail.score;
        }
      });
    });

    unSortedLeaderboardData.push({ player, totalScore: playerTotalScore });
  });

  const leaderboardData = unSortedLeaderboardData.sort(
    (a, b) => parseFloat(b.totalScore) - parseFloat(a.totalScore)
  );

  const backButtonHandler = () => {
    props.navigation.navigate("Game");
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.leaderboardContainer}>
        {leaderboardData.map((data, index) => {
          const rowBackgroundColor = index % 2 === 0 ? Colors.theme.grey2 : "white";

          return (
            <View
              key={index}
              style={{ ...styles.rowContainer, ...{ backgroundColor: rowBackgroundColor } }}
            >
              <DefaultText style={styles.playerName}>{data.player.name}</DefaultText>
              <DefaultText style={styles.score}>{data.totalScore}</DefaultText>
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
  return {
    title: "Leaderboard",
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center" },
  leaderboardContainer: {
    width: "100%",
  },
  rowContainer: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  playerName: {
    width: "80%",
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: Defaults.extraLargeFontSize,
  },
  score: {
    width: "20%",
    textAlign: "right",
    fontWeight: "bold",
    paddingHorizontal: 10,
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
