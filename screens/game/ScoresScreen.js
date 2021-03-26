import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";

import {
  updatePlayerData,
  setCurrentRound,
} from "../../store/actions/game-actions";
import ScoreRow from "../../components/game/ScoreRow";
import CustomActionButton from "../../components/CustomActionButton";
import DefaultText from "../../components/UI/DefaultText";
import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

const ScoresScreen = (props) => {
  const game = useSelector((state) => state.game.currentGame);
  const players = game.players;
  const currentRound = props.route.params.round;
  const roundPlayersDetail = props.route.params.roundPlayersDetail;
  const finalRound = game.numRounds;

  const dispatch = useDispatch();

  const calcBaseScore = (roundPlayerDetail) => {
    let newBaseScore = 0;
    const multiplier = roundPlayerDetail.score < 0 ? -1 : 1;

    if (parseInt(roundPlayerDetail.bid) === 0) {
      newBaseScore = currentRound * 10 * multiplier;
    } else {
      newBaseScore =
        multiplier === -1 ? -10 : parseInt(roundPlayerDetail.bid) * 20;
    }

    return newBaseScore.toString();
  };

  const setInitialBaseScores = () => {
    const initialBaseScores = [];

    roundPlayersDetail.forEach((roundPlayerDetail) => {
      if (parseInt(roundPlayerDetail.score) === 0) {
        initialBaseScores.push(calcBaseScore(roundPlayerDetail));
      } else {
        initialBaseScores.push(roundPlayerDetail.baseScore.toString());
      }
    });

    return initialBaseScores;
  };

  const setInitialBonusScores = () => {
    const initialBonusScores = [];

    roundPlayersDetail.forEach((roundPlayerDetail) => {
      if (parseInt(roundPlayerDetail.score) === 0) {
        let newBonusScore = 0;
        //Determine bonuses
        let allianceCounter = 0;
        allianceCounter =
          roundPlayerDetail.isAligned1 !== ""
            ? ++allianceCounter
            : allianceCounter;
        allianceCounter =
          roundPlayerDetail.isAligned2 !== ""
            ? ++allianceCounter
            : allianceCounter;

        if (allianceCounter > 0) {
          newBonusScore += allianceCounter * 20;
        }

        if (roundPlayerDetail.pointsWagered > 0) {
          newBonusScore += roundPlayerDetail.pointsWagered;
        }

        initialBonusScores.push(newBonusScore.toString());
      } else {
        initialBonusScores.push(roundPlayerDetail.bonusScore.toString());
      }
    });

    return initialBonusScores;
  };

  const setInitialScores = () => {
    const initialScores = [];

    roundPlayersDetail.forEach((roundPlayerDetail, index) => {
      if (parseInt(roundPlayerDetail.score) === 0) {
        const newScore =
          parseInt(baseScores[index]) + parseInt(bonusScores[index]);

        initialScores.push(newScore);
      } else {
        initialScores.push(roundPlayerDetail.score);
      }
    });

    return initialScores;
  };

  const [baseScores, setBaseScores] = useState(setInitialBaseScores);
  const [bonusScores, setBonusScores] = useState(setInitialBonusScores);
  const [scores, setScores] = useState(setInitialScores);

  const updateBaseScoreState = (newBaseScore, bonusScore, playerIndex) => {
    const newBaseScores = [];
    const newScores = [];
    let newBonusScore = 0;

    baseScores.forEach((baseScore, index) => {
      if (playerIndex === index) {
        newBaseScores.push(newBaseScore.toString());
        newBonusScore = bonusScore;
      } else {
        newBaseScores.push(baseScore.toString());
        newBonusScore = bonusScores[index];
      }

      const validatedBaseScore =
        newBaseScores[index] === "" ? 0 : parseInt(newBaseScores[index]);
      const newScore = validatedBaseScore + parseInt(newBonusScore);
      newScores.push(newScore);
    });

    setBaseScores(newBaseScores);

    setScores(newScores);
  };

  const updateBonusScoreState = (newBonusScore, baseScore, playerIndex) => {
    const newBonusScores = [];
    const newScores = [];
    let newBaseScore = 0;

    bonusScores.forEach((bonusScore, index) => {
      if (playerIndex === index) {
        newBonusScores.push(newBonusScore.toString());
        newBaseScore = baseScore;
      } else {
        newBonusScores.push(bonusScore);
        newBaseScore = baseScores[index];
      }

      const validatedBonusScore =
        newBonusScores[index] === "" ? 0 : parseInt(newBonusScores[index]);
      const newScore = validatedBonusScore + parseInt(newBaseScore);
      newScores.push(newScore);
    });

    setBonusScores(newBonusScores);

    //update round score
    setScores(newScores);
  };

  // const updateScoresState = () => {
  //   const newScores = [];
  //   baseScores.forEach((baseScore, index) => {
  //     const newBonusScore =
  //       bonusScores[index] === "" ? 0 : parseInt(bonusScores[index]);
  //     const newBaseScore = baseScore === "" ? 0 : parseInt(baseScore);
  //     const newScore = newBonusScore + newBaseScore;
  //     newScores.push(newScore);
  //   });

  //   setScores(newScores);
  // };

  const updateScoresHandler = () => {
    const playerData = [];

    players.map((player, index) => {
      playerData.push({
        playerId: player.id,
        score: scores[index],
        bonusScore: parseInt(bonusScores[index]),
        baseScore: parseInt(baseScores[index]),
      });
    });

    dispatch(updatePlayerData(currentRound, playerData, "scores"));

    if (currentRound < finalRound) {
      dispatch(setCurrentRound(currentRound + 1));
    }

    props.navigation.navigate("Game");
  };

  const backButtonHandler = () => {
    props.navigation.navigate("Game");
  };

  const incOrDecValue = (direction, playerIndex, incOrDecValue, input) => {
    if (input === "bonusScore") {
      const newBonusScore =
        direction === "lower"
          ? parseInt(bonusScores[playerIndex]) - incOrDecValue
          : parseInt(bonusScores[playerIndex]) + incOrDecValue;

      updateBonusScoreState(
        newBonusScore.toString(),
        baseScores[playerIndex],
        playerIndex
      );
    } else if (input === "baseScore") {
      const newBaseScore =
        direction === "lower"
          ? parseInt(baseScores[playerIndex]) - incOrDecValue
          : parseInt(baseScores[playerIndex]) + incOrDecValue;

      updateBaseScoreState(
        newBaseScore.toString(),
        bonusScores[playerIndex],
        playerIndex
      );
    }
  };

  const calcBonusScore = (roundPlayerDetail) => {
    let newBonusScore = 0;

    if (roundPlayerDetail.score === 0) {
      let allianceCounter = 0;
      allianceCounter =
        roundPlayerDetail.isAligned1 !== ""
          ? ++allianceCounter
          : allianceCounter;
      allianceCounter =
        roundPlayerDetail.isAligned2 !== ""
          ? ++allianceCounter
          : allianceCounter;

      //Alliances
      newBonusScore = 20 * allianceCounter;

      //Wager
      if (roundPlayerDetail.pointsWagered > 0) {
        newBonusScore += roundPlayerDetail.pointsWagered;
      }
    } else {
      newBonusScore = roundPlayerDetail.bonusScore;
    }

    return newBonusScore.toString();
  };

  return (
    <View style={styles.screen}>
      {/* <View style={styles.header}>
        <DefaultText style={styles.playerName}>Name</DefaultText>
        <DefaultText style={styles.bid}>Bid</DefaultText>
        <DefaultText style={styles.bonus}>Bonus</DefaultText>
        <DefaultText style={styles.score}>Score</DefaultText>
      </View> */}
      <ScrollView>
        {players.map((player, index) => {
          const playerDetail = roundPlayersDetail.filter(
            (detail) => detail.playerId === player.id
          );
          return (
            <ScoreRow
              key={player.id}
              round={currentRound}
              playerIndex={index}
              player={player}
              bid={playerDetail[0].bid}
              roundPlayerDetail={playerDetail[0]}
              baseScores={baseScores}
              setBaseScores={updateBaseScoreState}
              bonusScores={bonusScores}
              setBonusScores={updateBonusScoreState}
              scores={scores}
              allianceIndicator={"*"}
              incOrDecValue={incOrDecValue}
              calcBaseScore={calcBaseScore}
            />
          );
        })}
      </ScrollView>
      <Animatable.View
        style={{ position: "absolute", left: 20, bottom: 20 }}
        animation={"slideInLeft"}
      >
        <CustomActionButton
          style={styles.backButton}
          onPress={backButtonHandler}
        >
          <Text style={styles.buttonText}>Back</Text>
        </CustomActionButton>
      </Animatable.View>

      <Animatable.View
        style={{ position: "absolute", right: 20, bottom: 20 }}
        animation={"slideInRight"}
      >
        <CustomActionButton
          style={styles.primaryButton}
          onPress={updateScoresHandler}
        >
          <Text style={styles.buttonText}>Save scores</Text>
        </CustomActionButton>
      </Animatable.View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: Colors.theme.light1,
  },
  playerName: {
    width: `${Defaults.scoreScreen.widths.playerName}%`,
    paddingLeft: 5,
    fontWeight: "bold",
  },
  bid: {
    width: `${
      Defaults.scoreScreen.widths.bidButton +
      Defaults.scoreScreen.widths.baseScore
    }%`,
    textAlign: "center",
    fontWeight: "bold",
  },
  bonus: {
    width: `${
      Defaults.scoreScreen.widths.bonusIndicators +
      Defaults.scoreScreen.widths.bonusScore
    }%`,
    textAlign: "center",
    fontWeight: "bold",
  },
  score: {
    width: `${Defaults.scoreScreen.widths.roundScore}%`,
    textAlign: "center",
    fontWeight: "bold",
  },
  primaryButton: {
    backgroundColor: Defaults.button.primary,
  },
  backButton: {
    backgroundColor: Defaults.button.cancel,
  },
  buttonText: {
    color: "white",
    fontSize: Defaults.fontSize,
  },
});

export default ScoresScreen;
