import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { updatePlayerData } from "../../store/actions/game-actions";
import BidRow from "../../components/game/BidRow";
import HeaderButtonLeaderboard from "../../components/game/HeaderButtonLeaderboard";
import HeaderButton from "../../components/UI/HeaderButton";
import DefaultText from "../../components/UI/DefaultText";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

const BidsScreen = (props) => {
  const players = props.route.params.players;
  const currentRound = props.route.params.round;
  const roundPlayersDetail = props.route.params.roundPlayersDetail;

  const dispatch = useDispatch();

  const setInitialBids = () => {
    const initialBids = [];

    roundPlayersDetail.forEach((detail) => {
      initialBids.push(detail.bid.toString());
    });

    return initialBids;
  };

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

    dispatch(updatePlayerData(currentRound, playerData, "bids"));

    props.navigation.navigate("Game");
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

  const totalBids = bids.reduce((total, current) => parseInt(total) + parseInt(current));

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
              round={currentRound}
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
  const currentRound = navData.route.params.round;

  return {
    headerTitle: `Round ${currentRound}`,
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
