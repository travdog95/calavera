import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Proptypes from "prop-types";
import Colors from "../constants/colors";

const CustomActionButton = ({ children, onPress, style }) => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View style={[styles.button, style]}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

CustomActionButton.propTypes = {
  onPress: Proptypes.func.isRequired,
  children: Proptypes.element.isRequired,
  style: Proptypes.oneOfType([Proptypes.object, Proptypes.array]),
};

CustomActionButton.defaultProps = {
  style: {},
};

export default CustomActionButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "open-sans",
  },
});
