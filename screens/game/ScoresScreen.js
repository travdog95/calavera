import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, Platform, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";

import { updatePlayerData } from "../../store/actions/game-actions";
import ScoreRow from "../../components/game/ScoreRow";
import CustomActionButton from "../../components/CustomActionButton";
import Colors from "../../constants/colors";

const ScoresScreen = (props) => {
  const players = props.route.params.players;
  const currentRound = props.route.params.round;
  const roundPlayersDetail = props.route.params.roundPlayersDetail;

  const setInitialScores = () => {
    const initialScores = [];

    roundPlayersDetail.forEach((detail) => {
      if (parseInt(detail.score) === 0) {
        let score = 0;
        if (detail.bid === 0) {
          score = detail.round * 10;
        } else {
          score = detail.bid * 20;
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
    props.updateRoundPlayerData(props.currentGame, currentRound, playerData);

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
      <CustomActionButton style={styles.primaryButton} onPress={updateScoresHandler}>
        <Text style={styles.primaryButtonText}>Save scores</Text>
      </CustomActionButton>
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
    backgroundColor: Colors.theme.main1,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
  },
});

//Get properties from redux store
const mapStateToProps = (state) => ({ currentGame: state.game });

//Set properties in redux store
const mapDispatchToProps = (dispatch) => ({
  updateRoundPlayerData: (game, roundToUpdate, roundScores) =>
    dispatch(updatePlayerData(game, roundToUpdate, roundScores)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScoresScreen);
