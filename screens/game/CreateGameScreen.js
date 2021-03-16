import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import Input from "../../components/UI/Input";
import CustomActionButton from "../../components/CustomActionButton";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const windowWidth = Math.floor(Dimensions.get("window").width);

const CreateGameScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [playerNames, setPlayerNames] = useState(["Travis", "Kimmo"]);
  // const [playerNames, setPlayerNames] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [isGameStartable, setIsGameStartable] = useState(true);
  const [numRounds, setNumRounds] = useState("2");

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
    if (playerName !== "") {
      const newPlayerName = playerName;
      setPlayerNames([...playerNames, newPlayerName]);
      setPlayerName("");

      if (playerNames.length + 1 >= 2) {
        setIsGameStartable(true);
      } else {
        setIsGameStartable(false);
      }
    }
  };

  const playerNameInputHandler = (inputText) => {
    setPlayerName(inputText);
  };

  const editPlayerNameHandler = (playerIndex) => {
    //set text input to player name
    const playerNameToEdit = playerNames.filter((player, index) => index === playerIndex);
    setPlayerName(...playerNameToEdit);

    //delete from playerNames array
    deletePlayerNameHandler(playerIndex);
  };

  const deletePlayerNameHandler = (playerIndex) => {
    const updatedPlayerNames = playerNames.filter((player, index) => index !== playerIndex);
    setPlayerNames(updatedPlayerNames);
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
    <View style={styles.screen}>
      {/* <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}> */}
      <View style={styles.row}>
        <Text style={styles.text}>How many rounds?</Text>
        <Input
          style={styles.numRounds}
          blurOnSubmit
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={numberInputHandler}
          value={numRounds}
        />
        <CustomActionButton
          style={styles.secondaryButton}
          onPress={incrementHandler.bind(this, "numRounds", "lower")}
        >
          <Ionicons name="chevron-down-outline" size={Defaults.fontSize} color="white" />
        </CustomActionButton>

        <CustomActionButton
          style={styles.secondaryButton}
          onPress={incrementHandler.bind(this, "numRounds", "higher")}
        >
          <Ionicons name="chevron-up-outline" size={Defaults.fontSize} color="white" />
        </CustomActionButton>
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
          maxLength={10}
          placeholder="Player name"
          onChangeText={playerNameInputHandler}
          value={playerName}
        />

        <CustomActionButton style={styles.secondaryButton} onPress={addPlayerHandler}>
          <Text style={styles.buttonText}>Add</Text>
        </CustomActionButton>
      </View>

      <ScrollView>
        <View style={styles.playerNamesContainer}>
          {playerNames.map((playerName, index) => {
            return (
              <View style={styles.playerNameContainer} key={index}>
                <Text style={styles.playerName}>{playerName}</Text>
                <CustomActionButton
                  style={styles.secondaryButton}
                  onPress={() => editPlayerNameHandler(index)}
                >
                  <FontAwesome name="edit" size={16} color="white" />
                </CustomActionButton>
                <CustomActionButton
                  style={styles.deleteButton}
                  onPress={() => deletePlayerNameHandler(index)}
                >
                  <Text style={styles.buttonText}>
                    <FontAwesome name="trash" size={16} color="white" />
                  </Text>
                </CustomActionButton>
              </View>
            );
          })}
        </View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
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
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Create Game",
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 5 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  label: {
    paddingTop: 10,
  },
  text: {
    fontFamily: "open-sans-bold",
    fontSize: Defaults.largeFontSize,
  },
  numRounds: {
    fontFamily: "open-sans",
    fontSize: Defaults.largeFontSize,
    textAlign: "center",
    paddingVertical: 5,
    width: windowWidth <= Defaults.smallScreenWidth ? 40 : 60,
  },
  addPlayerInput: {
    fontFamily: "open-sans",
    fontSize: Defaults.largeFontSize,
    padding: 5,
    width: "70%",
  },
  playerNamesContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  playerNameContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  playerName: {
    paddingVertical: 5,
    fontFamily: "open-sans-bold",
    textAlign: "left",
    width: "65%",
    fontSize: Defaults.largeFontSize,
    marginVertical: 3,
  },
  primaryButton: {
    backgroundColor: Defaults.button.primary,
  },
  secondaryButton: {
    backgroundColor: Defaults.button.secondary,
  },
  deleteButton: {
    backgroundColor: Defaults.button.dark,
  },
  buttonText: {
    color: "white",
    fontSize: Defaults.fontSize,
  },
});

export default CreateGameScreen;
