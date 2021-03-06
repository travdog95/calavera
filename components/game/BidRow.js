import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Input from "../UI/Input";
import CustomActionButton from "../../components/CustomActionButton";
import Defaults from "../../constants/defaults";

const BidRow = (props) => {
  const numberInputHandler = (inputText) => {
    props.setBids(inputText.replace(/[^0-9]/g, ""), props.playerIndex);
  };

  const incrementBidHandler = (direction) => {
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
        <Text style={styles.playerName}>{props.player.name}</Text>
      </View>
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

      <CustomActionButton style={styles.button} onPress={incrementBidHandler.bind(this, "lower")}>
        <Ionicons name="chevron-down-outline" size={Defaults.fontSize} color="white" />
      </CustomActionButton>
      <CustomActionButton style={styles.button} onPress={incrementBidHandler.bind(this, "higher")}>
        <Ionicons name="chevron-up-outline" size={Defaults.fontSize} color="white" />
      </CustomActionButton>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  playerNameContainer: {
    width: 120,
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  playerName: {
    fontFamily: "open-sans-bold",
    fontSize: Defaults.largeFontSize,
  },
  bid: {
    fontFamily: "open-sans",
    fontSize: Defaults.largeFontSize,
    textAlign: "center",
    marginHorizontal: 10,
    paddingVertical: 5,
    width: 60,
  },
  button: {
    marginHorizontal: 5,
    backgroundColor: Defaults.button.secondary,
  },
});

export default BidRow;
