import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";

import { setSelectedRound } from "../../store/actions/game-actions";
import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const ScoreBox = (props) => {
  const playerDetail = props.roundPlayerDetail;
  const roundScore = playerDetail.baseScore + playerDetail.bonusScore;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  let wagerIndicator = "";
  let cellBackgroundColor = "";
  // const game = useSelector((state) => state.game.currentGame);
  const currentGameId = useSelector((state) => state.game.currentGameId);
  const game = useSelector((state) => state.game.games[currentGameId]);

  const currentRound = game.scoringRound;
  const round = parseInt(props.round);

  let totalScoreStyle = {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    color: "black",
  };
  if (props.isRoundLeader) {
    totalScoreStyle.color = Colors.theme.main3;
  }

  if (round === currentRound) {
    cellBackgroundColor = Colors.theme.light3Shade;
  } else {
    cellBackgroundColor = round % 2 === 0 ? Colors.theme.grey2 : "white";
  }

  if (playerDetail.pointsWagered > 0) {
    wagerIndicator = playerDetail.pointsWagered === 10 ? "+" : "++";
  }

  const isAligned1Indicator = playerDetail.isAligned1 ? "*" : "";
  const isAligned2Indicator = playerDetail.isAligned2 ? "*" : "";

  //ONly allow user to go to scores for current round and previous round
  let isPressable = false;
  // if (round === currentRound) isPressable = true;
  // if (round < currentRound) isPressable = true;

  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed && isPressable ? Colors.theme.grey1 : cellBackgroundColor,
          },
          {
            ...styles.roundContainer,
            ...{
              width: props.roundPlayerDetailWidth,
            },
          },
        ]}
        onPress={() => {
          //set current round
          //dispatch(setCurrentRound(round));

          if (isPressable) {
            dispatch(setSelectedRound(round));

            //navigate to Scores screen
            navigation.navigate("Scores", {
              round: round,
            });
          }
        }}
      >
        <View
          style={{
            ...styles.roundContainer,
            ...{
              width: props.roundPlayerDetailWidth,
              backgroundColor: cellBackgroundColor,
            },
          }}
        >
          <View style={styles.topRowContainer}>
            <View style={styles.bidContainer}>
              <Text style={styles.bidText}>{playerDetail.bid}</Text>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={styles.score}>{roundScore}</Text>
            </View>
            <View style={styles.allianceContainer}>
              <Text style={styles.alliance}>{isAligned1Indicator}</Text>
            </View>
          </View>
          <View style={styles.bottomRowContainer}>
            <View style={styles.wagerContainer}>
              <Text>{wagerIndicator}</Text>
            </View>
            <View style={styles.totalScoreContainer}>
              <Text style={totalScoreStyle}>{playerDetail.totalScore}</Text>
            </View>
            <View style={styles.allianceContainer}>
              <Text style={styles.alliance}>{isAligned2Indicator}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {},
  roundContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "black",
    height: Defaults.game.rowHeight - 1,
  },
  topRowContainer: {
    flexDirection: "row",
    flex: 1,
    fontFamily: "open-sans",
    fontSize: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomRowContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  allianceContainer: {
    width: "25%",
    alignItems: "center",
  },
  totalScoreContainer: {
    width: "50%",
    alignItems: "center",
  },

  bidContainer: {
    width: "25%",
    alignItems: "center",
  },
  bidText: {
    color: Colors.theme.main3,
  },
  wagerContainer: {
    width: "25%",
    alignItems: "center",
  },
  scoreContainer: {
    width: "50%",
    alignItems: "center",
  },
});

export default ScoreBox;
