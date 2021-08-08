export const CREATE_GAME = "CREATE_GAME";
export const UPDATE_PLAYER_DETAIL = "UPDATE_PLAYER_DETAIL";
export const SET_SCORING_ROUND = "SET_SCORING_ROUND";
export const SET_SELECTED_ROUND = "SET_SELECTED_ROUND";
export const SAVE_PLAYER_NAME = "SAVE_PLAYER_NAME";
export const UPDATE_ROUND_BONUSES = "UPDATE_ROUND_BONUSES";
export const UPDATE_TOTAL_SCORES = "UPDATE_TOTAL_SCORES";
export const COMPLETE_CURRENT_GAME = "COMPLETE_CURRENT_GAME";
export const LOAD_GAMES = "LOAD_GAMES";
export const DELETE_GAMES = "DELETE_GAMES";
export const DELETE_GAME = "DELETE_GAME";
export const SET_CURRENT_GAME = "SET_CURRENT_GAME";
export const SET_IS_LAST_ROUND_SCORED = "SET_IS_LAST_ROUND_SCORED";
export const UPDATE_NUM_CARDS_BY_ROUND = "UPDATE_NUM_CARDS_BY_ROUND";

import { insertGame, fetchGames, deleteGameData, deleteGameFromDB } from "../../helpers/db";

export const createGame = (
  players,
  numRounds,
  selectedRound,
  scoringRound,
  roundData,
  date,
  isActive,
  gameType,
  scoringType,
  isLastRoundScored,
  numCardsByRound
) => {
  return async (dispatch) => {
    try {
      //Save to SQLite database
      const dbResult = await insertGame({
        players,
        numRounds,
        selectedRound,
        scoringRound,
        roundData,
        date,
        isActive,
        gameType,
        scoringType,
        isLastRoundScored,
        numCardsByRound,
      });

      //then dispatch reducer
      dispatch({
        type: CREATE_GAME,
        gameData: {
          id: dbResult.insertId,
          players,
          numRounds,
          selectedRound,
          scoringRound,
          roundData,
          date,
          isActive,
          gameType,
          scoringType,
          isLastRoundScored,
          numCardsByRound,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const setScoringRound = (scoringRound) => {
  return { type: SET_SCORING_ROUND, scoringRound };
};

export const setSelectedRound = (selectedRound) => {
  return { type: SET_SELECTED_ROUND, selectedRound };
};

export const setIsLastRoundScored = (isLastRoundScored) => {
  return { type: SET_IS_LAST_ROUND_SCORED, isLastRoundScored };
};

export const savePlayerName = (playerId, playerName) => {
  return { type: SAVE_PLAYER_NAME, playerId, playerName };
};

export const updateRoundBonuses = (round, playerId, bonusData) => {
  return { type: UPDATE_ROUND_BONUSES, round, playerId, bonusData };
};

export const updatePlayerDetail = (round, playerId, playerDetail) => {
  return { type: UPDATE_PLAYER_DETAIL, round, playerId, playerDetail };
};

export const updateTotalScores = (round) => {
  return { type: UPDATE_TOTAL_SCORES, round };
};

export const completeCurrentGame = (winner) => {
  return { type: COMPLETE_CURRENT_GAME, winner };
};

export const loadGames = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchGames();
      dispatch({ type: LOAD_GAMES, games: dbResult.rows._array });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const deleteGames = () => {
  return async (dispatch) => {
    try {
      const dbResult = await deleteGameData();
      dispatch({ type: LOAD_GAMES, games: [] });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const deleteGame = (gameId) => {
  return async (dispatch) => {
    try {
      const dbResult = await deleteGameFromDB(gameId);
      dispatch(loadGames());
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const setCurrentGame = (game) => {
  return { type: SET_CURRENT_GAME, game };
};

export const updateNumCardsByRound = (round, numCards) => {
  return { type: UPDATE_NUM_CARDS_BY_ROUND, round, numCards };
};
