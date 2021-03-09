import React from "react";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../UI/HeaderButton";

const GameHeaderRight = (props) => {
  const currentRound = useSelector((state) => state.game.currentGame.currentRound);

  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Leaderboard"
        iconName="list-outline"
        onPress={() => {
          props.navigation.navigate("Leaderboard", {
            round: currentRound,
          });
        }}
      />
    </HeaderButtons>
  );
};

export default GameHeaderRight;
