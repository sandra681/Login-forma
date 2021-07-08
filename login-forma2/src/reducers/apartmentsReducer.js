import {
  GET_APARTMENT_SUCCESS,
  GET_APARTMENT_FAIL,
  ADD_LIKED_APARTMENT,
} from "../actions/types";

const initialState = { apartments: null, likedHomes: 0 };

export default function apartmentsReducer(state = initialState, action) {
  const { type, payload } = action;
  const lh = state.likedHomes;
  debugger;
  switch (type) {
    case GET_APARTMENT_SUCCESS:
      return {
        ...state,
        apartments: payload.apartments,
      };
    case GET_APARTMENT_FAIL:
      return { ...state, apartments: null };
    case ADD_LIKED_APARTMENT:
      debugger;
      return {
        ...state,
        likedHomes: lh + 1,
      };
    default:
      return state;
  }
}
