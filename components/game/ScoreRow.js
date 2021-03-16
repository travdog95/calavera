import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

import Input from "../UI/Input";
import CustomActionButton from "../../components/CustomActionButton";
import Defaults from "../../constants/defaults";

const ScoreRow = (props) => {
  const roundPlayerDetail = props.roundPlayerDetail;

  let allianceCounter = 0;
  allianceCounter = roundPlayerDetail.isAligned1 !== "" ? ++allianceCounter : allianceCounter;
  allianceCounter = roundPlayerDetail.isAligned2 !== "" ? ++allianceCounter : allianceCounter;

  let allianceIndicator = " ";
  if (allianceCounter === 1) {
    allianceIndicator = "*";
  } else if (allianceCounter === 2) {
    allianceIndicator = "* *";
  }

  let wagerIndicator = " ";
  if (roundPlayerDetail.pointsWagered === 10) {
    wagerIndicator = "+";
  } else if (roundPlayerDetail.pointsWagered === 20) {
    wagerIndicator = "++";
  }

  const initializeAchievedBid = () => {
    return roundPlayerDetail.score < 0 ? false : true;
  };

  const [achievedBid, setAchievedBid] = useState(initializeAchievedBid);

  const numberInputHandler = (inputText) => {
    props.setBonusScores(
      inputText.replace(/[^0-9]/g, "0"),
      props.baseScores[props.playerIndex],
      props.playerIndex
    );
  };

  const achievedBidHandler = (gotBid) => {
    let newBaseScore = 0;
    let newBonusScore = 0;
    let newRoundScore = 0;

    if (gotBid) {
      if (parseInt(roundPlayerDetail.bid) === 0) {
        newBaseScore = props.round * 10;
      } else {
        newBaseScore = parseInt(roundPlayerDetail.bid) * 20;
      }

      if (allianceCounter > 0) {
        newBonusScore = allianceCounter * 20;
      }

      if (roundPlayerDetail.pointsWagered > 0) {
        newBonusScore = roundPlayerDetail.pointsWagered;
      }
    } else {
      newBaseScore =
        parseInt(roundPlayerDetail.bid) === 0 ? 10 * roundPlayerDetail.round * -1 : -10;

      if (roundPlayerDetail.pointsWagered > 0) {
        newBonusScore -= roundPlayerDetail.pointsWagered;
      }
    }

    newRoundScore = newBaseScore + newBonusScore;

    props.setBaseScores(newBaseScore, props.playerIndex);
    props.setBonusScores(newBonusScore, newBaseScore, props.playerIndex);

    setAchievedBid(gotBid);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.playerNameContainer}>
          <Text style={styles.playerName}>{props.player.name}</Text>
        </View>
        <View style={styles.roundScoreContainer}>
          <Text style={styles.roundScore}>{props.scores[props.playerIndex]}</Text>
        </View>
      </View>
      <View style={styles.bottomRow}>
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
          <Text style={styles.baseScore}>{props.baseScores[props.playerIndex]}</Text>
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
            onPress={props.incrementBonusScore.bind(this, "lower", props.playerIndex)}
          >
            <Ionicons name="remove-outline" size={Defaults.fontSize} color="white" />
          </CustomActionButton>
          <Input
            style={styles.bonusScore}
            blurOnSubmit
            keyboardType="number-pad"
            maxLength={4}
            onChangeText={numberInputHandler}
            value={props.bonusScores[props.playerIndex]}
          />

          <CustomActionButton
            style={styles.incrementButton}
            onPress={props.incrementBonusScore.bind(this, "higher", props.playerIndex)}
          >
            <Ionicons name="add-outline" size={Defaults.fontSize} color="white" />
          </CustomActionButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderBottomColor: Colors.theme.grey5,
    borderBottomWidth: 1,
  },
  topRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: Colors.theme.light1,
  },

  playerNameContainer: {
    // width: `${Defaults.scoreScreen.widths.playerName}%`,
    textAlign: "left",
  },
  playerName: {
    fontSize: Defaults.largeFontSize,
    fontWeight: "bold",
  },
  bonusIndicatorsContainer: {
    // width: `${Defaults.scoreScreen.widths.bonusIndicators}%`,
    alignItems: "center",
  },
  roundScoreContainer: {
    // width: `${Defaults.scoreScreen.widths.roundScore}%`,
  },
  roundScore: {
    textAlign: "right",
    fontSize: Defaults.largeFontSize,
    fontWeight: "bold",
  },
  bottomRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 3,
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
  bonusScoreContainer: {
    width: `${Defaults.scoreScreen.widths.bonusScore}%`,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bonusScore: {
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
  buttonText: {
    color: "white",
    fontSize: Defaults.fontSize,
    textAlign: "center",
  },
});

export default ScoreRow;
