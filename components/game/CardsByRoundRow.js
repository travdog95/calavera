import React from "react";
import { View, StyleSheet, Alert } from "react-native";

import Input from "../UI/Input";
import DefaultText from "../UI/DefaultText";
import IncDecButton from "../UI/IncDecButton";
import Defaults from "../../constants/defaults";

const CardsByRoundRow = (props) => {
  const round = parseInt(props.index) + 1;

  const numberInputHandler = (inputText) => {
    props.setCardsByRound(inputText.replace(/[^0-9]/g, ""), props.index);
  };

  const incOrDecValueHandler = (direction) => {
    const newCardsByRound =
      direction === "lower"
        ? parseInt(props.cardsByRound[props.index]) - 1
        : parseInt(props.cardsByRound[props.index]) + 1;

    if (isNaN(newCardsByRound) || newCardsByRound < 0) {
      Alert.alert("Arrrrg!", "Number of cards must be 0 or higher!", [
        { text: "OK", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }

    props.setCardsByRound(newCardsByRound.toString(), props.index);
  };

  const resetInputHandler = () => {
    props.setSetCardsByRound("0", props.index);
  };

  return (
    <View style={styles.row}>
      <View style={styles.roundLabel}>
        <DefaultText style={styles.roundLabelText}>Round {round}:</DefaultText>
      </View>
      <View style={styles.cardsByRoundContainer}>
        <IncDecButton incOrDec={"dec"} onPress={incOrDecValueHandler.bind(this, "lower")} />
        <Input
          style={styles.cardsByRound}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={numberInputHandler}
          value={props.cardsByRound[props.index].toString()}
        />
        <IncDecButton incOrDec={"inc"} onPress={incOrDecValueHandler.bind(this, "higher")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "black",
    borderWidth: 1,
  },
  roundLabel: {
    width: "50%",
  },
  roundLabelText: {
    fontSize: Defaults.largeFontSize,
    fontFamily: Defaults.fontFamily.bold,
  },
  cardsByRoundContainer: {
    flexDirection: "row",
    width: "50%",
  },
  cardsByRound: {
    fontFamily: Defaults.fontFamily.regular,
    fontSize: Defaults.largeFontSize,
    textAlign: "center",
    width: Defaults.isSmallScreen ? 35 : 40,
    height: Defaults.isSmallScreen ? 30 : 35,
  },
});

export default CardsByRoundRow;
