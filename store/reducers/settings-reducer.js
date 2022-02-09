import _ from "lodash";

import * as actions from "../actions/settings-actions";
import { updateTable } from "../../helpers/db";

//initialize state
const initialState = {
  useSimplifiedScoring: true,
  playerNames: [],
  numPlayers: 0,
  numRounds: 0,
  scoringType: "",
  id: 0,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_SETTINGS:
      //combine updateSettings with current state
      const updatedSettings = { ...state, ...action.settings };

      // remove id property before updating db
      delete updatedSettings.id;

      updateTable("settings", action.id, "data", updatedSettings)
        .then((dbResult) => {
          if (dbResult.rowsAffected !== 1) console.log("error saving game");
        })
        .catch((err) => console.log(err));

      return {
        ...state,
        ...action.settings,
      };
    case actions.LOAD_SETTINGS:
      const newSettings = action.settings;
      const id = action.id;
      return { ...state, ...newSettings, ...{ id: id } };
    default:
      return state;
  }
};

export default settingsReducer;
