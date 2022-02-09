import React from "react";
import { View, StyleSheet, Alert } from "react-native";

import Input from "../../UI/Input";
import IncDecButton from "../../UI/IncDecButton";
import Defaults from "../../../constants/defaults";
import Colors from "../../../constants/colors";

const IncDecControl = (props) => {
  //Required props
  //controlValue: string or num
  //setConrolValue: function
  //minValue: string or num
  //errorMessage: string

  //Optional props
  const incrementValue = props.incrementValue == undefined ? 1 : parseInt(props.incrementValue);
  const maxLength = props.maxLength == undefined ? 2 : parseInt(props.maxLength);
  const maxValue = props.maxValue == undefined ? 99 : parseInt(props.maxValue);

  const numberInputHandler = (inputText) => {
    props.setControlValue(inputText.replace(/[^0-9]/g, ""));
  };

  const incOrDecValueHandler = (direction) => {
    const controlValue =
      direction === "lower"
        ? parseInt(props.controlValue) - incrementValue
        : parseInt(props.controlValue) + incrementValue;

    if (isNaN(controlValue) || controlValue < parseInt(props.minValue)) {
      Alert.alert("Arrrrg!", props.errorMessage, [
        { text: "OK", style: "destructive", onPress: resetInputHandler.bind(this, "min") },
      ]);
      return;
    }

    if (controlValue > maxValue) {
      Alert.alert("Arrrrg!", `Sorry, you can't go above ${maxValue}!`, [
        { text: "OK", style: "destructive", onPress: resetInputHandler.bind(this, "max") },
      ]);
      return;
    }

    props.setControlValue(controlValue);
  };

  const resetInputHandler = (boundary) => {
    if (boundary === "min") {
      props.setControlValue(props.minValue.toString());
    } else {
      props.setControlValue(maxValue.toString());
    }
  };

  return (
    <View style={styles.container}>
      <IncDecButton
        incOrDec={"dec"}
        onPress={incOrDecValueHandler.bind(this, "lower")}
        style={{ backgroundColor: Colors.theme.dark1 }}
      />
      <Input
        style={styles.controlValue}
        blurOnSubmit
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="number-pad"
        maxLength={maxLength}
        onChangeText={numberInputHandler}
        value={props.controlValue.toString()}
      />
      <IncDecButton
        incOrDec={"inc"}
        onPress={incOrDecValueHandler.bind(this, "higher")}
        style={{ backgroundColor: Colors.theme.dark1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  controlValue: {
    fontFamily: Defaults.fontFamily.regular,
    fontSize: Defaults.mediumFontSize,
    textAlign: "center",
    width: Defaults.isSmallScreen ? 35 : 40,
    height: Defaults.isSmallScreen ? 30 : 35,
  },
});

export default IncDecControl;
