import React from "react";
import { View, StyleSheet, Linking, Text } from "react-native";
import { Button, Paragraph, Title } from "react-native-paper";
import { createUseModal } from "react-native-use-modal";

import Colors from "../../constants/colors";

export const useHelpModal = createUseModal(({ confirm, param }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title style={styles.title}>{param.title}</Title>
      </View>
      <View style={styles.paragraphContainer}>
        <Paragraph>{param.message}</Paragraph>
        {param.url ? (
          <Button
            onPress={() => {
              Linking.openURL(param.url);
            }}
            uppercase={false}
            style={styles.url}
            compact={true}
            labelStyle={styles.url}
          >
            <Text>{param.urlText}</Text>
          </Button>
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={confirm} color={Colors.mainColor}>
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
    backgroundColor: Colors.mainColor,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  title: {
    textAlign: "center",
  },
  paragraphContainer: {
    padding: 15,
  },
  url: {
    color: Colors.urlText,
    textDecorationLine: "underline",
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
  },
});
