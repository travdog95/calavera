import React, { useEffect } from "react";
import { Platform, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

import GameRoundRow from "./GameRoundRow";

const GameRoundRows = (props) => {
  const gameData = props.currentGame.gameData;

  return (
    <View style={styles.roundRow}>
      {gameData.map((roundRow, index) => {
        return (
          <GameRoundRow
            key={index}
            roundRow={roundRow}
            roundPlayerDetailWidth={props.roundPlayerDetailWidth}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  roundRow: {},
});

//Get properties from redux store
const mapStateToProps = (state) => ({ currentGame: state.game });

//Set properties in redux store
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(GameRoundRows);
