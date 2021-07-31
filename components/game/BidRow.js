import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import Input from "../UI/Input";
import DefaultText from "../UI/DefaultText";
import IncDecButton from "../UI/IncDecButton";
import CustomActionButton from "../CustomActionButton";
import Defaults from "../../constants/defaults";
import Constants from "../../constants/constants";
import Colors from "../../constants/colors";

const BidRow = (props) => {
  const scoringType = props.scoringType;
  const isRascalEnhancedScoring =
    scoringType === Constants.scoringType.rascalEnhanced ? true : false;
  const grapeshotColor =
    parseInt(props.cannonTypes[props.playerIndex]) === 0 ? Colors.theme.dark4 : Colors.theme.grey3;
  const cannonBallColor =
    parseInt(props.cannonTypes[props.playerIndex]) === 1 ? Colors.theme.dark4 : Colors.theme.grey3;

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

  const cannonTypeHandler = (cannonType) => {
    props.setCannonTypes(cannonType, props.playerIndex);
  };

  const resetInputHandler = () => {
    props.setBids("0", props.playerIndex);
  };

  return (
    <View style={styles.row}>
      <View style={{ width: isRascalEnhancedScoring ? "50%" : "70%", justifyContent: "center" }}>
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
      {isRascalEnhancedScoring ? (
        <View style={styles.cannonContainer}>
          <CustomActionButton style={{ padding: 5 }} onPress={cannonTypeHandler.bind(this, 0)}>
            <FontAwesome5 name="hand-paper" size={24} color={grapeshotColor} />
          </CustomActionButton>
          <CustomActionButton style={{ padding: 5 }} onPress={cannonTypeHandler.bind(this, 1)}>
            <FontAwesome5 name="hand-rock" size={24} color={cannonBallColor} />
          </CustomActionButton>
        </View>
      ) : null}
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
  cannonContainer: {
    flexDirection: "row",
    width: "20%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default BidRow;
