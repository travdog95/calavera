import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";

import { updatePlayerData, setCurrentRound } from "../../store/actions/game-actions";
import ScoreRow from "../../components/game/ScoreRow";
import CustomActionButton from "../../components/CustomActionButton";
import DefaultText from "../../components/UI/DefaultText";
import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

const ScoresScreen = (props) => {
  const players = props.route.params.players;
  const currentRound = props.route.params.round;
  const roundPlayersDetail = props.route.params.roundPlayersDetail;
  const finalRound = useSelector((state) => state.game.currentGame.numRounds);

  const dispatch = useDispatch();

  const setInitialScores = () => {
    const initialScores = [];

    roundPlayersDetail.forEach((roundPlayerDetail) => {
      if (parseInt(roundPlayerDetail.score) === 0) {
        //Determine bonuses
        let allianceCounter = 0;
        allianceCounter = roundPlayerDetail.isAligned1 !== "" ? ++allianceCounter : allianceCounter;
        allianceCounter = roundPlayerDetail.isAligned2 !== "" ? ++allianceCounter : allianceCounter;

        let allianceIndicator = "";
        if (allianceCounter === 1) {
          allianceIndicator = "*";
        } else if (allianceCounter === 2) {
          allianceIndicator = "* *";
        }

        let wagerIndicator = "";
        if (roundPlayerDetail.pointsWagered === 10) {
          wagerIndicator = "+";
        } else if (roundPlayerDetail.pointsWagered === 20) {
          wagerIndicator = "++";
        }

        let score = 0;
        if (parseInt(roundPlayerDetail.bid) === 0) {
          score = roundPlayerDetail.round * 10;
        } else {
          score = parseInt(roundPlayerDetail.bid) * 20;
        }

        if (allianceCounter > 0) {
          score = score + allianceCounter * 20;
        }

        if (roundPlayerDetail.pointsWagered > 0) {
          score = score + roundPlayerDetail.pointsWagered;
        }

        initialScores.push(score.toString());
      } else {
        initialScores.push(roundPlayerDetail.score);
      }
    });

    return initialScores;
  };

  const [scores, setScores] = useState(setInitialScores);

  const updateScoreState = (newScore, index) => {
    let tempScores = [];
    for (let i = 0; i < scores.length; i++) {
      if (index === i) {
        tempScores.push(newScore);
      } else {
        tempScores.push(scores[i]);
      }
    }

    setScores(tempScores);
  };

  const updateScoresHandler = () => {
    const playerData = [];

    players.map((player, index) => {
      playerData.push({ playerId: player.id, score: scores[index] });
    });

    dispatch(updatePlayerData(currentRound, playerData, "scores"));

    if (currentRound < finalRound) {
      dispatch(setCurrentRound(currentRound + 1));
    }

    props.navigation.navigate("Game");
  };

  const backButtonHandler = () => {
    props.navigation.navigate("Game");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <DefaultText style={styles.playerName}>Name</DefaultText>
        <DefaultText style={styles.bid}>Bid</DefaultText>
        <DefaultText style={styles.bonus}>Bonus</DefaultText>
        <DefaultText style={styles.score}>Score</DefaultText>
      </View>
      <ScrollView>
        {players.map((player, index) => {
          const playerDetail = roundPlayersDetail.filter((detail) => detail.playerId === player.id);
          return (
            <ScoreRow
              key={player.id}
              player={player}
              round={currentRound}
              bid={playerDetail[0].bid}
              roundPlayerDetail={playerDetail[0]}
              playerIndex={index}
              scores={scores}
              setScores={updateScoreState}
            />
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

      <Animatable.View
        style={{ position: "absolute", right: 20, bottom: 20 }}
        animation={"slideInRight"}
      >
        <CustomActionButton style={styles.primaryButton} onPress={updateScoresHandler}>
          <Text style={styles.buttonText}>Save scores</Text>
        </CustomActionButton>
      </Animatable.View>
    </View>
  );
};

export const screenOptions = (navData) => {
  const currentRound = navData.route.params.round;

  return {
    headerTitle: "Scores for Round " + currentRound,
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: Colors.theme.light1,
  },
  playerName: {
    width: Defaults.isSmallScreen ? 100 : 120,
    paddingLeft: 10,
    fontWeight: "bold",
  },
  bid: {
    width: Defaults.isSmallScreen ? 35 : 40,
    textAlign: "center",
    fontWeight: "bold",
  },
  bonus: {
    width: Defaults.isSmallScreen ? 55 : 55,
    textAlign: "center",
    fontWeight: "bold",
  },
  score: {
    width: Defaults.isSmallScreen ? 120 : 135,
    textAlign: "center",
    fontWeight: "bold",
  },
  primaryButton: {
    backgroundColor: Defaults.button.primary,
  },
  backButton: {
    backgroundColor: Defaults.button.cancel,
  },
  buttonText: {
    color: "white",
    fontSize: Defaults.fontSize,
  },
});

export default ScoresScreen;
