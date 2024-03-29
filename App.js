import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading"; //Prolong loading screen until whatever you want load is loaded
import * as Font from "expo-font"; //should be installed by default, but run expo install expo-font to be sure
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { ModalProvider } from "react-native-use-modal";

import { DrawNavigator } from "./navigation/DrawerNavigator";
import { AppTabNavigator } from "./navigation/TabNavigator";
import gameReducer from "./store/reducers/game-reducer";
import settingsReducer from "./store/reducers/settings-reducer";
import { initGames, initSettings } from "./helpers/db";

const initGamesTablePromise = initGames();
const initSettingsTablePromise = initSettings();

Promise.all([initGamesTablePromise, initSettingsTablePromise])
  .then((values) => {
    console.log(values);
  })
  .catch((error) => {
    console.error(error.message);
  });

enableScreens(); //ensure react-native uses native underlying screen components. Should be called before you render your first screen

const rootReducer = combineReducers({
  game: gameReducer,
  settings: settingsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "fira-sans": require("./assets/fonts/FiraSans-Regular.ttf"),
    "fira-sans-bold": require("./assets/fonts/FiraSans-Bold.ttf"),
    "fira-sans-light": require("./assets/fonts/FiraSans-Light.ttf"),
  });
};

//If settings don't exist in db, load from defaults.js

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ModalProvider>
        <SafeAreaView style={styles.screen}>
          <NavigationContainer>
            <AppTabNavigator />
          </NavigationContainer>
          <StatusBar style="auto" />
        </SafeAreaView>
      </ModalProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
