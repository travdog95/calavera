import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
import { initGame } from "../../store/actions/game-actions";

import Input from "../../components/UI/Input";
import MainButton from "../../components/UI/MainButton";
import CustomActionButton from "../../components/CustomActionButton";

import Colors from "../../constants/colors";
import TKO from "../../helpers/helperFunctions";

import Player from "../../models/player";
import Game from "../../models/game";
import RoundPlayerDetail from "../../models/roundPlayerDetail";

const windowWidth = Math.floor(Dimensions.get("window").width);

const CreateGameScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [playerNames, setPlayerNames] = useState(["Travis", "Kimmo"]);
  const [playerName, setPlayerName] = useState("");
  const [isGameStartable, setIsGameStartable] = useState(true);
  const [numRounds, setNumRounds] = useState("10");

  const numberInputHandler = (inputText) => {
    setNumRounds(inputText.replace(/[^0-9]/g, ""));
  };

  const incrementHandler = (input, direction) => {
    const currentValue = input === "numRounds" ? numRounds : numPlayers;
    const maxValue = input === "numRounds" ? 1 : 2;
    const newValue =
      direction === "lower" ? parseInt(currentValue) - 1 : parseInt(currentValue) + 1;

    if (isNaN(newValue) || newValue <= maxValue) {
      const message =
        input === "numRounds"
          ? "You need to play at least one round!"
          : "You need to have more than one player!";
      Alert.alert("Arrrrg!", message, [
        { text: "OK", style: "destructive", onPress: resetInputHandler(input) },
      ]);
      return;
    }

    input === "numRounds" ? setNumRounds(newValue.toString()) : setNumPlayers(newValue.toString());
  };

  const resetInputHandler = (input) => {
    if (input === "numRounds") {
      setNumRounds("1");
    } else {
      setNumPlayers("2");
    }
  };

  const addPlayerHandler = () => {
    const newPlayerName = playerName;
    setPlayerNames([...playerNames, newPlayerName]);
    setPlayerName("");

    if (playerNames.length + 1 >= 2) {
      setIsGameStartable(true);
    } else {
      setIsGameStartable(false);
    }
  };

  const playerNameInputHandler = (inputText) => {
    setPlayerName(inputText);
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

  const createPlayersHandler = (playerNames) => {
    //Create players
    const players = [];
    let id = 1;

    playerNames.forEach((playerName) => {
      players.push(new Player(`p${id}`, playerName));
      id++;
    });
    return players;
  };

  const initGameData = (players, numRounds) => {
    //Init game detail data
    const gameData = [];
    let r = 1;
    for (r; r <= numRounds; r++) {
      const roundData = [];
      players.forEach((player) => {
        //Math.floor(Math.random() * 10 random bid
        roundData.push(new RoundPlayerDetail(player.id, r));
      });
      gameData.push(roundData);
    }

    return gameData;
  };

  const createGameHandler = () => {
    //Create players
    const players = createPlayersHandler(playerNames);

    //Init game data
    const gameData = initGameData(players, numRounds);

    //Create game
    const game = new Game("g1", players, numRounds, 1, gameData, TKO.getCurrentDate());

    //Load store with game data
    props.initializeGame(game);

    props.navigation.navigate("Game");
  };

  // useEffect(() => {
  //   console.log("store: CreateGameScreen", props.currentGame.gameData[0]);
  // }, [props.currentGame]);

  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <Text style={styles.text}>How many rounds?</Text>
        <Input
          style={styles.numRounds}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={numberInputHandler}
          value={numRounds}
        />
        <MainButton
          style={styles.button}
          onPress={incrementHandler.bind(this, "numRounds", "lower")}
        >
          <Ionicons name="chevron-down-outline" size={windowWidth <= 340 ? 14 : 18} color="white" />
        </MainButton>
        <MainButton
          style={styles.button}
          onPress={incrementHandler.bind(this, "numRounds", "higher")}
        >
          <Ionicons name="chevron-up-outline" size={windowWidth <= 340 ? 14 : 18} color="white" />
        </MainButton>
      </View>
      <View style={styles.label}>
        <Text style={styles.text}>Add Player:</Text>
      </View>
      <View style={styles.row}>
        <Input
          style={styles.addPlayerInput}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={15}
          placeholder="Player name"
          onChangeText={playerNameInputHandler}
          value={playerName}
        />

        <MainButton style={styles.button} onPress={addPlayerHandler}>
          <Ionicons name="md-add" size={windowWidth <= 340 ? 14 : 18} color="white" />
        </MainButton>
      </View>

      <ScrollView>
        <View style={styles.playerNamesContainer}>
          {playerNames.map((playerName, index) => (
            <Text style={styles.playerName} key={index}>
              {playerName}
            </Text>
          ))}
        </View>
      </ScrollView>

      {isGameStartable ? (
        <Animatable.View
          style={{ position: "absolute", right: 20, bottom: 20 }}
          animation={"slideInRight"}
        >
          <CustomActionButton style={styles.primaryButton} onPress={createGameHandler}>
            <Text style={styles.primaryButtonText}>Start Game</Text>
          </CustomActionButton>
        </Animatable.View>
      ) : null}
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Create Game",
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
  screen: { flex: 1, padding: 5 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  label: {
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  text: {
    fontFamily: "open-sans-bold",
    fontSize: windowWidth <= 340 ? 14 : 18,
  },
  numRounds: {
    fontFamily: "open-sans",
    fontSize: windowWidth <= 340 ? 16 : 20,
    textAlign: "center",
    paddingVertical: 5,
    width: windowWidth <= 340 ? 40 : 60,
  },
  addPlayerInput: {
    fontFamily: "open-sans",
    fontSize: windowWidth <= 340 ? 16 : 20,
    marginHorizontal: 5,
    padding: 5,
    width: "80%",
  },
  playerNamesContainer: {
    margin: 5,
    alignItems: "center",
  },
  playerName: {
    paddingVertical: 5,
    fontFamily: "open-sans-bold",
    fontSize: windowWidth <= 340 ? 16 : 20,
  },
  button: {
    marginHorizontal: 5,
  },
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
const mapDispatchToProps = (dispatch) => ({ initializeGame: (game) => dispatch(initGame(game)) });

export default connect(mapStateToProps, mapDispatchToProps)(CreateGameScreen);
