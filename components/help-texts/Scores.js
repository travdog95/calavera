import React from "react";
import { View, StyleSheet } from "react-native";
import { Paragraph, Text, Title } from "react-native-paper";
import { useSelector } from "react-redux";

import Constants from "../../constants/constants";
import Defaults from "../../constants/defaults";

const ScoresHelpText = (props) => {
  const currentGameId = useSelector((state) => state.game.currentGameId);
  const game = useSelector((state) => state.game.games[currentGameId]);

  return (
    <View>
      <Title style={styles.title}>Number of Cards</Title>
      <Paragraph style={styles.paragraph}>
        Change the number of cards used in the current round by tapping the "+" or "-" buttons.
      </Paragraph>
      {parseInt(game.scoringType) === Constants.scoringType.classic ? (
        <View>
          <Title style={styles.title}>Got Bid?</Title>
          <Paragraph style={styles.paragraph}>
            Did the player get their bid? If so, you're all set! If not, tap the "Got Bid?" toggle
            button. The score will change to "-10". Adjust the score if the player missed the bid by
            more than one.
          </Paragraph>
        </View>
      ) : null}
      {parseInt(game.scoringType) === Constants.scoringType.rascal ? (
        <View>
          <Title style={styles.title}>Bid</Title>
          <Paragraph style={styles.paragraph}>Player's bid set on the Bids screen.</Paragraph>
          <Title style={styles.title}>Score</Title>
          <Paragraph style={styles.paragraph}>
            <Text style={styles.bold}>Hit</Text> - player got their bid.
          </Paragraph>
          <Paragraph style={styles.paragraph}>
            <Text style={styles.bold}>Half</Text> - player missed their bid by one (Glancing Blow).
          </Paragraph>
          <Paragraph style={styles.paragraph}>
            <Text style={styles.bold}>Miss</Text> - player missed their bid by more than one.
          </Paragraph>
        </View>
      ) : null}
      {parseInt(game.scoringType) === Constants.scoringType.rascalEnhanced ? (
        <View>
          <Title style={styles.title}>Bid</Title>
          <Paragraph style={styles.paragraph}>
            Player's Bid and Cannon Load set on the Bids screen.
          </Paragraph>
          <Title style={styles.title}>Score</Title>
          <View>
            <Text style={styles.subTitle}>Cannonball</Text>
          </View>

          <Paragraph style={styles.paragraph}>
            Tap the "Miss" button if the player did not get their bid.
          </Paragraph>
          <View>
            <Text style={styles.subTitle}>Grapeshot</Text>
          </View>

          <Paragraph style={styles.paragraph}>
            <Text style={styles.bold}>Hit</Text> - player got their bid.
          </Paragraph>
          <Paragraph style={styles.paragraph}>
            <Text style={styles.bold}>Half</Text> - player missed their bid by one (Glancing Blow).
          </Paragraph>
          <Paragraph style={styles.paragraph}>
            <Text style={styles.bold}>Miss</Text> - player missed their bid by more than one.
          </Paragraph>
        </View>
      ) : null}
      <View>
        <Title style={styles.title}>Bonus</Title>
        <Paragraph style={styles.paragraph}>
          To add any bonuses, tap the "+" or "-" buttons. As a reminder, you can only accumulate
          bonus points if you get your bid!
        </Paragraph>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: 10,
    fontSize: Defaults.smallFontSize,
    fontFamily: Defaults.fontFamily.regular,
  },
  bold: { fontFamily: Defaults.fontFamily.bold },
  title: { fontSize: Defaults.mediumFontSize },
  subTitle: {
    fontFamily: Defaults.fontFamily.bold,
    fontSize: Defaults.smallFontSize,
    textDecorationLine: "underline",
  },
});

export default ScoresHelpText;
