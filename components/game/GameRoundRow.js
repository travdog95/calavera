import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ScoreBox from "../../components/game/ScoreBox";
import { setSelectedRound } from "../../store/actions/game-actions";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

const GameRoundRow = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const round = props.roundKey.substring(1);
  const game = props.game;
  const isScroingRound = parseInt(round) === parseInt(game.scoringRound) ? true : false;

  return (
    <View style={styles.row}>
      {isScroingRound && !game.isLastRoundScored ? (
        <View
          style={[
            styles.roundContainer,
            { width: parseInt(props.roundPlayerDetailWidth) * game.players.length },
          ]}
        >
          <Button
            onPress={() => {
              dispatch(setSelectedRound(round));

              navigation.navigate("Bids", {
                round: round,
              });
            }}
            color={Colors.theme.dark1}
            mode="contained"
            uppercase={false}
            compact={true}
            labelStyle={{ fontFamily: Defaults.fontFamily.regular }}
          >
            Play Round <MaterialCommunityIcons name="forward" size={16} color="white" />
          </Button>
        </View>
      ) : (
        Object.entries(props.roundPlayersDetail).map(([playerId, playerDetail]) => {
          const key = `${props.roundKey}-${playerId}`;

          const isRoundLeaderHandler = () => {
            let isLeader = true;
            Object.entries(props.roundPlayersDetail).map(
              ([isLeaderPlayerId, isLeaderPlayerDetail]) => {
                if (
                  isLeaderPlayerDetail.totalScore > playerDetail.totalScore ||
                  playerDetail.totalScore === 0
                ) {
                  isLeader = false;
                }
              }
            );
            return isLeader;
          };

          const isRoundLeader = isRoundLeaderHandler();

          return (
            <ScoreBox
              key={key}
              roundPlayerDetail={playerDetail}
              roundPlayerDetailWidth={props.roundPlayerDetailWidth}
              isRoundLeader={isRoundLeader}
              round={round}
            />
          );
        })
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  roundContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "black",
    height: Defaults.game.rowHeight - 1,
    paddingLeft: 5,
  },
});

export default GameRoundRow;
