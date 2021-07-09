import axios from "axios";
import authHeader from "./auth-header";

const getApartments = (filter, sort, order, search, page) => {
  if (filter === "") {
    return axios.get(process.env.REACT_APP_BASE_URL + "home", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        search,
        sort,
        order,
        page,
      },
    });
  }
  return axios.get(process.env.REACT_APP_BASE_URL + "home", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    params: {
      search,
      filter,
      sort,
      order,
      page,
    },
  });
};
const storeLikedApartments = (user_id, home_id) => {
  return axios.post(
    process.env.REACT_APP_BASE_URL_AUTH + "likedHome",
    { user_id, home_id },
    { headers: authHeader() }
  );
};
const getAllLikedApartmentsOfUser = (userId) => {
  return axios.get(
    process.env.REACT_APP_BASE_URL_AUTH + "likedHome",
    { userId },
    {
      headers: authHeader(),
    }
  );
};
export default {
  getApartments,
  getAllLikedApartmentsOfUser,
  storeLikedApartments,
};
