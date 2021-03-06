import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch } from "react-redux";

import { updatePlayerData } from "../../store/actions/game-actions";
import BidRow from "../../components/game/BidRow";
import CustomActionButton from "../../components/CustomActionButton";
import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

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

    dispatch(updatePlayerData(currentRound, playerData));

    props.navigation.navigate("Game");
  };

  const backButtonHandler = () => {
    props.navigation.navigate("Game");
  };

  return (
    <View style={styles.screen}>
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
      <Animatable.View
        style={{ position: "absolute", left: 20, bottom: 20 }}
        animation={"slideInLeft"}
      >
        <CustomActionButton style={styles.backButton} onPress={backButtonHandler}>
          <Text style={styles.buttonText}>Back</Text>
        </CustomActionButton>
      </Animatable.View>

      <Animatable.View
        style={{ position: "absolute", right: 20, bottom: 20 }}
        animation={"slideInRight"}
      >
        <CustomActionButton style={styles.primaryButton} onPress={updateBidsHandler}>
          <Text style={styles.buttonText}>Save bids</Text>
        </CustomActionButton>
      </Animatable.View>
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
    backgroundColor: Defaults.button.primary,
  },
  buttonText: {
    color: "white",
    fontSize: Defaults.fontSize,
  },
  backButton: {
    backgroundColor: Defaults.button.cancel,
  },
});

export default BidsScreen;
