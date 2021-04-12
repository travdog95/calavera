import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";

import { setCurrentRound } from "../../store/actions/game-actions";
import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const ScoreBox = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  let wagerIndicator = "";
  let cellBackgroundColor = "";
  const game = useSelector((state) => state.game.currentGame);
  const currentRound = game.currentRound;
  const scoreBoxRound = props.roundPlayerDetail.round;

  let totalScoreStyle = {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    color: "black",
  };
  if (props.isRoundLeader) {
    totalScoreStyle.color = Colors.theme.main3;
  }

  if (scoreBoxRound === currentRound) {
    cellBackgroundColor = Colors.theme.light3Shade;
  } else {
    cellBackgroundColor = scoreBoxRound % 2 === 0 ? Colors.theme.grey2 : "white";
  }

  if (props.roundPlayerDetail.pointsWagered > 0) {
    wagerIndicator = props.roundPlayerDetail.pointsWagered === 10 ? "+" : "++";
  }

  const isAligned1Indicator = props.roundPlayerDetail.isAligned1 ? "*" : "";
  const isAligned2Indicator = props.roundPlayerDetail.isAligned2 ? "*" : "";

  //ONly allow user to go to scores for current round and previous round
  const isPressable = scoreBoxRound !== currentRound ? false : true;

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
          //dispatch(setCurrentRound(scoreBoxRound));

          if (isPressable) {
            //navigate to Scores screen
            navigation.navigate("Scores", {
              round: scoreBoxRound,
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
              <Text style={styles.bidText}>{props.roundPlayerDetail.bid}</Text>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={styles.score}>{props.roundPlayerDetail.score}</Text>
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
              <Text style={totalScoreStyle}>{props.roundPlayerDetail.totalScore}</Text>
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
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "black",
    height: Defaults.game.rowHeight,
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
