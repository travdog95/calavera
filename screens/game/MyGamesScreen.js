import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import CustomActionButton from "../../components/CustomActionButton";
import HeaderButton from "../../components/UI/HeaderButton";

import Colors from "../../constants/colors";

const MyGamesScreen = (props) => {
  const games = useSelector((state) => state.game.games);

  return (
    <View style={styles.screen}>
      {games.length === 0 ? (
        <Text>No games! You should create one and start playing!</Text>
      ) : (
        <ScrollView>
          {games.map((game, index) => {
            return (
              <View key={game.id}>
                <Text>{game.date}</Text>
              </View>
            );
          })}
        </ScrollView>
      )}

      <Animatable.View
        style={{ position: "absolute", right: 20, bottom: 20 }}
        animation={"slideInRight"}
      >
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
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
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
  },
  primaryButton: {
    backgroundColor: Colors.theme.main1,
    borderRadius: 10,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default MyGamesScreen;
