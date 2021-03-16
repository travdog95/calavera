import React from "react";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useNavigation } from "@react-navigation/native";

import HeaderButton from "../UI/HeaderButton";

const GameHeaderRight = (props) => {
  const currentRound = useSelector((state) => state.game.currentGame.currentRound);
  const navigation = useNavigation();

  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Leaderboard"
        iconName="list-outline"
        onPress={() => {
          navigation.navigate("Leaderboard");
        }}
      />
    </HeaderButtons>
  );
};

export default GameHeaderRight;
