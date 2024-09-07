// MARK: imports
import store from "store";
import { toast } from "react-toastify";
import { redirectTo } from "helper/redirectHelper";
import { putRequest, postRequest } from "helper/restHelper.js";
import {
  putObject,
  putString,
  removeObject,
  removeString
} from "helper/storageHelper.js";

// MARK: api

export const BASE_URL = "/admin";

export const AUTHENTICATE_URL = BASE_URL + "/authenticate";

export const login = (username, password) => {
  return function() {
    postRequest(
      AUTHENTICATE_URL,
      {
        username: username,
        password: password
      },
      response => {
        saveUsername(response.data);
        toast.success("An activation code has been sent to you.");
      },
      () => {},
      false,
      true,
      {
        enable: true,
        400: "Username is incorrect.",
        401: "Wrong password.",
        404: "Username is incorrect."
      }
    );
  };
};

export const ACTIVATE_URL = BASE_URL + "/activate";

export const activate = (username, code) => {
  return function() {
    postRequest(
      ACTIVATE_URL,
      {
        username: username,
        code: code
      },
      response => {
        saveAuthenticateInfo(response.data);
      },
      () => {},
      false,
      true,
      {
        enable: true,
        400: "The activation code entered is incorrect.",
        401: "The activation code entered is incorrect.",
        404: "Username is incorrect."
      }
    );
  };
};

export const UPDATE_PROFILE_URL = BASE_URL + "/profile";

export const updateProfile = (name, email) => {
  return function() {
    putRequest(
      UPDATE_PROFILE_URL,
      {
        name: name,
        email: email
      },
      response => {
        setAdminInfo(response.data);
        toast.success("Your account information was successfully updated.");
      },
      () => {},
      true,
      true,
      {
        enable: true,
        400: "The email you entered is incorrect."
      },
      false
    );
  };
};

export const CHANGE_PASSWORD_URL = BASE_URL + "/password";

export const changePassword = (oldPassword, newPassword) => {
  return function() {
    putRequest(
      CHANGE_PASSWORD_URL,
      {
        old_password: oldPassword,
        new_password: newPassword
      },
      () => {
        toast.success("Password changed successfully.");
        redirectTo("/");
      },
      () => {},
      true,
      true,
      {
        enable: true,
        400: "The password must be more than 8 characters long and consist of numbers or uppercase and lowercase English letters.",
        401: "Wrong password."
      },
      false
    );
  };
};

export const logout = () => {
  return function() {
    localStorage.clear();
    deleteAuthenticateInfo();
    redirectTo("/login");
  };
};

// MARK: storage handler

export const savePermissions = data => {
  return function() {
    putObject("permissions", data);
    store.dispatch({ type: "SET_PERMISSIONS", payload: data });
  };
};

const saveUsername = data => {
  var activateTTL = new Date(new Date().getTime() + data.activate_ttl * 1000);

  putString("username", data.username);
  putObject("activateTTL", activateTTL.getTime());

  store.dispatch({ type: "SET_USERNAME", payload: data.username });
  store.dispatch({
    type: "SET_ACTIVATE_TTL",
    payload: activateTTL
  });
};

const setAdminInfo = admin => {
  putString("name", admin.name);
  putString("email", admin.email);
  putString("username", admin.username);
  putObject("permissions", admin.permissions);

  store.dispatch({ type: "SET_NAME", payload: admin.name });
  store.dispatch({ type: "SET_EMAIL", payload: admin.email });
  store.dispatch({ type: "SET_USERNAME", payload: admin.username });
  store.dispatch({ type: "SET_PERMISSIONS", payload: admin.permissions });
};

export const deleteAdminInfo = () => {
  removeString("name");
  removeString("email");
  removeString("username");
  removeObject("permissions");

  store.dispatch({ type: "SET_NAME", payload: "" });
  store.dispatch({ type: "SET_EMAIL", payload: "" });
  store.dispatch({ type: "SET_USERNAME", payload: "" });
  store.dispatch({ type: "SET_PERMISSIONS", payload: [] });
};

const saveAuthenticateInfo = data => {
  setAdminInfo(data.admin);

  removeString("activateTTL");
  putString("secretKey", data.secret_key);

  store.dispatch({ type: "SET_SECRET_KEY", payload: data.secret_key });
  store.dispatch({ type: "SET_ACTIVATE_TTL", payload: null });
};

export const deleteAuthenticateInfo = () => {
  deleteAdminInfo();

  removeString("secretKey");
  removeString("activateTTL");

  store.dispatch({ type: "SET_SECRET_KEY", payload: "" });
  store.dispatch({ type: "SET_ACTIVATE_TTL", payload: null });
};
