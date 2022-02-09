import React from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";

import DefaultText from "../../components/UI/DefaultText";
import RoundHeader from "../../components/game/RoundHeader";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

const LeaderboardScreen = (props) => {
  // const game = useSelector((state) => state.game.currentGame);
  const currentGameId = useSelector((state) => state.game.currentGameId);
  const game = useSelector((state) => state.game.games[currentGameId]);

  const firstPlayer = game.players[0];

  let leaderBoardRound = game.scoringRound === 1 ? 1 : game.scoringRound - 1;

  //Has final round been scored?
  const hasFinalRoundBeenScored = game.isLastRoundScored;
  // let hasFinalRoundBeenScored = true;
  if (parseInt(game.scoringRound) === parseInt(game.numRounds)) {
    //   //check to see if final round has scores
    //   game.players.forEach((player) => {
    //     const playerDetail = game.roundData[`r${game.numRounds}`][player.id];
    //     if (parseInt(playerDetail.baseScore) + parseInt(playerDetail.bonusScore) === 0) {
    //       hasFinalRoundBeenScored = false;
    //     }
    //   });

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

  if (game.scoringRound == 1) headerText = "Round 1";

  let previousScore = 0;
  let rank = 0;

  return (
    <View style={styles.screen}>
      <RoundHeader screen="LeaderboardScreen" headerText={headerText} />
      <View style={styles.header}>
        <DefaultText style={styles.rankLabel}>Rank</DefaultText>
        <DefaultText style={styles.playerLabel}>Player</DefaultText>
        <DefaultText style={styles.scoreLabel}>Score</DefaultText>
      </View>
      <ScrollView contentContainerStyle={styles.leaderboardContainer}>
        {leaderboardData.map((data, index) => {
          {
            /* const rowBackgroundColor = index % 2 === 0 ? Colors.theme.grey2 : "white"; */
          }
          const rowBackgroundColor = "white";
          if (previousScore !== parseInt(data.totalScore)) {
            rank = index + 1;
          }
          previousScore = data.totalScore;

          //Everyone is in first before the game begins
          if (game.scoringRound == 1) rank = 1;

          const rowFontSize = rank === 1 ? Defaults.extraLargeFontSize : Defaults.largeFontSize;

          return (
            <View
              key={index}
              style={{ ...styles.rowContainer, ...{ backgroundColor: rowBackgroundColor } }}
            >
              {rank === 1 ? (
                <View style={[styles.rank, { alignItems: "center", justifyContent: "center" }]}>
                  <Image
                    source={require("../../assets/adaptive-icon.png")}
                    style={{
                      width: 35,
                      height: 35,
                    }}
                  />
                </View>
              ) : (
                <DefaultText style={{ ...styles.rank, ...{ fontSize: rowFontSize } }}>
                  {rank}
                </DefaultText>
              )}
              <DefaultText style={{ ...styles.playerName, ...{ fontSize: rowFontSize } }}>
                {data.player.name}
              </DefaultText>
              <DefaultText style={{ ...styles.score, ...{ fontSize: rowFontSize } }}>
                {data.totalScore}
              </DefaultText>
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
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: Colors.theme.grey2,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderColor: "black",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  rankLabel: {
    width: Defaults.leaderboardScreen.widths.rank,
    textAlign: "center",
    fontFamily: Defaults.fontFamily.bold,
    fontSize: Defaults.largeFontSize,
  },
  playerLabel: {
    width: Defaults.leaderboardScreen.widths.player,
    textAlign: "left",
    fontFamily: Defaults.fontFamily.bold,
    fontSize: Defaults.largeFontSize,
    paddingLeft: 5,
  },
  scoreLabel: {
    width: Defaults.leaderboardScreen.widths.score,
    textAlign: "center",
    fontFamily: Defaults.fontFamily.bold,
    fontSize: Defaults.largeFontSize,
  },
  playerName: {
    width: Defaults.leaderboardScreen.widths.player,
    paddingLeft: 5,
  },
  score: {
    width: Defaults.leaderboardScreen.widths.score,
    textAlign: "center",
  },
  rank: {
    width: Defaults.leaderboardScreen.widths.rank,
    textAlign: "center",
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
