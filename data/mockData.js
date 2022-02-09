import MenuItem from "../models/menuItem";
import Player from "../models/player";
import Message from "../models/message";
import RoundPlayerDetail from "../models/roundPlayerDetail";

export const PLAYERS = [
  new Player("p1", "TravDog"),
  new Player("p2", "Kimmo"),
  new Player("p3", "Dave"),
  new Player("p4", "Risa"),
  // new Player("p5", "Sabrina"),
  // new Player("p6", "Doug"),
  // new Player("p7", "Whit"),
  // new Player("p8", "CJ"),
  // new Player("p9", "Lando"),
  // new Player("p10", "Bailey"),
  // new Player("p11", "Morgan"),
  // new Player("p12", "Mylee"),
];

export const MENUITEMS = [
  new MenuItem("1", "Messages", "chatbubbles-outline", "chatbubbles", "Ionicons"),
  new MenuItem("6", "Audio", "audiotrack", "audiotrack", "MaterialIcons"),
  new MenuItem("2", "Friends", "people-outline", "people", "Ionicons"),
  new MenuItem("3", "Games", "cards-outline", "cards", "MaterialCommunityIcons"),
  new MenuItem("4", "Standings", "list-outline", "list", "Ionicons"),
  new MenuItem("5", "Profile", "person-circle-outline", "person-circle", "Ionicons"),
  new MenuItem("7", "Settings", "settings-outline", "settings", "Ionicons"),
];

export const RPD = [
  new RoundPlayerDetail(1, 1, 1, 50, 2),
  new RoundPlayerDetail(1, 1, 2, 20, 0),
  new RoundPlayerDetail(1, 1, 3, -30, 0),
  new RoundPlayerDetail(1, 1, 4, 20, 1),
  new RoundPlayerDetail(1, 2, 1, 10, 0),
  new RoundPlayerDetail(1, 2, 2, 20, 0),
  new RoundPlayerDetail(1, 2, 3, -30, 0),
  new RoundPlayerDetail(1, 2, 4, -40, 0),
  new RoundPlayerDetail(1, 3, 1, -10, 0),
  new RoundPlayerDetail(1, 3, 2, 20, 0),
  new RoundPlayerDetail(1, 3, 3, 60, 2),
  new RoundPlayerDetail(1, 3, 4, 40, 2),
  new RoundPlayerDetail(1, 1, 1, 30, 1),
  new RoundPlayerDetail(1, 1, 2, -10, 1),
  new RoundPlayerDetail(1, 1, 3, -30, 0),
  new RoundPlayerDetail(1, 1, 4, 120, 3),
];

export const MESSAGES = [];
