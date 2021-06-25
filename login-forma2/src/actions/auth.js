import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  GET_USER,
  GET_USER_FAIL,
} from "./types";
import authService from "../services/auth.service";

export const register = (name, email, password) => (dispatch) => {
  return authService.register(name, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (email, password) => (dispatch) => {
  return authService.login(email, password).then(
    (response) => {
      dispatch({ type: LOGIN_SUCCESS, payload: { user: response } });
      return Promise.resolve();
    },
    (error) => {
      const message = "Error";
      dispatch({ type: LOGIN_FAIL });
      dispatch({ type: SET_MESSAGE, paylaod: message });
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  authService.logout();
  dispatch({
    type: LOGOUT,
  });
};
export const getUser = () => (dispatch) => {
  authService.getUser().then(
    (response) => {
      console.log(response.data);
      dispatch({ type: GET_USER, payload: { user: response.data } });
      return Promise.resolve();
    },
    (error) => {
      const message = "Error";
      dispatch({ type: GET_USER_FAIL });
      dispatch({ type: SET_MESSAGE, payload: message });
      return Promise.reject();
    }
  );
};
