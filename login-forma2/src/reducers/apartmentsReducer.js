import {
  GET_APARTMENT_SUCCESS,
  GET_APARTMENT_FAIL,
  ADD_LIKED_APARTMENT,
  ADD_TO_ALL,
  DELETE_LIKED_APARTMENT,
  DELETE_ALL_LIKED_APARTMENT,
  DELETE_APARTMENT,
  DELETE_APARTMENT_IMAGE,
} from "../actions/types";

const initialState = { apartments: [], likedApartments: [] };

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
        likedApartments: [...state.likedApartments, payload.likedApartments],
      };
    case ADD_TO_ALL:
      return {
        ...state,
        likedApartments: payload.likedApartments,
      };
    case DELETE_LIKED_APARTMENT:
      return {
        ...state,
        likedApartments: payload.likedApartments,
      };
    case DELETE_ALL_LIKED_APARTMENT:
      return {
        ...state,
        likedApartments: [],
      };
    case DELETE_APARTMENT:
      return {
        ...state,
        apartments: state.apartments.filter(
          (one) => one.id !== payload.home_id
        ),
      };
    case DELETE_APARTMENT_IMAGE:
      debugger;
      const apartment = state.apartments.filter(
        (one) => one.id !== parseInt(payload.id)
      )[0];
      const img =
        apartment && apartment.images
          ? apartment.images.filter((one) => one.id !== payload.file.id)
          : [];
      const apart = { ...apartment, images: img };
      return {
        ...state,
        apartments: [...state.apartments, apart],
      };
    // return state.apartments.map((apartment, index) => {
    //   if (apartment.id === payload.id) {
    //     let imgs = apartment.images.filter(
    //       (one) => one.id === payload.indexImage
    //     );
    //     return {
    //       ...state,
    //       apartemnts: [...state.apartments],
    //     };
    //   }
    // return { ...state, apartemnts: [...state.apartments,apartments[0]:{}] };
    // }); //Ovo treba proveriti na sta sam tacn
    default:
      return state;
  }
}
