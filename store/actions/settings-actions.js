export const UPDATE_SETTINGS = "UPDATE_SETTINGS";
export const LOAD_SETTINGS = "LOAD_SETTINGS";

import { fetchAll, dropTable, insertJSON } from "../../helpers/db";
import Defaults from "../../constants/defaults";

export const updateSettings = (id, settings) => {
  return { type: UPDATE_SETTINGS, id, settings };
};

export const loadSettings = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchAll("settings");
      let id = 0;
      let settingsData;

      if (dbResult.rows._array.length == 0) {
        //Load defaults
        const defaultPlayerNames = [];
        let i = 0;
        for (i; i < Defaults.game.numPlayers; i++) {
          defaultPlayerNames.push("");
        }

        let newSettings = {
          playerNames: defaultPlayerNames,
          numPlayers: Defaults.game.numPlayers,
          numRounds: Defaults.game.numRounds,
          scoringType: Defaults.game.scoringType,
        };

        //Insert into settings table
        const insertDbResult = await insertJSON("settings", "data", newSettings);
        id = insertDbResult.insertId;
        settingsData = newSettings;

        console.log("insert settings");
      } else {
        id = dbResult.rows._array[0].id;
        settingsData = JSON.parse(dbResult.rows._array[0].data);
        console.log("get settings");
      }

      dispatch({ type: LOAD_SETTINGS, settings: settingsData, id });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const deleteSettings = () => {
  return async (dispatch) => {
    try {
      const dbResult = await dropTable("settings");
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
