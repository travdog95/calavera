import React, { useEffect } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import DefaultText from "../../components/UI/DefaultText";
import { completeCurrentGame } from "../../store/actions/game-actions";

import Defaults from "../../constants/defaults";

const WinnerScreen = (props) => {
  // const game = useSelector((state) => state.game.currentGame);
  const currentGameId = useSelector((state) => state.game.currentGameId);
  const game = useSelector((state) => state.game.games[currentGameId]);

  const dispatch = useDispatch();

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
  let topScore = 0;
  leaderboardData.forEach((player, index) => {
    if (index === 0) {
      winners.push(player);
      topScore = player.totalScore;
    }

    if (index !== 0 && parseInt(player.totalScore) === parseInt(topScore)) winners.push(player);
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

  const winnerNames = winners.map((winner) => winner.player.name);

  //complete game
  useEffect(() => {
    dispatch(completeCurrentGame(winners));
  }, []);

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
