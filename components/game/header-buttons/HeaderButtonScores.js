import React from "react";
import { useSelector } from "react-redux";
import { Item } from "react-navigation-header-buttons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HeaderButtonScores = (props) => {
  const navigation = useNavigation();
  // const game = useSelector((state) => state.game.currentGame);
  const currentGameId = useSelector((state) => state.game.currentGameId);
  const game = useSelector((state) => state.game.games[currentGameId]);

  return (
    <Item
      title="Scores"
      iconName="scoreboard-outline"
      onPress={() => {
        navigation.navigate("Scores", {
          round: game.scoringRound,
        });
      }}
      iconComponent={MaterialCommunityIcons}
    />
  );
};

export default HeaderButtonScores;
