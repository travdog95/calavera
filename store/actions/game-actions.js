export const INIT_GAME = "INIT_GAME";
export const UPDATE_PLAYER_DETAIL = "UPDATE_PLAYER_DETAIL";
export const SET_SCORING_ROUND = "SET_SCORING_ROUND";
export const SET_SELECTED_ROUND = "SET_SELECTED_ROUND";
export const SAVE_PLAYER_NAME = "SAVE_PLAYER_NAME";
export const UPDATE_ROUND_BONUSES = "UPDATE_ROUND_BONUSES";
export const UPDATE_TOTAL_SCORES = "UPDATE_TOTAL_SCORES";
export const COMPLETE_CURRENT_GAME = "COMPLETE_CURRENT_GAME";

export const initGame = (game) => {
  return { type: INIT_GAME, game };
};

export const setScoringRound = (scoringRound) => {
  return { type: SET_SCORING_ROUND, scoringRound };
};

export const setSelectedRound = (selectedRound) => {
  return { type: SET_SELECTED_ROUND, selectedRound };
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
