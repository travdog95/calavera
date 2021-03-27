import React from "react";
import { useSelector } from "react-redux";
import { Item } from "react-navigation-header-buttons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

const HeaderButtonBids = (props) => {
  const navigation = useNavigation();
  const game = useSelector((state) => state.game.currentGame);
  return (
    <Item
      title="Bids"
      iconComponent={FontAwesome5}
      iconName="hand-rock"
      onPress={() => {
        navigation.navigate("Bids", {
          round: game.currentRound,
          players: game.players,
          roundPlayersDetail: game.gameData[game.currentRound - 1],
        });
      }}
    />
  );
};

export default HeaderButtonBids;
