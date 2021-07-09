import {
  GET_APARTMENT_SUCCESS,
  GET_APARTMENT_FAIL,
  ADD_LIKED_APARTMENT,
  DELETE_LIKED_APARTMENT,
  DELETE_ALL_LIKED_APARTMENT
} from "../actions/types";


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
      case DELETE_LIKED_APARTMENT:
        return{
          ...state,
          likedApartments:payload.likedApartments
        }
        case DELETE_ALL_LIKED_APARTMENT:
          return{
            ...state,
            likedApartments:null
          }
    default:
      return state;
  }
}
