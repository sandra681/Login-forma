import axios from "axios";

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
export default { getApartments };
