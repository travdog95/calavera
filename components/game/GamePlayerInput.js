import React, { useState } from "react";
import { StyleSheet } from "react-native";

import Input from "../UI/Input";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

const GamePlayer = (props) => {
  const [focus, setFocus] = useState(false);
  const playerNameInputHandler = (inputText) => {
    props.setPlayerNames(inputText, props.playerNameIndex);
  };
  const playerNumber = props.playerNameIndex + 1;
  const placeholder = `Player ${playerNumber}`;

  return (
    <Input
      style={focus ? { ...styles.playerNameInput, ...styles.onFocus } : styles.playerNameInput}
      blurOnSubmit
      autoCorrect={false}
      maxLength={10}
      placeholder={placeholder}
      placeholderTextColor={focus ? Colors.theme.main1 : Colors.theme.grey4}
      onChangeText={playerNameInputHandler}
      value={props.playerNames[props.playerNameIndex]}
      onFocus={() => {
        setFocus(true);
      }}
      onBlur={() => setFocus(false)}
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
    borderRadius: 5,
  },
  onFocus: {
    borderColor: Colors.theme.main1,
  },
});

export default GamePlayer;
