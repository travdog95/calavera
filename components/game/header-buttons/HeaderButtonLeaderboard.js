import React from "react";
import { Item } from "react-navigation-header-buttons";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

const HeaderButtonLeaderboard = (props) => {
  const navigation = useNavigation();

  return (
    <Item
      title="Leaderboard"
      iconComponent={Entypo}
      iconName="medal"
      onPress={() => {
        navigation.navigate("Leaderboard");
      }}
    />
  );
};

export default HeaderButtonLeaderboard;
