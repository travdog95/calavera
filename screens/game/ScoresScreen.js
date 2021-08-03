import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons } from "react-navigation-header-buttons";

import {
  updatePlayerDetail,
  setScoringRound,
  setSelectedRound,
  setIsLastRoundScored,
  updateTotalScores,
} from "../../store/actions/game-actions";
import ScoreRow from "../../components/game/ScoreRow";
import HeaderButtonLeaderboard from "../../components/game/HeaderButtonLeaderboard";
import HeaderButtonBids from "../../components/game/HeaderButtonBids";
import HeaderButton from "../../components/UI/HeaderButton";
import RoundHeader from "../../components/game/RoundHeader";
import ScreenPrimaryButton from "../../components/UI/ScreenPrimaryButton";
import TKO from "../../helpers/helperFunctions";
import { updateGame } from "../../helpers/db";

import Colors from "../../constants/colors";
import Constants from "../../constants/constants";

const ScoresScreen = (props) => {
  const currentGameId = useSelector((state) => state.game.currentGameId);
  const game = useSelector((state) => state.game.games[currentGameId]);

  const settings = useSelector((state) => state.settings);

  const players = game.players;
  const round = props.route.params.round;
  const numCards = round;
  const roundKey = `r${round}`;
  const roundDetail = game.roundData[roundKey];
  // const roundBonusDetail = game.roundBonusesDetail[`r${round}`];
  const finalRound = game.numRounds;

  const dispatch = useDispatch();

  const calcBaseScore = (roundPlayerDetail) => {
    let newBaseScore = 0;
    const score = parseInt(roundPlayerDetail.baseScore) + parseInt(roundPlayerDetail.bonusScore);
    const multiplier = score < 0 ? -1 : 1;

    //Classic scoring
    if (game.scoringType === Constants.scoringType.classic) {
      if (parseInt(roundPlayerDetail.bid) === 0) {
        newBaseScore = numCards * 10 * multiplier;
      } else {
        newBaseScore = multiplier === -1 ? -10 : parseInt(roundPlayerDetail.bid) * 20;
      }
    } else {
      //Rascal scoring
      newBaseScore = TKO.calcRascalBaseScore(
        game.scoringType,
        numCards,
        roundPlayerDetail.cannonType,
        roundPlayerDetail.accuracy
      );
    }

    return newBaseScore.toString();
  };

  const setInitialBaseScores = () => {
    const initialBaseScores = [];

    for (const [playerId, playerDetail] of Object.entries(roundDetail)) {
      const score = parseInt(playerDetail.baseScore) + parseInt(playerDetail.bonusScore);
      //If classic scoring type and score is zero
      //or scoring type is rascal or rascal enhanced
      if (
        (game.scoringType === Constants.scoringType.classic && score === 0) ||
        game.scoringType === Constants.scoringType.rascal ||
        game.scoringType === Constants.scoringType.rascalEnhanced
      ) {
        initialBaseScores.push(calcBaseScore(playerDetail));
      } else {
        initialBaseScores.push(playerDetail.baseScore.toString());
      }
    }

    setBaseScores(initialBaseScores);
    setBaseScoresInitialized(true);
  };

  const calcBonusScore = (playerId) => {
    const playerBonusDetail = roundBonusDetail.playersBonusDetail[playerId];
    return TKO.calcPlayerRoundBonus(roundBonusDetail, playerBonusDetail);
  };

  const setInitialBonusScores = () => {
    const tempBonusScores = [];

    for (const [playerId, playerDetail] of Object.entries(roundDetail)) {
      tempBonusScores.push(playerDetail.bonusScore.toString());
      // if (parseInt(playerDetail.baseScore) + parseInt(playerDetail.bonusScore) === 0) {
      //   tempBonusScores.push(playerDetail.bonusScore.toString());
      // } else {
      //   const newBonusScore = calcBonusScore(roundPlayerDetail.playerId);
      //   tempBonusScores.push(newBonusScore.toString());
      // }
    }

    setBonusScores(tempBonusScores);
    setBonusScoresInitialized(true);
  };

  const setInitialScores = () => {
    const initialScores = [];
    let index = 0;
    for (const [playerId, playerDetail] of Object.entries(roundDetail)) {
      const score = parseInt(playerDetail.baseScore) + parseInt(playerDetail.bonusScore);
      if (score === 0) {
        const newScore = parseInt(baseScores[index]) + parseInt(bonusScores[index]);

        initialScores.push(newScore);
      } else {
        initialScores.push(score);
      }
      index++;
    }

    setScores(initialScores);
  };

  const getAccuracies = () => {
    const initialAccuracies = [];
    for (const [playerId, playerDetail] of Object.entries(roundDetail)) {
      initialAccuracies.push(playerDetail.accuracy);
    }

    return initialAccuracies;
  };

  const [baseScores, setBaseScores] = useState([]);
  const [bonusScores, setBonusScores] = useState([]);
  const [scores, setScores] = useState([]);
  const [accuracies, setAccuracies] = useState(getAccuracies);
  const [baseScoresInitialized, setBaseScoresInitialized] = useState(false);
  const [bonusScoresInitialized, setBonusScoresInitialized] = useState(false);

  const updateBaseScoreState = (newBaseScore, bonusScore, playerIndex) => {
    const newBaseScores = [];
    let newBonusScore = 0;

    baseScores.forEach((baseScore, index) => {
      if (playerIndex === index) {
        newBaseScores.push(newBaseScore.toString());
        newBonusScore = bonusScore;
      } else {
        newBaseScores.push(baseScore.toString());
        newBonusScore = bonusScores[index];
      }
    });

    setBaseScores(newBaseScores);
  };

  const updateBonusScoreState = (newBonusScore, baseScore, playerIndex) => {
    const newBonusScores = [];
    let newBaseScore = 0;

    bonusScores.forEach((bonusScore, index) => {
      if (playerIndex === index) {
        newBonusScores.push(newBonusScore.toString());
        newBaseScore = baseScore;
      } else {
        newBonusScores.push(bonusScore);
        newBaseScore = baseScores[index];
      }
    });

    setBonusScores(newBonusScores);
  };

  const calcTotalScores = () => {
    const newScores = [];

    baseScores.forEach((baseScore, index) => {
      const newScore = parseInt(baseScore) + parseInt(bonusScores[index]);
      newScores.push(newScore);
    });

    setScores(newScores);
  };

  const validateScores = () => {
    let isValid = true;

    if (game.scoringType == Constants.scoringType.classic) {
      players.map((player, index) => {
        const baseScore = parseInt(baseScores[index]);
        const bonusScore = parseInt(bonusScores[index]);
        const roundScore = baseScore + bonusScore;
        if (roundScore === 0 || baseScore === 0) {
          Alert.alert("Arrrrg!", "Scores must not be equal to 0!", [
            { text: "OK", style: "destructive", cancelable: true },
          ]);
          isValid = false;
        }
      });
    }

    if (isValid) updateScoresHandler();
  };

  const updateScoresHandler = () => {
    players.map((player, index) => {
      const playerDetail = {
        bonusScore: parseInt(bonusScores[index]),
        baseScore: parseInt(baseScores[index]),
        accuracy: parseInt(accuracies[index]),
      };

      dispatch(updatePlayerDetail(round, player.id, playerDetail));
    });

    //Increment scoringRound if it's not the last round and the user is updating scores in the scoring round
    if (round < finalRound && round == game.scoringRound) {
      dispatch(setScoringRound(round + 1));
      dispatch(setSelectedRound(round + 1));
    }

    //
    if (game.selectedRound < game.scoringRound) {
      dispatch(setSelectedRound(game.scoringRound));
    }

    if (round == game.numRounds) {
      dispatch(setIsLastRoundScored(true));
    }
    dispatch(updateTotalScores(round));

    props.navigation.navigate("Game");
  };

  const updateAccuraciesState = (newAccuracy, playerIndex) => {
    let tempAccuracies = [];
    for (let i = 0; i < accuracies.length; i++) {
      if (playerIndex === i) {
        tempAccuracies.push(newAccuracy);
      } else {
        tempAccuracies.push(accuracies[i]);
      }
    }

    const playerId = game.players[playerIndex].id;
    const newBaseScore = TKO.calcRascalBaseScore(
      game.scoringType,
      numCards,
      roundDetail[playerId].cannonType,
      newAccuracy
    );

    updateBaseScoreState(newBaseScore.toString(), bonusScores[playerIndex], playerIndex);
    setAccuracies(tempAccuracies);
  };

  useEffect(() => {
    updateGame(game)
      .then((dbResult) => {
        if (dbResult.rowsAffected !== 1) console.log("error saving game");
      })
      .catch((err) => console.log(err));
  }, [game]);

  const incOrDecValue = (direction, playerIndex, incOrDecValue, input) => {
    if (input === "bonusScore") {
      const newBonusScore =
        direction === "lower"
          ? parseInt(bonusScores[playerIndex]) - incOrDecValue
          : parseInt(bonusScores[playerIndex]) + incOrDecValue;

      updateBonusScoreState(newBonusScore.toString(), baseScores[playerIndex], playerIndex);
    }

    if (input === "baseScore") {
      const newBaseScore =
        direction === "lower"
          ? parseInt(baseScores[playerIndex]) - incOrDecValue
          : parseInt(baseScores[playerIndex]) + incOrDecValue;

      updateBaseScoreState(newBaseScore.toString(), bonusScores[playerIndex], playerIndex);
    }
  };

  //Calculate base and bonus scores when game redux state changes
  useEffect(() => {
    if (game.scoringType !== Constants.scoringType.classic) {
      setAccuracies(getAccuracies());
    }
    setInitialBaseScores();
    setInitialBonusScores();
  }, [game]);

  //Calculate inital scores
  useEffect(() => {
    // console.log("useEffect baseScoresInitialized, bonusScoresInitialized");

    setInitialScores();
  }, [baseScoresInitialized, bonusScoresInitialized]);

  //Calculate scores when baseScores or bonusScores state change
  useEffect(() => {
    // console.log("useEffect baseScores, bonusScores");
    calcTotalScores();
  }, [baseScores, bonusScores]);

  // useEffect(() => {
  //   props.navigation.setOptions({
  //     headerRight: () => (
  //       <HeaderButtons HeaderButtonComponent={HeaderButton}>
  //         <HeaderButtonBids />

  //         <HeaderButtonLeaderboard />
  //         {/* <Item title="Save" iconName="save" onPress={updateScoresHandler} /> */}
  //       </HeaderButtons>
  //     ),
  //   });
  // }, [updateScoresHandler]);

  const headerText = `Round ${round}`;

  return (
    <View style={styles.screen}>
      <RoundHeader round={round} headerText={headerText} />
      <ScrollView contentContainerStyle={styles.playerScoresContainer}>
        {players.map((player, index) => {
          const playerDetail = roundDetail[player.id];
          return (
            <ScoreRow
              key={player.id}
              round={round}
              playerIndex={index}
              player={player}
              bid={playerDetail.bid}
              roundPlayerDetail={playerDetail}
              baseScores={baseScores}
              setBaseScores={updateBaseScoreState}
              bonusScores={bonusScores}
              setBonusScores={updateBonusScoreState}
              scores={scores}
              incOrDecValue={incOrDecValue}
              scoringType={game.scoringType}
              accuracies={accuracies}
              updateAccuraciesState={updateAccuraciesState}
            />
          );
        })}
      </ScrollView>
      {game.isActive ? (
        <View style={styles.buttonContainer}>
          <ScreenPrimaryButton onPress={validateScores} buttonText={"Save Scores"} />
        </View>
      ) : null}
    </View>
  );
};

export const screenOptions = (navData) => {
  // const round = navData.route.params.round;

  return {
    headerTitle: `Scores`,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <HeaderButtonBids />

        <HeaderButtonLeaderboard />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.screenBackgroundColor },
  playerScoresContainer: {
    borderColor: "black",
    borderTopWidth: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: Colors.theme.light1,
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
});

export default ScoresScreen;
