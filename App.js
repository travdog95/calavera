import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading"; //Prolong loading screen until whatever you want load is loaded
import * as Font from "expo-font"; //should be installed by default, but run expo install expo-font to be sure
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import { DrawNavigator } from "./navigation/DrawerNavigator";
import { AppTabNavigator } from "./navigation/TabNavigator";
import gameReducer from "./store/reducers/game-reducer";
import settingsReducer from "./store/reducers/settings-reducer";

enableScreens(); //ensure react-native uses native underlying screen components. Should be called before you render your first screen

const rootReducer = combineReducers({
  game: gameReducer,
  settings: settingsReducer,
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

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
      <SafeAreaView style={styles.screen}>
        <NavigationContainer>
          <AppTabNavigator />
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //backgroundColor: Platform.OS === "ios" ? "white" : Colors.theme.dark4,
    backgroundColor: "white",
  },
});
