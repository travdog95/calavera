import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../constants/colors";

import CustomActionButton from "../../components/CustomActionButton";
import Defaults from "../../constants/defaults";

const ScoreRow = (props) => {
  const roundPlayerDetail = props.roundPlayerDetail;
  const navigation = useNavigation();

  let allianceCounter = 0;
  allianceCounter = roundPlayerDetail.isAligned1 !== "" ? ++allianceCounter : allianceCounter;
  allianceCounter = roundPlayerDetail.isAligned2 !== "" ? ++allianceCounter : allianceCounter;

  const initializeAchievedBid = () => {
    return roundPlayerDetail.score < 0 ? false : true;
  };

  const [achievedBid, setAchievedBid] = useState(initializeAchievedBid);

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
        <View style={styles.bidContainer}>
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
        <View style={styles.scoreContainer}>
          <CustomActionButton
            style={styles.decrementButton}
            onPress={props.incOrDecValue.bind(this, "lower", props.playerIndex, 10, "baseScore")}
          >
            <Ionicons name="remove-outline" size={Defaults.fontSize} color="white" />
          </CustomActionButton>
          <View style={styles.scoreTextContainer}>
            <Text style={styles.bonusScore}>{props.baseScores[props.playerIndex]}</Text>
          </View>
          <CustomActionButton
            style={styles.incrementButton}
            onPress={props.incOrDecValue.bind(this, "higher", props.playerIndex, 10, "baseScore")}
          >
            <Ionicons name="add-outline" size={Defaults.fontSize} color="white" />
          </CustomActionButton>
        </View>
        <View style={styles.bonusButtonContainer}>
          <CustomActionButton
            style={styles.bonusButton}
            onPress={() => {
              navigation.navigate("Bonus", { player: props.player });
            }}
          >
            <Text style={styles.buttonText}>Bonus</Text>
          </CustomActionButton>
        </View>

        <View style={styles.scoreContainer}>
          <CustomActionButton
            style={{ ...styles.decrementButton, ...{ backgroundColor: Colors.theme.dark2 } }}
            onPress={props.incOrDecValue.bind(this, "lower", props.playerIndex, 10, "bonusScore")}
          >
            <Ionicons name="remove-outline" size={Defaults.fontSize} color="white" />
          </CustomActionButton>
          <View style={styles.scoreTextContainer}>
            <Text style={styles.bonusScore}>{props.bonusScores[props.playerIndex]}</Text>
          </View>
          <CustomActionButton
            style={{ ...styles.incrementButton, ...{ backgroundColor: Colors.theme.dark2 } }}
            onPress={props.incOrDecValue.bind(this, "higher", props.playerIndex, 10, "bonusScore")}
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
    textAlign: "left",
  },
  playerName: {
    fontSize: Defaults.largeFontSize,
    fontWeight: "bold",
  },
  bonusButtonContainer: {
    alignItems: "center",
  },
  bonusButton: {
    padding: 5,
    height: Defaults.isSmallScreen ? 30 : 35,
    backgroundColor: Colors.theme.dark2,
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

  bidContainer: {
    width: `${Defaults.scoreScreen.widths.bidButton}%`,
  },
  bidButton: {
    padding: 5,
    height: Defaults.isSmallScreen ? 30 : 35,
  },
  baseScoreContainer: {
    width: `${Defaults.scoreScreen.widths.baseScore}%`,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreTextContainer: {
    width: Defaults.isSmallScreen ? 35 : 45,
    height: Defaults.isSmallScreen ? 30 : 35,
    borderTopWidth: 1,
    borderColor: Colors.theme.grey4,
    borderBottomWidth: 1,
    paddingTop: Platform.OS === "android" ? 0 : 7,
  },
  bonusScore: {
    width: "100%",
    height: "100%",
    fontSize: Defaults.fontSize,
    textAlign: "center",
    textAlignVertical: "center",
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
