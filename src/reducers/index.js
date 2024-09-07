// MARK: imports
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import app from "reducers/app";
import admin from "reducers/admin";

const rootReducers = combineReducers({
  app,
  admin,
  routerReducer
});
export default rootReducers;
