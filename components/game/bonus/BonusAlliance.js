import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import CustomActionButton from "../../CustomActionButton";
import DefaultText from "../../UI/DefaultText";
import Defaults from "../../../constants/defaults";
import Colors from "../../../constants/colors";
import BonusName from "../../game/bonus/BonusName";
import BonusControl from "../../game/bonus/BonusControl";
import BonusValue from "../../game/bonus/BonusValue";

const BonusAlliance = (props) => {
  // const currentGame = useSelector((state) => state.game.currentGame);
  const currentGameId = useSelector((state) => state.game.currentGameId);
  const currentGame = useSelector((state) => state.game.games[currentGameId]);

  const initShowClearButton = () => {
    return props.bonusItem.controlValue ? true : false;
  };

  const initButtonText = () => {
    return props.bonusItem.controlValue
      ? currentGame.players.filter((player) => player.id === props.bonusItem.controlValue)[0].name
      : "Select player";
  };

  const [showEligiblePlayers, setShowEligiblePlayers] = useState(false);
  const [showClearButton, setShowClearButton] = useState(initShowClearButton);
  const [buttonText, setButtonText] = useState(initButtonText);

  const eligiblePlayers = currentGame.players.filter(
    (player) => player.id !== props.currentPlayer.id
  );

  const toggleEligiblePlayers = (toggle) => {
    setShowEligiblePlayers(toggle);
  };

  const toggleClearButton = (toggle) => {
    if (toggle) {
      props.setBonusItems(props.bonusItemKey, {
        controlValue: "",
        score: 0,
      });

      setButtonText("Select player");
    }
    setShowClearButton(!toggle);
  };

  const setAlliance = (playerId) => {
    setShowEligiblePlayers(false);
    setButtonText(currentGame.players.filter((player) => player.id === playerId)[0].name);
    setShowClearButton(true);

    props.setBonusItems(props.bonusItemKey, {
      controlValue: playerId,
      score: Defaults.game.bonusScoreDefaults[props.bonusItemKey],
    });
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
            <DefaultText style={styles.primaryButtonText}>{buttonText}</DefaultText>
          </CustomActionButton>
          {showClearButton ? (
            <CustomActionButton
              style={styles.clearButton}
              onPress={toggleClearButton.bind(this, showClearButton)}
            >
              <MaterialIcons name="clear" size={15} color="black" />
            </CustomActionButton>
          ) : null}
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
                <DefaultText style={styles.primaryButtonText}>{player.name}</DefaultText>
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
  clearButton: {
    backgroundColor: "white",
    borderRadius: 100,
    marginLeft: 10,
  },
});

export default BonusAlliance;
