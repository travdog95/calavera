import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { updatePlayerDetail } from "../../store/actions/game-actions";
import BidRow from "../../components/game/BidRow";
import HeaderButtonLeaderboard from "../../components/game/HeaderButtonLeaderboard";
import HeaderButton from "../../components/UI/HeaderButton";
import DefaultText from "../../components/UI/DefaultText";
import CustomActionButton from "../../components/CustomActionButton";
import RoundHeader from "../../components/game/RoundHeader";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

const BidsScreen = (props) => {
  const game = useSelector((state) => state.game.currentGame);
  const round = props.route.params.round;
  const players = game.players;
  const roundPlayersDetail = game.roundData[`r${round}`];

  const dispatch = useDispatch();

  const setInitialBids = () => {
    const initialBids = [];

    for (const [playerId, playerDetail] of Object.entries(roundPlayersDetail)) {
      initialBids.push(playerDetail.bid.toString());
    }

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
    players.map((player, index) => {
      dispatch(updatePlayerDetail(round, player.id, { bid: bids[index] }));
    });

    props.navigation.navigate("Scores", {
      round: round,
    });
  };

  // useEffect(() => {
  //   props.navigation.setOptions({
  //     headerRight: () => (
  //       <HeaderButtons HeaderButtonComponent={HeaderButton}>
  //         <HeaderButtonLeaderboard />
  //         {/* <Item title="Save" iconName="save" onPress={updateBidsHandler} /> */}
  //       </HeaderButtons>
  //     ),
  //   });
  // }, [updateBidsHandler]);

  const calcTotalBids = (total, bid) => {
    const newBid = bid === "" ? "0" : bid;
    return parseInt(total) + parseInt(newBid);
  };

  const totalBids = bids.reduce(calcTotalBids, 0);

  return (
    <View style={styles.screen}>
      <RoundHeader round={round} />
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
      <CustomActionButton style={styles.primaryButton} onPress={updateBidsHandler}>
        <DefaultText style={styles.primaryButtonText}>Save Bids</DefaultText>
      </CustomActionButton>
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

export default BidsScreen;
