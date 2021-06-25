import { GET_USER, GET_USER_FAIL } from "../actions/types";

const token = JSON.parse(localStorage.getItem("token"));

const initalState = token
  ? { isLoggedIn: true, isAdmin: false, user: null }
  : { isLoggedIn: false, isAdmin: false, user: null };

export default function userReducer(state = initalState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER:
      return {
        ...state,
        isLogin: true,
        isAdmin: payload.user.admin === 1,
        user: payload.user,
      };
    case GET_USER_FAIL:
      return { ...state, isLogin: false, isAdmin: false, user: null };
    default:
      return state;
  }
}
