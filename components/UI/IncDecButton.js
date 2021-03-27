import React from "react";
import { StyleSheet } from "react-native";
import CustomActionButton from "../CustomActionButton";
import { Ionicons } from "@expo/vector-icons";
import Defaults from "../../constants/defaults";

const IncDecButton = (props) => {
  const buttonStyle = props.incOrDec === "inc" ? styles.incrementButton : styles.decrementButton;
  const iconName = props.incOrDec === "inc" ? "add-outline" : "remove-outline";

  return (
    <CustomActionButton style={{ ...buttonStyle, ...props.style }} onPress={props.onPress}>
      <Ionicons name={iconName} size={Defaults.fontSize} color="white" />
    </CustomActionButton>
  );
};

const styles = StyleSheet.create({
  decrementButton: {
    backgroundColor: Defaults.button.secondary,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    height: Defaults.isSmallScreen ? 30 : 35,
    width: Defaults.isSmallScreen ? 30 : 35,
    padding: 5,
  },
  incrementButton: {
    backgroundColor: Defaults.button.secondary,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    height: Defaults.isSmallScreen ? 30 : 35,
    width: Defaults.isSmallScreen ? 30 : 35,
    padding: 5,
  },
});

export default IncDecButton;
