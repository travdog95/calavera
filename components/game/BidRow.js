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

  let grapeshot = { color: "", buttonBorderColor: "", buttonBackgroundColor: "" };
  let cannonBall = { color: "", buttonBorderColor: "", buttonBackgroundColor: "" };
  const selectedColors = {
    color: "white",
    buttonBackgroundColor: Colors.theme.dark1,
    buttonBorderColor: Colors.theme.dark1,
  };
  const unSelectedColors = {
    color: Colors.theme.grey4,
    buttonBackgroundColor: Colors.theme.grey2,
    buttonBorderColor: Colors.theme.grey4,
  };
  //Determine state of Cannon Load button to load colors
  if (parseInt(props.cannonTypes[props.playerIndex]) === 0) {
    grapeshot = selectedColors;
    cannonBall = unSelectedColors;
  } else {
    grapeshot = unSelectedColors;
    cannonBall = selectedColors;
  }

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
      <View style={{ width: scoringType === Constants.scoringType.rascalEnhanced ? "40%" : "70%" }}>
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
      {scoringType === Constants.scoringType.rascalEnhanced ? (
        <View style={styles.cannonContainer}>
          <CustomActionButton
            style={[
              styles.cannonButton,
              {
                backgroundColor: grapeshot.buttonBackgroundColor,
                borderColor: grapeshot.buttonBorderColor,
              },
            ]}
            onPress={cannonTypeHandler.bind(this, 0)}
          >
            <FontAwesome5 name="hand-paper" size={24} color={grapeshot.color} />
          </CustomActionButton>
          <CustomActionButton
            style={[
              styles.cannonButton,
              {
                backgroundColor: cannonBall.buttonBackgroundColor,
                borderColor: cannonBall.buttonBorderColor,
              },
            ]}
            onPress={cannonTypeHandler.bind(this, 1)}
          >
            <FontAwesome5 name="hand-rock" size={24} color={cannonBall.color} />
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
    borderColor: Colors.theme.grey2,
    borderBottomWidth: 1,
  },
  playerName: {
    fontSize: Defaults.largeFontSize,
  },
  bidContainer: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bid: {
    fontFamily: Defaults.fontFamily.regular,
    fontSize: Defaults.largeFontSize,
    textAlign: "center",
    width: Defaults.isSmallScreen ? 35 : 40,
    height: Defaults.isSmallScreen ? 30 : 35,
  },
  cannonContainer: {
    flexDirection: "row",
    width: "30%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cannonButton: {
    padding: 5,
    // backgroundColor: Colors.theme.grey2,
    // borderColor: Colors.theme.grey4,
    borderWidth: 1,
    marginLeft: 5,
  },
});

export default BidRow;
