import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Title } from "react-native-paper";
import { createUseModal } from "react-native-use-modal";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

export const useHelpModal = createUseModal(({ confirm, param }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title style={styles.title}>{param.title}</Title>
      </View>
      <View style={styles.paragraphContainer}>
        <View>{param.message}</View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={confirm}
          color={Colors.theme.dark1}
          labelStyle={{ fontFamily: Defaults.fontFamily.regular }}
        >
          OK
        </Button>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 5,
  },
  titleContainer: {
    backgroundColor: Colors.theme.dark1,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  title: {
    textAlign: "center",
    fontFamily: Defaults.fontFamily.regular,
    color: "white",
  },
  paragraphContainer: {
    padding: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
  },
});
