import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
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

  let winnerText = "";

  if (winners.length === 1) {
    winnerText = (
      <View>
        <DefaultText style={styles.text}>{winners[0].player.name} wins!</DefaultText>
      </View>
    );
  }

  if (winners.length > 1) {
    winnerText = (
      <View>
        <View>
          <DefaultText style={styles.text}>We have {winners.length} winners!!</DefaultText>
        </View>
        {winners.map((winner) => {
          return (
            <View key={winner.player.id}>
              <DefaultText style={styles.text}>{winner.player.name} </DefaultText>
            </View>
          );
        })}
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require("../../assets/gifs/fireworks.gif")}
        style={styles.backgroundImage}
      >
        {winnerText}
      </ImageBackground>
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
    flexDirection: "column",
  },
  container: {
    padding: 10,
  },
  backgroundImage: { flex: 1, resizeMode: "cover", justifyContent: "center" },
  text: {
    fontSize: Defaults.extraLargeFontSize,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#000000a0",
  },
  winner: {
    fontSize: Defaults.extraLargeFontSize,
    textAlign: "center",
  },
});

export default WinnerScreen;
