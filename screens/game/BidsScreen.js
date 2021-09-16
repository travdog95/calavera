import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons } from "react-navigation-header-buttons";
import { useNavigation } from "@react-navigation/core";

import { updatePlayerDetail } from "../../store/actions/game-actions";

import BidsHeader from "../../components/game/BidsHeader";
import BidRow from "../../components/game/BidRow";
import HeaderButtonLeaderboard from "../../components/game/header-buttons/HeaderButtonLeaderboard";
import HeaderButton from "../../components/UI/HeaderButton";
import DefaultText from "../../components/UI/DefaultText";
import ScreenPrimaryButton from "../../components/UI/ScreenPrimaryButton";

import RoundHeader from "../../components/game/RoundHeader";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";
import Constants from "../../constants/constants";
import TKO from "../../helpers/helperFunctions";
import { updateGame } from "../../helpers/db";

const BidsScreen = (props) => {
  const currentGameId = useSelector((state) => state.game.currentGameId);
  const game = useSelector((state) => state.game.games[currentGameId]);

  const round = parseInt(props.route.params.round);
  const roundKey = `r${round}`;
  const players = game.players;
  const roundPlayersDetail = game.roundData[roundKey];
  const numCards = game.numCardsByRound[round - 1];

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const setInitialBids = () => {
    const initialBids = [];
    for (const [playerId, playerDetail] of Object.entries(roundPlayersDetail)) {
      initialBids.push(playerDetail.bid.toString());
    }

    return initialBids;
  };

  const setInitialCannonTypes = () => {
    const initialCannonTypes = [];
    for (const [playerId, playerDetail] of Object.entries(roundPlayersDetail)) {
      initialCannonTypes.push(playerDetail.cannonType.toString());
    }

    return initialCannonTypes;
  };

  //Local state
  const [bids, setBids] = useState(setInitialBids);
  const [cannonTypes, setCannonTypes] = useState(setInitialCannonTypes);

  const updateBidsState = (newBid, index) => {
    let tempBids = [];
    for (let i = 0; i < bids.length; i++) {
      if (index === i) {
        tempBids.push(newBid);
      } else {
        tempBids.push(bids[i]);
      }
    }

    setBids(tempBids);
  };

  const updateCannonTypesState = (newCannonType, index) => {
    let tempCannonTypes = [];
    for (let i = 0; i < cannonTypes.length; i++) {
      if (index === i) {
        tempCannonTypes.push(newCannonType);
      } else {
        tempCannonTypes.push(cannonTypes[i]);
      }
    }

    setCannonTypes(tempCannonTypes);
  };

  const updateBidsHandler = () => {
    players.map((player, index) => {
      let baseScore = 0;
      let accuracy = 0;

      //Classic scoring
      if (game.scoringType === Constants.scoringType.classic) {
        //Check to see if baseScore is greater than zero
        baseScore =
          game.roundData[roundKey][player.id].baseScore > 0
            ? TKO.calcBaseScore(parseInt(bids[index]), numCards)
            : 0;
      } else {
        accuracy =
          cannonTypes[index] == Constants.cannonType.cannonball &&
          game.roundData[roundKey][player.id].accuracy == Constants.accuracy.glancingBlow
            ? Constants.accuracy.completeMiss
            : game.roundData[roundKey][player.id].accuracy;

        //Rascal and Rascal enhanced
        baseScore = TKO.calcRascalBaseScore(
          game.scoringType,
          numCards,
          cannonTypes[index],
          accuracy
        );
      }

      dispatch(
        updatePlayerDetail(round, player.id, {
          bid: bids[index],
          baseScore,
          cannonType: cannonTypes[index],
          accuracy,
        })
      );
    });

    navigation.navigate("Scores", {
      round: round,
    });
  };

  //Save game in SQLite DB
  useEffect(() => {
    updateGame(game)
      .then((dbResult) => {
        if (dbResult.rowsAffected !== 1) console.log("error saving game");
      })
      .catch((err) => console.log(err));
  }, [game]);

  const calcTotalBids = (total, bid) => {
    const newBid = bid === "" ? "0" : bid;
    return parseInt(total) + parseInt(newBid);
  };

  const totalBids = bids.reduce(calcTotalBids, 0);
  const headerText = `Round ${round}`;

  return (
    <View style={styles.screen}>
      <RoundHeader round={round} headerText={headerText} />
      <View style={styles.totalBidsContainer}>
        <DefaultText style={styles.totalBidsText}>Total bids: {totalBids}</DefaultText>
      </View>
      <BidsHeader scoringType={game.scoringType} />
      <ScrollView>
        {players.map((player, index) => {
          return (
            <BidRow
              key={player.id}
              scoringType={game.scoringType}
              player={player}
              round={round}
              playerIndex={index}
              bids={bids}
              setBids={updateBidsState}
              cannonTypes={cannonTypes}
              setCannonTypes={updateCannonTypesState}
            />
          );
        })}
      </ScrollView>
      {game.isActive ? (
        <View style={styles.buttonContainer}>
          <ScreenPrimaryButton onPress={updateBidsHandler} buttonText={"Save Bids"} />
        </View>
      ) : null}
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: `Bids`,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <HeaderButtonLeaderboard />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.screenBackgroundColor },
  totalBidsContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    borderColor: "black",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: Colors.theme.light2,
  },
  totalBidsText: {
    fontSize: Defaults.largeFontSize,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
});

export default BidsScreen;
