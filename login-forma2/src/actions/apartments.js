import {
  GET_APARTMENT_SUCCESS,
  GET_APARTMENT_FAIL,
  SET_MESSAGE,
  ADD_LIKED_APARTMENT,
} from "./types";
import apartmentService from "../services/apartment.services";

export const getApartments =
  (filter, sort, order, search, page) => (dispatch) => {
    return apartmentService
      .getApartments(filter, sort, order, search, page)
      .then(
        (response) => {
          dispatch({
            type: GET_APARTMENT_SUCCESS,
            payload: { apartments: response.data.data },
          });

          dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
          });

          return response;
        },
        (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          dispatch({
            type: GET_APARTMENT_FAIL,
          });

          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });

          return Promise.reject();
        }
      );
  };
export const getAllLikedApartmentsOfUser = (userId) => (dispatch) => {
  return apartmentService.getAllLikedApartmentsOfUser(userId).then(
    (response) => {
      dispatch({
        type: ADD_LIKED_APARTMENT,
        payload: { apartments: response.data.data },
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_APARTMENT_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
