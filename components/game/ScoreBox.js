import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const ScoreBox = (props) => {
  let wagerIndicator = "";
  const cellBackgroundColor = props.item.round % 2 === 0 ? Colors.theme.grey2 : "white";

  if (props.item.pointsWagered > 0) {
    wagerIndicator = props.item.pointsWagered === 10 ? "+" : "++";
  }

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? Colors.theme.light1 : cellBackgroundColor,
        },
        {
          ...styles.roundContainer,
          ...{
            width: props.roundPlayerDetailWidth,
          },
        },
      ]}
      onPress={() => {
        props.navigation.navigate("AddBonus", {
          playerId: props.item.playerId,
          round: props.item.round,
        });
      }}
    >
      <View>
        <View style={styles.topRowContainer}>
          <View style={styles.bidContainer}>
            <Text style={styles.bidText}>{props.item.bid}</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>{props.item.score}</Text>
          </View>
          <View style={styles.wagerContainer}>
            <Text>{wagerIndicator}</Text>
          </View>
        </View>
        <View style={styles.bottomRowContainer}>
          <View style={styles.allianceContainer}>
            <Text style={styles.alliance}></Text>
          </View>
          <View style={styles.totalScoreContainer}>
            <Text style={styles.totalScore}>{props.item.totalScore}</Text>
          </View>
          <View style={styles.allianceContainer}>
            <Text style={styles.alliance}></Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {},
  roundContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.theme.dark4,
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

  totalScore: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
});

export default ScoreBox;
