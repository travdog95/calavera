import React, { useState } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";

import ScreenPrimaryButton from "../../components/UI/ScreenPrimaryButton";
import IncDecButton from "../../components/UI/IncDecButton";
import DefaultText from "../../components/UI/DefaultText";
import CustomActionButton from "../../components/CustomActionButton";
import CreateGamePlayerRow from "../../components/game/CreateGamePlayerRow";
import CardsByRoundRow from "../../components/game/CardsByRoundRow";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";
import Constants from "../../constants/constants";

const CreateGameScreen = (props) => {
  const navigation = useNavigation();

  const initNumCardsByRound = (numRounds) => {
    const numCards = [];

    for (let r = 1; r <= parseInt(numRounds); r++) {
      numCards.push(r);
    }
    return numCards;
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [playerNames, setPlayerNames] = useState(["", "", "", ""]);
  const [isGameStartable, setIsGameStartable] = useState(true);
  const [numRounds, setNumRounds] = useState("10");
  const [numPlayers, setNumPlayers] = useState("4");
  const [scoringType, setScoringType] = useState(Constants.scoringType.rascalEnhanced);
  const [cardsByRound, setCardsByRound] = useState(initNumCardsByRound(numRounds));

  const updateCardsByRoundState = (countCards, index) => {
    let countCardsByRound = [];
    for (let i = 0; i < cardsByRound.length; i++) {
      if (index === i) {
        countCardsByRound.push(countCards);
      } else {
        countCardsByRound.push(cardsByRound[i]);
      }
    }

    setCardsByRound(countCardsByRound);
  };

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
    navigation.navigate("ConfirmNewGame", {
      playerNames,
      numRounds,
      scoringType,
    });
  };

  const cardsByRoundHandler = () => {
    // navigation.navigate("CardsByRound", {
    //   cardsByRound: [0, 1, 2, 3, 4],
    // });
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
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={60}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screen}>
          <View style={styles.row}>
            <DefaultText style={styles.label}>Scoring System?</DefaultText>
            <SelectDropdown
              data={Constants.scoringTypes}
              onSelect={(selectedItem, index) => {
                setScoringType(index);
              }}
              defaultValueByIndex={Constants.scoringType.rascalEnhanced}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
              buttonTextStyle={styles.dropdownText}
            />
          </View>
          <View style={styles.row}>
            <DefaultText style={styles.label}>How many rounds?</DefaultText>
            <View style={styles.dataContainer}>
              <IncDecButton incOrDec={"dec"} onPress={incOrDecRoundsHandler.bind(this, "lower")} />
              <DefaultText style={styles.incDecValue}>{numRounds}</DefaultText>
              <IncDecButton incOrDec={"inc"} onPress={incOrDecRoundsHandler.bind(this, "higher")} />
            </View>
          </View>
          <View style={styles.row}>
            <DefaultText style={styles.label}>How many Players?</DefaultText>
            <View style={styles.dataContainer}>
              <IncDecButton
                incOrDec={"dec"}
                onPress={incOrDecNumPlayersHandler.bind(this, "lower")}
              />
              <DefaultText style={styles.incDecValue}>{numPlayers}</DefaultText>
              <IncDecButton
                incOrDec={"inc"}
                onPress={incOrDecNumPlayersHandler.bind(this, "higher")}
              />
            </View>
          </View>
          {/* <View style={styles.numRoundsContainer}>
            <CustomActionButton style={styles.secondaryButton} onPress={cardsByRoundHandler}>
              <DefaultText style={styles.secondaryButtonText}>Cards By Round</DefaultText>
            </CustomActionButton>
          </View> */}
          {/* <View style={styles.cardsByRoundContainer}>
                {cardsByRound.map((numCards, index) => {
                  return (
                    <CardsByRoundRow
                      key={index}
                      index={index}
                      cardsByRound={cardsByRound}
                      setCardsByRound={updateCardsByRoundState}
                    />
                  );
                })}
              </View> */}
          <ScrollView contentContainerStyle={styles.scrollView}>
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

          <View style={styles.buttonContainer}>
            {isGameStartable ? (
              <ScreenPrimaryButton
                onPress={confirmNewGameHandler}
                buttonText={"Save Game Settings"}
              />
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Game Settings",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    borderTopWidth: 1,
    backgroundColor: Colors.screenBackgroundColor,
    borderColor: "black",
    borderWidth: 1,
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: Colors.theme.grey2,
    padding: 5,
  },
  label: {
    fontSize: Defaults.largeFontSize,
    fontWeight: "bold",
    paddingRight: 5,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  numRoundsContainer: {
    paddingTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  secondaryButton: {
    backgroundColor: Defaults.button.secondary,
  },
  secondaryButtonText: {
    color: "white",
    fontSize: Defaults.fontSize,
  },
  playerNamesContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  dropdownText: { fontSize: Defaults.largeFontSize },
  scrollView: {
    paddingBottom: 30,
  },
});

export default CreateGameScreen;
