import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const StandingsScreen = (props) => {
  return (
    <View style={styles.standingsContainer}>
      <Text>Standings Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  standingsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StandingsScreen;
