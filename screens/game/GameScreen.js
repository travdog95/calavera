import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";

import GamePlayersHeader from "../../components/game/GamePlayersHeader";
import GameRounds from "../../components/game/GameRounds";
import GameRoundRows from "../../components/game/GameRoundRows";
import CustomActionButton from "../../components/CustomActionButton";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";
import { setCurrentRound } from "../../store/actions/game-actions";

const GameScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [isGameOver, setIsGameOver] = useState(false);

  const game = props.currentGame;

  // useEffect(() => {
  //   console.log("store: GameScreen");
  //   console.log(props.currentGame.gameData[0]);
  // }, [props.currentGame]);

  const windowWidth = Math.floor(Dimensions.get("window").width);
  const windowHeight = Dimensions.get("window").height;

  //Calculate width of Round Player detail columns
  const calcRoundPlayerDetailWidth = () => {
    let width = 0;

    width = Math.floor((windowWidth - Defaults.game.roundNumWidth) / game.players.length);

    return width < Defaults.game.playerMinWidth ? Defaults.game.playerMinWidth : width;
  };

  const roundPlayerDetailWidth = calcRoundPlayerDetailWidth();

  const nextRoundHandler = () => {
    props.updateCurrentRound(game.currentRound + 1);
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title="Try again" onPress={loadProducts} color={Colors.theme.main3} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.theme.main3} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView horizontal>
        <ScrollView nestedScrollEnabled>
          <GamePlayersHeader
            players={game.players}
            roundPlayerDetailWidth={roundPlayerDetailWidth}
          />
          <View style={styles.roundsContainer}>
            <GameRounds numRounds={game.numRounds} currentRound={game.currentRound} />
            <GameRoundRows roundPlayerDetailWidth={roundPlayerDetailWidth} />
          </View>
        </ScrollView>
      </ScrollView>
      <Animatable.View
        style={{ position: "absolute", left: 20, bottom: 20, flexDirection: "row" }}
        animation={"slideInLeft"}
      >
        <CustomActionButton
          style={styles.primaryButton}
          onPress={() => {
            props.navigation.navigate("Scores", {
              round: game.currentRound,
              players: game.players,
              roundPlayersDetail: game.gameData[game.currentRound - 1],
            });
          }}
        >
          <Text style={styles.primaryButtonText}>Scores</Text>
        </CustomActionButton>
        <CustomActionButton style={styles.nextRoundButton} onPress={nextRoundHandler}>
          <Text style={styles.primaryButtonText}>Next Round</Text>
        </CustomActionButton>
      </Animatable.View>

      <Animatable.View
        style={{ position: "absolute", right: 20, bottom: 20 }}
        animation={"slideInRight"}
      >
        <CustomActionButton
          style={styles.primaryButton}
          onPress={() => {
            props.navigation.navigate("Bids", {
              round: game.currentRound,
              players: game.players,
              roundPlayersDetail: game.gameData[game.currentRound - 1],
            });
          }}
        >
          <Text style={styles.primaryButtonText}>Bids</Text>
        </CustomActionButton>
      </Animatable.View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Let's Play!",
    // headerLeft: () => (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Menu"
    //       iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
    //       onPress={() => {
    //         navData.navigation.toggleDrawer();
    //       }}
    //     />
    //   </HeaderButtons>
    // ),
    //   headerRight: () => (
    //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //       <Item
    //         title="Cart"
    //         iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
    //         onPress={() => {
    //           navData.navigation.navigate("Cart");
    //         }}
    //       />
    //     </HeaderButtons>
    //   ),
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  roundsContainer: {
    flexDirection: "row",
  },
  primaryButton: {
    backgroundColor: Colors.theme.main1,
    borderRadius: 10,
  },
  nextRoundButton: {
    backgroundColor: Colors.theme.main1,
    borderRadius: 10,
    marginLeft: 15,
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
  updateCurrentRound: (currentRound) => dispatch(setCurrentRound(currentRound)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
