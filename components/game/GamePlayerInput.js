import React from "react";
import { StyleSheet } from "react-native";

import Input from "../UI/Input";

import Defaults from "../../constants/defaults";

const GamePlayer = (props) => {
  const playerNameInputHandler = (inputText) => {
    props.setPlayerNames(inputText, props.playerNameIndex);
  };

  return (
    <Input
      style={styles.playerNameInput}
      blurOnSubmit
      autoCorrect={false}
      maxLength={10}
      placeholder="Player name"
      onChangeText={playerNameInputHandler}
      value={props.playerNames[props.playerNameIndex]}
    />
  );
};

const styles = StyleSheet.create({
  playerNameInput: {
    margin: 3,
    fontFamily: Defaults.fontFamily.regular,
    fontSize: Defaults.largeFontSize,
    padding: 5,
    width: "45%",
  },
});

export default GamePlayer;
