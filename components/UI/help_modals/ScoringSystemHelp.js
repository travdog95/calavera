import React from "react";
import { View, StyleSheet } from "react-native";
import Unorderedlist from "react-native-unordered-list";

import DefaultText from "../../../components/UI/DefaultText";
import Colors from "../../../constants/colors";
import Defaults from "../../../constants/defaults";

const ScoringSystemHelp = () => {
  return (
    <View>
      <View>
        <DefaultText style={styles.sectionTitle}>Introduction</DefaultText>
      </View>
      <View style={styles.paragraph}>
        <DefaultText>
          There are three different ways to score Skull King. You are probably familiar with the
          Classic scoring. However, there is a new scoring system is called 'Rascal Scoring', and
          there are two variations. This app can handle all three scoring options! Below is summary
          of the different scoring systems summarized from the official rules.
        </DefaultText>
      </View>
      <View>
        <DefaultText style={styles.sectionTitle}>Classic</DefaultText>
      </View>
      <View style={styles.paragraph}>
        <DefaultText>
          With the Skull King’s classic scoring, you only earn points for the round when you bid
          correctly. If you’re off, even by 1, you’ll lose points instead. When you win the exact
          number of tricks that you bid, you are awarded 20 points for each trick taken. Capture
          more or fewer tricks than you bid, and you’ll lose 10 points for every trick you were off.
        </DefaultText>
      </View>
      <View style={styles.paragraph}>
        <DefaultText>
          Bid zero and get your bid correct and your potential score is 10 points times the number
          of cards dealt that round.
        </DefaultText>
      </View>
      <View>
        <DefaultText style={styles.sectionTitle}>Rascal</DefaultText>
      </View>
      <View style={styles.paragraph}>
        <DefaultText>
          Each round, all players have the same potential points, regardless of the number you bid.
          You can earn 10 points for each card dealt that round. What determines whether you earn
          all, part, or none of those potential points is your accuracy.
        </DefaultText>
      </View>
      <View style={styles.paragraph}>
        <Unorderedlist style={styles.listItem}>
          <DefaultText>
            <DefaultText style={styles.bold}>Direct Hit:</DefaultText> When you get your bid exactly
            right. Earn all of the potential round points and any bonus points.
          </DefaultText>
        </Unorderedlist>
        <Unorderedlist style={styles.listItem}>
          <DefaultText>
            <DefaultText style={styles.bold}>Glancing Blow:</DefaultText> When you are off by 1 on
            your bid. Earn half of the potential round points. No bonus points are earned.
          </DefaultText>
        </Unorderedlist>
        <Unorderedlist style={styles.listItem}>
          <DefaultText>
            <DefaultText style={styles.bold}>Complete Miss:</DefaultText> When you are off by 2 or
            more. Earn none of the potential round points.
          </DefaultText>
        </Unorderedlist>
      </View>

      <View>
        <DefaultText style={styles.sectionTitle}>Rascal Enhanced</DefaultText>
      </View>
      <View style={styles.paragraph}>
        <DefaultText>
          With this rule, you’ll choose between two cannon loads immediately after bidding. This
          will impact your potential score. You’ll each reveal your choice simultaneously, with a
          second “Yo-ho-ho!”
        </DefaultText>
      </View>
      <View style={styles.paragraph}>
        <Unorderedlist style={styles.listItem}>
          <DefaultText>
            <DefaultText style={styles.bold}>Grapeshot (open hand):</DefaultText> Follow standard
            Rascal scoring.
          </DefaultText>
        </Unorderedlist>
        <Unorderedlist style={styles.listItem}>
          <DefaultText>
            <DefaultText style={styles.bold}>Cannonball (closed fist):</DefaultText> Earn 15 points
            for each card dealt, if you bid correctly. Earn 0 if you’re off, even by 1. You must get
            your bid correct to earn any bonus points.
          </DefaultText>
        </Unorderedlist>
      </View>

      <View>
        <DefaultText style={styles.sectionTitle}>Bonus Points</DefaultText>
      </View>
      <View style={styles.paragraph}>
        <DefaultText>
          Bonus points are tallied the same way in all scoring options. In each round you’ll have
          the chance to earn bonus points, but get your bid wrong and you won’t score any of them.
        </DefaultText>
      </View>
      <View style={styles.paragraph}>
        <DefaultText>
          For detailed information on the new scoring systems, tap on the link below.
        </DefaultText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    color: "black",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  paragraph: {
    marginBottom: 10,
  },
  listItem: {
    marginLeft: 10,
  },
});

export default ScoringSystemHelp;
