import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import DefaultText from "../../components/UI/DefaultText";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

const WinnerScreen = (props) => {
  const game = useSelector((state) => state.game.currentGame);

  const finalRoundKey = `r${game.numRounds}`;

  const unSortedLeaderboardData = [];
  game.players.forEach((player) => {
    unSortedLeaderboardData.push({
      player,
      totalScore: game.roundData[finalRoundKey][player.id].totalScore,
    });
  });

  const leaderboardData = unSortedLeaderboardData.sort(
    (a, b) => parseFloat(b.totalScore) - parseFloat(a.totalScore)
  );

  const winners = [];
  leaderboardData.forEach((player, index) => {
    if (index === 0 || player.totalScore === leaderboardData[index - 1].totalScore) {
      winners.push(player);
    }
  });

  console.log(winners);
  return (
    <View style={styles.screen}>
      <View>
        <Text>I'm the winner!</Text>
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    title: "Winner!",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.screenBackgroundColor,
  },
});

export default WinnerScreen;
