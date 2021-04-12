import * as actions from "../actions/settings-actions";

//initialize state
const initialState = {
  useSimplifiedScoring: false,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_SETTINGS:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default settingsReducer;
