import {
  GET_APARTMENT_SUCCESS,
  GET_APARTMENT_FAIL,
  ADD_LIKED_APARTMENT,
} from "../actions/types";
import apartmentServices from "../services/apartment.services";


const initialState = { apartments: null, likedApartments: null };


export default function apartmentsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_APARTMENT_SUCCESS:
      return {
        ...state,
        apartments: payload.apartments,
      };
    case GET_APARTMENT_FAIL:
      return { ...state, apartments: null };
    case ADD_LIKED_APARTMENT:
      return {
        ...state,
        likedApartments: payload.likedApartments,
      };
    default:
      return state;
  }
}
