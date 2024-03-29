import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

import CustomActionButton from "../../components/CustomActionButton";
import DefaultText from "../../components/UI/DefaultText";
import Input from "../../components/UI/Input";
import IncDecButton from "../../components/UI/IncDecButton";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";
import Constants from "../../constants/constants";

const ScoreRow = (props) => {
  const roundPlayerDetail = props.roundPlayerDetail;
  const navigation = useNavigation();
  const settings = useSelector((state) => state.settings);

  const round = parseInt(props.round);
  const numCards = parseInt(props.numCards);
  const scoringType = props.scoringType;
  const isRascalScoring = scoringType !== Constants.scoringType.classic ? true : false;

  const cannonTypeIconName =
    parseInt(roundPlayerDetail.cannonType) === 0 ? "hand-paper" : "hand-rock";

  const initializeAchievedBid = () => {
    const score = parseInt(roundPlayerDetail.baseScore) + parseInt(roundPlayerDetail.bonusScore);

    return score < 0 ? false : true;
  };

  const [achievedBid, setAchievedBid] = useState(initializeAchievedBid);

  const achievedBidHandler = (gotBid) => {
    let newBaseScore = 0;
    let newBonusScore = 0;
    let newRoundScore = 0;

    if (gotBid) {
      if (parseInt(roundPlayerDetail.bid) === 0) {
        newBaseScore = numCards * 10;
      } else {
        newBaseScore = parseInt(roundPlayerDetail.bid) * 20;
      }
    } else {
      newBaseScore = parseInt(roundPlayerDetail.bid) === 0 ? 10 * numCards * -1 : -10;

      if (roundPlayerDetail.pointsWagered > 0) {
        newBonusScore -= roundPlayerDetail.pointsWagered;
      }
    }

    newRoundScore = newBaseScore + newBonusScore;

    props.setBaseScores(newBaseScore, newBonusScore, props.playerIndex);
    props.setBonusScores(newBonusScore, newBaseScore, props.playerIndex);

    setAchievedBid(gotBid);
  };

  let bonusContent;
  if (settings.useSimplifiedScoring) {
    bonusContent = <DefaultText style={styles.bonusLabel}>Bonus:</DefaultText>;
  } else {
    bonusContent = (
      <CustomActionButton
        style={styles.bonusButton}
        onPress={() => {
          navigation.navigate("Bonus", { player: props.player });
        }}
      >
        <DefaultText style={styles.buttonText}>Bonus</DefaultText>
      </CustomActionButton>
    );
  }

  const bidContainerWidth =
    scoringType === Constants.scoringType.classic
      ? Defaults.scoreScreen.widths.classic.bidContainer
      : Defaults.scoreScreen.widths.rascal.bidContainer;
  const scoreContainerWidth =
    scoringType === Constants.scoringType.classic
      ? Defaults.scoreScreen.widths.classic.scoreContainer
      : Defaults.scoreScreen.widths.rascal.scoreContainer;
  const bonusContainerWidth =
    scoringType === Constants.scoringType.classic
      ? Defaults.scoreScreen.widths.classic.bonusContainer
      : Defaults.scoreScreen.widths.rascal.bonusContainer;

  let bidContent;
  let scoreContent;

  //Classic Scoring
  switch (scoringType) {
    case Constants.scoringType.classic: //Classic
      const dynamicBidTextStyles = achievedBid
        ? {}
        : { textDecorationLine: "line-through", color: "red" };
      bidContent = (
        <View style={{ ...styles.bidContainer, width: bidContainerWidth }}>
          <DefaultText
            style={{
              ...styles.bidText,
              ...dynamicBidTextStyles,
            }}
          >
            {props.bid}
          </DefaultText>
          <Checkbox
            status={achievedBid ? "checked" : "unchecked"}
            onPress={achievedBidHandler.bind(this, !achievedBid)}
            uncheckedColor="red"
            color={Colors.theme.dark1}
          />
        </View>
      );

      scoreContent = (
        <View
          style={{ ...styles.scoreContainer, justifyContent: "center", width: scoreContainerWidth }}
        >
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
      );
      break;
    case Constants.scoringType.rascal: //Rascal
    case Constants.scoringType.rascalEnhanced: //Rascal Enhanced
      bidContent = (
        <View style={{ ...styles.bidContainer, width: bidContainerWidth }}>
          <DefaultText
            style={{
              fontSize: 24,
              width: "50%",
              textAlign: "center",
            }}
          >
            {props.bid}
          </DefaultText>

          {scoringType === Constants.scoringType.rascalEnhanced ? (
            <FontAwesome5
              name={cannonTypeIconName}
              size={24}
              color={Colors.theme.dark4}
              style={{ textAlign: "center", width: "50%" }}
            />
          ) : null}
        </View>
      );
      scoreContent = (
        <View
          style={{
            ...styles.scoreContainer,
            justifyContent: "space-evenly",
            width: scoreContainerWidth,
          }}
        >
          <CustomActionButton
            style={{
              ...styles.bidButton,
              ...{
                backgroundColor:
                  props.accuracies[props.playerIndex] == Constants.accuracy.directHit
                    ? Colors.theme.dark1
                    : Colors.theme.grey5,
              },
            }}
            onPress={props.updateAccuraciesState.bind(
              this,
              Constants.accuracy.directHit,
              props.playerIndex
            )}
          >
            <DefaultText style={styles.buttonText}>Hit</DefaultText>
          </CustomActionButton>
          {roundPlayerDetail.cannonType == Constants.cannonType.grapeshot ? (
            <CustomActionButton
              style={{
                ...styles.bidButton,
                ...{
                  backgroundColor:
                    props.accuracies[props.playerIndex] == Constants.accuracy.glancingBlow
                      ? Colors.theme.dark1
                      : Colors.theme.grey5,
                },
              }}
              onPress={props.updateAccuraciesState.bind(
                this,
                Constants.accuracy.glancingBlow,
                props.playerIndex
              )}
            >
              <DefaultText style={styles.buttonText}>Half</DefaultText>
            </CustomActionButton>
          ) : null}
          <CustomActionButton
            style={{
              ...styles.bidButton,
              ...{
                backgroundColor:
                  props.accuracies[props.playerIndex] == Constants.accuracy.completeMiss
                    ? Colors.theme.dark1
                    : Colors.theme.grey5,
              },
            }}
            onPress={props.updateAccuraciesState.bind(
              this,
              Constants.accuracy.completeMiss,
              props.playerIndex
            )}
          >
            <DefaultText style={styles.buttonText}>Miss</DefaultText>
          </CustomActionButton>
        </View>
      );
      break;
  }

  const bidLabel = isRascalScoring ? "Bid" : "Got Bid?";
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.playerNameContainer}>
          <DefaultText style={styles.playerName}>{props.player.name}</DefaultText>
        </View>
        <View>
          <DefaultText style={styles.roundScore}>{props.scores[props.playerIndex]}</DefaultText>
        </View>
      </View>
      <View style={styles.row}>
        <DefaultText style={{ ...styles.columnHeader, width: bidContainerWidth }}>
          {bidLabel}
        </DefaultText>
        <DefaultText style={{ ...styles.columnHeader, width: scoreContainerWidth }}>
          Score
        </DefaultText>
        <DefaultText style={{ ...styles.columnHeader, width: bonusContainerWidth }}>
          Bonus
        </DefaultText>
      </View>
      <View style={styles.bottomRow}>
        {bidContent}
        {scoreContent}
        <View style={{ ...styles.bonusContainer, width: bonusContainerWidth }}>
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
    marginBottom: 5,
    marginHorizontal: 4,
    borderRadius: 3,
    backgroundColor: Colors.theme.grey2,
  },
  topRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: Colors.theme.grey4,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  playerNameContainer: {
    textAlign: "left",
  },
  playerName: {
    fontSize: Defaults.largeFontSize,
    color: "black",
  },
  roundScore: {
    textAlign: "right",
    fontSize: Defaults.largeFontSize,
    color: "black",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 3,
  },
  bidContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bidButton: {
    padding: 5,
    height: Defaults.isSmallScreen ? 30 : 35,
    width: Defaults.isSmallScreen ? 40 : 45,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bonusContainer: {
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
    backgroundColor: Colors.theme.dark1,
  },
  bonusScoreButton: {
    backgroundColor: Colors.theme.dark1,
  },
  buttonText: {
    color: "white",
    fontSize: Defaults.fontSize,
    textAlign: "center",
  },
  bidText: {
    color: "black",
    fontSize: Defaults.mediumFontSize,
    paddingHorizontal: 3,
  },
  columnHeader: {
    textAlign: "center",
  },
});

export default ScoreRow;
