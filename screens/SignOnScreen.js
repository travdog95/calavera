import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const SignOnScreen = (props) => {
  return (
    <View style={styles.homeContainer}>
      <Text>Sign On Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignOnScreen;
