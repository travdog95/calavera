import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button } from "react-native";
import { Audio } from "expo-av";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import HeaderButton from "../../components/UI/HeaderButton";
import CustomActionButton from "../../components/CustomActionButton";
import Defaults from "../../constants/defaults";

const AudioScreen = (props) => {
  const [sound, setSound] = useState();

  const playKraken = async () => {
    const { sound } = await Audio.Sound.createAsync(require(`../../assets/audio/kraken.mp3`));
    setSound(sound);

    await sound.playAsync();
  };

  const playNobodyGetsIt = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require(`../../assets/audio/nobody-gets-it.mp3`)
    );
    setSound(sound);

    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <CustomActionButton style={styles.primaryButton} onPress={playKraken}>
          <Text style={styles.primaryButtonText}>
            <Ionicons name="skull" size={18} color="white" />
          </Text>
        </CustomActionButton>

        <CustomActionButton style={styles.primaryButton} onPress={playNobodyGetsIt}>
          <Text style={styles.primaryButtonText}>
            <MaterialIcons name="child-care" size={18} color="white" />
          </Text>
        </CustomActionButton>
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Audio",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: Defaults.button.primary,
    marginRight: 10,
  },

  primaryButtonText: {
    color: "white",
    fontSize: Defaults.fontSize,
  },
});

export default AudioScreen;
