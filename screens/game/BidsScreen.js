import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, Platform, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";

import { updatePlayerData } from "../../store/actions/game-actions";
import BidRow from "../../components/game/BidRow";
import CustomActionButton from "../../components/CustomActionButton";
import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const BidsScreen = (props) => {
  const players = props.route.params.players;
  const currentRound = props.route.params.round;
  const roundPlayersDetail = props.route.params.roundPlayersDetail;

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
    props.updateRoundPlayerData(props.currentGame, currentRound, playerData);

    props.navigation.navigate("Game");
  };

  return (
    <View style={styles.screen}>
      <ScrollView>
        {players.map((player, index) => {
          const playerDetail = roundPlayersDetail.filter((detail) => detail.playerId === player.id);

          return (
            <BidRow
              key={player.id}
              player={player}
              round={currentRound}
              bid={playerDetail[0].bid}
              playerIndex={index}
              bids={bids}
              setBids={updateBidsState}
            />
          );
        })}
      </ScrollView>
      <CustomActionButton style={styles.primaryButton} onPress={updateBidsHandler}>
        <Text style={styles.primaryButtonText}>Save bids</Text>
      </CustomActionButton>
    </View>
  );
};

export const screenOptions = (navData) => {
  const currentRound = navData.route.params.round;

  return {
    headerTitle: "Bids for Round " + currentRound,
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  primaryButton: {
    backgroundColor: Colors.theme.main1,
    borderRadius: 10,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
  },
});

//Get properties from redux store
const mapStateToProps = (state) => ({ currentGame: state.game });

//Set properties in redux store
const mapDispatchToProps = (dispatch) => ({
  updateRoundPlayerData: (game, roundToUpdate, playerData) =>
    dispatch(updatePlayerData(game, roundToUpdate, playerData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BidsScreen);
