import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const MainButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={{ ...styles.button, ...props.style }}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.theme.main3,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontFamily: Defaults.fontFamily.regular,
  },
});

export default MainButton;
