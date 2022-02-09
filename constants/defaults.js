import { Dimensions } from "react-native";
import Colors from "./colors";
import Constants from "./constants";

const smallScreenWidth = 340;
const windowWidth = Math.floor(Dimensions.get("window").width);
const windowHeight = Math.floor(Dimensions.get("window").height);
const isSmallScreen = windowWidth < smallScreenWidth ? true : false;

export default {
  windowWidth,
  windowHeight,
  smallScreenWidth,
  isSmallScreen,
  fontFamily: {
    regular: "fira-sans",
    bold: "fira-sans-bold",
    light: "fira-sans-light",
  },
  extraSmallFontSize: isSmallScreen ? 8 : 12,
  smallFontSize: isSmallScreen ? 10 : 14,
  fontSize: isSmallScreen ? 12 : 16,
  mediumFontSize: isSmallScreen ? 14 : 18,
  largeFontSize: isSmallScreen ? 16 : 20,
  extraLargeFontSize: isSmallScreen ? 20 : 24,
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
      rascal: {
        bidContainer: "20%",
        scoreContainer: "45%",
        bonusContainer: "35%",
      },
      classic: {
        bidContainer: "25%",
        scoreContainer: "40%",
        bonusContainer: "35%",
      },
    },
  },
  bonusScreen: {
    rowVerticalPadding: 8,
  },
  myGamesScreen: {
    widths: {
      description: "45%",
      players: "20%",
      status: "35%",
    },
  },
  game: {
    rowHeight: 45,
    playerRowHeight: 40,
    playerMinWidth: 85,
    roundNumWidth: 60,
    roundPlayerDetailWidth: 90,
    bonusScoreDefaults: {
      alliance1: 20,
      alliance2: 20,
      wager: null,
      normal14s: 10,
      black14: 20,
      pirates: 30,
      skullKing: 50,
    },
    wagerPirateValues: [0, 10, 20],
    numRounds: 10,
    numPlayers: 4,
    scoringType: Constants.scoringType.classic,
  },
  leaderboardScreen: {
    widths: {
      rank: "18%",
      player: "67%",
      score: "15%",
    },
  },
  setBids: {
    rowHeight: 50,
  },
};
