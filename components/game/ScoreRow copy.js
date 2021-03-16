import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

import Input from "../UI/Input";
import CustomActionButton from "../../components/CustomActionButton";
import Defaults from "../../constants/defaults";

const ScoreRow = (props) => {
  const roundPlayerDetail = props.roundPlayerDetail;

  const initializeAchievedBid = () => {
    return props.scores[props.playerIndex] < 0 ? false : true;
  };

  const [achievedBid, setAchievedBid] = useState(initializeAchievedBid);
  const [baseScore, setBaseScore] = useState(0);
  const [roundScore, setRoundScore] = useState(0);

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

      if (allianceCounter > 0) {
        baseScore = baseScore + allianceCounter * 20;
      }

      if (roundPlayerDetail.pointsWagered > 0) {
        baseScore = baseScore + roundPlayerDetail.pointsWagered;
      }
    } else {
      baseScore = parseInt(props.bid) === 0 ? 10 * props.round * -1 : -10;

      if (roundPlayerDetail.pointsWagered > 0) {
        baseScore = baseScore - roundPlayerDetail.pointsWagered;
      }
    }

    props.setScores(baseScore.toString(), props.playerIndex);

    setAchievedBid(gotBid);
  };

  return (
    <View style={styles.row}>
      <View style={styles.playerNameContainer}>
        <Text style={styles.playerName}>{props.player.name}</Text>
      </View>
      <View style={styles.bidButtonContainer}>
        <CustomActionButton
          style={{
            ...styles.bidButton,
            ...{ backgroundColor: achievedBid ? Colors.theme.light2 : Colors.theme.grey7 },
          }}
          onPress={achievedBidHandler.bind(this, !achievedBid)}
        >
          <Text style={styles.buttonText}>{props.bid}</Text>
        </CustomActionButton>
      </View>
      <View style={styles.baseScoreContainer}>
        <Text style={styles.baseScore}>{baseScore}</Text>
      </View>
      <View style={styles.bonusIndicatorsContainer}>
        <View style={styles.bonusIndicator}>
          <Text>{allianceIndicator}</Text>
        </View>
        <View style={styles.bonusIndicator}>
          <Text>{wagerIndicator}</Text>
        </View>
      </View>
      <View style={styles.bonusScoreContainer}>
        <CustomActionButton
          style={styles.decrementButton}
          onPress={incrementScoreHandler.bind(this, "lower")}
        >
          <Ionicons name="remove-outline" size={Defaults.fontSize} color="white" />
        </CustomActionButton>
        <Input
          style={styles.bonusScore}
          blurOnSubmit
          keyboardType="number-pad"
          maxLength={4}
          onChangeText={numberInputHandler}
          value={props.scores[props.playerIndex]}
        />

        <CustomActionButton
          style={styles.incrementButton}
          onPress={incrementScoreHandler.bind(this, "higher")}
        >
          <Ionicons name="add-outline" size={Defaults.fontSize} color="white" />
        </CustomActionButton>
      </View>
      <View style={styles.roundScoreContainer}>
        <Text style={styles.roundScore}>{roundScore}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 8,
    width: "100%",
    borderBottomColor: Colors.theme.grey5,
    borderBottomWidth: 1,
  },
  playerNameContainer: {
    width: `${Defaults.scoreScreen.widths.playerName}%`,
    textAlign: "left",
  },
  playerName: {
    fontSize: Defaults.fontSize,
    fontWeight: "bold",
  },
  bidButtonContainer: {
    width: `${Defaults.scoreScreen.widths.bidButton}%`,
  },
  bidButton: {
    padding: 5,
    height: Defaults.isSmallScreen ? 30 : 35,
  },
  baseScoreContainer: {
    width: `${Defaults.scoreScreen.widths.baseScore}%`,
  },
  baseScore: {
    textAlign: "center",
    fontSize: Defaults.fontSize,
  },
  bonusIndicatorsContainer: {
    width: `${Defaults.scoreScreen.widths.bonusIndicators}%`,
    alignItems: "center",
  },
  bonusScoreContainer: {
    width: `${Defaults.scoreScreen.widths.bonusScore}%`,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bonusScore: {
    fontFamily: "open-sans",
    fontSize: Defaults.fontSize,
    textAlign: "center",
    paddingVertical: 3,
    width: Defaults.isSmallScreen ? 35 : 45,
    height: Defaults.isSmallScreen ? 30 : 35,
  },
  incrementButton: {
    backgroundColor: Defaults.button.secondary,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    height: Defaults.isSmallScreen ? 30 : 35,
    width: Defaults.isSmallScreen ? 25 : 35,
    padding: 5,
  },
  decrementButton: {
    backgroundColor: Defaults.button.secondary,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    height: Defaults.isSmallScreen ? 30 : 35,
    width: Defaults.isSmallScreen ? 25 : 35,
    padding: 5,
  },
  roundScoreContainer: {
    width: `${Defaults.scoreScreen.widths.roundScore}%`,
  },
  roundScore: {
    textAlign: "right",
    fontSize: Defaults.fontSize,
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontSize: Defaults.fontSize,
    textAlign: "center",
  },
});

export default ScoreRow;
