import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import * as Animatable from "react-native-animatable";

import CustomActionButton from "../../components/CustomActionButton";
import IncDecButton from "../../components/UI/IncDecButton";
import DefaultText from "../../components/UI/DefaultText";
import CreateGamePlayerRow from "../../components/game/CreateGamePlayerRow";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const CreateGameScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [playerNames, setPlayerNames] = useState(["Travis", "Kimmo"]);
  // const [playerNames, setPlayerNames] = useState(["", "", "", ""]);
  const [isGameStartable, setIsGameStartable] = useState(true);
  const [numRounds, setNumRounds] = useState("2");
  const [numPlayers, setNumPlayers] = useState("2");

  const incOrDecRoundsHandler = (direction) => {
    const minNumRounds = 1;
    const newNumRounds = direction === "lower" ? parseInt(numRounds) - 1 : parseInt(numRounds) + 1;

    if (isNaN(newNumRounds) || newNumRounds < minNumRounds) {
      const message = "You need to play at least one round!";
      Alert.alert("Arrrrg!", message, [
        { text: "OK", style: "destructive", onPress: resetInputHandler("numRounds") },
      ]);
      return;
    }

    setNumRounds(newNumRounds.toString());
  };

  const incOrDecNumPlayersHandler = (direction) => {
    const minNumPlayers = 2;
    const newNumPlayers =
      direction === "lower" ? parseInt(numPlayers) - 1 : parseInt(numPlayers) + 1;
    const newPlayerNames = playerNames;

    if (isNaN(newNumPlayers) || newNumPlayers < minNumPlayers) {
      const message = "You need to play at least two players!";
      Alert.alert("Arrrrg!", message, [
        { text: "OK", style: "destructive", onPress: resetInputHandler("numPlayers") },
      ]);
      return;
    }

    if (direction === "lower") {
      newPlayerNames.pop();
    } else {
      newPlayerNames.push("");
    }

    setNumPlayers(newNumPlayers.toString());
    setPlayerNames(newPlayerNames);
  };

  const resetInputHandler = (input) => {
    if (input === "numRounds") {
      setNumRounds("1");
    } else {
      setNumPlayers("2");
    }
  };

  const updatePlayerNamesState = (newPlayerName, index) => {
    let newPlayerNames = [];
    for (let i = 0; i < playerNames.length; i++) {
      if (index === i) {
        newPlayerNames.push(newPlayerName);
      } else {
        newPlayerNames.push(playerNames[i]);
      }
    }

    setPlayerNames(newPlayerNames);
  };

  const confirmNewGameHandler = () => {
    props.navigation.navigate("ConfirmNewGame", {
      playerNames,
      numRounds,
    });
  };

  // if (error) {
  //   return (
  //     <View style={styles.centered}>
  //       <Text>An error occurred!</Text>
  //       <Button title="Try again" onPress={loadProducts} color={Colors.theme.main3} />
  //     </View>
  //   );
  // }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.theme.main3} />
      </View>
    );
  }

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={{ flex: 1 }}
    // >
    //   <TouchableWithoutFeedback>
    <View style={styles.screen}>
      <View style={styles.row}>
        <DefaultText style={styles.label}>How many rounds?</DefaultText>
        <View style={styles.numRoundsContainer}>
          <IncDecButton incOrDec={"dec"} onPress={incOrDecRoundsHandler.bind(this, "lower")} />
          <DefaultText style={styles.incDecValue}>{numRounds}</DefaultText>
          <IncDecButton incOrDec={"inc"} onPress={incOrDecRoundsHandler.bind(this, "higher")} />
        </View>
      </View>
      <View style={styles.row}>
        <DefaultText style={styles.label}>How many Players?</DefaultText>
        <View style={styles.numRoundsContainer}>
          <IncDecButton incOrDec={"dec"} onPress={incOrDecNumPlayersHandler.bind(this, "lower")} />
          <DefaultText style={styles.incDecValue}>{numPlayers}</DefaultText>
          <IncDecButton incOrDec={"inc"} onPress={incOrDecNumPlayersHandler.bind(this, "higher")} />
        </View>
      </View>

      <ScrollView>
        <View style={styles.playerNamesContainer}>
          {playerNames.map((playerName, index) => {
            return (
              <CreateGamePlayerRow
                key={index}
                playerNameIndex={index}
                playerNames={playerNames}
                setPlayerNames={updatePlayerNamesState}
              />
            );
          })}
        </View>
      </ScrollView>
      {isGameStartable ? (
        <Animatable.View
          style={{ position: "absolute", right: 20, bottom: 20 }}
          animation={"slideInRight"}
        >
          <CustomActionButton style={styles.primaryButton} onPress={confirmNewGameHandler}>
            <Text style={styles.buttonText}>Start Game</Text>
          </CustomActionButton>
        </Animatable.View>
      ) : null}
    </View>
    //   </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Create Game",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    borderTopWidth: 1,
    backgroundColor: Colors.screenBackgroundColor,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "black",
    padding: 5,
  },
  label: {
    fontSize: Defaults.largeFontSize,
    fontWeight: "bold",
    paddingRight: 5,
  },
  numRoundsContainer: {
    flexDirection: "row",
  },
  incDecValue: {
    fontFamily: "open-sans",
    fontSize: Defaults.largeFontSize,
    textAlign: "center",
    width: Defaults.isSmallScreen ? 35 : 40,
    height: Defaults.isSmallScreen ? 30 : 35,
    textAlignVertical: "center",
    paddingTop: Platform.OS === "ios" ? 3 : 0,
    borderColor: Colors.theme.grey4,
    borderWidth: 1,
  },
  playerNamesContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: Defaults.button.primary,
  },
  buttonText: {
    color: "white",
    fontSize: Defaults.fontSize,
  },
});

export default CreateGameScreen;
