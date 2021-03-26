import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import CustomActionButton from "../../CustomActionButton";
import Defaults from "../../../constants/defaults";
import Colors from "../../../constants/colors";
import BonusName from "../../game/bonus/BonusName";
import BonusControl from "../../game/bonus/BonusControl";
import BonusValue from "../../game/bonus/BonusValue";

const BonusAlliance = (props) => {
  const [showEligiblePlayers, setShowEligiblePlayers] = useState(false);
  const currentGame = useSelector((state) => state.game.currentGame);
  const eligiblePlayers = currentGame.players.filter(
    (player) => player.id !== props.currentPlayer.id
  );
  const buttonText = props.bonusItem.controlValue
    ? currentGame.players.filter(
        (player) => player.id === props.bonusItem.controlValue
      )[0].name
    : "Select player";

  const toggleEligiblePlayers = (toggle) => {
    setShowEligiblePlayers(toggle);
  };

  const setAlliance = (playerId) => {
    setShowEligiblePlayers(false);
  };
  return (
    <View>
      <View style={styles.topRow}>
        <BonusName>Alliance with:</BonusName>
        <BonusControl>
          <CustomActionButton
            style={styles.primaryButton}
            onPress={toggleEligiblePlayers.bind(this, !showEligiblePlayers)}
          >
            <Text style={styles.primaryButtonText}>{buttonText}</Text>
          </CustomActionButton>
        </BonusControl>
        <BonusValue>{props.bonusItem.score}</BonusValue>
      </View>
      {showEligiblePlayers ? (
        <View style={styles.bottomRow}>
          {eligiblePlayers.map((player) => {
            const backgroundColor =
              player.id === props.bonusItem.controlValue
                ? Defaults.button.primary
                : Defaults.button.cancel;
            return (
              <CustomActionButton
                key={player.id}
                style={{
                  ...styles.primaryButton,
                  ...{ backgroundColor: backgroundColor },
                }}
                onPress={setAlliance.bind(this, player.id)}
              >
                <Text style={styles.primaryButtonText}>{player.name}</Text>
              </CustomActionButton>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Defaults.bonusScreen.rowVerticalPadding,
  },
  bottomRow: {
    flexDirection: "row",
    borderColor: Colors.theme.main3,
    borderBottomWidth: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Defaults.bonusScreen.rowVerticalPadding,
  },
  primaryButton: {
    backgroundColor: Defaults.button.primary,
    marginHorizontal: 5,
  },
  primaryButtonText: {
    color: "white",
    fontSize: Defaults.fontSize,
  },
});

export default BonusAlliance;
