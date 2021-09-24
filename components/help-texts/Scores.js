import React from "react";
import { View, StyleSheet, Linking } from "react-native";
import { Paragraph, Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

import Constants from "../../constants/constants";
import Colors from "../../constants/colors";

const ScoresHelpText = (props) => {
  const currentGameId = useSelector((state) => state.game.currentGameId);
  const game = useSelector((state) => state.game.games[currentGameId]);

  return (
    <View>
      <Paragraph style={styles.paragraph}>
        Set the bids by tapping on the "+" and "-" buttons next to each player.
      </Paragraph>
      {parseInt(game.scoringType) === Constants.scoringType.rascalEnhanced ? (
        <View>
          <Paragraph style={styles.paragraph}>
            The "Cannon Load" buttons represent whether the player's second bid is a cannonball{" "}
            <FontAwesome5 name="hand-rock" size={18} color="black" /> or grapeshot{" "}
            <FontAwesome5 name="hand-paper" size={18} color="black" />.
          </Paragraph>
          <Paragraph style={styles.paragraph}>
            Tap the link below, and scroll down to the "Optional Rascal Rules" for more information.
          </Paragraph>
          <Button
            onPress={() => {
              Linking.openURL(Constants.rulesUrl);
            }}
            uppercase={false}
            style={styles.url}
            compact={true}
            labelStyle={styles.url}
          >
            Skull King Rules
          </Button>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  paragraph: { marginBottom: 10, fontSize: 16 },
  url: {
    color: Colors.urlText,
    textDecorationLine: "underline",
  },
});

export default ScoresHelpText;
