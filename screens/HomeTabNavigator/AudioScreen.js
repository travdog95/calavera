import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Audio } from "expo-av";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";
import AudioData from "../../data/audio";

import AudioListItem from "../../components/audio/AudioListItem";

const AudioScreen = (props) => {
  const [sound, setSound] = useState();

  const playAudio = async (audio) => {
    const { sound } = await Audio.Sound.createAsync(audio.requireFunction);
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
        {AudioData.map((audio) => {
          return (
            <AudioListItem
              key={audio.fileName}
              title={audio.text}
              author={audio.author}
              onPress={playAudio.bind(this, audio)}
            />
          );
        })}
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
    backgroundColor: Colors.screenBackgroundColor,
  },
  container: {
    flex: 1,
    width: "100%",
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
