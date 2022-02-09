import React from "react";
import { Text, StyleSheet } from "react-native";
import Defaults from "../../constants/defaults";

const DefaultText = (props) => {
  return <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Defaults.fontFamily.regular,
  },
});

export default DefaultText;
