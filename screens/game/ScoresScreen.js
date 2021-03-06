import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";

import { updatePlayerData, setCurrentRound } from "../../store/actions/game-actions";
import ScoreRow from "../../components/game/ScoreRow";
import CustomActionButton from "../../components/CustomActionButton";
import Defaults from "../../constants/defaults";

const ScoresScreen = (props) => {
  const players = props.route.params.players;
  const currentRound = props.route.params.round;
  const roundPlayersDetail = props.route.params.roundPlayersDetail;
  const finalRound = useSelector((state) => state.game.currentGame.numRounds);

  const dispatch = useDispatch();

  const setInitialScores = () => {
    const initialScores = [];

    roundPlayersDetail.forEach((detail) => {
      if (parseInt(detail.score) === 0) {
        let score = 0;
        if (parseInt(detail.bid) === 0) {
          score = detail.round * 10;
        } else {
          score = parseInt(detail.bid) * 20;
        }
        initialScores.push(score.toString());
      } else {
        initialScores.push(detail.score);
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

    dispatch(updatePlayerData(currentRound, playerData));

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
      <ScrollView>
        {players.map((player, index) => {
          const playerDetail = roundPlayersDetail.filter((detail) => detail.playerId === player.id);
          return (
            <ScoreRow
              key={player.id}
              player={player}
              round={currentRound}
              bid={playerDetail[0].bid}
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
