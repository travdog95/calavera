import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import Input from "../../components/UI/Input";
import ScreenPrimaryButton from "../../components/UI/ScreenPrimaryButton";

import { savePlayerName } from "../../store/actions/game-actions";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

const EditPlayerNamesScreen = (props) => {
  const [playerName, setPlayerName] = useState(props.route.params.playerName);
  const playerId = props.route.params.playerId;

  const dispatch = useDispatch();

  const backButtonHandler = () => {
    props.navigation.navigate("Game");
  };

  const savePlayerNamesHandler = () => {
    //Load store with game data
    dispatch(savePlayerName(playerId, playerName));

    props.navigation.navigate("Game");
  };

  const playerNameInputHandler = (inputText) => {
    setPlayerName(inputText);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <Input
          style={styles.addPlayerInput}
          blurOnSubmit
          autoCorrect={false}
          maxLength={10}
          placeholder="Player name"
          onChangeText={playerNameInputHandler}
          value={playerName}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ScreenPrimaryButton onPress={savePlayerNamesHandler} buttonText={"Save Name"} />
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Edit Player Name",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.screenBackgroundColor,
  },
  row: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },

  addPlayerInput: {
    fontFamily: Defaults.fontFamily.regular,
    fontSize: Defaults.largeFontSize,
    marginTop: 15,
    padding: 5,
    width: "50%",
  },
});

export default EditPlayerNamesScreen;
