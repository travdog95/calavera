import React from "react";
import { View, StyleSheet, Alert } from "react-native";

import Input from "../UI/Input";
import DefaultText from "../UI/DefaultText";
import IncDecButton from "../UI/IncDecButton";
import Defaults from "../../constants/defaults";

const BidRow = (props) => {
  const numberInputHandler = (inputText) => {
    props.setBids(inputText.replace(/[^0-9]/g, ""), props.playerIndex);
  };

  const incOrDecValueHandler = (direction) => {
    const newBid =
      direction === "lower"
        ? parseInt(props.bids[props.playerIndex]) - 1
        : parseInt(props.bids[props.playerIndex]) + 1;

    if (isNaN(newBid) || newBid < 0) {
      Alert.alert("Arrrrg!", "Bid must be 0 or higher!", [
        { text: "OK", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }

    props.setBids(newBid.toString(), props.playerIndex);
  };

  const resetInputHandler = () => {
    props.setBids("0", props.playerIndex);
  };

  return (
    <View style={styles.row}>
      <View style={styles.playerNameContainer}>
        <DefaultText style={styles.playerName}>{props.player.name}</DefaultText>
      </View>
      <View style={styles.bidContainer}>
        <IncDecButton incOrDec={"dec"} onPress={incOrDecValueHandler.bind(this, "lower")} />
        <Input
          style={styles.bid}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={numberInputHandler}
          value={props.bids[props.playerIndex]}
        />
        <IncDecButton incOrDec={"inc"} onPress={incOrDecValueHandler.bind(this, "higher")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderColor: "black",
    borderBottomWidth: 1,
  },
  playerNameContainer: {
    width: "70%",
    justifyContent: "center",
  },
  playerName: {
    fontSize: Defaults.largeFontSize,
    fontWeight: "bold",
  },
  bidContainer: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bid: {
    fontFamily: "open-sans",
    fontSize: Defaults.largeFontSize,
    textAlign: "center",
    width: Defaults.isSmallScreen ? 35 : 40,
    height: Defaults.isSmallScreen ? 30 : 35,
  },
});

export default BidRow;
