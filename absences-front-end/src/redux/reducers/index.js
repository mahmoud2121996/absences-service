import { combineReducers } from "redux";

import absencesReducer from "../reducers/absences-reducer";

const rootReducer = combineReducers({
    absences: absencesReducer,
});

export default rootReducer;
