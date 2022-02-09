import React, { useState } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import Dropdown from "react-native-dropdown-picker";

import GamePlayerInputs from "../../components/game/GamePlayerInputs";
import ScreenPrimaryButton from "../../components/UI/ScreenPrimaryButton";
import IncDecControl from "../../components/game/controls/IncDecControl";
import DefaultText from "../../components/UI/DefaultText";
import HelpButton from "../../components/UI/HelpButton";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";
import TKO from "../../helpers/helperFunctions";

const CreateGameScreen = (props) => {
  // const previousGameId =
  //   props.route.params === undefined ? undefined : props.route.params.previousGameId;
  // const previousGame =
  //   previousGameId !== undefined
  //     ? useSelector((state) => state.game.games[previousGameId])
  //     : undefined;
  const settings = useSelector((state) => state.settings);

  const navigation = useNavigation();

  const getDefaultPlayerNames = () => {
    let defaultPlayerNames = [];

    // if (previousGameId !== undefined) {
    //   previousGame.players.forEach((player) => {
    //     defaultPlayerNames.push(player.name);
    //   });
    // } else {
    // for (let i = 0; i < settings.numPlayers; i++) {
    //   defaultPlayerNames.push("");
    // }
    // }

    defaultPlayerNames = settings.playerNames;

    return defaultPlayerNames;
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [isGameStartable, setIsGameStartable] = useState(true);
  const [playerNames, setPlayerNames] = useState(getDefaultPlayerNames());
  const [numRounds, setNumRounds] = useState(settings.numRounds.toString());
  const [numPlayers, setNumPlayers] = useState(settings.numPlayers.toString());
  const [scoringType, setScoringType] = useState(settings.scoringType);
  const [scoringTypeDropdownOpen, setScoringTypeDropdownOpen] = useState(false);

  const [scoringTypes, setScoringTypes] = useState(TKO.getScoringTypeItems());

  const updateNumRoundsState = (controlValue) => {
    //update local state
    setNumRounds(controlValue);
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

  const updateNumPlayersState = (controlValue) => {
    const newPlayerNames = playerNames;
    const difference = parseInt(controlValue) - playerNames.length;

    if (difference === -1) newPlayerNames.pop("");
    if (difference === 1) newPlayerNames.push("");

    //update local state
    setNumPlayers(controlValue);
    setPlayerNames(newPlayerNames);
  };

  const confirmNewGameHandler = () => {
    navigation.navigate("ConfirmNewGame", {
      playerNames,
      numRounds,
      scoringType,
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
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS == "ios" ? 70 : 120}
    >
      <View style={styles.screen}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <DefaultText style={styles.label}>Scoring System:</DefaultText>
              <HelpButton helpKey="scoringSystem" />
            </View>
            <Dropdown
              open={scoringTypeDropdownOpen}
              value={scoringType}
              items={scoringTypes}
              setOpen={setScoringTypeDropdownOpen}
              setValue={setScoringType}
              setItems={setScoringTypes}
              containerStyle={styles.dropdownContainerStyle}
              textStyle={styles.dropdownTextStyle}
              style={styles.dropdownStyle}
              listMode={"SCROLLVIEW"}
            />
          </View>
          <View style={[styles.row, Platform.OS !== "android" ? { zIndex: -1 } : null]}>
            <DefaultText style={styles.label}>Number of Rounds:</DefaultText>
            <IncDecControl
              controlValue={numRounds}
              setControlValue={updateNumRoundsState}
              minValue={1}
              errorMessage={"You need at least 1 round to play!"}
            />
          </View>
          <View style={[styles.row, Platform.OS !== "android" ? { zIndex: -1 } : null]}>
            <DefaultText style={styles.label}>Number of Players:</DefaultText>
            <IncDecControl
              controlValue={numPlayers}
              setControlValue={updateNumPlayersState}
              minValue={2}
              errorMessage={"You need at least 2 players to play!"}
            />
          </View>
          <GamePlayerInputs
            playerNames={playerNames}
            updatePlayerNamesState={updatePlayerNamesState}
          />
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
    padding: 5,
  },
  label: {
    fontSize: Defaults.largeFontSize,
    fontFamily: Defaults.fontFamily.bold,
    paddingRight: 5,
  },
  labelContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  scrollView: {
    zIndex: Platform.OS !== "android" ? -1 : null,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  dropdownContainerStyle: {
    width: Defaults.isSmallScreen ? 140 : 170,
  },
  dropdownTextStyle: {
    color: Colors.theme.grey9,
    fontFamily: Defaults.fontFamily.regular,
    fontSize: Defaults.fontSize,
  },
  dropdownStyle: {
    height: 35,
    zIndex: 10,
  },
});

export default CreateGameScreen;
