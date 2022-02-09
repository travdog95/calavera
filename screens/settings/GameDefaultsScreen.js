import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Alert, Platform, KeyboardAvoidingView } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import DefaultText from "../../components/UI/DefaultText";
import Dropdown from "react-native-dropdown-picker";

import IncDecControl from "../../components/game/controls/IncDecControl";
import GamePlayerInputs from "../../components/game/GamePlayerInputs";
import ScreenPrimaryButton from "../../components/UI/ScreenPrimaryButton";
import { deleteSettings, updateSettings } from "../../store/actions/settings-actions";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";
import TKO from "../../helpers/helperFunctions";

const GameDefaultsScreen = (props) => {
  const dispatch = useDispatch();

  const settings = useSelector((state) => state.settings);
  console.log("settings", settings);

  const deleteSettingsData = () => {
    dispatch(deleteSettings());
  };

  const saveSettings = (data) => {
    dispatch(updateSettings(settings.id, data));
  };

  const confirmDeleteSettings = () => {
    Alert.alert("Arrrrg!", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", style: "default", onPress: deleteSettingsData },
    ]);
    return;
  };

  const getPlayerNames = () => {
    let initialPlayerNames = [];

    if (settings.playerNames.length === 0) {
      let i = 0;
      for (i; i < Defaults.game.numPlayers; i++) {
        initialPlayerNames.push("");
      }
    } else {
      initialPlayerNames = settings.playerNames;
    }
    console.log("initialPlayerNames", initialPlayerNames);
    return initialPlayerNames;
  };

  const [scoringType, setScoringType] = useState(settings.scoringType);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(TKO.getScoringTypeItems());
  const [playerNames, setPlayerNames] = useState(getPlayerNames());
  const [numRounds, setNumRounds] = useState(settings.numRounds.toString());
  const [numPlayers, setNumPlayers] = useState(settings.numPlayers.toString());

  const updateNumRoundsState = (controlValue) => {
    //update local state
    setNumRounds(controlValue);
    saveSettings({ numRounds: controlValue });
  };

  const updateNumPlayersState = (controlValue) => {
    const newPlayerNames = playerNames;
    const difference = parseInt(controlValue) - playerNames.length;

    if (difference === -1) newPlayerNames.pop("");
    if (difference === 1) newPlayerNames.push("");
    console.log("newPlayerNames", newPlayerNames);

    //update local state
    setNumPlayers(controlValue);
    setPlayerNames(newPlayerNames);
    saveSettings({ numPlayers: controlValue, playerNames: newPlayerNames });
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
    saveSettings({ playerNames: newPlayerNames });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS == "ios" ? 70 : 120}
    >
      <View style={styles.screen}>
        <View style={styles.container}>
          <ScrollView style={styles.scrollView} enableOnAndroid={true}>
            {/* <View style={styles.buttonContainer}>
          <ScreenPrimaryButton onPress={confirmDeleteSettings} buttonText={"Delete Settings"} />
        </View>
 */}
            <View style={styles.row}>
              <DefaultText style={styles.settingLabel}>Scoring System:</DefaultText>
              <Dropdown
                open={open}
                value={scoringType}
                items={items}
                setOpen={setOpen}
                setValue={setScoringType}
                setItems={setItems}
                containerStyle={styles.dropdownContainerStyle}
                textStyle={styles.dropdownTextStyle}
                style={styles.dropdownStyle}
                onChangeValue={(value) => saveSettings({ scoringType: value })}
                listMode={"SCROLLVIEW"}
              />
            </View>
            <View style={[styles.row, Platform.OS !== "android" ? { zIndex: -1 } : null]}>
              <DefaultText style={styles.settingLabel}>Number of Rounds:</DefaultText>
              <IncDecControl
                controlValue={numRounds}
                setControlValue={updateNumRoundsState}
                minValue={1}
                errorMessage={"You need at least 1 round to play!"}
              />
            </View>
            <View style={[styles.row, Platform.OS !== "android" ? { zIndex: -1 } : null]}>
              <DefaultText style={styles.settingLabel}>Number of Players:</DefaultText>
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
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Game Defaults",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.screenBackgroundColor,
  },
  container: {
    flex: 1,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionLabel: {
    fontSize: Defaults.largeFontSize,
    fontFamily: Defaults.fontFamily.bold,
    width: "100%",
  },
  settingLabel: {
    fontSize: Defaults.mediumFontSize,
    fontFamily: Defaults.fontFamily.regular,
    marginLeft: 10,
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
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  scrollView: { zIndex: Platform.OS !== "android" ? -1 : null },
});

export default GameDefaultsScreen;
