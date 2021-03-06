import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

import Input from "../UI/Input";
import CustomActionButton from "../../components/CustomActionButton";
import Defaults from "../../constants/defaults";

const ScoreRow = (props) => {
  const initializeAchievedBid = () => {
    return props.scores[props.playerIndex] < 0 ? false : true;
  };

  const [achievedBid, setAchievedBid] = useState(initializeAchievedBid);

  const numberInputHandler = (inputText) => {
    props.setScores(inputText.replace(/[^0-9]/g, ""), props.playerIndex);
  };

  const incrementScoreHandler = (direction) => {
    const newScore =
      direction === "lower"
        ? parseInt(props.scores[props.playerIndex]) - 10
        : parseInt(props.scores[props.playerIndex]) + 10;

    if (isNaN(newScore)) {
      Alert.alert("Arrrrg!", "Score must be a number!", [
        { text: "OK", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }

    props.setScores(newScore.toString(), props.playerIndex);
  };

  const resetInputHandler = () => {
    props.setScores("0", props.playerIndex);
  };

  const achievedBidHandler = (gotBid) => {
    let baseScore = 0;

    if (gotBid) {
      baseScore = parseInt(props.bid) === 0 ? 10 * props.round : 20 * props.bid;
    } else {
      baseScore = parseInt(props.bid) === 0 ? 10 * props.round * -1 : -10;
    }
    props.setScores(baseScore.toString(), props.playerIndex);
    setAchievedBid(gotBid);
  };

  return (
    <View style={styles.row}>
      <View style={styles.playerNameContainer}>
        <Text style={styles.playerName}>{props.player.name}</Text>
      </View>
      <CustomActionButton
        style={{
          ...styles.bidButton,
          ...{ backgroundColor: achievedBid ? Colors.theme.light2 : Colors.theme.grey7 },
        }}
        onPress={achievedBidHandler.bind(this, !achievedBid)}
      >
        <Text style={styles.buttonText}>{props.bid}</Text>
      </CustomActionButton>

      <Input
        style={styles.score}
        blurOnSubmit
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="number-pad"
        maxLength={3}
        onChangeText={numberInputHandler}
        value={props.scores[props.playerIndex]}
      />

      <CustomActionButton style={styles.button} onPress={incrementScoreHandler.bind(this, "lower")}>
        <Ionicons name="chevron-down-outline" size={Defaults.fontSize} color="white" />
      </CustomActionButton>
      <CustomActionButton
        style={styles.button}
        onPress={incrementScoreHandler.bind(this, "higher")}
      >
        <Ionicons name="chevron-up-outline" size={Defaults.fontSize} color="white" />
      </CustomActionButton>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  playerNameContainer: {
    width: 120,
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  playerName: {
    fontFamily: "open-sans-bold",
    fontSize: Defaults.largeFontSize,
  },
  score: {
    fontFamily: "open-sans",
    fontSize: Defaults.largeFontSize,
    textAlign: "center",
    marginHorizontal: 10,
    paddingVertical: 5,
    width: 50,
  },
  button: {
    marginHorizontal: 5,
    backgroundColor: Defaults.button.secondary,
  },
  bidButton: {
    width: 40,
  },
  buttonText: {
    color: "white",
    fontSize: Defaults.fontSize,
  },
});

export default ScoreRow;
