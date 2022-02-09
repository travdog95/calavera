import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import GameRow from "../../components/game/GameRow";
import { loadGames, deleteGames } from "../../store/actions/game-actions";
import ScreenPrimaryButton from "../../components/UI/ScreenPrimaryButton";
import DefaultText from "../../components/UI/DefaultText";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

const MyGamesScreen = (props) => {
  const games = useSelector((state) => state.game.games);

  const dispatch = useDispatch();
  let gameIndex = 0;

  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  const deleteGameData = () => {
    dispatch(deleteGames());
  };

  const confirmDeleteGameData = () => {
    Alert.alert("Arrrrg!", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", style: "default", onPress: deleteGameData },
    ]);
    return;
  };

  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <ScreenPrimaryButton
          onPress={() => {
            props.navigation.navigate("CreateGame");
          }}
          buttonText={"New Game"}
        />
        <ScreenPrimaryButton onPress={confirmDeleteGameData} buttonText={"Delete All Games"} />
      </View>
      {_.isEmpty(games) ? (
        <View style={styles.noGames}>
          <DefaultText>No games!!</DefaultText>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <DefaultText style={styles.gameLabel}>Game</DefaultText>
            <DefaultText style={styles.playersLabel}># Players</DefaultText>
            <DefaultText style={styles.statusLabel}>Status</DefaultText>
          </View>

          <ScrollView contentContainerStyle={styles.contentContainer}>
            {Object.entries(games).map(([gameId, game]) => {
              return <GameRow key={gameId} game={game} index={gameIndex++} />;
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};
export const screenOptions = (navData) => {
  return {
    headerTitle: "My Games",
    // headerLeft: () => (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Menu"
    //       iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
    //       onPress={() => {
    //         navData.navigation.openDrawer();
    //       }}
    //     />
    //   </HeaderButtons>
    // ),
    //   headerRight: () => (
    //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //       <Item
    //         title="Cart"
    //         iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
    //         onPress={() => {
    //           navData.navigation.navigate("Cart");
    //         }}
    //       />
    //     </HeaderButtons>
    //   ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.screenBackgroundColor,
  },
  noGames: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    borderColor: Colors.theme.grey2,
    borderBottomWidth: 1,
  },
  contentContainer: { flexGrow: 1 },
  gameLabel: {
    fontSize: Defaults.fontSize,
    width: Defaults.myGamesScreen.widths.description,
    fontFamily: Defaults.fontFamily.bold,
  },
  playersLabel: {
    fontSize: Defaults.fontSize,
    width: Defaults.myGamesScreen.widths.players,
    textAlign: "center",
    fontFamily: Defaults.fontFamily.bold,
  },
  statusLabel: {
    fontSize: Defaults.fontSize,
    width: Defaults.myGamesScreen.widths.status,
    textAlign: "right",
    fontFamily: Defaults.fontFamily.bold,
  },
});

export default MyGamesScreen;
