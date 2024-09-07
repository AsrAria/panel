// MARK: project imports
import { check_access } from "helper/adminHelper.js";

// MARK: functions

function admin(state = [], action) {
  switch (action.type) {
    case "SET_NAME":
      return Object.assign({}, state, { name: action.payload });
    case "SET_EMAIL":
      return Object.assign({}, state, { email: action.payload });
    case "SET_USERNAME":
      return Object.assign({}, state, { username: action.payload });
    case "SET_SECRET_KEY":
      return Object.assign({}, state, { secretKey: action.payload });
    case "SET_PERMISSIONS":
      return Object.assign({}, state, {
        permissions: action.payload,
        hasReadPermission: (permission_name, sub_permission_name) => {
          return check_access(
            action.payload,
            permission_name,
            sub_permission_name,
            1
          );
        },
        hasWritePermission: (permission_name, sub_permission_name) => {
          return check_access(
            action.payload,
            permission_name,
            sub_permission_name,
            2
          );
        }
      });
    case "SET_ACTIVATE_TTL":
      return Object.assign({}, state, { activateTTL: action.payload });
    default:
      return state;
  }
}

export default admin;
