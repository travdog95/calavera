import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { updatePlayerData } from "../../store/actions/game-actions";
import BidRow from "../../components/game/BidRow";
import HeaderButtonLeaderboard from "../../components/game/HeaderButtonLeaderboard";
import HeaderButton from "../../components/UI/HeaderButton";
import DefaultText from "../../components/UI/DefaultText";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

const BidsScreen = (props) => {
  const game = useSelector((state) => state.game.currentGame);
  const round = props.route.params.round;
  const players = game.players;
  const roundPlayersDetail = game.gameData[round - 1];

  const dispatch = useDispatch();

  const setInitialBids = () => {
    const initialBids = [];

    roundPlayersDetail.forEach((detail) => {
      initialBids.push(detail.bid.toString());
    });

    return initialBids;
  };

  //Local state
  const [bids, setBids] = useState(setInitialBids);

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

  const updateBidsHandler = () => {
    const playerData = [];

    players.map((player, index) => {
      playerData.push({ playerId: player.id, bid: bids[index] });
    });

    dispatch(updatePlayerData(round, playerData, "bids"));

    props.navigation.navigate("Scores", {
      round: round,
    });
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <HeaderButtonLeaderboard />
          <Item title="Save" iconName="save" onPress={updateBidsHandler} />
        </HeaderButtons>
      ),
    });
  }, [updateBidsHandler]);

  const calcTotalBids = (total, bid) => {
    const newBid = bid === "" ? "0" : bid;
    return parseInt(total) + parseInt(newBid);
  };

  const totalBids = bids.reduce(calcTotalBids, 0);

  return (
    <View style={styles.screen}>
      <View style={styles.totalBidsContainer}>
        <DefaultText style={styles.totalBidsText}>Total bids: {totalBids}</DefaultText>
      </View>
      <ScrollView>
        {players.map((player, index) => {
          return (
            <BidRow
              key={player.id}
              player={player}
              round={round}
              playerIndex={index}
              bids={bids}
              setBids={updateBidsState}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export const screenOptions = (navData) => {
  const round = navData.route.params.round;

  return {
    headerTitle: `Round ${round} Bids`,
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
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
    fontSize: Defaults.extraLargeFontSize,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default BidsScreen;
