import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import {
  updatePlayerDetail,
  setScoringRound,
  setSelectedRound,
  updateTotalScores,
} from "../../store/actions/game-actions";
import ScoreRow from "../../components/game/ScoreRow";
import HeaderButtonLeaderboard from "../../components/game/HeaderButtonLeaderboard";
import HeaderButtonBids from "../../components/game/HeaderButtonBids";
import HeaderButton from "../../components/UI/HeaderButton";
import DefaultText from "../../components/UI/DefaultText";
import RoundHeader from "../../components/game/RoundHeader";
import CustomActionButton from "../../components/CustomActionButton";
import Tko from "../../helpers/helperFunctions";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

const ScoresScreen = (props) => {
  const game = useSelector((state) => state.game.currentGame);
  const settings = useSelector((state) => state.settings);

  const players = game.players;
  const round = props.route.params.round;
  const roundKey = `r${round}`;
  const roundDetail = game.roundData[roundKey];
  // const roundBonusDetail = game.roundBonusesDetail[`r${round}`];
  const finalRound = game.numRounds;

  const dispatch = useDispatch();

  const calcBaseScore = (roundPlayerDetail) => {
    let newBaseScore = 0;
    const score = parseInt(roundPlayerDetail.baseScore) + parseInt(roundPlayerDetail.bonusScore);
    const multiplier = score < 0 ? -1 : 1;

    if (parseInt(roundPlayerDetail.bid) === 0) {
      newBaseScore = round * 10 * multiplier;
    } else {
      newBaseScore = multiplier === -1 ? -10 : parseInt(roundPlayerDetail.bid) * 20;
    }

    return newBaseScore.toString();
  };

  const setInitialBaseScores = () => {
    const initialBaseScores = [];

    for (const [playerId, playerDetail] of Object.entries(roundDetail)) {
      const score = parseInt(playerDetail.baseScore) + parseInt(playerDetail.bonusScore);

      if (score === 0) {
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
    return Tko.calcPlayerRoundBonus(roundBonusDetail, playerBonusDetail);
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

  const [baseScores, setBaseScores] = useState([]);
  const [bonusScores, setBonusScores] = useState([]);
  const [scores, setScores] = useState([]);
  const [baseScoresInitialized, setBaseScoresInitialized] = useState(false);
  const [bonusScoresInitialized, setBonusScoresInitialized] = useState(false);

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

      const validatedBaseScore = newBaseScores[index] === "" ? 0 : parseInt(newBaseScores[index]);
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

  const updateScoresHandler = () => {
    players.map((player, index) => {
      const playerDetail = {
        bonusScore: parseInt(bonusScores[index]),
        baseScore: parseInt(baseScores[index]),
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

    dispatch(updateTotalScores(round));

    props.navigation.navigate("Game");
  };

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
    setInitialBaseScores();
    setInitialBonusScores();
  }, [game]);

  //
  useEffect(() => {
    setInitialScores();
  }, [baseScoresInitialized, bonusScoresInitialized]);

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

  return (
    <View style={styles.screen}>
      <RoundHeader round={round} />
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
              allianceIndicator={"*"}
              incOrDecValue={incOrDecValue}
              calcBaseScore={calcBaseScore}
            />
          );
        })}
      </ScrollView>
      <CustomActionButton style={styles.primaryButton} onPress={updateScoresHandler}>
        <DefaultText style={styles.primaryButtonText}>Save Scores</DefaultText>
      </CustomActionButton>
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
  playerName: {
    width: `${Defaults.scoreScreen.widths.playerName}%`,
    paddingLeft: 5,
    fontWeight: "bold",
  },
  bid: {
    width: `${Defaults.scoreScreen.widths.bidButton + Defaults.scoreScreen.widths.baseScore}%`,
    textAlign: "center",
    fontWeight: "bold",
  },
  bonus: {
    width: `${
      Defaults.scoreScreen.widths.bonusIndicators + Defaults.scoreScreen.widths.bonusScore
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
    margin: 5,
  },

  primaryButtonText: {
    color: "white",
    fontSize: Defaults.fontSize,
    fontWeight: "bold",
  },
});

export default ScoresScreen;
