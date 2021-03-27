import React from "react";
import { Item } from "react-navigation-header-buttons";
import { useNavigation } from "@react-navigation/native";

const HeaderButtonLeaderboard = (props) => {
  const navigation = useNavigation();

  return (
    <Item
      title="Leaderboard"
      iconName="list-outline"
      onPress={() => {
        navigation.navigate("Leaderboard");
      }}
    />
  );
};

export default HeaderButtonLeaderboard;
