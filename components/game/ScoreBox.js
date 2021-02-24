import React from "react";
import { Platform, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const ScoreBox = (props) => {
  return (
    <View
      style={{
        ...styles.roundContainer,
        ...{
          width: props.roundPlayerDetailWidth,
          backgroundColor: props.item.round % 2 === 0 ? Colors.theme.grey3 : "white",
        },
      }}
    >
      <Text style={styles.round}>
        {props.item.bid} | {props.item.score}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {},
  roundContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.theme.dark4,
    height: Defaults.game.rowHeight,
  },
  round: {
    fontFamily: "open-sans",
  },
});

export default ScoreBox;
