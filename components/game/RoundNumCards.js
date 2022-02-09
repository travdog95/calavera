import React from "react";
import { View, StyleSheet, Alert } from "react-native";

import Input from "../UI/Input";
import DefaultText from "../UI/DefaultText";
import IncDecButton from "../UI/IncDecButton";
import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

const RoundNumCards = (props) => {
  const numberInputHandler = (inputText) => {
    props.setNumCards(inputText.replace(/[^0-9]/g, ""));
  };

  const incOrDecValueHandler = (direction) => {
    const numberOfCards =
      direction === "lower" ? parseInt(props.numCards) - 1 : parseInt(props.numCards) + 1;

    if (isNaN(numberOfCards) || numberOfCards <= 0) {
      Alert.alert("Arrrrg!", "You need at least 1 card to play!", [
        { text: "OK", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }

    props.setNumCards(numberOfCards);
  };

  const resetInputHandler = () => {
    props.setNumCards("1");
  };

  return (
    <View style={styles.row}>
      <View>
        <DefaultText style={styles.label}>Number of Cards</DefaultText>
      </View>
      <View style={styles.numCardsContainer}>
        <IncDecButton
          incOrDec={"dec"}
          onPress={incOrDecValueHandler.bind(this, "lower")}
          // style={{ backgroundColor: Colors.theme.light2 }}
        />
        <Input
          style={styles.numCards}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={numberInputHandler}
          value={props.numCards.toString()}
        />
        <IncDecButton
          incOrDec={"inc"}
          onPress={incOrDecValueHandler.bind(this, "higher")}
          // style={{ backgroundColor: Colors.theme.light2 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // borderColor: Colors.theme.grey2,
    // borderBottomWidth: 1,
    paddingVertical: 5,
  },
  label: {
    fontSize: Defaults.mediumFontSize,
    marginHorizontal: 2,
  },
  numCardsContainer: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  numCards: {
    fontFamily: Defaults.fontFamily.regular,
    fontSize: Defaults.mediumFontSize,
    textAlign: "center",
    width: Defaults.isSmallScreen ? 35 : 40,
    height: Defaults.isSmallScreen ? 30 : 35,
  },
});

export default RoundNumCards;
