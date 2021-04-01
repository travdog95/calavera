export const INIT_GAME = "INIT_GAME";
export const UPDATE_PLAYER_DATA = "UPDATE_PLAYER_DATA";
export const SET_CURRENT_ROUND = "SET_CURRENT_ROUND";
export const SAVE_PLAYER_NAME = "SAVE_PLAYER_NAME";
export const UPDATE_ROUND_BONUSES = "UPDATE_ROUND_BONUSES";

export const initGame = (game) => {
  return { type: INIT_GAME, game };
};

export const updatePlayerData = (roundToUpdate, playerData, methodType) => {
  return { type: UPDATE_PLAYER_DATA, roundToUpdate, playerData, methodType };
};

export const setCurrentRound = (currentRound) => {
  return { type: SET_CURRENT_ROUND, currentRound };
};

export const savePlayerName = (playerId, playerName) => {
  return { type: SAVE_PLAYER_NAME, playerId, playerName };
};

export const updateRoundBonuses = (round, bonusData) => {
  return { type: UPDATE_ROUND_BONUSES, round, bonusData };
};
