import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import CustomActionButton from "../../components/CustomActionButton";

import Colors from "../../constants/colors";
import Defaults from "../../constants/defaults";

import { PLAYERS } from "../../data/mockData";

const AddPlayersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [players, setPlayers] = useState(PLAYERS);
  const [numRounds, setNumRounds] = useState(10);

  const windowWidth = Math.floor(Dimensions.get("window").width);
  const windowHeight = Dimensions.get("window").height;

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title="Try again" onPress={loadProducts} color={Colors.theme.main3} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.theme.main3} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView>
        <Text>Add Players</Text>
      </ScrollView>

      <Animatable.View
        style={{ position: "absolute", right: 20, bottom: 20 }}
        animation={"slideInRight"}
      >
        <CustomActionButton
          style={styles.primaryButton}
          onPress={() => {
            props.navigation.navigate("Game", {
              round: 1,
              players: players,
            });
          }}
        >
          <Text style={styles.primaryButtonText}>Start Game</Text>
        </CustomActionButton>
      </Animatable.View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Create Game - Add Players",
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
  screen: { flex: 1 },
  roundsContainer: {
    flexDirection: "row",
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

export default AddPlayersScreen;
