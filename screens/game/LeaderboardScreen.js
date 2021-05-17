import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import DefaultText from "../../components/UI/DefaultText";
import RoundHeader from "../../components/game/RoundHeader";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

const LeaderboardScreen = (props) => {
  const game = useSelector((state) => state.game.currentGame);
  const firstPlayer = game.players[0];

  let leaderBoardRound = game.scoringRound === 1 ? 1 : game.scoringRound - 1;

  //Has final round been scored?
  let hasFinalRoundBeenScored = true;
  if (parseInt(game.scoringRound) === parseInt(game.numRounds)) {
    //check to see if final round has scores
    game.players.forEach((player) => {
      const playerDetail = game.roundData[`r${game.numRounds}`][player.id];
      if (parseInt(playerDetail.baseScore) + parseInt(playerDetail.bonusScore) === 0) {
        hasFinalRoundBeenScored = false;
      }
    });

    //If final round has been scored, then set leaderBoardRound to final round
    leaderBoardRound = hasFinalRoundBeenScored ? game.numRounds : leaderBoardRound;
  }

  const leaderBoardRoundKey = `r${leaderBoardRound}`;

  const unSortedLeaderboardData = [];
  game.players.forEach((player) => {
    unSortedLeaderboardData.push({
      player,
      totalScore: game.roundData[leaderBoardRoundKey][player.id].totalScore,
    });
  });

  const leaderboardData = unSortedLeaderboardData.sort(
    (a, b) => parseFloat(b.totalScore) - parseFloat(a.totalScore)
  );

  const backButtonHandler = () => {
    props.navigation.navigate("Game");
  };

  let headerText = game.isActive ? `After Round ${leaderBoardRound}` : "Final Standings";

  if (leaderBoardRound == 1 && game.roundData["r1"][firstPlayer.id].totalScore === 0)
    headerText = "Round 1";
  return (
    <View style={styles.screen}>
      <RoundHeader screen="LeaderboardScreen" headerText={headerText} />
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
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.screenBackgroundColor,
  },
  leaderboardContainer: {
    width: "100%",
  },
  rowContainer: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: "black",
    width: "100%",
  },
  playerName: {
    width: "70%",
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: Defaults.extraLargeFontSize,
  },
  score: {
    width: "30%",
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
