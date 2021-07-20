import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import GameRow from "../../components/game/GameRow";
import { loadGames, deleteGames } from "../../store/actions/game-actions";

import CustomActionButton from "../../components/CustomActionButton";
import HeaderButton from "../../components/UI/HeaderButton";
import DefaultText from "../../components/UI/DefaultText";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

const MyGamesScreen = (props) => {
  const games = useSelector((state) => state.game.games);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  const deleteGameData = () => {
    dispatch(deleteGames());
  };

  return (
    <View style={styles.screen}>
      {_.isEmpty(games) ? (
        <View style={styles.noGames}>
          <DefaultText>No games!!</DefaultText>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.headerContainer}>
            <DefaultText style={styles.gameLabel}>Game</DefaultText>
            <DefaultText style={styles.playersLabel}># Players</DefaultText>
            <DefaultText style={styles.statusLabel}>Status</DefaultText>
          </View>
          {Object.entries(games).map(([gameId, game]) => {
            return <GameRow key={gameId} game={game} />;
          })}
        </ScrollView>
      )}

      <Animatable.View
        style={{ position: "absolute", right: 20, bottom: 20 }}
        animation={"slideInRight"}
      >
        <CustomActionButton style={styles.primaryButton} onPress={deleteGameData}>
          <Text style={styles.primaryButtonText}>Delete Game Data</Text>
        </CustomActionButton>

        <CustomActionButton
          style={styles.primaryButton}
          onPress={() => {
            props.navigation.navigate("CreateGame");
          }}
        >
          <Text style={styles.primaryButtonText}>Create Game</Text>
        </CustomActionButton>
      </Animatable.View>
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
  primaryButton: {
    backgroundColor: Defaults.button.primary,
  },
  primaryButtonText: {
    color: "white",
    fontSize: Defaults.fontSize,
  },
  headerContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    padding: 5,
  },
  gameLabel: {
    fontSize: Defaults.fontSize,
    width: "40%",
    fontFamily: "open-sans-bold",
  },
  playersLabel: {
    fontSize: Defaults.fontSize,
    width: "20%",
    textAlign: "center",
    fontFamily: "open-sans-bold",
  },
  statusLabel: {
    fontSize: Defaults.fontSize,
    width: "30%",
    textAlign: "right",
    fontFamily: "open-sans-bold",
  },
});

export default MyGamesScreen;
