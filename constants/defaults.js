import { Dimensions } from "react-native";
import Colors from "./colors";

const smallScreenWidth = 340;
const windowWidth = Math.floor(Dimensions.get("window").width);
const windowHeight = Math.floor(Dimensions.get("window").height);
const isSmallScreen = windowWidth < smallScreenWidth ? true : false;

export default {
  windowWidth,
  windowHeight,
  smallScreenWidth,
  isSmallScreen,
  smallFontSize: isSmallScreen ? 8 : 12,
  fontSize: isSmallScreen ? 12 : 16,
  largeFontSize: isSmallScreen ? 16 : 20,
  extraLargeFontSize: isSmallScreen ? 22 : 28,
  emphasis: { fontWeight: "bold" },
  button: {
    primary: Colors.theme.dark1,
    secondary: Colors.theme.main1,
    cancel: Colors.theme.grey5,
    info: Colors.theme.main2,
    light: Colors.theme.grey2,
    dark: Colors.theme.grey7,
  },
  scoreScreen: {
    widths: {
      playerName: 30,
      bidButton: 9,
      baseScore: 12,
      bonusIndicators: 7,
      bonusScore: 31,
      roundScore: 11,
    },
  },
  bonusScreen: {
    rowVerticalPadding: 8,
  },
  game: {
    rowHeight: 45,
    playerRowHeight: 40,
    playerMinWidth: 80,
    roundNumWidth: 35,
    roundPlayerDetailWidth: 90,
    bonusScoreDefaults: {
      alliance1: 20,
      alliance2: 20,
      wager: [0, 10, 20],
      normal14s: 10,
      black14: 20,
      pirates: 30,
      skullKing: 50,
    },
  },
  setBids: {
    rowHeight: 50,
  },
};
