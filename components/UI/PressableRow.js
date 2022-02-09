import React from "react";
import { StyleSheet, View, Pressable } from "react-native";

import DefaultText from "../../components/UI/DefaultText";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

const PressableRow = (props) => {
  const androidRipple =
    props.androidRipple === undefined
      ? { color: Colors.theme.grey5, borderless: false }
      : props.androidRipple;

  return (
    <Pressable onPress={props.onPress} android_ripple={androidRipple}>
      <View style={{ ...styles.row, ...props.rowStyle }}>
        <DefaultText style={{ ...styles.settingStyle, ...props.style }}>
          {props.children}
        </DefaultText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingStyle: {
    fontSize: Defaults.mediumFontSize,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default PressableRow;
