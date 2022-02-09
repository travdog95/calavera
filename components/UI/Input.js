import React from "react";
import { TextInput, StyleSheet } from "react-native";

import Colors from "../../constants/colors";

const Input = (props) => {
  // {...props} allows the parent to forward all the props to the custom component
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    borderColor: Colors.theme.grey4,
    borderWidth: 1,
  },
});

export default Input;
