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
    case actions.SET_SCORING_ROUND:
      return {
        ...state,
        currentGame: { ...state.currentGame, scoringRound: action.scoringRound },
      };
    case actions.SET_SELECTED_ROUND:
      return {
        ...state,
        currentGame: { ...state.currentGame, selectedRound: action.selectedRound },
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
    case actions.UPDATE_ROUND_BONUSES:
      const round = action.round;

      const newRoundBonusDetail = { ...state.currentGame.roundBonusesDetail };
      newRoundBonusDetail[`r${round}`].playersBonusDetail[action.playerId] = action.bonusData;
      return {
        ...state,
        currentGame: { ...state.currentGame, roundBonusesDetail: newRoundBonusDetail },
      };
    case actions.UPDATE_PLAYER_DETAIL:
      const roundKey = `r${action.round}`;

      const newRoundData = { ...state.currentGame.roundData };

      //Merge playerDetail
      const newPlayerData = { ...newRoundData[roundKey][action.playerId], ...action.playerDetail };

      //Add new playerDetail to new roundData object
      newRoundData[roundKey][action.playerId] = newPlayerData;

      return { ...state, currentGame: { ...state.currentGame, roundData: newRoundData } };
    case actions.UPDATE_TOTAL_SCORES:
      const totalScoresRoundData = { ...state.currentGame.roundData };

      const firstPlayer = state.currentGame.players[0];

      //Iterate over each round
      for (const [roundKey, roundDetail] of Object.entries(state.currentGame.roundData)) {
        const round = parseInt(roundKey.substring(1));
        let prevTotalScore = 0;
        let totalScore = 0;
        let prevRoundKey = "";

        //Only score rounds that have been played
        if (roundDetail[firstPlayer.id].baseScore > 0) {
          //Iterate over each player
          for (const [playerId, playerDetail] of Object.entries(roundDetail)) {
            const newPlayerDetail = {};
            const totalScoresPlayerDetail = {};

            //Calculate total scores
            totalScore = playerDetail.baseScore + playerDetail.bonusScore;
            if (round === 1) {
              totalScoresPlayerDetail = { totalScore };
            } else {
              prevRoundKey = `r${round - 1}`;
              prevTotalScore = totalScoresRoundData[prevRoundKey][playerId].totalScore;
              totalScoresPlayerDetail = {
                totalScore: prevTotalScore + totalScore,
              };
            }

            //Merge total score with the rest of the playerDetail object
            newPlayerDetail = {
              ...totalScoresRoundData[roundKey][playerId],
              ...totalScoresPlayerDetail,
            };

            //Update roundData object with new playerDetail
            totalScoresRoundData[roundKey][playerId] = newPlayerDetail;
          }
        }
      }

      return { ...state, currentGame: { ...state.currentGame, roundData: totalScoresRoundData } };
    case actions.COMPLETE_CURRENT_GAME:
      const winner = action.winner;
      //Create new game
      const newGame = { ...state.currentGame };

      //Update winner and isActive
      newGame.winner = winner;
      newGame.isActive = false;

      return {
        ...state,
        currentGame: newGame,
      };
    default:
      return state;
  }
};

export default gameReducer;
