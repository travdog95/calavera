import { Dimensions } from "react-native";
import Colors from "./colors";

const smallScreenWidth = 340;
const windowWidth = Math.floor(Dimensions.get("window").width);
const windowHeight = Math.floor(Dimensions.get("window").height);

export default {
  windowWidth,
  windowHeight,
  smallScreenWidth,
  fontSize: windowWidth < smallScreenWidth ? 12 : 16,
  largeFontSize: windowWidth < smallScreenWidth ? 16 : 20,
  extraLargeFontSize: windowWidth < smallScreenWidth ? 22 : 28,
  button: {
    primary: Colors.theme.dark1,
    secondary: Colors.theme.main1,
    cancel: Colors.theme.grey5,
    info: Colors.theme.main2,
    light: Colors.theme.grey2,
    dark: Colors.theme.grey7,
  },
  game: {
    rowHeight: 45,
    playerRowHeight: 40,
    playerMinWidth: 80,
    roundNumWidth: 35,
    roundPlayerDetailWidth: 90,
    bonusOptions: [
      {
        id: "alliance",
        name: "Alliance",
        value: 20,
      },
      {
        id: "wager10",
        name: "Wager 10",
        value: 10,
      },
      {
        id: "wager20",
        name: "Wager 20",
        value: 20,
      },
    ],
  },
  setBids: {
    rowHeight: 50,
  },
};
