import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch } from "react-redux";

import CustomActionButton from "../../components/CustomActionButton";
import Input from "../../components/UI/Input";

import { savePlayerName } from "../../store/actions/game-actions";

import Defaults from "../../constants/defaults";

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
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={10}
          placeholder="Player name"
          onChangeText={playerNameInputHandler}
          value={playerName}
        />
      </View>
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
        <CustomActionButton style={styles.primaryButton} onPress={savePlayerNamesHandler}>
          <Text style={styles.buttonText}>Save Name</Text>
        </CustomActionButton>
      </Animatable.View>
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
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

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
  addPlayerInput: {
    fontFamily: "open-sans",
    fontSize: Defaults.largeFontSize,
    padding: 5,
    width: "80%",
  },
});

export default EditPlayerNamesScreen;
