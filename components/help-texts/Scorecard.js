import React from "react";
import { View, StyleSheet } from "react-native";
import { Paragraph } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import DefaultText from "../UI/DefaultText";
import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

const ScorecardHelpText = (props) => {
  return (
    <View>
      <Paragraph style={styles.paragraph}>
        The Scorecard screen is designed similar to a traditional Skull King scorecard. From here,
        you can see the round details (number of bids, round scores and running total scores) for
        all players. The leading score(s) are highlighted in red.
      </Paragraph>
      <Paragraph style={styles.paragraph}>
        When you are ready to start playing the next round, simply tap the{" "}
        <DefaultText style={{ fontFamily: Defaults.fontFamily.bold }}>"Play Round"</DefaultText>{" "}
        button. If you wish to edit details of a previous round, tap the{" "}
        <MaterialCommunityIcons name="pencil" size={16} color={Colors.theme.dark1} /> button for
        that round.
      </Paragraph>
      <Paragraph style={styles.paragraph}>
        Tap the
        <Entypo name="medal" size={22} color="black" />
        to view the current leaderboard.
      </Paragraph>
      <Paragraph style={styles.paragraph}>
        You can also edit a player's name by tapping the name.
      </Paragraph>
    </View>
  );
};

const styles = StyleSheet.create({
  paragraph: { marginBottom: 10, fontSize: 16, fontFamily: Defaults.fontFamily.regular },
});

export default ScorecardHelpText;
