import React from "react";
import { View, StyleSheet } from "react-native";

import DefaultText from "../../components/UI/DefaultText";
import Input from "../../components/UI/Input";

import Defaults from "../../constants/defaults";

const CreateGamePlayerRow = (props) => {
  const playerNameInputHandler = (inputText) => {
    props.setPlayerNames(inputText, props.playerNameIndex);
  };

  return (
    <View style={styles.playerNameRow}>
      <DefaultText style={styles.label}>Player {props.playerNameIndex + 1}:</DefaultText>
      <Input
        style={styles.playerNameInput}
        blurOnSubmit
        autoCorrect={false}
        maxLength={10}
        placeholder="Player name"
        onChangeText={playerNameInputHandler}
        value={props.playerNames[props.playerNameIndex]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  playerNameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 5,
  },
  label: {
    fontSize: Defaults.largeFontSize,
    fontWeight: "bold",
    paddingRight: 5,
  },
  playerNameInput: {
    fontFamily: "open-sans",
    fontSize: Defaults.largeFontSize,
    padding: 5,
    width: "60%",
  },
});

export default CreateGamePlayerRow;
