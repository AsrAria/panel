// MARK: library imports
import thunk from "redux-thunk";
import logger from "redux-logger";
import { applyMiddleware, createStore } from "redux";
// project imports
import config from "./config.js";
import rootReducer from "./reducers/index";
import { check_access } from "helper/adminHelper.js";
import { getString, putString, getObject } from "helper/storageHelper.js";

// MARK: default state

putString("version", "2");

const defaultState = {
  app: {
    loading: 0
  },
  admin: {
    name: getString("name"),
    email: getString("email"),
    username: getString("username"),
    permissions: getObject("permissions"),
    secretKey: getString("secretKey"),
    activateTTL: new Date(getObject("activateTTL")),
    hasReadPermission: (permissionName, subPermissionName) => {
      return check_access(
        defaultState.admin.permissions,
        permissionName,
        subPermissionName,
        1
      );
    },
    hasWritePermission: (permissionName, subPermissionName) => {
      return check_access(
        defaultState.admin.permissions,
        permissionName,
        subPermissionName,
        2
      );
    }
  }
};

// MARK:  apply middle wares

let middleware = {};
middleware = applyMiddleware(thunk);
if (config.debug.reduxLogger && process.env.NODE_ENV !== "production")
  middleware = applyMiddleware(thunk, logger);

// MARK: export

const store = createStore(rootReducer, defaultState, middleware);
export default store;
