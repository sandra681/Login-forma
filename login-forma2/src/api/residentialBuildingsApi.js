import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://127.0.0.1:8000/api/home/";

// export function getHomes(sort = "name", order = "asc", page = "10") {
//   console.log(baseUrl + sort + "/" + order + "/" + page);
//   return fetch(baseUrl + sort + "/" + order + "/" + page)
//     .then(handleResponse)
//     .catch(handleError);
// }
export function getFilteredHomes(filter, sort, order, search, page) {
  if (filter === "") {
    return axios
      .get(baseUrl, {
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
      })
      .then(handleResponse)
      .catch(handleError);
  }
  return axios
    .get(baseUrl, {
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
    })
    .then(handleResponse)
    .catch(handleError);
}

export function getCategories() {
  console.log(baseUrl + "categories");
  return axios
    .get(baseUrl + "categories")
    .then(handleResponse)
    .catch(handleError);
}
// export function getSomeHomes(page) {
//   const url = baseUrl + page;
//   return fetch(url).then(handleResponse).catch(handleError);
// }
export function deleteHome(home) {
  const url = baseUrl + home;
  return axios
    .get(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json", // Indicates the content
        "X-CSRF-TOKEN": document
          .querySelector('[name="csrf-token"]')
          .getAttribute("content"),
      },
    })
    .then((response) => {
      if (true) return response.status;
      throw new Error("Network response was not ok");
    })
    .catch(handleError);
}
