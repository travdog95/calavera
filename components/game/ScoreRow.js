import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomActionButton from "../../components/CustomActionButton";
import DefaultText from "../../components/UI/DefaultText";
import Input from "../../components/UI/Input";
import IncDecButton from "../../components/UI/IncDecButton";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

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

    props.setBaseScores(newBaseScore, newBonusScore, props.playerIndex);
    props.setBonusScores(newBonusScore, newBaseScore, props.playerIndex);

    setAchievedBid(gotBid);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.playerNameContainer}>
          <DefaultText style={styles.playerName}>{props.player.name}</DefaultText>
        </View>
        <View style={styles.roundScoreContainer}>
          <DefaultText style={styles.roundScore}>{props.scores[props.playerIndex]}</DefaultText>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.bidContainer}>
          <CustomActionButton
            style={{
              ...styles.bidButton,
              ...{
                backgroundColor: achievedBid ? Colors.theme.light2 : Colors.theme.grey7,
              },
            }}
            onPress={achievedBidHandler.bind(this, !achievedBid)}
          >
            <DefaultText style={styles.buttonText}>{props.bid}</DefaultText>
          </CustomActionButton>
        </View>
        <View style={styles.scoreContainer}>
          <IncDecButton
            incOrDec={"dec"}
            style={styles.baseScoreButton}
            onPress={props.incOrDecValue.bind(this, "lower", props.playerIndex, 10, "baseScore")}
          />
          <Input
            style={styles.scoreInput}
            value={props.baseScores[props.playerIndex]}
            editable={false}
          />
          <IncDecButton
            incOrDec={"inc"}
            style={styles.baseScoreButton}
            onPress={props.incOrDecValue.bind(this, "higher", props.playerIndex, 10, "baseScore")}
          />
        </View>
        <View style={styles.bonusButtonContainer}>
          <CustomActionButton
            style={styles.bonusButton}
            onPress={() => {
              navigation.navigate("Bonus", { player: props.player });
            }}
          >
            <DefaultText style={styles.buttonText}>Bonus</DefaultText>
          </CustomActionButton>
        </View>
        <View style={styles.scoreContainer}>
          <IncDecButton
            incOrDec={"dec"}
            style={styles.bonusScoreButton}
            onPress={props.incOrDecValue.bind(this, "lower", props.playerIndex, 10, "bonusScore")}
          />
          <Input
            style={styles.scoreInput}
            value={props.bonusScores[props.playerIndex]}
            editable={false}
          />
          <IncDecButton
            incOrDec={"inc"}
            style={styles.bonusScoreButton}
            onPress={props.incOrDecValue.bind(this, "higher", props.playerIndex, 10, "bonusScore")}
          />
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
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  topRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: Colors.theme.dark2,
  },
  playerNameContainer: {
    textAlign: "left",
  },
  playerName: {
    fontSize: Defaults.largeFontSize,
    fontWeight: "bold",
    color: "white",
  },
  bonusButtonContainer: {
    alignItems: "center",
  },
  bonusButton: {
    padding: 5,
    height: Defaults.isSmallScreen ? 30 : 35,
    backgroundColor: Colors.theme.main1,
  },

  roundScore: {
    textAlign: "right",
    fontSize: Defaults.largeFontSize,
    fontWeight: "bold",
    color: "white",
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
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreInput: {
    width: Defaults.isSmallScreen ? 35 : 45,
    height: Defaults.isSmallScreen ? 30 : 35,
    textAlign: "center",
    color: "black",
    fontSize: Defaults.fontSize,
  },
  baseScoreButton: {
    backgroundColor: Colors.theme.light2,
  },
  bonusScoreButton: {
    backgroundColor: Colors.theme.main1,
  },
  buttonText: {
    color: "white",
    fontSize: Defaults.fontSize,
    textAlign: "center",
  },
});

export default ScoreRow;
