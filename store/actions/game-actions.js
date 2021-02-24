export const INIT_GAME = "INIT_GAME";
export const UPDATE_PLAYER_DATA = "UPDATE_PLAYER_DATA";
export const SET_CURRENT_ROUND = "SET_CURRENT_ROUND";

export const initGame = (game) => {
  return { type: INIT_GAME, game };
};

export const updatePlayerData = (game, roundToUpdate, playerData) => {
  return { type: UPDATE_PLAYER_DATA, game, roundToUpdate, playerData };
};

export const setCurrentRound = (currentRound) => {
  return { type: SET_CURRENT_ROUND, currentRound };
};
