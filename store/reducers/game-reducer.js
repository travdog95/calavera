import { INIT_GAME, UPDATE_PLAYER_DATA, SET_CURRENT_ROUND } from "../actions/game-actions";

//initialize state
const initialState = {
  games: [],
  // currentGame: {
  //   players: [],
  //   numRounds: 0,
  //   gameData: [],
  //   currentRound: 0,
  //   date: "",
  // },
  players: [],
  numRounds: 0,
  gameData: [],
  currentRound: 0,
  date: "",
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_GAME:
      const newGames = state.games.some((game) => game.id === action.game.id)
        ? state.games
        : state.games.concat(action.game);

      return {
        ...state,
        players: action.game.players,
        numRounds: action.game.numRounds,
        gameData: action.game.gameData,
        currentRound: action.game.currentRound,
        date: action.game.date,
        games: newGames,
      };
    case UPDATE_PLAYER_DATA:
      const newGameData = [];
      const gameData = state.gameData;
      const newPlayerDetails = action.playerData;
      const roundToUpdate = action.roundToUpdate;

      gameData.forEach((roundPlayerDetails) => {
        //Check to see if round matches round to score
        const newRoundPlayerDetails = [];

        //Find the applicable round
        if (parseInt(roundPlayerDetails[0].round) === parseInt(roundToUpdate)) {
          //Iterate over existing round player details in game data to find correct data to update
          roundPlayerDetails.forEach((roundPlayerDetail) => {
            //Get the matching player detail data
            const newPlayerDetail = newPlayerDetails.find(
              (item) => item.playerId === roundPlayerDetail.playerId
            );

            //Update score, if passed in from action
            if (newPlayerDetail.score !== undefined) {
              roundPlayerDetail.score = newPlayerDetail.score;
            }

            //Update bid, if passed in from action
            if (newPlayerDetail.bid !== undefined) {
              roundPlayerDetail.bid = newPlayerDetail.bid;
            }

            newRoundPlayerDetails.push(roundPlayerDetail);
          });
          newGameData.push(newRoundPlayerDetails);
        } else {
          newGameData.push(roundPlayerDetails);
        }
      });

      return { ...state, gameData: newGameData };
    case SET_CURRENT_ROUND:
      return { ...state, currentRound: action.currentRound };
    default:
      break;
  }
  return state;
};

export default gameReducer;
