import React from "react";
import { StyleSheet } from "react-native";

import CustomActionButton from "../CustomActionButton";
import DefaultText from "./DefaultText";
import Defaults from "../../constants/defaults";

const ScreenPrimaryButton = (props) => {
  return (
    <CustomActionButton style={styles.primaryButton} onPress={props.onPress}>
      <DefaultText style={styles.primaryButtonText}>{props.buttonText}</DefaultText>
    </CustomActionButton>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: Defaults.button.primary,
    marginBottom: 15,
  },
  primaryButtonText: {
    color: "white",
    fontSize: Defaults.largeFontSize,
  },
});

export default ScreenPrimaryButton;
