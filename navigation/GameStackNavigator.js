import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MyGamesScreen, {
  screenOptions as myGamesScreenOptions,
} from "../screens/game/MyGamesScreen";
import CreateGameScreen, {
  screenOptions as createGameScreenOptions,
} from "../screens/game/CreateGameScreen";
import ConfirmNewGameScreen, {
  screenOptions as confirmNewGameScreenOptions,
} from "../screens/game/ConfirmNewGameScreen";
import AddPlayersScreen, {
  screenOptions as addPlayersScreenOptions,
} from "../screens/game/AddPlayersScreen";
import GameScreen, { screenOptions as gameScreenOptions } from "../screens/game/GameScreen";
import BidsScreen, { screenOptions as bidsScreenOptions } from "../screens/game/BidsScreen";
import ScoresScreen, { screenOptions as scoresScreenOptions } from "../screens/game/ScoresScreen";
import EditPlayerNamesScreen, {
  screenOptions as editPlayerNamesScreenOptions,
} from "../screens/game/EditPlayerNamesScreen";
import AddBonusScreen, {
  screenOptions as addBonusScreenOptions,
} from "../screens/game/AddBonusScreen";

import SettingsScreen, { screenOptions as settingsScreenOptions } from "../screens/SettingsScreen";

import Colors from "../constants/colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.theme.dark4 : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.theme.dark4,
};

const GameStackNavigator = createStackNavigator();

export const GameNavigator = (props) => {
  return (
    <GameStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <GameStackNavigator.Screen
        name="MyGames"
        component={MyGamesScreen}
        options={myGamesScreenOptions}
      />

      <GameStackNavigator.Screen
        name="CreateGame"
        component={CreateGameScreen}
        options={createGameScreenOptions}
      />
      <GameStackNavigator.Screen
        name="ConfirmNewGame"
        component={ConfirmNewGameScreen}
        options={confirmNewGameScreenOptions}
      />

      <GameStackNavigator.Screen
        name="AddPlayers"
        component={AddPlayersScreen}
        options={addPlayersScreenOptions}
      />
      <GameStackNavigator.Screen name="Game" component={GameScreen} options={gameScreenOptions} />
      <GameStackNavigator.Screen name="Bids" component={BidsScreen} options={bidsScreenOptions} />
      <GameStackNavigator.Screen
        name="Scores"
        component={ScoresScreen}
        options={scoresScreenOptions}
      />
      <GameStackNavigator.Screen
        name="EditPlayerNames"
        component={EditPlayerNamesScreen}
        options={editPlayerNamesScreenOptions}
      />
      <GameStackNavigator.Screen
        name="AddBonus"
        component={AddBonusScreen}
        options={addBonusScreenOptions}
      />
    </GameStackNavigator.Navigator>
  );
};

const SettingsStackNavigator = createStackNavigator();

export const SettingsNavigator = (props) => {
  return (
    <SettingsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <SettingsStackNavigator.Screen
        name="Settings"
        component={SettingsScreen}
        options={settingsScreenOptions}
      />
    </SettingsStackNavigator.Navigator>
  );
};
