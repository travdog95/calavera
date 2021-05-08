import React from "react";
import { View, StyleSheet } from "react-native";
import DefaultText from "../../components/UI/DefaultText";
import CustomActionButton from "../../components/CustomActionButton";
import Defaults from "../../constants/defaults";

const AudioListIem = (props) => {
  return (
    <View style={styles.row}>
      <CustomActionButton style={styles.primaryButton} onPress={props.onPress}>
        <DefaultText style={styles.primaryButtonText}>{props.title}</DefaultText>
      </CustomActionButton>
      <DefaultText>by {props.author}</DefaultText>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Audio Files",
  };
};

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  primaryButton: {
    backgroundColor: Defaults.button.primary,
  },
  primaryButtonText: {
    color: "white",
    fontSize: Defaults.fontSize,
  },
});

export default AudioListIem;
