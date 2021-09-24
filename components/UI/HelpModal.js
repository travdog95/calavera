import React from "react";
import { View, StyleSheet, Linking, Text, ScrollView } from "react-native";
import { Button, Title } from "react-native-paper";
import { createUseModal } from "react-native-use-modal";

import Colors from "../../constants/colors";

//Implementation

//Imports
// import { ModalResultType } from "react-native-use-modal";

// import { useHelpModal } from "../../components/UI/HelpModal";

// const helpModal = useHelpModal();

//Inside component
// const handlePress = useCallback(async () => {
//   const result = await helpModal.show({
//     title: Constants.help.scoringSystem.title,
//     message: Constants.help.scoringSystem.helpText,
//     url: Constants.help.scoringSystem.url,
//     urlText: Constants.help.scoringSystem.urlText,
//   });

//   if (result.type === ModalResultType.CONFIRM) {
//     // handle confirm
//   } else {
//     // handle cancel
//   }
// }, [helpModal]);

//Help Button
// <BorderlessButton onPress={handlePress}>
//   <Ionicons name="help-circle-outline" size={24} color="black" />
// </BorderlessButton>

export const useHelpModal = createUseModal(({ confirm, param }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title style={styles.title}>{param.title}</Title>
      </View>
      <ScrollView>
        <View style={styles.paragraphContainer}>
          <View>{param.message}</View>
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
      </ScrollView>
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
    maxHeight: "80%",
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
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  url: {
    color: Colors.urlText,
    textDecorationLine: "underline",
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    margin: 15,
  },
});
