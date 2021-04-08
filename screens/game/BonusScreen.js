import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import BonusAlliance from "../../components/game/bonus/BonusAlliance";
import BonusWager from "../../components/game/bonus/BonusWager";
import { updateRoundBonuses } from "../../store/actions/game-actions";
import DefaultText from "../../components/UI/DefaultText";
import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";
import BonusMultiple from "../../components/game/bonus/BonusMultiple";
import BonusBoolean from "../../components/game/bonus/BonusBoolean";
import HeaderButton from "../../components/UI/HeaderButton";

const BonusScreen = (props) => {
  const game = useSelector((state) => state.game.currentGame);
  const currentPlayerId = props.route.params.player.id;
  const currentPlayer = game.players.filter((player) => player.id === currentPlayerId)[0];
  const round = game.currentRound;

  const roundBonusDetail = game.roundBonusesDetail[`r${round}`];
  const playerBonusDetail = roundBonusDetail.playersBonusDetail[currentPlayerId];

  const dispatch = useDispatch();

  const getBonusItem = (bonusItemKey) => {
    const controlValue = playerBonusDetail[bonusItemKey];
    const multiplier = roundBonusDetail[bonusItemKey].numAvailable === undefined ? 1 : controlValue;

    const score = playerBonusDetail[bonusItemKey]
      ? Defaults.game.bonusScoreDefaults[bonusItemKey] * multiplier
      : 0;
    const newBonusItem = {
      isAvailable: roundBonusDetail[bonusItemKey].isAvailable,
      controlValue,
      numAvailable: roundBonusDetail[bonusItemKey].numAvailable ?? null,
      score: bonusItemKey === "wager" ? playerBonusDetail[bonusItemKey] : score,
    };

    return newBonusItem;
  };

  const initBonusItemsState = () => {
    const newBonusItems = {};

    for (const bonusItemKey in Defaults.game.bonusScoreDefaults) {
      if (Object.hasOwnProperty.call(Defaults.game.bonusScoreDefaults, bonusItemKey)) {
        newBonusItems[bonusItemKey] = getBonusItem(bonusItemKey);
      }
    }

    return newBonusItems;
  };

  const initTotalScore = () => {
    let total = 0;
    for (const bonusItemKey in bonusItems) {
      if (Object.hasOwnProperty.call(bonusItems, bonusItemKey)) {
        total += parseInt(bonusItems[bonusItemKey].score);
      }
    }
    return total;
  };

  //Local state
  const [bonusItems, setBonusItems] = useState(initBonusItemsState);
  const [totalScore, setTotalScore] = useState(initTotalScore);

  const updateBonusItemsState = (updateBonusItemKey, updateBonusItem) => {
    const updateBonusItems = {};
    let total = 0;
    for (const bonusItemKey in bonusItems) {
      //Find matching bonus item
      if (bonusItemKey === updateBonusItemKey) {
        updateBonusItems[updateBonusItemKey] = {
          ...bonusItems[updateBonusItemKey],
          ...updateBonusItem,
        };
      } else {
        updateBonusItems[bonusItemKey] = bonusItems[bonusItemKey];
      }

      total += parseInt(updateBonusItems[bonusItemKey].score);
    }

    setBonusItems(updateBonusItems);
    setTotalScore(total);
  };

  const updateBonusHandler = () => {
    const bonusData = {
      alliance1: bonusItems.alliance1.controlValue,
      alliance2: bonusItems.alliance2.controlValue,
      wager: bonusItems.wager.controlValue,
      pirates: bonusItems.pirates.controlValue,
      normal14s: bonusItems.normal14s.controlValue,
      black14: bonusItems.black14.controlValue,
      skullKing: bonusItems.skullKing.controlValue,
    };

    dispatch(updateRoundBonuses(round, currentPlayerId, bonusData));

    props.navigation.navigate("Scores", {
      round: round,
    });
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Save" iconName="save" onPress={updateBonusHandler} />
        </HeaderButtons>
      ),
    });
  }, [updateBonusHandler]);

  return (
    <View style={styles.screen}>
      <View style={styles.totalRow}>
        <DefaultText style={styles.totalRowText}>
          Total Bonus Points: <DefaultText>{totalScore}</DefaultText>
        </DefaultText>
      </View>
      <View style={styles.bonusRow}>
        <BonusAlliance
          currentPlayer={currentPlayer}
          bonusItemKey={"alliance1"}
          bonusItem={bonusItems.alliance1}
          setBonusItems={updateBonusItemsState}
        />
      </View>
      <View style={styles.bonusRow}>
        <BonusAlliance
          currentPlayer={currentPlayer}
          bonusItemKey={"alliance2"}
          bonusItem={bonusItems.alliance2}
          setBonusItems={updateBonusItemsState}
        />
      </View>
      <View style={styles.bonusRow}>
        <BonusWager
          bonusItem={bonusItems.wager}
          bonusItemKey={"wager"}
          setBonusItems={updateBonusItemsState}
        />
      </View>
      <View style={styles.bonusRow}>
        <BonusMultiple
          bonusItem={bonusItems.pirates}
          bonusName={"Pirates"}
          bonusItemKey={"pirates"}
          setBonusItems={updateBonusItemsState}
        />
      </View>
      <View style={styles.bonusRow}>
        <BonusMultiple
          bonusItem={bonusItems.normal14s}
          bonusName={"14's"}
          bonusItemKey={"normal14s"}
          setBonusItems={updateBonusItemsState}
        />
      </View>
      <View style={styles.bonusRow}>
        <BonusBoolean
          bonusItem={bonusItems.black14}
          bonusName={"Black 14"}
          bonusItemKey={"black14"}
          setBonusItems={updateBonusItemsState}
        />
      </View>
      <View style={styles.bonusRow}>
        <BonusBoolean
          bonusItem={bonusItems.skullKing}
          bonusName={"Skull King"}
          bonusItemKey={"skullKing"}
          setBonusItems={updateBonusItemsState}
        />
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  const playerName = navData.route.params.player.name;

  return {
    headerTitle: "Bonus for " + playerName,
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  bonusRow: {
    width: "100%",
    backgroundColor: Colors.theme.grey3,
    borderColor: Colors.theme.grey5,
    borderBottomWidth: 1,
  },
  totalRow: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Defaults.bonusScreen.rowVerticalPadding,
    backgroundColor: Colors.theme.grey3,
    borderColor: Colors.theme.grey5,
    borderBottomWidth: 1,
  },
  totalRowText: {
    fontSize: Defaults.extraLargeFontSize,
    fontWeight: "bold",
  },
});

export default BonusScreen;
