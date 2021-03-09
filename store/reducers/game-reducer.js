import * as actions from "../actions/game-actions";

//initialize state
const initialState = {
  games: [],
  currentGame: {},
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.INIT_GAME:
      const newGames = state.games.some((game) => game.id === action.game.id)
        ? state.games
        : state.games.concat(action.game);

      return {
        ...state,
        currentGame: action.game,
        games: newGames,
      };
    case actions.UPDATE_PLAYER_DATA:
      const newGameData = [];
      const gameData = state.currentGame.gameData;
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
            if (action.methodType === "scores") {
              roundPlayerDetail.score = newPlayerDetail.score;

              //Calculate totalScore
              if (state.currentGame.currentRound === 1) {
                roundPlayerDetail.totalScore = roundPlayerDetail.score;
              } else {
                newGameData.forEach((rpd) => {
                  const prevRPD = rpd.find((item) => item.playerId === roundPlayerDetail.playerId);

                  roundPlayerDetail.totalScore =
                    parseInt(roundPlayerDetail.score) + parseInt(prevRPD.totalScore);
                });
              }
            }

            //Update bid, if passed in from action
            if (action.methodType === "bids") {
              roundPlayerDetail.bid = newPlayerDetail.bid;
            }

            if (action.methodType === "bonuses" && newPlayerDetail !== undefined) {
              //update pointsWagered
              if (newPlayerDetail.pointsWagered !== undefined) {
                roundPlayerDetail.pointsWagered = newPlayerDetail.pointsWagered;
              }

              //update isAligned1
              if (newPlayerDetail.isAligned1 !== undefined) {
                roundPlayerDetail.isAligned1 = newPlayerDetail.isAligned1;
              }

              //update isAligned2
              if (newPlayerDetail.isAligned2 !== undefined) {
                roundPlayerDetail.isAligned2 = newPlayerDetail.isAligned2;
              }
            }

            newRoundPlayerDetails.push(roundPlayerDetail);
          });
          newGameData.push(newRoundPlayerDetails);
        } else {
          newGameData.push(roundPlayerDetails);
        }
      });

      return { ...state, currentGame: { ...state.currentGame, gameData: newGameData } };
    case actions.SET_CURRENT_ROUND:
      return {
        ...state,
        currentGame: { ...state.currentGame, currentRound: action.currentRound },
      };
    case actions.SAVE_PLAYER_NAME:
      const newPlayers = [];
      const playerId = action.playerId;
      const playerName = action.playerName;

      state.currentGame.players.forEach((player) => {
        const newPlayer = {
          id: player.id,
          name: player.id === playerId ? playerName : player.name,
        };
        newPlayers.push(newPlayer);
      });

      return {
        ...state,
        currentGame: { ...state.currentGame, players: newPlayers },
      };
    default:
      return state;
  }
};

export default gameReducer;
