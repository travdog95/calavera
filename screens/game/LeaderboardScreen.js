import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import DefaultText from "../../components/UI/DefaultText";
import RoundHeader from "../../components/game/RoundHeader";

import Defaults from "../../constants/defaults";

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
      <RoundHeader round={round} />
      <ScrollView contentContainerStyle={styles.leaderboardContainer}>
        {leaderboardData.map((data, index) => {
          {
            /* const rowBackgroundColor = index % 2 === 0 ? Colors.theme.grey2 : "white"; */
          }
          const rowBackgroundColor = "white";
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
    borderBottomWidth: 1,
    borderColor: "black",
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
